package com.dynamous.imoveis.services;

import com.dynamous.imoveis.config.AsaasConfig;
import com.dynamous.imoveis.entities.*;
import com.dynamous.imoveis.enums.*;
import com.dynamous.imoveis.repositories.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AsaasService {
    
    private static final Logger logger = LoggerFactory.getLogger(AsaasService.class);
    
    @Autowired
    private AsaasConfig asaasConfig;
    
    @Autowired
    private AsaasCustomerRepository asaasCustomerRepository;
    
    @Autowired
    private AsaasSubscriptionRepository asaasSubscriptionRepository;
    
    @Autowired
    private AsaasPaymentRepository asaasPaymentRepository;
    
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    /**
     * Cria ou obtém um cliente no ASAAS
     */
    public AsaasCustomer createOrGetCustomer(Account account) {
        // Verifica se já existe um cliente ASAAS para esta conta
        Optional<AsaasCustomer> existingCustomer = asaasCustomerRepository.findByAccount(account);
        if (existingCustomer.isPresent()) {
            return existingCustomer.get();
        }
        
        try {
            // Prepara dados do cliente para envio ao ASAAS
            Map<String, Object> customerData = new HashMap<>();
            customerData.put("name", account.getCompanyName() != null ? account.getCompanyName() : account.getProprietario());
            customerData.put("cpfCnpj", account.getCpf());
            customerData.put("email", account.getEmail());
            customerData.put("mobilePhone", account.getPhone());
            
            // Dados do endereço (se disponíveis)
            if (account.getCep() != null && !account.getCep().isEmpty()) {
                customerData.put("postalCode", account.getCep());
            }
            if (account.getStreet() != null && !account.getStreet().isEmpty()) {
                customerData.put("address", account.getStreet());
                customerData.put("addressNumber", account.getStreet());
            }
            if (account.getNumber() != null && !account.getNumber().isEmpty()) {
                customerData.put("addressNumber", account.getNumber());
                customerData.put("complement", account.getNumber());
            }
            if (account.getCity() != null) {
                customerData.put("city", account.getCity());
            }
            if (account.getState() != null) {
                customerData.put("state", account.getState());
            }
            if (account.getCountry() != null) {
                customerData.put("country", account.getCountry());
            }
            
            // Faz a requisição para criar o cliente no ASAAS
            HttpHeaders headers = createHeaders();
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(customerData, headers);
            
            ResponseEntity<String> response = restTemplate.postForEntity(
                asaasConfig.getBaseUrl() + "/customers", 
                request, 
                String.class
            );
            
            if (response.getStatusCode() == HttpStatus.OK) {
                JsonNode responseJson = objectMapper.readTree(response.getBody());
                String asaasCustomerId = responseJson.get("id").asText();
                
                // Cria e salva o cliente local
                AsaasCustomer asaasCustomer = new AsaasCustomer(
                    asaasCustomerId, 
                    account, 
                    customerData.get("name").toString(), 
                    customerData.get("cpfCnpj").toString()
                );
                
                asaasCustomer.setEmail(account.getEmail());
                asaasCustomer.setMobilePhone(account.getPhone());
                asaasCustomer.setPostalCode(account.getCep());
                asaasCustomer.setAddress(account.getStreet());
                asaasCustomer.setAddressNumber(account.getNumber());
                asaasCustomer.setCity(account.getCity());
                asaasCustomer.setState(account.getState());
                asaasCustomer.setCountry(account.getCountry());
                
                return asaasCustomerRepository.save(asaasCustomer);
            }
            
        } catch (HttpClientErrorException e) {
            logger.error("Erro ao criar cliente no ASAAS: {}", e.getResponseBodyAsString());
            throw new RuntimeException("Erro ao criar cliente no ASAAS: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Erro inesperado ao criar cliente no ASAAS", e);
            throw new RuntimeException("Erro inesperado ao criar cliente no ASAAS: " + e.getMessage());
        }
        
        throw new RuntimeException("Falha ao criar cliente no ASAAS");
    }
    
    /**
     * Cria uma assinatura no ASAAS
     */
    public AsaasSubscription createSubscription(AsaasCustomer customer, PlanType planType, 
                                              AsaasBillingType billingType, AsaasSubscriptionCycle cycle) {
        try {
            Map<String, Object> subscriptionData = new HashMap<>();
            subscriptionData.put("customer", customer.getAsaasCustomerId());
            subscriptionData.put("billingType", billingType.getCode());
            subscriptionData.put("value", planType.getPrice());
            subscriptionData.put("cycle", cycle.getCode());
            subscriptionData.put("description", "Assinatura " + planType.getName() + " - Standi SAAS");
            
            // Define a próxima data de vencimento (hoje + 1 dia)
            LocalDate nextDueDate = LocalDate.now().plusDays(1);
            subscriptionData.put("nextDueDate", nextDueDate.format(DateTimeFormatter.ISO_LOCAL_DATE));
            
            HttpHeaders headers = createHeaders();
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(subscriptionData, headers);
            
            ResponseEntity<String> response = restTemplate.postForEntity(
                asaasConfig.getBaseUrl() + "/subscriptions", 
                request, 
                String.class
            );
            
            if (response.getStatusCode() == HttpStatus.OK) {
                JsonNode responseJson = objectMapper.readTree(response.getBody());
                String asaasSubscriptionId = responseJson.get("id").asText();
                
                // Cria e salva a assinatura local
                AsaasSubscription subscription = new AsaasSubscription(
                    asaasSubscriptionId,
                    customer,
                    billingType,
                    BigDecimal.valueOf(planType.getPrice()),
                    cycle,
                    subscriptionData.get("description").toString()
                );
                
                subscription.setNextDueDate(nextDueDate);
                subscription.setStatus(AsaasSubscriptionStatus.ACTIVE);
                
                return asaasSubscriptionRepository.save(subscription);
            }
            
        } catch (HttpClientErrorException e) {
            logger.error("Erro ao criar assinatura no ASAAS: {}", e.getResponseBodyAsString());
            throw new RuntimeException("Erro ao criar assinatura no ASAAS: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Erro inesperado ao criar assinatura no ASAAS", e);
            throw new RuntimeException("Erro inesperado ao criar assinatura no ASAAS: " + e.getMessage());
        }
        
        throw new RuntimeException("Falha ao criar assinatura no ASAAS");
    }
    
    /**
     * Obtém informações de uma assinatura do ASAAS
     */
    public JsonNode getSubscriptionInfo(String asaasSubscriptionId) {
        try {
            HttpHeaders headers = createHeaders();
            HttpEntity<String> request = new HttpEntity<>(headers);
            
            ResponseEntity<String> response = restTemplate.exchange(
                asaasConfig.getBaseUrl() + "/subscriptions/" + asaasSubscriptionId,
                HttpMethod.GET,
                request,
                String.class
            );
            
            if (response.getStatusCode() == HttpStatus.OK) {
                return objectMapper.readTree(response.getBody());
            }
            
        } catch (Exception e) {
            logger.error("Erro ao obter informações da assinatura: {}", e.getMessage());
        }
        
        return null;
    }
    
    /**
     * Cancela uma assinatura no ASAAS
     */
    public boolean cancelSubscription(String asaasSubscriptionId) {
        try {
            HttpHeaders headers = createHeaders();
            HttpEntity<String> request = new HttpEntity<>(headers);
            
            ResponseEntity<String> response = restTemplate.exchange(
                asaasConfig.getBaseUrl() + "/subscriptions/" + asaasSubscriptionId,
                HttpMethod.DELETE,
                request,
                String.class
            );
            
            if (response.getStatusCode() == HttpStatus.OK) {
                // Atualiza o status local
                Optional<AsaasSubscription> subscription = asaasSubscriptionRepository.findByAsaasSubscriptionId(asaasSubscriptionId);
                if (subscription.isPresent()) {
                    subscription.get().setStatus(AsaasSubscriptionStatus.INACTIVE);
                    asaasSubscriptionRepository.save(subscription.get());
                }
                return true;
            }
            
        } catch (Exception e) {
            logger.error("Erro ao cancelar assinatura: {}", e.getMessage());
        }
        
        return false;
    }
    
    /**
     * Cria um checkout pronto no ASAAS
     */
    public Map<String, Object> createCheckout(Account account, PlanType planType, AsaasBillingType billingType, AsaasSubscriptionCycle cycle) {
        try {
            // URL correta conforme documentação
            String url = asaasConfig.getBaseUrl() + "/checkouts";
            
            // Calcular valor baseado no ciclo
            double basePrice = planType.getPrice();
            double finalPrice = calculatePriceWithCycle(basePrice, cycle);
            
            Map<String, Object> checkoutData = new HashMap<>();
            
            // Configurar formas de pagamento (billingTypes)
            List<String> billingTypes = new ArrayList<>();
            if (billingType == AsaasBillingType.CREDIT_CARD) {
                billingTypes.add("CREDIT_CARD");
            } else if (billingType == AsaasBillingType.BOLETO) {
                billingTypes.add("BOLETO");
            } else if (billingType == AsaasBillingType.PIX) {
                billingTypes.add("PIX");
            } else {
                // Permitir todas as formas de pagamento
                billingTypes.add("CREDIT_CARD");
                billingTypes.add("BOLETO");
                billingTypes.add("PIX");
            }
            checkoutData.put("billingTypes", billingTypes);
            
            // Configurar tipo de cobrança (chargeTypes) - DETACHED conforme exemplo
            checkoutData.put("chargeTypes", Arrays.asList("DETACHED"));
            
            // Referência externa obrigatória
            checkoutData.put("externalReference", "checkout_" + account.getId() + "_" + System.currentTimeMillis());
            
            // Configurar expiração em minutos (10 minutos conforme exemplo)
            checkoutData.put("minutesToExpire", 10);
            
            // Configurar callback - campo obrigatório conforme documentação do Asaas
            Map<String, Object> callback = new HashMap<>();
            callback.put("successUrl", asaasConfig.getSuccessUrl());
            callback.put("cancelUrl", asaasConfig.getCancelUrl());
            callback.put("expiredUrl", asaasConfig.getExpiredUrl());
            checkoutData.put("callback", callback);
            
            // Configurar itens do checkout
            List<Map<String, Object>> items = new ArrayList<>();
            Map<String, Object> item = new HashMap<>();
            // Limitar o nome do item a 30 caracteres conforme API ASAAS
            String itemName = planType.getDescription();
            if (itemName.length() > 30) {
                itemName = itemName.substring(0, 30);
            }
            item.put("name", itemName);
            item.put("value", finalPrice);
            item.put("quantity", 1);
            items.add(item);
            checkoutData.put("items", items);
            
            // Configurar dados do cliente usando customerData (não customer)
            Map<String, Object> customerData = new HashMap<>();
            
            // Nome do cliente (obrigatório)
            String customerName = account.getCompanyName();
            if (customerName != null && !customerName.isEmpty()) {
                customerData.put("name", customerName);
            } else {
                throw new RuntimeException("Nome da empresa é obrigatório para criar checkout");
            }
            
            // Email (obrigatório)
            if (account.getEmail() != null && !account.getEmail().isEmpty()) {
                customerData.put("email", account.getEmail());
            } else {
                throw new RuntimeException("Email da conta é obrigatório para criar checkout");
            }
            
            // CPF/CNPJ (obrigatório) - remover formatação se houver
            if (account.getCpf() != null && !account.getCpf().isEmpty()) {
                String cpfCnpj = account.getCpf().replaceAll("[^0-9]", ""); // Remove formatação
                customerData.put("cpfCnpj", cpfCnpj);
            } else {
                throw new RuntimeException("CPF da conta é obrigatório para criar checkout");
            }
            
            // Telefone (obrigatório) - remover formatação se houver
            if (account.getPhone() != null && !account.getPhone().isEmpty()) {
                String phone = account.getPhone().replaceAll("[^0-9]", ""); // Remove formatação
                customerData.put("phone", phone);
            } else {
                throw new RuntimeException("Telefone da conta é obrigatório para criar checkout");
            }
            
            // Endereço (obrigatório)
            if (account.getStreet() != null && !account.getStreet().isEmpty()) {
                customerData.put("address", account.getStreet());
            } else {
                throw new RuntimeException("Endereço (rua) da conta é obrigatório para criar checkout");
            }
            
            // Número do endereço (obrigatório)
            if (account.getNumber() != null && !account.getNumber().isEmpty()) {
                customerData.put("addressNumber", account.getNumber());
            } else {
                throw new RuntimeException("Número do endereço da conta é obrigatório para criar checkout");
            }
            
            // CEP (obrigatório) - conforme documentação, pode ser com ou sem hífen
            if (account.getCep() != null && !account.getCep().isEmpty()) {
                String postalCode = account.getCep(); // Manter formatação original
                customerData.put("postalCode", postalCode);
            } else {
                throw new RuntimeException("CEP da conta é obrigatório para criar checkout");
            }
            
            // Bairro (obrigatório)
            if (account.getNeighborhood() != null && !account.getNeighborhood().isEmpty()) {
                customerData.put("province", account.getNeighborhood());
            } else {
                throw new RuntimeException("Bairro da conta é obrigatório para criar checkout");
            }
            
            // Cidade (opcional, mas recomendado) - pode ser string ou código IBGE
            if (account.getCity() != null && !account.getCity().isEmpty()) {
                customerData.put("city", account.getCity());
            }
            
            checkoutData.put("customerData", customerData);
            
            // Configurar assinatura (obrigatório para chargeTypes RECURRENT)
            Map<String, Object> subscription = new HashMap<>();
            subscription.put("cycle", cycle.getCode().toUpperCase());
            subscription.put("value", finalPrice);
            
            // Calcular datas da assinatura
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime nextDueDate = now.plusDays(1); // Próximo vencimento em 1 dia
            LocalDateTime endDate;
            
            // Definir data de fim baseada no ciclo
            switch (cycle) {
                case MONTHLY:
                    endDate = now.plusYears(1); // 1 ano para mensal
                    break;
                case YEARLY:
                    endDate = now.plusYears(1); // 1 ano para anual
                    break;
                default:
                    endDate = now.plusYears(1);
            }
            
            // Formatar datas no formato esperado pelo Asaas (yyyy-MM-dd HH:mm:ss)
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            subscription.put("nextDueDate", nextDueDate.format(formatter));
            subscription.put("endDate", endDate.format(formatter));
            
            checkoutData.put("subscription", subscription);
            
            // Configurar splits (opcional) - pode ser usado para comissões
            // Comentado por enquanto, pode ser habilitado conforme necessidade
            /*
            List<Map<String, Object>> splits = new ArrayList<>();
            Map<String, Object> split = new HashMap<>();
            split.put("walletId", "wallet-id-aqui");
            split.put("fixedValue", "Comissão referente ao serviço utilizado");
            split.put("percentageValue", 10);
            split.put("totalFixedValue", 15);
            splits.add(split);
            checkoutData.put("splits", splits);
            */
            
            HttpHeaders headers = createHeaders();
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(checkoutData, headers);
            
            logger.info("Criando checkout no ASAAS para conta: {}", account.getId());
            
            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);
            
            if (response.getStatusCode() == HttpStatus.OK) {
                JsonNode responseJson = objectMapper.readTree(response.getBody());
                
                Map<String, Object> result = new HashMap<>();
                result.put("id", responseJson.get("id").asText());
                result.put("url", responseJson.get("url").asText());
                result.put("expirationDate", responseJson.get("expirationDate").asText());
                
                logger.info("Checkout criado com sucesso: {}", responseJson.get("id").asText());
                return result;
            } else {
                throw new RuntimeException("Erro ao criar checkout: " + response.getBody());
            }
            
        } catch (HttpClientErrorException e) {
            logger.error("Erro HTTP ao criar checkout: {}", e.getResponseBodyAsString());
            throw new RuntimeException("Erro ao criar checkout: " + e.getResponseBodyAsString());
        } catch (Exception e) {
            logger.error("Erro ao criar checkout: {}", e.getMessage());
            throw new RuntimeException("Erro ao criar checkout: " + e.getMessage());
        }
    }
    
    /**
     * Calcula o preço baseado no ciclo de assinatura
     */
    private double calculatePriceWithCycle(double basePrice, AsaasSubscriptionCycle cycle) {
        switch (cycle) {
            case MONTHLY:
                return basePrice;
            case QUARTERLY:
                return basePrice * 3 * 0.95; // 5% de desconto
            case SEMIANNUALLY:
                return basePrice * 6 * 0.90; // 10% de desconto
            case YEARLY:
                return basePrice * 12 * 0.85; // 15% de desconto
            default:
                return basePrice;
        }
    }

    /**
     * Processa webhook do ASAAS
     */
    public void processWebhook(String event, JsonNode data) {
        try {
            logger.info("Processando webhook ASAAS - Evento: {}", event);
            
            switch (event) {
                case "PAYMENT_CREATED":
                    processPaymentCreated(data);
                    break;
                case "PAYMENT_RECEIVED":
                    processPaymentReceived(data);
                    break;
                case "PAYMENT_OVERDUE":
                    processPaymentOverdue(data);
                    break;
                default:
                    logger.info("Evento de webhook não processado: {}", event);
            }
            
        } catch (Exception e) {
            logger.error("Erro ao processar webhook: {}", e.getMessage());
        }
    }
    
    private void processPaymentCreated(JsonNode data) {
        // Implementar lógica para pagamento criado
        logger.info("Pagamento criado: {}", data.get("id").asText());
    }
    
    private void processPaymentReceived(JsonNode data) {
        // Implementar lógica para pagamento recebido
        logger.info("Pagamento recebido: {}", data.get("id").asText());
        
        // Aqui você pode atualizar o plano da conta, estender a validade, etc.
    }
    
    private void processPaymentOverdue(JsonNode data) {
        // Implementar lógica para pagamento em atraso
        logger.info("Pagamento em atraso: {}", data.get("id").asText());
    }
    
    /**
     * Cria headers para requisições ao ASAAS
     */
    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("access_token", asaasConfig.getApiToken());
        headers.set("User-Agent", asaasConfig.getUserAgent());
        return headers;
    }
}