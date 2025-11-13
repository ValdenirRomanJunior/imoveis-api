package com.dynamous.imoveis.config;

import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.PlanType;
import com.dynamous.imoveis.repositories.AccountRepository;
import com.dynamous.imoveis.repositories.TenantRepository;
import com.dynamous.imoveis.security.UserSS;
import com.dynamous.imoveis.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Component
public class SubscriptionInterceptor implements HandlerInterceptor {

    @Autowired
    private TenantRepository tenantRepository;
    
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        try {
            System.out.println("=== SubscriptionInterceptor preHandle START ===");
            System.out.println("Request URI: " + request.getRequestURI());
            System.out.println("Request Method: " + request.getMethod());
            
            // Pular verificação para endpoints públicos e de autenticação
            if (isPublicEndpoint(request.getRequestURI())) {
                System.out.println("Public endpoint - skipping subscription check");
                return true;
            }
            
            // Obter usuário autenticado
            UserSS user = UserService.authenticated();
            if (user == null) {
                System.out.println("No authenticated user - allowing request");
                return true;
            }
            
            System.out.println("Authenticated user: " + user.getUsername());
            
            // Buscar tenant do usuário
            Tenant tenant = tenantRepository.findByEmail(user.getUsername());
            if (tenant == null) {
                System.out.println("Tenant not found - allowing request");
                return true;
            }
            
            System.out.println("Tenant found: " + tenant.getId());
            
            // Buscar account do tenant
        Account account = tenant.getAccount();
            if (account == null) {
                System.out.println("Account not found - allowing request");
                return true;
            }
            
            System.out.println("Account found - Plan: " + account.getPlanType() + ", Trial Active: " + account.getIsTrialActive() + ", Plan End Date: " + account.getPlanEndDate());
            
            // Verificar se a conta tem acesso
            boolean hasAccess = checkAccountAccess(account);
            
            if (!hasAccess) {
                System.out.println("Account access denied - subscription expired or canceled");
                
                // Retornar erro 403 com informações sobre o bloqueio
                response.setStatus(HttpStatus.FORBIDDEN.value());
                response.setContentType("application/json");
                
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "SUBSCRIPTION_REQUIRED");
                errorResponse.put("message", "Sua assinatura expirou ou foi cancelada. Renove seu plano para continuar usando o sistema.");
                errorResponse.put("planType", account.getPlanType().toString());
                errorResponse.put("isTrialActive", account.getIsTrialActive());
                errorResponse.put("planEndDate", account.getPlanEndDate());
                
                response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
                
                System.out.println("=== SubscriptionInterceptor preHandle END - ACCESS DENIED ===");
                return false;
            }
            
            System.out.println("Account has access - allowing request");
            System.out.println("=== SubscriptionInterceptor preHandle END - SUCCESS ===");
            return true;
            
        } catch (Exception e) {
            System.err.println("=== ERROR in SubscriptionInterceptor preHandle ===");
            System.err.println("Error message: " + e.getMessage());
            System.err.println("Error class: " + e.getClass().getName());
            e.printStackTrace();
            
            // Em caso de erro, permitir a requisição para não bloquear o sistema
            System.err.println("Allowing request due to error in subscription check");
            return true;
        }
    }
    
    /**
     * Verifica se a conta tem acesso ao sistema
     */
    private boolean checkAccountAccess(Account account) {
        // Se está em trial ativo, verificar se não expirou
        if (account.getIsTrialActive()) {
            if (account.getPlanEndDate() != null && account.getPlanEndDate().isBefore(LocalDateTime.now())) {
                return false; // Trial expirado
            }
            return true; // Trial ativo e válido
        }
        
        // Se não está em trial, verificar se tem plano pago ativo
        if (account.getPlanType() == null) {
            return false; // Sem plano = sem acesso
        }
        
        // Verificar se o plano pago não expirou
        if (account.getPlanEndDate() != null && account.getPlanEndDate().isBefore(LocalDateTime.now())) {
            return false; // Plano pago expirado
        }
        
        return true; // Plano pago ativo
    }
    
    /**
     * Verifica se o endpoint é público e não precisa de verificação de assinatura
     */
    private boolean isPublicEndpoint(String requestURI) {
        // Endpoints públicos que não precisam de verificação de assinatura
        String[] publicPaths = {
            "/auth/",
            "/login",
            "/register",
            "/stripe/webhook",
            "/api/accounts/resolve-domain",
            "/properties/findAddress",
            "/properties/findAllFeatures",
            "/api/blog",
            "/webjars/",
            "/resources/",
            "/static/",
            "/images/",
            "/css/",
            "/js/",
            "/favicon.ico",
            "/ws/",
            "/socket/",
            "/actuator/"
        };
        
        for (String path : publicPaths) {
            if (requestURI.contains(path)) {
                return true;
            }
        }
        
        return false;
    }
}