package com.dynamous.imoveis.controllers;

import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.entities.UserAdmin;
import com.dynamous.imoveis.enums.Perfil;
import com.dynamous.imoveis.repositories.TenantRepository;
import com.dynamous.imoveis.repositories.UserAdminRepository;
import com.dynamous.imoveis.security.UserSS;
import com.dynamous.imoveis.services.UserService;
import com.dynamous.imoveis.services.UserTenantService;
import com.dynamous.imoveis.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/user", produces = {MediaType.APPLICATION_JSON_VALUE})
public class UserController {

    @Autowired
    private TenantRepository tenantRepository;

    @Autowired
    private UserAdminRepository userAdminRepository;

    @Autowired
    private UserTenantService tenantService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private AuthService authService;

    /**
     * Atualiza campos do perfil do usuário (slug, email, creci)
     */
    @PreAuthorize("hasAnyRole('TENANT', 'ADMIN')")
    @PutMapping("/update-profile")
    public ResponseEntity<Map<String, Object>> updateProfile(@RequestBody Map<String, String> updates) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            UserSS user = UserService.authenticated();
            String email = user.getUsername();
            
            // Verificar se é admin ou tenant
            if (email.equals("admin@outlook.com")) {
                UserAdmin userAdmin = userAdminRepository.findByEmail(email);
                if (userAdmin == null) {
                    response.put("success", false);
                    response.put("message", "Usuário não encontrado");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                }
                
                // Atualizar campos do admin
                if (updates.containsKey("slug")) {
                    userAdmin.setSlug(updates.get("slug"));
                }
                if (updates.containsKey("email")) {
                    String newEmail = updates.get("email");
                    // Verificar se email já existe
                    if (!newEmail.equals(userAdmin.getEmail()) && 
                        (tenantRepository.findByEmail(newEmail) != null || 
                         userAdminRepository.findByEmail(newEmail) != null)) {
                        response.put("success", false);
                        response.put("message", "Este email já está em uso");
                        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
                    }
                    userAdmin.setEmail(newEmail);
                }
                if (updates.containsKey("creci")) {
                    userAdmin.setCreci(updates.get("creci"));
                }
                
                userAdminRepository.save(userAdmin);
                
            } else {
                Tenant tenant = tenantRepository.findByEmail(email);
                if (tenant == null) {
                    response.put("success", false);
                    response.put("message", "Usuário não encontrado");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                }
                
                // Atualizar campos do tenant
                if (updates.containsKey("slug")) {
                    tenant.setSlug(updates.get("slug"));
                }
                if (updates.containsKey("email")) {
                    String newEmail = updates.get("email");
                    // Verificar se email já existe
                    if (!newEmail.equals(tenant.getEmail()) && 
                        (tenantRepository.findByEmail(newEmail) != null || 
                         userAdminRepository.findByEmail(newEmail) != null)) {
                        response.put("success", false);
                        response.put("message", "Este email já está em uso");
                        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
                    }
                    tenant.setEmail(newEmail);
                }
                if (updates.containsKey("creci")) {
                    tenant.setCreci(updates.get("creci"));
                }
                if (updates.containsKey("phone")) {
                    tenant.setPhone(updates.get("phone"));
                }
                
                tenantRepository.save(tenant);
            }
            
            response.put("success", true);
            response.put("message", "Perfil atualizado com sucesso");
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Erro interno do servidor: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Altera a senha do usuário
     */
    @PreAuthorize("hasAnyRole('TENANT', 'ADMIN')")
    @PutMapping("/change-password")
    public ResponseEntity<Map<String, Object>> changePassword(@RequestBody Map<String, String> passwordData) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            UserSS user = UserService.authenticated();
            String email = user.getUsername();
            String newPassword = passwordData.get("newPassword");
            
            if (newPassword == null) {
                response.put("success", false);
                response.put("message", "Nova senha é obrigatória");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Validação de senha mínima de 8 caracteres
            if (newPassword.length() < 8) {
                response.put("success", false);
                response.put("message", "A nova senha deve ter pelo menos 8 caracteres");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Verificar se é admin ou tenant
            if (email.equals("admin@outlook.com")) {
                UserAdmin userAdmin = userAdminRepository.findByEmail(email);
                if (userAdmin == null) {
                    response.put("success", false);
                    response.put("message", "Usuário não encontrado");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                }
                
                // Atualizar senha
                userAdmin.setPassword(passwordEncoder.encode(newPassword));
                userAdminRepository.save(userAdmin);
                
            } else {
                Tenant tenant = tenantRepository.findByEmail(email);
                if (tenant == null) {
                    response.put("success", false);
                    response.put("message", "Usuário não encontrado");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                }
                
                // Atualizar senha
                tenant.setPassword(passwordEncoder.encode(newPassword));
                tenantRepository.save(tenant);
            }
            
            response.put("success", true);
            response.put("message", "Senha alterada com sucesso");
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Erro interno do servidor: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Envia nova senha por email (recuperação de senha)
     */
    @PreAuthorize("hasAnyRole('TENANT', 'ADMIN')")
    @PostMapping("/recover-password")
    public ResponseEntity<Map<String, Object>> recoverPassword() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            UserSS user = UserService.authenticated();
            String email = user.getUsername();
            
            // Usar o serviço de autenticação para enviar nova senha
            authService.sendNewPassword(new com.dynamous.imoveis.dto.EmailDTO(email));
            
            response.put("success", true);
            response.put("message", "Nova senha enviada para o seu email");
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Erro ao enviar nova senha: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}