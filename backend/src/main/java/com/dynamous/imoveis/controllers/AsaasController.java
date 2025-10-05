package com.dynamous.imoveis.controllers;

import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.entities.AsaasCustomer;
import com.dynamous.imoveis.entities.AsaasSubscription;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.PlanType;
import com.dynamous.imoveis.security.UserSS;
import com.dynamous.imoveis.services.AccountService;
import com.dynamous.imoveis.services.AsaasService;
import com.dynamous.imoveis.services.TenantService;
import com.dynamous.imoveis.services.UserService;
import com.dynamous.imoveis.repositories.AsaasCustomerRepository;
import com.dynamous.imoveis.repositories.AsaasSubscriptionRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(value = "/asaas", produces = {MediaType.APPLICATION_JSON_VALUE})
public class AsaasController {

    private static final Logger logger = LoggerFactory.getLogger(AsaasController.class);

    @Autowired
    private AsaasService asaasService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private TenantService tenantService;

    @Autowired
    private AsaasCustomerRepository asaasCustomerRepository;

    @Autowired
    private AsaasSubscriptionRepository asaasSubscriptionRepository;

    /**
     * Cria um checkout pronto do ASAAS
     */
    @PreAuthorize("hasAnyRole('TENANT')")
    @PostMapping("/checkout")
    public ResponseEntity<Map<String, Object>> createCheckout(@RequestBody Map<String, Object> request) {
        try {
            UserSS user = UserService.authenticated();
            Tenant tenant = tenantService.find(user.getId());
            Account account = accountService.find(tenant.getAccount().getId());

            // Tratar planCode que pode vir como String ou Integer
            Object planCodeObj = request.get("planCode");
            String billingType = (String) request.get("billingType");
            String cycle = (String) request.get("cycle");

            // Validar se o plano existe
            PlanType planType = null;
            try {
                int planCodeInt;
                if (planCodeObj instanceof Integer) {
                    planCodeInt = (Integer) planCodeObj;
                } else if (planCodeObj instanceof String) {
                    planCodeInt = Integer.parseInt((String) planCodeObj);
                } else {
                    throw new IllegalArgumentException("Tipo de planCode inválido");
                }
                planType = PlanType.toEnum(planCodeInt);
            } catch (Exception e) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("success", false);
                errorResponse.put("message", "Plano não encontrado");
                return ResponseEntity.badRequest().body(errorResponse);
            }

            // Validar tipo de cobrança
            com.dynamous.imoveis.enums.AsaasBillingType asaasBillingType;
            try {
                asaasBillingType = com.dynamous.imoveis.enums.AsaasBillingType.fromCode(billingType);
            } catch (IllegalArgumentException e) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("success", false);
                errorResponse.put("message", "Tipo de cobrança inválido");
                return ResponseEntity.badRequest().body(errorResponse);
            }

            // Validar ciclo de assinatura
            com.dynamous.imoveis.enums.AsaasSubscriptionCycle asaasSubscriptionCycle;
            try {
                asaasSubscriptionCycle = com.dynamous.imoveis.enums.AsaasSubscriptionCycle.fromCode(cycle);
            } catch (IllegalArgumentException e) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("success", false);
                errorResponse.put("message", "Ciclo de assinatura inválido");
                return ResponseEntity.badRequest().body(errorResponse);
            }

            // Criar checkout pronto
            Map<String, Object> checkoutResponse = asaasService.createCheckout(
                account, 
                planType, 
                asaasBillingType, 
                asaasSubscriptionCycle
            );

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Checkout criado com sucesso");
            response.put("checkoutUrl", checkoutResponse.get("url"));
            response.put("checkoutId", checkoutResponse.get("id"));

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Erro ao criar checkout: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    /**
     * Cria uma assinatura para o plano selecionado
     */
    @PreAuthorize("hasAnyRole('TENANT')")
    @PostMapping("/subscribe")
    public ResponseEntity<Map<String, Object>> createSubscription(@RequestBody Map<String, Object> request) {
        try {
            UserSS user = UserService.authenticated();
            Tenant tenant = tenantService.find(user.getId());
            Account account = accountService.find(tenant.getAccount().getId());

            // Tratar planCode que pode vir como String ou Integer
            Object planCodeObj = request.get("planCode");
            String billingType = (String) request.get("billingType");
            String cycle = (String) request.get("cycle");

            // Validar se o plano existe
            PlanType planType = null;
            try {
                int planCodeInt;
                if (planCodeObj instanceof Integer) {
                    planCodeInt = (Integer) planCodeObj;
                } else if (planCodeObj instanceof String) {
                    planCodeInt = Integer.parseInt((String) planCodeObj);
                } else {
                    throw new IllegalArgumentException("Tipo de planCode inválido");
                }
                planType = PlanType.toEnum(planCodeInt);
            } catch (NumberFormatException e) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("success", false);
                errorResponse.put("message", "Plano não encontrado");
                return ResponseEntity.badRequest().body(errorResponse);
            } catch (IllegalArgumentException e) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("success", false);
                errorResponse.put("message", "Plano não encontrado");
                return ResponseEntity.badRequest().body(errorResponse);
            }

            // Validar tipo de cobrança
            com.dynamous.imoveis.enums.AsaasBillingType asaasBillingType;
            try {
                asaasBillingType = com.dynamous.imoveis.enums.AsaasBillingType.fromCode(billingType);
            } catch (IllegalArgumentException e) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("success", false);
                errorResponse.put("message", "Tipo de cobrança inválido");
                return ResponseEntity.badRequest().body(errorResponse);
            }

            // Validar ciclo de assinatura
            com.dynamous.imoveis.enums.AsaasSubscriptionCycle asaasSubscriptionCycle;
            try {
                asaasSubscriptionCycle = com.dynamous.imoveis.enums.AsaasSubscriptionCycle.fromCode(cycle);
            } catch (IllegalArgumentException e) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("success", false);
                errorResponse.put("message", "Ciclo de assinatura inválido");
                return ResponseEntity.badRequest().body(errorResponse);
            }

            // Criar ou obter cliente ASAAS
            AsaasCustomer asaasCustomer = asaasService.createOrGetCustomer(account);

            // Criar assinatura
            AsaasSubscription subscription = asaasService.createSubscription(
                asaasCustomer, 
                planType, 
                asaasBillingType, 
                asaasSubscriptionCycle
            );

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Assinatura criada com sucesso");
            response.put("subscriptionId", subscription.getAsaasSubscriptionId());
            response.put("status", subscription.getStatus().getCode());
            response.put("nextDueDate", subscription.getNextDueDate());
            response.put("value", subscription.getValue());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Erro ao criar assinatura: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    /**
     * Obtém informações das assinaturas do usuário
     */
    @PreAuthorize("hasAnyRole('TENANT')")
    @GetMapping("/subscriptions")
    public ResponseEntity<Map<String, Object>> getSubscriptions() {
        try {
            UserSS user = UserService.authenticated();
            Tenant tenant = tenantService.find(user.getId());
            Account account = accountService.find(tenant.getAccount().getId());

            Optional<AsaasCustomer> asaasCustomerOpt = asaasCustomerRepository.findByAccount(account);
            
            Map<String, Object> response = new HashMap<>();
            
            if (asaasCustomerOpt.isPresent()) {
                AsaasCustomer asaasCustomer = asaasCustomerOpt.get();
                List<AsaasSubscription> subscriptions = asaasSubscriptionRepository
                    .findByAsaasCustomer(asaasCustomer);
                
                response.put("success", true);
                response.put("hasCustomer", true);
                response.put("customerId", asaasCustomer.getAsaasCustomerId());
                response.put("subscriptions", subscriptions);
            } else {
                response.put("success", true);
                response.put("hasCustomer", false);
                response.put("subscriptions", List.of());
            }

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Erro ao obter assinaturas: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    /**
     * Cancela uma assinatura
     */
    @PreAuthorize("hasAnyRole('TENANT')")
    @PostMapping("/subscriptions/{subscriptionId}/cancel")
    public ResponseEntity<Map<String, Object>> cancelSubscription(@PathVariable String subscriptionId) {
        try {
            UserSS user = UserService.authenticated();
            Tenant tenant = tenantService.find(user.getId());
            Account account = accountService.find(tenant.getAccount().getId());

            Optional<AsaasCustomer> asaasCustomerOpt = asaasCustomerRepository.findByAccount(account);
            
            if (asaasCustomerOpt.isEmpty()) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("success", false);
                errorResponse.put("message", "Cliente ASAAS não encontrado");
                return ResponseEntity.badRequest().body(errorResponse);
            }

            AsaasCustomer asaasCustomer = asaasCustomerOpt.get();
            Optional<AsaasSubscription> subscriptionOpt = asaasSubscriptionRepository
                .findByAsaasSubscriptionId(subscriptionId);

            if (subscriptionOpt.isEmpty() || !subscriptionOpt.get().getAsaasCustomer().equals(asaasCustomer)) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("success", false);
                errorResponse.put("message", "Assinatura não encontrada");
                return ResponseEntity.badRequest().body(errorResponse);
            }

            boolean cancelled = asaasService.cancelSubscription(subscriptionId);

            Map<String, Object> response = new HashMap<>();
            if (cancelled) {
                response.put("success", true);
                response.put("message", "Assinatura cancelada com sucesso");
            } else {
                response.put("success", false);
                response.put("message", "Erro ao cancelar assinatura");
            }

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Erro ao cancelar assinatura: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    /**
     * Webhook para receber notificações do ASAAS
     */
    @PostMapping("/webhook")
    public ResponseEntity<String> webhook(HttpServletRequest request, @RequestBody String payload) {
        try {
            // Por enquanto, apenas log do webhook recebido
            logger.info("Webhook recebido do ASAAS: {}", payload);
            return ResponseEntity.ok("OK");
        } catch (Exception e) {
            logger.error("Erro ao processar webhook: ", e);
            return ResponseEntity.badRequest().body("Erro: " + e.getMessage());
        }
    }

    /**
     * Obtém informações de pagamento do usuário (para exibir na página MyAccount)
     */
    @PreAuthorize("hasAnyRole('TENANT')")
    @GetMapping("/payment-info")
    public ResponseEntity<Map<String, Object>> getPaymentInfo() {
        try {
            UserSS user = UserService.authenticated();
            Tenant tenant = tenantService.find(user.getId());
            Account account = accountService.find(tenant.getAccount().getId());

            Optional<AsaasCustomer> asaasCustomerOpt = asaasCustomerRepository.findByAccount(account);
            
            Map<String, Object> response = new HashMap<>();
            
            if (asaasCustomerOpt.isPresent()) {
                AsaasCustomer asaasCustomer = asaasCustomerOpt.get();
                Optional<AsaasSubscription> activeSubscriptionOpt = asaasSubscriptionRepository
                    .findByAsaasCustomerAndStatusOrderByCreatedAtDesc(
                        asaasCustomer, 
                        com.dynamous.imoveis.enums.AsaasSubscriptionStatus.ACTIVE
                    );

                response.put("success", true);
                response.put("hasPaymentInfo", true);
                response.put("customerInfo", Map.of(
                    "name", asaasCustomer.getName(),
                    "email", asaasCustomer.getEmail(),
                    "cpfCnpj", asaasCustomer.getCpfCnpj(),
                    "mobilePhone", asaasCustomer.getMobilePhone()
                ));
                
                if (activeSubscriptionOpt.isPresent()) {
                    AsaasSubscription activeSubscription = activeSubscriptionOpt.get();
                    response.put("activeSubscriptions", List.of(activeSubscription));
                } else {
                    response.put("activeSubscriptions", List.of());
                }
            } else {
                response.put("success", true);
                response.put("hasPaymentInfo", false);
                response.put("message", "Nenhuma informação de pagamento encontrada");
            }

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Erro ao obter informações de pagamento: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}