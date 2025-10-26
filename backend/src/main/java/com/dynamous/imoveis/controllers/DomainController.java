package com.dynamous.imoveis.controllers;

import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.services.AccountService;
import com.dynamous.imoveis.services.VercelDomainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/domains", produces = {MediaType.APPLICATION_JSON_VALUE})
public class DomainController {

    @Autowired
    private VercelDomainService vercelDomainService;
    
    @Autowired
    private AccountService accountService;
    
    /**
     * Adiciona um domínio personalizado para uma conta
     */
    @PostMapping("/custom/{accountId}")
    public ResponseEntity<Map<String, Object>> addCustomDomain(
            @PathVariable Long accountId, 
            @RequestBody Map<String, String> request) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            String customDomain = request.get("domain");
            
            if (customDomain == null || customDomain.trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Domínio não pode estar vazio");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Buscar a conta
            Account account = accountService.find(accountId);
            
            // Adicionar domínio na Vercel
            boolean domainAdded = vercelDomainService.addCustomDomain(customDomain);
            
            if (domainAdded) {
                // Atualizar a conta com o domínio personalizado
                account.setCustomDomain(customDomain);
                accountService.update(account);
                
                response.put("success", true);
                response.put("message", "Domínio personalizado adicionado com sucesso");
                response.put("domain", customDomain);
                
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "Falha ao adicionar domínio na Vercel");
                return ResponseEntity.internalServerError().body(response);
            }
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Erro interno: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    /**
     * Verifica o status de um domínio
     */
    @PostMapping("/verify/{accountId}")
    public ResponseEntity<Map<String, Object>> verifyDomain(
            @PathVariable Long accountId,
            @RequestBody Map<String, String> request) {
        
        try {
            String domain = request.get("domain");
            
            if (domain == null || domain.trim().isEmpty()) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Domínio não pode estar vazio");
                return ResponseEntity.badRequest().body(response);
            }
            
            Map<String, Object> verificationResult = vercelDomainService.verifyDomain(domain);
            return ResponseEntity.ok(verificationResult);
            
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Erro ao verificar domínio: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    /**
     * Remove um domínio personalizado
     */
    @DeleteMapping("/custom/{accountId}")
    public ResponseEntity<Map<String, Object>> removeCustomDomain(
            @PathVariable Long accountId,
            @RequestBody Map<String, String> request) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            String domain = request.get("domain");
            
            if (domain == null || domain.trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Domínio não pode estar vazio");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Buscar a conta
            Account account = accountService.find(accountId);
            
            // Remover domínio da Vercel
            boolean domainRemoved = vercelDomainService.removeDomain(domain);
            
            if (domainRemoved) {
                // Remover domínio personalizado da conta
                account.setCustomDomain(null);
                accountService.update(account);
                
                response.put("success", true);
                response.put("message", "Domínio personalizado removido com sucesso");
                
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "Falha ao remover domínio da Vercel");
                return ResponseEntity.internalServerError().body(response);
            }
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Erro interno: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    /**
     * Lista todos os domínios do projeto
     */
    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> listDomains() {
        try {
            Map<String, Object> domains = vercelDomainService.listDomains();
            return ResponseEntity.ok(domains);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Erro ao listar domínios: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    /**
     * Obtém informações de domínio de uma conta
     */
    @GetMapping("/info/{accountId}")
    public ResponseEntity<Map<String, Object>> getDomainInfo(@PathVariable Long accountId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Account account = accountService.find(accountId);
            
            response.put("success", true);
            response.put("subdomain", account.getDomain());
            response.put("customDomain", account.getCustomDomain());
            response.put("companyName", account.getCompanyName());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Erro ao buscar informações da conta: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }
}