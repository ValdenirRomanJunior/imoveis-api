package com.dynamous.imoveis.controllers;

import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.security.UserSS;
import com.dynamous.imoveis.services.AccountService;
import com.dynamous.imoveis.services.TenantService;
import com.dynamous.imoveis.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/account", produces = {MediaType.APPLICATION_JSON_VALUE})
public class AccountController {

    @Autowired
    private AccountService accountService;
    
    @Autowired
    private TenantService tenantService;

    /**
     * Obtém informações da conta atual do tenant autenticado
     */
    @PreAuthorize("hasAnyRole('TENANT')")
    @GetMapping("/current")
    public ResponseEntity<Map<String, Object>> getCurrentAccount() {
        try {
            UserSS user = UserService.authenticated();
            Tenant tenant = tenantService.find(user.getId());
            Account account = accountService.find(tenant.getAccount().getId());

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("accountId", account.getId());
            response.put("companyName", account.getCompanyName());
            response.put("cpf", account.getCpf());
            response.put("email", account.getEmail());
            response.put("phone", account.getPhone());
            response.put("country", account.getCountry());
            response.put("state", account.getState());
            response.put("city", account.getCity());
            response.put("neighborhood", account.getNeighborhood());
            response.put("street", account.getStreet());
            response.put("number", account.getNumber());
            response.put("cep", account.getCep());
            response.put("domain", account.getDomain());
            response.put("customDomain", account.getCustomDomain());

            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Erro ao buscar informações da conta: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Atualiza informações da conta atual do tenant autenticado
     */
    @PreAuthorize("hasAnyRole('TENANT')")
    @PutMapping("/current")
    public ResponseEntity<Map<String, Object>> updateCurrentAccount(@RequestBody Map<String, String> updates) {
        try {
            UserSS user = UserService.authenticated();
            Tenant tenant = tenantService.find(user.getId());
            Account account = accountService.find(tenant.getAccount().getId());

            // Atualizar campos se fornecidos
            if (updates.containsKey("email")) {
                account.setEmail(updates.get("email"));
            }
            if (updates.containsKey("phone")) {
                account.setPhone(updates.get("phone"));
            }
            if (updates.containsKey("country")) {
                account.setCountry(updates.get("country"));
            }
            if (updates.containsKey("state")) {
                account.setState(updates.get("state"));
            }
            if (updates.containsKey("city")) {
                account.setCity(updates.get("city"));
            }
            if (updates.containsKey("neighborhood")) {
                account.setNeighborhood(updates.get("neighborhood"));
            }
            if (updates.containsKey("street")) {
                account.setStreet(updates.get("street"));
            }
            if (updates.containsKey("number")) {
                account.setNumber(updates.get("number"));
            }
            if (updates.containsKey("cep")) {
                account.setCep(updates.get("cep"));
            }

            // Salvar as alterações
            accountService.update(account);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Conta atualizada com sucesso");
            response.put("accountId", account.getId());

            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Erro ao atualizar conta: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }
}