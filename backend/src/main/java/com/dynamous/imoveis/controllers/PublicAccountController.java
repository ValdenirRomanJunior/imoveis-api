package com.dynamous.imoveis.controllers;

import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/accounts", produces = {MediaType.APPLICATION_JSON_VALUE})
@CrossOrigin(origins = "*")
public class PublicAccountController {

    @Autowired
    private AccountService accountService;

    /**
     * Resolve um domínio personalizado (host) para o tenantSlug e metadados
     * Endpoint público, usado pelo frontend SubdomainRouter em domínios personalizados
     */
    @GetMapping("/resolve-domain/{domain}")
    public ResponseEntity<Map<String, Object>> resolveDomain(@PathVariable String domain) {
        Map<String, Object> response = new HashMap<>();

        try {
            Optional<Account> optionalAccount = accountService.findByCustomDomainWithTenants(domain);
            if (optionalAccount.isEmpty()) {
                response.put("success", false);
                response.put("message", "Domínio não encontrado");
                return ResponseEntity.status(404).body(response);
            }

            Account account = optionalAccount.get();
            if (account.getTenants() == null || account.getTenants().isEmpty()) {
                response.put("success", false);
                response.put("message", "Nenhum tenant associado à conta para este domínio");
                return ResponseEntity.status(404).body(response);
            }

            Tenant tenant = account.getTenants().get(0);

            response.put("success", true);
            response.put("tenantSlug", tenant.getSlug());
            response.put("companyName", account.getCompanyName());
            response.put("accountId", account.getId());
            response.put("customDomain", account.getCustomDomain());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Erro interno: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }
}