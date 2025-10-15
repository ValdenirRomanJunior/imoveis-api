package com.dynamous.imoveis.controllers;

import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.entities.StripeCustomer;
import com.dynamous.imoveis.entities.StripeSubscription;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.repositories.StripeCustomerRepository;
import com.dynamous.imoveis.repositories.StripeSubscriptionRepository;
import com.dynamous.imoveis.security.UserSS;
import com.dynamous.imoveis.services.AccountService;
import com.dynamous.imoveis.services.TenantService;
import com.dynamous.imoveis.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(value = "/payment", produces = {MediaType.APPLICATION_JSON_VALUE})
public class PaymentController {

    @Autowired
    private TenantService tenantService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private StripeCustomerRepository stripeCustomerRepository;

    @Autowired
    private StripeSubscriptionRepository stripeSubscriptionRepository;

    /**
     * Retorna informações de pagamento do usuário autenticado
     */
    @PreAuthorize("hasAnyRole('TENANT')")
    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> getPaymentInfo() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Obter informações do usuário autenticado
            UserSS user = UserService.authenticated();
            Tenant tenant = tenantService.find(user.getId());
            Account account = accountService.find(tenant.getAccount().getId());

            // Buscar cliente Stripe
            Optional<StripeCustomer> stripeCustomerOpt = stripeCustomerRepository.findByAccount(account);
            
            if (stripeCustomerOpt.isPresent()) {
                StripeCustomer stripeCustomer = stripeCustomerOpt.get();
                
                // Informações do cliente
                Map<String, Object> customerInfo = new HashMap<>();
                customerInfo.put("name", stripeCustomer.getName());
                customerInfo.put("email", stripeCustomer.getEmail());
                customerInfo.put("document", "N/A"); // Campo não disponível na entidade StripeCustomer
                
                // Buscar assinaturas ativas
                List<StripeSubscription> subscriptions = stripeSubscriptionRepository.findActiveByCustomer(stripeCustomer);
                List<Map<String, Object>> subscriptionList = new ArrayList<>();
                
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
                
                for (StripeSubscription subscription : subscriptions) {
                    Map<String, Object> subInfo = new HashMap<>();
                    subInfo.put("planType", subscription.getPlanType().getDescription());
                    subInfo.put("status", subscription.getStatus().name());
                    subInfo.put("amount", subscription.getAmount());
                    subInfo.put("currency", subscription.getCurrency());
                    subInfo.put("currentPeriodStart", subscription.getCurrentPeriodStart().format(formatter));
                    subInfo.put("currentPeriodEnd", subscription.getCurrentPeriodEnd().format(formatter));
                    subInfo.put("stripeSubscriptionId", subscription.getStripeSubscriptionId());
                    subscriptionList.add(subInfo);
                }
                
                response.put("success", true);
                response.put("customerInfo", customerInfo);
                response.put("subscriptions", subscriptionList);
                
            } else {
                response.put("success", false);
                response.put("message", "Nenhuma informação de pagamento encontrada");
            }
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Erro ao buscar informações de pagamento: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }
}