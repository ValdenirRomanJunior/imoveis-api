package com.dynamous.imoveis.services;

import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.entities.StripeCustomer;
import com.dynamous.imoveis.entities.StripeSubscription;
import com.dynamous.imoveis.enums.PlanType;
import com.dynamous.imoveis.enums.SubscriptionStatus;
import com.dynamous.imoveis.repositories.StripeCustomerRepository;
import com.dynamous.imoveis.repositories.StripeSubscriptionRepository;
import com.dynamous.imoveis.security.UserSS;
import com.dynamous.imoveis.services.exceptions.ObjectNotFoundException;
import com.dynamous.imoveis.services.exceptions.ServiceException;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.Price;
import com.stripe.model.Product;
import com.stripe.model.Subscription;
import com.stripe.model.checkout.Session;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.PriceCreateParams;
import com.stripe.param.ProductCreateParams;
import com.stripe.param.SubscriptionCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class StripeService {

    @Autowired
    private StripeCustomerRepository stripeCustomerRepository;

    @Autowired
    private StripeSubscriptionRepository stripeSubscriptionRepository;

    @Autowired
    private AccountService accountService;

    @Value("${stripe.success.url}")
    private String successUrl;

    @Value("${stripe.cancel.url}")
    private String cancelUrl;

    // Preços dos planos (em centavos)
    private static final Map<PlanType, Long> PLAN_PRICES = new HashMap<>();
    static {
        PLAN_PRICES.put(PlanType.LITE, 8700L); // R$ 87,00
        PLAN_PRICES.put(PlanType.PRO, 23900L); // R$ 239,00
    }

    /**
     * Cria ou recupera um cliente Stripe
     */
    @Transactional
    public StripeCustomer createOrGetStripeCustomer(Account account) {
        try {
            // Verifica se já existe um cliente Stripe para esta conta
            Optional<StripeCustomer> existingCustomer = stripeCustomerRepository.findByAccount(account);
            if (existingCustomer.isPresent()) {
                // Verifica se o cliente ainda existe no Stripe
                try {
                    Customer.retrieve(existingCustomer.get().getStripeCustomerId());
                    return existingCustomer.get();
                } catch (StripeException e) {
                    // Se o cliente não existe mais no Stripe, remove da base local e cria um novo
                    stripeCustomerRepository.delete(existingCustomer.get());
                }
            }

            // Verifica se já existe um cliente no Stripe com o mesmo email
            Map<String, Object> params = new HashMap<>();
            params.put("email", account.getEmail());
            params.put("limit", 1);
            
            com.stripe.model.CustomerCollection customers = Customer.list(params);
            
            if (!customers.getData().isEmpty()) {
                // Se encontrou um cliente existente no Stripe, usa ele
                Customer existingStripeCustomer = customers.getData().get(0);
                
                // Salva o cliente na base de dados local se não existir
                StripeCustomer customer = new StripeCustomer();
                customer.setStripeCustomerId(existingStripeCustomer.getId());
                customer.setAccount(account);
                customer.setEmail(account.getEmail());
                customer.setName(account.getCompanyName());
                
                return stripeCustomerRepository.save(customer);
            }

            // Cria um novo cliente no Stripe
            CustomerCreateParams createParams = CustomerCreateParams.builder()
                    .setEmail(account.getEmail())
                    .setName(account.getCompanyName())
                    .build();

            Customer stripeCustomer = Customer.create(createParams);

            // Salva o cliente na base de dados
            StripeCustomer customer = new StripeCustomer();
            customer.setStripeCustomerId(stripeCustomer.getId());
            customer.setAccount(account);
            customer.setEmail(account.getEmail());
            customer.setName(account.getCompanyName());

            return stripeCustomerRepository.save(customer);

        } catch (StripeException e) {
            throw new ServiceException("Erro ao criar cliente Stripe: " + e.getMessage(), e);
        }
    }

    /**
     * Cria uma sessão de checkout do Stripe
     */
    @Transactional
    public Session createCheckoutSession(Account account, PlanType planType, String cycle) {
        try {
            StripeCustomer customer = createOrGetStripeCustomer(account);

            // Cria ou recupera o produto e preço no Stripe
            String priceId = createOrGetPrice(planType, cycle);

            // Cria a sessão de checkout
            SessionCreateParams params = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
                    .setCustomer(customer.getStripeCustomerId())
                    .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                    .addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setPrice(priceId)
                                    .setQuantity(1L)
                                    .build()
                    )
                    .setSuccessUrl(successUrl + "?session_id={CHECKOUT_SESSION_ID}")
                    .setCancelUrl(cancelUrl)
                    .putMetadata("account_id", account.getId().toString())
                    .putMetadata("plan_type", planType.name())
                    .putMetadata("cycle", cycle != null ? cycle : "monthly")
                    .build();

            return Session.create(params);

        } catch (StripeException e) {
            throw new ServiceException("Erro ao criar sessão de checkout: " + e.getMessage(), e);
        }
    }

    /**
     * Cria ou recupera um preço no Stripe
     */
    private String createOrGetPrice(PlanType planType, String cycle) throws StripeException {
        try {
            // Normalizar o ciclo
            String normalizedCycle = cycle != null ? cycle.toLowerCase() : "monthly";
            if ("yearly".equals(normalizedCycle)) {
                normalizedCycle = "annual";
            }
            if (!"annual".equals(normalizedCycle) && !"monthly".equals(normalizedCycle)) {
                normalizedCycle = "monthly";
            }

            // Calcular o preço com desconto para planos anuais
            Long basePrice = PLAN_PRICES.get(planType);
            if (basePrice == null) {
                throw new RuntimeException("Preço base não encontrado para o plano: " + planType);
            }
            
            Long priceAmount = "annual".equals(normalizedCycle) ? 
                Math.round(basePrice * 12 * 0.9) : basePrice; // 10% de desconto para anual

            PriceCreateParams.Recurring.Interval interval = "annual".equals(normalizedCycle) 
                ? PriceCreateParams.Recurring.Interval.YEAR 
                : PriceCreateParams.Recurring.Interval.MONTH;
            
            System.out.println("Buscando preço para plano: " + planType + ", ciclo: " + normalizedCycle + ", valor: " + priceAmount);
            
            // Primeiro, tenta buscar um preço existente com o valor correto
            Map<String, Object> params = new HashMap<>();
            params.put("active", true);
            params.put("currency", "brl");
            params.put("type", "recurring");
            params.put("limit", 100);
            
            com.stripe.model.PriceCollection prices = Price.list(params);
            System.out.println("Encontrados " + prices.getData().size() + " preços no Stripe");
            
            // Procura por um preço existente com o valor correto
            for (Price existingPrice : prices.getData()) {
                System.out.println("Verificando preço: " + existingPrice.getId() + 
                    ", valor: " + existingPrice.getUnitAmount() + 
                    ", intervalo: " + (existingPrice.getRecurring() != null ? existingPrice.getRecurring().getInterval() : "null"));
                
                if (existingPrice.getUnitAmount() != null && 
                    existingPrice.getUnitAmount().equals(priceAmount) &&
                    existingPrice.getRecurring() != null &&
                    existingPrice.getRecurring().getInterval().equals(interval.getValue()) &&
                    existingPrice.getProduct() != null) {
                    
                    try {
                        // Verifica se o produto tem o nome correto
                        Product product = Product.retrieve(existingPrice.getProduct());
                        String expectedProductName = "Plano " + planType.name() + " (" + ("annual".equals(normalizedCycle) ? "Anual" : "Mensal") + ")";
                        System.out.println("Produto encontrado: " + product.getName() + ", esperado: " + expectedProductName);
                        
                        if (expectedProductName.equals(product.getName())) {
                            System.out.println("Reutilizando preço existente: " + existingPrice.getId());
                            return existingPrice.getId();
                        }
                    } catch (StripeException e) {
                        System.out.println("Erro ao recuperar produto: " + e.getMessage());
                        // Continua a busca se não conseguir recuperar o produto
                    }
                }
            }
            
            System.out.println("Criando novo produto e preço no Stripe");
            
            // Se não encontrou um preço existente, cria um novo
            ProductCreateParams productParams = ProductCreateParams.builder()
                    .setName("Plano " + planType.name() + " (" + ("annual".equals(normalizedCycle) ? "Anual" : "Mensal") + ")")
                    .setDescription("Assinatura " + ("annual".equals(normalizedCycle) ? "anual" : "mensal") + " do plano " + planType.name())
                    .build();

            Product product = Product.create(productParams);
            System.out.println("Produto criado: " + product.getId() + " - " + product.getName());

            // Cria o preço
            PriceCreateParams priceParams = PriceCreateParams.builder()
                    .setProduct(product.getId())
                    .setUnitAmount(priceAmount)
                    .setCurrency("brl")
                    .setRecurring(
                            PriceCreateParams.Recurring.builder()
                                    .setInterval(interval)
                                    .build()
                    )
                    .build();

            Price price = Price.create(priceParams);
            System.out.println("Preço criado: " + price.getId() + " - " + price.getUnitAmount());
            
            return price.getId();
            
        } catch (StripeException e) {
             System.err.println("Erro no Stripe ao criar/buscar preço: " + e.getMessage());
             System.err.println("Código do erro: " + e.getCode());
             if (e.getStripeError() != null) {
                 System.err.println("Tipo do erro: " + e.getStripeError().getType());
             }
             throw e;
         } catch (Exception e) {
             System.err.println("Erro geral ao criar/buscar preço: " + e.getMessage());
             e.printStackTrace();
             throw new RuntimeException("Erro interno ao processar preço: " + e.getMessage(), e);
         }
    }

    /**
     * Processa o webhook de pagamento bem-sucedido
     */
    @Transactional
    public void handleSuccessfulPayment(String sessionId) {
        try {
            System.out.println("🔄 [STRIPE] Iniciando processamento de pagamento bem-sucedido para sessionId: " + sessionId);
            
            Session session = Session.retrieve(sessionId);
            String accountId = session.getMetadata().get("account_id");
            String planTypeName = session.getMetadata().get("plan_type");

            System.out.println("🔄 [STRIPE] Dados da sessão - AccountId: " + accountId + ", PlanType: " + planTypeName);

            Account account = accountService.find(Long.parseLong(accountId));
            PlanType planType = PlanType.valueOf(planTypeName);

            System.out.println("🔄 [STRIPE] Account encontrada - ID: " + account.getId() + ", Trial atual: " + account.getIsTrialActive());
            System.out.println("🔄 [STRIPE] Plano atual - Tipo: " + account.getPlanType() + ", EndDate: " + account.getPlanEndDate());

            // Recupera a assinatura do Stripe
            String subscriptionId = session.getSubscription();
            Subscription subscription = Subscription.retrieve(subscriptionId);

            System.out.println("🔄 [STRIPE] Assinatura Stripe - ID: " + subscriptionId + ", Status: " + subscription.getStatus());

            // Cria ou atualiza a assinatura na base de dados
            StripeCustomer customer = stripeCustomerRepository.findByAccount(account)
                    .orElseThrow(() -> new ObjectNotFoundException("Cliente Stripe não encontrado"));

            StripeSubscription stripeSubscription = new StripeSubscription();
            stripeSubscription.setStripeSubscriptionId(subscription.getId());
            stripeSubscription.setStripeCustomer(customer);
            stripeSubscription.setPlanType(planType);
            stripeSubscription.setStatus(SubscriptionStatus.ACTIVE);
            stripeSubscription.setStripePriceId(subscription.getItems().getData().get(0).getPrice().getId());
            stripeSubscription.setAmount(BigDecimal.valueOf(PLAN_PRICES.get(planType)).divide(BigDecimal.valueOf(100)));
            stripeSubscription.setCurrency("BRL");
            
            // Converte timestamps do Stripe para LocalDateTime
            LocalDateTime periodStart = LocalDateTime.ofInstant(Instant.ofEpochSecond(subscription.getCurrentPeriodStart()), ZoneId.systemDefault());
            LocalDateTime periodEnd = LocalDateTime.ofInstant(Instant.ofEpochSecond(subscription.getCurrentPeriodEnd()), ZoneId.systemDefault());
            
            stripeSubscription.setCurrentPeriodStart(periodStart);
            stripeSubscription.setCurrentPeriodEnd(periodEnd);

            System.out.println("🔄 [STRIPE] Período da assinatura - Início: " + periodStart + ", Fim: " + periodEnd);

            stripeSubscriptionRepository.save(stripeSubscription);

            System.out.println("🔄 [STRIPE] Assinatura salva no banco de dados");

            // Atualiza a conta com o novo plano
            account.setPlanType(planType);
            account.setPlanStartDate(periodStart);
            account.setPlanEndDate(periodEnd);
            
            // IMPORTANTE: Desativar o trial quando um plano é ativado
            account.setIsTrialActive(false);
            
            System.out.println("🔄 [STRIPE] Atualizando Account - Novo plano: " + planType + ", Trial desativado: " + !account.getIsTrialActive());
            System.out.println("🔄 [STRIPE] Novas datas - Início: " + account.getPlanStartDate() + ", Fim: " + account.getPlanEndDate());
            
            accountService.update(account);

            System.out.println("✅ [STRIPE] Pagamento processado com sucesso! Account atualizada.");

        } catch (StripeException e) {
            System.err.println("❌ [STRIPE] Erro do Stripe: " + e.getMessage());
            throw new ServiceException("Erro ao processar pagamento: " + e.getMessage(), e);
        } catch (Exception e) {
            System.err.println("❌ [STRIPE] Erro geral: " + e.getMessage());
            e.printStackTrace();
            throw new ServiceException("Erro ao processar pagamento: " + e.getMessage(), e);
        }
    }

    /**
     * Processa eventos de webhook do Stripe
     */
    @Transactional
    public void handlePaymentSuccess(com.stripe.model.Event event) {
        try {
            // Processar evento de pagamento bem-sucedido
            if ("checkout.session.completed".equals(event.getType())) {
                Session session = (Session) event.getDataObjectDeserializer().getObject().orElse(null);
                if (session != null) {
                    handleSuccessfulPayment(session.getId());
                }
            }
        } catch (Exception e) {
            throw new ServiceException("Erro ao processar evento de pagamento: " + e.getMessage(), e);
        }
    }

    /**
     * Processa cancelamento de assinatura
     */
    @Transactional
    public void handleSubscriptionCanceled(com.stripe.model.Event event) {
        try {
            System.out.println("🔄 [STRIPE] Processando cancelamento de assinatura");
            
            // Processar evento de cancelamento de assinatura
            Subscription subscription = (Subscription) event.getDataObjectDeserializer().getObject().orElse(null);
            if (subscription != null) {
                System.out.println("🔄 [STRIPE] ID da assinatura cancelada: " + subscription.getId());
                
                // Cancelar assinatura localmente
                cancelSubscription(subscription.getId());
                
                // Buscar a assinatura local para obter a conta
                Optional<StripeSubscription> subscriptionOpt = stripeSubscriptionRepository.findByStripeSubscriptionId(subscription.getId());
                if (subscriptionOpt.isPresent()) {
                    StripeSubscription localSubscription = subscriptionOpt.get();
                    Account account = localSubscription.getStripeCustomer().getAccount();
                    
                    System.out.println("🔄 [STRIPE] Desativando conta após cancelamento - Account ID: " + account.getId());
                    
                    // Desativar o plano imediatamente
                    account.setPlanType(null);
                    account.setPlanEndDate(LocalDateTime.now()); // Expira imediatamente
                    account.setIsTrialActive(false); // Desativa trial também
                    
                    accountService.update(account);
                    
                    System.out.println("✅ [STRIPE] Conta desativada após cancelamento de assinatura");
                } else {
                    System.err.println("❌ [STRIPE] Assinatura local não encontrada para ID: " + subscription.getId());
                }
            }
        } catch (Exception e) {
            System.err.println("❌ [STRIPE] Erro ao processar cancelamento: " + e.getMessage());
            e.printStackTrace();
            throw new ServiceException("Erro ao processar cancelamento de assinatura: " + e.getMessage(), e);
        }
    }

    /**
     * Cancela uma assinatura por ID da assinatura do Stripe
     */
    @Transactional
    public void cancelSubscription(String stripeSubscriptionId) {
        try {
            // Cancelar no Stripe
            Subscription stripeSubscription = Subscription.retrieve(stripeSubscriptionId);
            stripeSubscription.cancel();

            // Atualizar status local
            Optional<StripeSubscription> subscriptionOpt = stripeSubscriptionRepository.findByStripeSubscriptionId(stripeSubscriptionId);
            if (subscriptionOpt.isPresent()) {
                StripeSubscription subscription = subscriptionOpt.get();
                subscription.setStatus(SubscriptionStatus.CANCELED);
                stripeSubscriptionRepository.save(subscription);
            }
        } catch (StripeException e) {
            throw new ServiceException("Erro ao cancelar assinatura: " + e.getMessage(), e);
        }
    }

    /**
     * Cancela uma assinatura
     */
    @Transactional
    public boolean cancelSubscription(Long accountId) {
        try {
            System.out.println("🔄 [STRIPE] Cancelando assinatura para Account ID: " + accountId);
            
            List<StripeSubscription> subscriptions = stripeSubscriptionRepository.findByAccountIdAndStatus(accountId, SubscriptionStatus.ACTIVE);
            
            if (subscriptions.isEmpty()) {
                System.out.println("❌ [STRIPE] Nenhuma assinatura ativa encontrada para Account ID: " + accountId);
                return false;
            }

            for (StripeSubscription subscription : subscriptions) {
                // Cancelar no Stripe
                Subscription stripeSubscription = Subscription.retrieve(subscription.getStripeSubscriptionId());
                stripeSubscription.cancel();

                // Atualizar status local
                subscription.setStatus(SubscriptionStatus.CANCELED);
                stripeSubscriptionRepository.save(subscription);
                
                System.out.println("✅ [STRIPE] Assinatura cancelada no Stripe: " + subscription.getStripeSubscriptionId());
            }

            // Desativar a conta imediatamente após cancelamento manual
            Account account = accountService.find(accountId);
            account.setPlanType(null);
            account.setPlanEndDate(LocalDateTime.now()); // Expira imediatamente
            account.setIsTrialActive(false); // Desativa trial também
            
            accountService.update(account);
            
            System.out.println("✅ [STRIPE] Conta desativada após cancelamento manual - Account ID: " + accountId);

            return true;
        } catch (StripeException e) {
            System.err.println("❌ [STRIPE] Erro do Stripe ao cancelar: " + e.getMessage());
            throw new ServiceException("Erro ao cancelar assinatura: " + e.getMessage(), e);
        } catch (Exception e) {
            System.err.println("❌ [STRIPE] Erro geral ao cancelar: " + e.getMessage());
            e.printStackTrace();
            throw new ServiceException("Erro ao cancelar assinatura: " + e.getMessage(), e);
        }
    }

    /**
     * Lista assinaturas ativas de uma conta
     */
    public List<Map<String, Object>> getActiveSubscriptions(Long accountId) {
        List<StripeSubscription> subscriptions = stripeSubscriptionRepository.findByAccountIdAndStatus(accountId, SubscriptionStatus.ACTIVE);
        return subscriptions.stream().map(subscription -> {
            Map<String, Object> subscriptionMap = new HashMap<>();
            subscriptionMap.put("id", subscription.getId());
            subscriptionMap.put("stripeSubscriptionId", subscription.getStripeSubscriptionId());
            subscriptionMap.put("planType", subscription.getPlanType().getDescription());
            subscriptionMap.put("status", subscription.getStatus().name());
            subscriptionMap.put("amount", subscription.getAmount());
            subscriptionMap.put("currency", subscription.getCurrency());
            subscriptionMap.put("currentPeriodStart", subscription.getCurrentPeriodStart());
            subscriptionMap.put("currentPeriodEnd", subscription.getCurrentPeriodEnd());
            return subscriptionMap;
        }).collect(java.util.stream.Collectors.toList());
    }

    /**
     * Verifica se uma conta tem assinatura ativa
     */
    public boolean hasActiveSubscription(Long accountId) {
        Long count = stripeSubscriptionRepository.countByAccountIdAndStatus(accountId, SubscriptionStatus.ACTIVE);
        return count > 0;
    }
}