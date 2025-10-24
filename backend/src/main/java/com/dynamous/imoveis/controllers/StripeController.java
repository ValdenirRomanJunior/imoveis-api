package com.dynamous.imoveis.controllers;

import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.PlanType;
import com.dynamous.imoveis.security.UserSS;
import com.dynamous.imoveis.services.AccountService;
import com.dynamous.imoveis.services.StripeService;
import com.dynamous.imoveis.services.TenantService;
import com.dynamous.imoveis.services.UserService;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/stripe", produces = {MediaType.APPLICATION_JSON_VALUE})
public class StripeController {

    @Autowired
    private StripeService stripeService;

    @Autowired
    private TenantService tenantService;

    @Autowired
    private AccountService accountService;

    /**
     * Cria uma sessão de checkout do Stripe
     */
    @PreAuthorize("hasAnyRole('TENANT')")
    @PostMapping("/create-checkout-session")
    public ResponseEntity<Map<String, Object>> createCheckoutSession(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            String planCode = request.get("planCode");
            String cycle = request.get("cycle"); // Adicionar suporte ao ciclo
            
            if (planCode == null || planCode.trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Código do plano é obrigatório");
                return ResponseEntity.badRequest().body(response);
            }

            // Validar se o plano existe
            PlanType planType;
            try {
                planType = PlanType.toEnum(Integer.parseInt(planCode));
            } catch (Exception e) {
                response.put("success", false);
                response.put("message", "Plano inválido");
                return ResponseEntity.badRequest().body(response);
            }

            // Obter informações do usuário autenticado
            UserSS user = UserService.authenticated();
            Tenant tenant = tenantService.find(user.getId());
            Account account = accountService.find(tenant.getAccount().getId());

            // Criar sessão de checkout
            Session session = stripeService.createCheckoutSession(account, planType, cycle);

            response.put("success", true);
            response.put("sessionId", session.getId());
            response.put("url", session.getUrl());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Erro interno: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Confirma o sucesso do checkout usando o session_id
     */
    @PreAuthorize("hasAnyRole('TENANT')")
    @PostMapping("/confirm-success")
    public ResponseEntity<Map<String, Object>> confirmCheckoutSuccess(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        try {
            String sessionId = request.get("sessionId");
            if (sessionId == null || sessionId.trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "sessionId é obrigatório");
                return ResponseEntity.badRequest().body(response);
            }

            stripeService.handleSuccessfulPayment(sessionId);
            response.put("success", true);
            response.put("message", "Assinatura ativada com sucesso");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Erro ao confirmar sucesso: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Webhook para processar eventos do Stripe
     */
    @PostMapping("/webhook")
    public ResponseEntity<String> handleStripeWebhook(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader) {
        
        try {
            System.out.println("🔔 [WEBHOOK] Recebido evento do Stripe");
            
            // Verificar assinatura do webhook (em produção, use o endpoint secret)
            Event event = Webhook.constructEvent(payload, sigHeader, "whsec_your_webhook_secret_here");
            
            System.out.println("🔔 [WEBHOOK] Tipo do evento: " + event.getType());
            
            // Processar diferentes tipos de eventos
            switch (event.getType()) {
                case "checkout.session.completed":
                    System.out.println("🔔 [WEBHOOK] Processando checkout.session.completed");
                    stripeService.handlePaymentSuccess(event);
                    break;
                case "invoice.payment_succeeded":
                    System.out.println("🔔 [WEBHOOK] Processando invoice.payment_succeeded (renovação)");
                    // Renovação de assinatura
                    stripeService.handlePaymentSuccess(event);
                    break;
                case "customer.subscription.deleted":
                    System.out.println("🔔 [WEBHOOK] Processando customer.subscription.deleted");
                    // Cancelamento de assinatura
                    stripeService.handleSubscriptionCanceled(event);
                    break;
                default:
                    System.out.println("🔔 [WEBHOOK] Evento não tratado: " + event.getType());
            }
            
            System.out.println("✅ [WEBHOOK] Evento processado com sucesso");
            return ResponseEntity.ok("Success");
            
        } catch (Exception e) {
            System.err.println("❌ [WEBHOOK] Erro no webhook: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Webhook error");
        }
    }

    /**
     * Cancela uma assinatura
     */
    @PreAuthorize("hasAnyRole('TENANT')")
    @PostMapping("/cancel-subscription")
    public ResponseEntity<Map<String, Object>> cancelSubscription() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Obter informações do usuário autenticado
            UserSS user = UserService.authenticated();
            Tenant tenant = tenantService.find(user.getId());
            Account account = accountService.find(tenant.getAccount().getId());

            // Cancelar assinatura
            boolean canceled = stripeService.cancelSubscription(account.getId());
            
            if (canceled) {
                response.put("success", true);
                response.put("message", "Assinatura cancelada com sucesso");
            } else {
                response.put("success", false);
                response.put("message", "Nenhuma assinatura ativa encontrada");
            }
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Erro ao cancelar assinatura: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Lista assinaturas ativas da conta
     */
    @PreAuthorize("hasAnyRole('TENANT')")
    @GetMapping("/subscriptions")
    public ResponseEntity<Map<String, Object>> getSubscriptions() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Obter informações do usuário autenticado
            UserSS user = UserService.authenticated();
            Tenant tenant = tenantService.find(user.getId());
            Account account = accountService.find(tenant.getAccount().getId());

            // Buscar assinaturas ativas
            List<Map<String, Object>> subscriptions = stripeService.getActiveSubscriptions(account.getId());
            
            response.put("success", true);
            response.put("subscriptions", subscriptions);
            response.put("hasActiveSubscription", stripeService.hasActiveSubscription(account.getId()));
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Erro ao buscar assinaturas: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Verifica se a conta possui assinatura ativa
     */
    @PreAuthorize("hasAnyRole('TENANT')")
    @GetMapping("/subscription-status")
    public ResponseEntity<Map<String, Object>> getSubscriptionStatus() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Obter informações do usuário autenticado
            UserSS user = UserService.authenticated();
            Tenant tenant = tenantService.find(user.getId());
            Account account = accountService.find(tenant.getAccount().getId());

            boolean hasActiveSubscription = stripeService.hasActiveSubscription(account.getId());
            
            response.put("success", true);
            response.put("hasActiveSubscription", hasActiveSubscription);
            response.put("accountId", account.getId());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Erro ao verificar status da assinatura: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }
}