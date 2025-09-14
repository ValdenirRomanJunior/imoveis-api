package com.dynamous.imoveis.controllers;

import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.services.AccountService;
import com.dynamous.imoveis.services.NetlifyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/accounts", produces = {MediaType.APPLICATION_JSON_VALUE})
public class CustomDomainController {

    @Autowired
    private AccountService accountService;
    
    @Autowired
    private NetlifyService netlifyService;

    @GetMapping("/resolve-domain/{domain}")
    public ResponseEntity<?> resolveDomain(@PathVariable String domain) {
        try {
            Optional<Account> account = accountService.findByCustomDomain(domain);
            if (account.isPresent()) {
                Map<String, String> response = new HashMap<>();
                response.put("slug", account.get().getCompanyName());
                response.put("accountId", account.get().getId().toString());
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error resolving domain: " + e.getMessage());
        }
    }

    @PostMapping("/custom-domain/{accountId}")
    public ResponseEntity<?> setCustomDomain(@PathVariable Long accountId, @RequestBody Map<String, String> request) {
        try {
            String customDomain = request.get("customDomain");
            Account account = accountService.find(accountId);
            
            // Integração com Netlify API
            if (netlifyService.isConfigured()) {
                try {
                    String siteId = account.getNetlifySiteId();
                    
                    // Criar site na Netlify se não existir
                    if (siteId == null || siteId.isEmpty()) {
                        Map<String, Object> siteResponse = netlifyService.createSite(
                            account.getCompanyName() + "-site", 
                            customDomain
                        );
                        siteId = siteResponse.get("id").toString();
                        account.setNetlifySiteId(siteId);
                    }
                    
                    // Adicionar domínio customizado
                    netlifyService.addCustomDomain(siteId, customDomain);
                    
                    // Ativar SSL
                    netlifyService.activateSSL(siteId, customDomain);
                    
                } catch (Exception e) {
                    // Log do erro mas não falha a operação principal
                    System.err.println("Erro na integração com Netlify: " + e.getMessage());
                }
            }
            
            account.setCustomDomain(customDomain);
            accountService.update(account);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Custom domain configured successfully");
            response.put("customDomain", customDomain);
            if (netlifyService.isConfigured()) {
                response.put("netlifyIntegration", "enabled");
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error setting custom domain: " + e.getMessage());
        }
    }

    @DeleteMapping("/custom-domain/{accountId}")
    public ResponseEntity<?> removeCustomDomain(@PathVariable Long accountId) {
        try {
            Account account = accountService.find(accountId);
            String customDomain = account.getCustomDomain();
            String siteId = account.getNetlifySiteId();
            
            // Integração com Netlify API
            if (netlifyService.isConfigured() && customDomain != null && siteId != null) {
                try {
                    // Remover domínio da Netlify
                    netlifyService.removeDomain(siteId, customDomain);
                } catch (Exception e) {
                    // Log do erro mas não falha a operação principal
                    System.err.println("Erro ao remover domínio da Netlify: " + e.getMessage());
                }
            }
            
            account.setCustomDomain(null);
            accountService.update(account);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Custom domain removed successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error removing custom domain: " + e.getMessage());
        }
    }

    @GetMapping("/custom-domain/{accountId}")
    public ResponseEntity<?> getCustomDomain(@PathVariable Long accountId) {
        try {
            Account account = accountService.find(accountId);
            Map<String, String> response = new HashMap<>();
            response.put("customDomain", account.getCustomDomain());
            response.put("netlifySiteId", account.getNetlifySiteId());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error getting custom domain: " + e.getMessage());
        }
    }
    
    @PostMapping("/netlify/create-site/{accountId}")
    public ResponseEntity<?> createNetlifySite(@PathVariable Long accountId, @RequestBody Map<String, String> request) {
        try {
            if (!netlifyService.isConfigured()) {
                return ResponseEntity.status(400).body("Netlify API not configured");
            }
            
            Account account = accountService.find(accountId);
            String siteName = request.getOrDefault("siteName", account.getCompanyName() + "-site");
            String repoUrl = request.get("repoUrl");
            
            Map<String, Object> siteResponse = netlifyService.createSite(siteName, repoUrl);
            String siteId = siteResponse.get("id").toString();
            
            account.setNetlifySiteId(siteId);
            accountService.update(account);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Netlify site created successfully");
            response.put("siteId", siteId);
            response.put("siteUrl", siteResponse.get("url"));
            response.put("adminUrl", siteResponse.get("admin_url"));
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating Netlify site: " + e.getMessage());
        }
    }
    
    @PostMapping("/netlify/ssl/{accountId}")
    public ResponseEntity<?> activateSSL(@PathVariable Long accountId, @RequestBody Map<String, String> request) {
        try {
            if (!netlifyService.isConfigured()) {
                return ResponseEntity.status(400).body("Netlify API not configured");
            }
            
            Account account = accountService.find(accountId);
            String siteId = account.getNetlifySiteId();
            String domain = request.get("domain");
            
            if (siteId == null || siteId.isEmpty()) {
                return ResponseEntity.status(400).body("No Netlify site associated with this account");
            }
            
            String sslResult = netlifyService.activateSSL(siteId);
            boolean sslActivated = sslResult != null && !sslResult.isEmpty();
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", sslActivated ? "SSL activated successfully" : "SSL activation failed");
            response.put("sslActivated", sslActivated);
            response.put("sslResult", sslResult);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error activating SSL: " + e.getMessage());
        }
    }
    
    @GetMapping("/netlify/dns-status/{accountId}")
    public ResponseEntity<?> checkDNSStatus(@PathVariable Long accountId) {
        try {
            if (!netlifyService.isConfigured()) {
                return ResponseEntity.status(400).body("Netlify API not configured");
            }
            
            Account account = accountService.find(accountId);
            String siteId = account.getNetlifySiteId();
            String customDomain = account.getCustomDomain();
            
            if (siteId == null || customDomain == null) {
                return ResponseEntity.status(400).body("No Netlify site or custom domain configured");
            }
            
            Map<String, Object> dnsStatus = netlifyService.checkDNSStatus(siteId, customDomain);
            
            return ResponseEntity.ok(dnsStatus);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error checking DNS status: " + e.getMessage());
        }
    }
}