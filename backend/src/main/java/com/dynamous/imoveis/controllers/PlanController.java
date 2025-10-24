package com.dynamous.imoveis.controllers;

import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.enums.PlanType;
import com.dynamous.imoveis.services.AccountService;
import com.dynamous.imoveis.services.TenantService;
import com.dynamous.imoveis.security.UserSS;
import com.dynamous.imoveis.services.UserService;
import com.dynamous.imoveis.entities.Tenant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/plans", produces = {MediaType.APPLICATION_JSON_VALUE})
public class PlanController {

    @Autowired
    private AccountService accountService;
    
    @Autowired
    private TenantService tenantService;

    /**
     * Lista todos os planos disponíveis
     */
    @GetMapping("/available")
    public ResponseEntity<List<Map<String, Object>>> getAvailablePlans() {
        List<Map<String, Object>> plans = Arrays.stream(PlanType.values())
            .map(planType -> {
                Map<String, Object> planInfo = new HashMap<>();
                planInfo.put("code", planType.getCode());
                planInfo.put("name", planType.getName());
                planInfo.put("description", planType.getDescription());
                planInfo.put("price", planType.getPrice());
                planInfo.put("durationDays", planType.getDurationDays());
                planInfo.put("isTrial", planType.getIsTrial());
                return planInfo;
            })
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(plans);
    }

    /**
     * Obtém o plano atual da conta do usuário logado
     */
    @PreAuthorize("hasAnyRole('TENANT')")
    @GetMapping("/current")
    public ResponseEntity<Map<String, Object>> getCurrentPlan() {
        UserSS user = UserService.authenticated();
        Tenant tenant = tenantService.find(user.getId());
        Account account = accountService.find(tenant.getAccount().getId());
        
        Map<String, Object> response = new HashMap<>();
        
        // Determina se a conta já teve uma assinatura (não trial)
        boolean hasHadSubscription = false;
        if (account.getPlanType() != null && account.getPlanStartDate() != null) {
            // Se tem um plano que não é trial ou se já teve um plano pago anteriormente
            hasHadSubscription = !account.getPlanType().getIsTrial() || 
                                (account.getPlanEndDate() != null && !account.getIsTrialActive());
        }
        
        if (account.getPlanType() != null) {
            response.put("planType", account.getPlanType());
            response.put("planName", account.getPlanType().getName());
            response.put("planDescription", account.getPlanType().getDescription());
            response.put("planPrice", account.getPlanType().getPrice());
            // Converter LocalDateTime para ISO string para compatibilidade com JavaScript
            response.put("planStartDate", account.getPlanStartDate() != null ? account.getPlanStartDate().toString() : null);
            response.put("planEndDate", account.getPlanEndDate() != null ? account.getPlanEndDate().toString() : null);
            response.put("isTrialActive", account.getIsTrialActive());
            response.put("isPlanActive", account.isPlanActive());
            response.put("isInTrialPeriod", account.isInTrialPeriod());
            response.put("hasHadSubscription", hasHadSubscription);
        } else {
            response.put("planType", null);
            response.put("message", "Nenhum plano ativo");
            response.put("hasHadSubscription", hasHadSubscription);
        }
        
        return ResponseEntity.ok(response);
    }

    /**
     * Obtém informações do plano de uma conta específica (para uso interno/admin)
     */
    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping("/account/{accountId}")
    public ResponseEntity<Map<String, Object>> getAccountPlan(@PathVariable Long accountId) {
        Account account = accountService.find(accountId);
        
        Map<String, Object> response = new HashMap<>();
        
        if (account.getPlanType() != null) {
            response.put("accountId", account.getId());
            response.put("companyName", account.getCompanyName());
            response.put("planType", account.getPlanType());
            response.put("planName", account.getPlanType().getName());
            // Converter LocalDateTime para ISO string para compatibilidade com JavaScript
            response.put("planStartDate", account.getPlanStartDate() != null ? account.getPlanStartDate().toString() : null);
            response.put("planEndDate", account.getPlanEndDate() != null ? account.getPlanEndDate().toString() : null);
            response.put("isTrialActive", account.getIsTrialActive());
            response.put("isPlanActive", account.isPlanActive());
            response.put("isInTrialPeriod", account.isInTrialPeriod());
        } else {
            response.put("accountId", account.getId());
            response.put("companyName", account.getCompanyName());
            response.put("planType", null);
            response.put("message", "Nenhum plano ativo");
        }
        
        return ResponseEntity.ok(response);
    }
}