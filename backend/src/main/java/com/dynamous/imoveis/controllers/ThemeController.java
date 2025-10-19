package com.dynamous.imoveis.controllers;

import com.dynamous.imoveis.dto.ThemeDTO;
import com.dynamous.imoveis.services.ThemeService;
import com.dynamous.imoveis.services.FileManagerService;
import com.dynamous.imoveis.services.AccountService;
import com.dynamous.imoveis.services.TenantService;
import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.entities.Tenant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.transaction.annotation.Transactional;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/themes")
public class ThemeController {

    @Autowired
    private ThemeService themeService;
    
    @Autowired
    private FileManagerService fileManagerService;
    
    @Autowired
    private AccountService accountService;
    
    @Autowired
    private TenantService tenantService;

    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<ThemeDTO> getThemeByTenant(@PathVariable Long tenantId) {
        ThemeDTO theme = themeService.findByTenantId(tenantId);
        return ResponseEntity.ok(theme);
    }
    
    @GetMapping("/account/{companyName}")
    public ResponseEntity<ThemeDTO> getThemeByCompanyName(@PathVariable String companyName) {
        try {
            System.out.println("Searching for account with companyName: " + companyName);
            Account account = accountService.findByCompanyName(companyName);
            System.out.println("Account found: " + account.getId());
            System.out.println("Number of tenants for account: " + account.getTenants().size());
            
            if (account.getTenants().isEmpty()) {
                System.out.println("No tenants found for account: " + companyName);
                throw new RuntimeException("No tenant found for account: " + companyName);
            }
            
            Long tenantId = account.getTenants().get(0).getId();
            System.out.println("Using tenant ID: " + tenantId);
            
            ThemeDTO theme = themeService.findByTenantId(tenantId);
            System.out.println("Theme found: " + theme.getName());
            
            return ResponseEntity.ok(theme);
        } catch (Exception e) {
            System.err.println("Error in getThemeByCompanyName: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @GetMapping("/account-id/{accountId}")
    @Transactional
    public ResponseEntity<ThemeDTO> getThemeByAccountId(@PathVariable Long accountId) {
        try {
            System.out.println("Searching for account with ID: " + accountId);
            Account account = accountService.find(accountId);
            System.out.println("Account found: " + account.getId());
            System.out.println("Number of tenants for account: " + account.getTenants().size());
            
            if (account.getTenants().isEmpty()) {
                System.out.println("No tenants found for account ID: " + accountId);
                throw new RuntimeException("No tenant found for account ID: " + accountId);
            }
            
            Long tenantId = account.getTenants().get(0).getId();
            System.out.println("Using tenant ID: " + tenantId);
            
            ThemeDTO theme = themeService.findByTenantId(tenantId);
            System.out.println("Theme found: " + theme.getName());
            
            return ResponseEntity.ok(theme);
        } catch (Exception e) {
            System.err.println("Error in getThemeByAccountId: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @GetMapping("/slug/{tenantSlug}")
    public ResponseEntity<ThemeDTO> getThemeByTenantSlug(@PathVariable String tenantSlug) {
        try {
            System.out.println("Searching for tenant with slug: " + tenantSlug);
            
            // Find tenant by slug, then get its account's companyName
            Tenant tenant = themeService.findTenantBySlug(tenantSlug);
            System.out.println("Tenant found: " + tenant.getId());
            
            Account account = tenant.getAccount();
            System.out.println("Account found: " + account.getId() + ", companyName: " + account.getCompanyName());
            
            // Now search by the account's companyName
            if (account.getTenants().isEmpty()) {
                System.out.println("No tenants found for account: " + account.getCompanyName());
                throw new RuntimeException("No tenant found for account: " + account.getCompanyName());
            }
            
            Long tenantId = account.getTenants().get(0).getId();
            System.out.println("Using tenant ID: " + tenantId);
            
            ThemeDTO theme = themeService.findByTenantId(tenantId);
            System.out.println("Theme found: " + theme.getName());
            
            return ResponseEntity.ok(theme);
        } catch (Exception e) {
            System.err.println("Error in getThemeByTenantSlug: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
    
    @GetMapping("/debug/accounts")
    public ResponseEntity<?> getAllAccounts() {
        try {
            System.out.println("Listing all accounts for debug...");
            accountService.findAll();
            return ResponseEntity.ok("Debug endpoint - check logs for account details");
        } catch (Exception e) {
            System.err.println("Error in debug endpoint: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
    
    @GetMapping("/theme-config/{clientSlug}")
    @Transactional
    public ResponseEntity<Map<String, Object>> getThemeConfig(@PathVariable String clientSlug) {
        try {
            System.out.println("=== getThemeConfig called with clientSlug: " + clientSlug + " ===");
            
            // Extrair o ID da Account do final do clientSlug (formato: companyName-accountId)
            String accountIdStr = "";
            String companyName = clientSlug;
            
            // Procurar por números no final da string após um hífen
            int lastHyphenIndex = clientSlug.lastIndexOf('-');
            if (lastHyphenIndex != -1 && lastHyphenIndex < clientSlug.length() - 1) {
                String possibleId = clientSlug.substring(lastHyphenIndex + 1);
                if (possibleId.matches("\\d+")) {
                    accountIdStr = possibleId;
                    companyName = clientSlug.substring(0, lastHyphenIndex);
                }
            }
            
            System.out.println("Parsed companyName: " + companyName + ", accountIdStr: " + accountIdStr);
            
            Long accountId = null;
            if (!accountIdStr.isEmpty()) {
                try {
                    accountId = Long.parseLong(accountIdStr);
                    System.out.println("Parsed accountId: " + accountId);
                } catch (NumberFormatException e) {
                    System.out.println("Failed to parse accountId: " + e.getMessage());
                }
            }
            
            Account account = null;
            
            // Primeiro tenta buscar por ID da Account
            if (accountId != null) {
                try {
                    System.out.println("Trying to find account by ID: " + accountId);
                    account = accountService.find(accountId);
                    System.out.println("Found account by ID: " + account.getId());
                } catch (Exception e) {
                    System.out.println("Failed to find account by ID: " + e.getMessage());
                }
            }
            
            // Se não encontrou por ID, tenta buscar por nome da empresa
            if (account == null) {
                try {
                    System.out.println("Trying to find account by company name: " + companyName);
                    account = accountService.findByCompanyName(companyName);
                    System.out.println("Found account by company name: " + account.getId());
                } catch (Exception e) {
                    System.out.println("Failed to find account by company name: " + e.getMessage());
                    // Se não encontrar por nome da empresa, tenta buscar por slug
                    try {
                        System.out.println("Trying to find tenant by slug: " + companyName);
                        Tenant tenant = themeService.findTenantBySlug(companyName);
                        account = tenant.getAccount();
                        System.out.println("Found account via tenant slug: " + account.getId());
                    } catch (Exception ex) {
                        System.out.println("Failed to find tenant by slug: " + ex.getMessage());
                        return ResponseEntity.notFound().build();
                    }
                }
            }
            
            // Buscar configuração do tema usando o primeiro tenant da account
            ThemeDTO themeConfig = null;
            if (account != null && !account.getTenants().isEmpty()) {
                Long firstTenantId = account.getTenants().get(0).getId();
                System.out.println("Using first tenant ID: " + firstTenantId);
                themeConfig = themeService.findByTenantId(firstTenantId);
                System.out.println("Found theme config: " + (themeConfig != null ? themeConfig.getName() : "null"));
            } else {
                System.out.println("Account is null or has no tenants");
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("themeConfig", themeConfig);
            response.put("account", account);
            
            System.out.println("=== getThemeConfig completed successfully ===");
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.err.println("=== ERROR in getThemeConfig ===");
            System.err.println("Error message: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    


    @PostMapping("/save-by-account/{accountId}")
    @Transactional
    public ResponseEntity<ThemeDTO> saveThemeByAccount(@PathVariable Long accountId, @RequestBody ThemeDTO themeDTO) {
        try {
            System.out.println("Saving theme for account ID: " + accountId);
            
            // Find account by ID
            Account account = accountService.find(accountId);
            System.out.println("Account found: " + account.getId());
            
            if (account.getTenants().isEmpty()) {
                System.out.println("No tenants found for account ID: " + accountId);
                throw new RuntimeException("No tenant found for account ID: " + accountId);
            }
            
            // Use the first tenant ID for saving
            Long tenantId = account.getTenants().get(0).getId();
            System.out.println("Using tenant ID for saving: " + tenantId);
            
            // Set the tenant ID in the DTO
            themeDTO.setTenantId(tenantId);
            
            // Save the theme
            ThemeDTO savedTheme = themeService.save(themeDTO);
            System.out.println("Theme saved successfully with ID: " + savedTheme.getId());
            
            return ResponseEntity.ok(savedTheme);
        } catch (Exception e) {
            System.err.println("Error in saveThemeByAccount: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<ThemeDTO> saveTheme(@RequestBody ThemeDTO themeDTO) {
        ThemeDTO savedTheme = themeService.save(themeDTO);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedTheme.getId())
                .toUri();
        return ResponseEntity.created(uri).body(savedTheme);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ThemeDTO> updateTheme(@PathVariable Long id, @RequestBody ThemeDTO themeDTO) {
        themeDTO.setId(id);
        ThemeDTO updatedTheme = themeService.save(themeDTO);
        return ResponseEntity.ok(updatedTheme);
    }
    
    @PostMapping("/upload-logo")
    public ResponseEntity<String> uploadLogo(@RequestParam("file") MultipartFile file) {
        try {
            URI logoUri = fileManagerService.uploadThemeLogo(file);
            
            // Automatically generate favicon from the uploaded logo
            String faviconUrl = null;
            try {
                faviconUrl = fileManagerService.generateFaviconFromLogo(file, 1L); // Use default accountId 1 for backward compatibility
                
                // Save favicon URL to theme for default account (accountId = 1)
                Account account = accountService.find(1L);
                if (account != null && !account.getTenants().isEmpty()) {
                    Long tenantId = account.getTenants().get(0).getId();
                    ThemeDTO themeDTO = themeService.findByTenantId(tenantId);
                    if (themeDTO != null) {
                        themeDTO.setFavicon(faviconUrl);
                        themeService.save(themeDTO);
                    }
                }
            } catch (Exception faviconError) {
                // Log the error but don't fail the logo upload
                System.err.println("Erro ao gerar favicon automaticamente: " + faviconError.getMessage());
            }
            
            return ResponseEntity.ok(logoUri.toString());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao fazer upload da logo: " + e.getMessage());
        }
    }
    
    @PostMapping("/upload-logo/{accountId}")
    public ResponseEntity<String> uploadLogoWithAccountId(@PathVariable Long accountId, @RequestParam("file") MultipartFile file) {
        try {
            URI logoUri = fileManagerService.uploadThemeLogo(file);
            
            // Automatically generate favicon from the uploaded logo with accountId
            String faviconUrl = null;
            try {
                faviconUrl = fileManagerService.generateFaviconFromLogo(file, accountId);
                
                // Save favicon URL to theme
                Account account = accountService.find(accountId);
                if (account != null && !account.getTenants().isEmpty()) {
                    Long tenantId = account.getTenants().get(0).getId();
                    ThemeDTO themeDTO = themeService.findByTenantId(tenantId);
                    if (themeDTO != null) {
                        themeDTO.setFavicon(faviconUrl);
                        themeService.save(themeDTO);
                    }
                }
            } catch (Exception faviconError) {
                // Log the error but don't fail the logo upload
                System.err.println("Erro ao gerar favicon automaticamente: " + faviconError.getMessage());
            }
            
            return ResponseEntity.ok(logoUri.toString());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao fazer upload da logo: " + e.getMessage());
        }
    }
    
    @PostMapping("/upload-banner")
    public ResponseEntity<String> uploadBanner(@RequestParam("file") MultipartFile file) {
        try {
            URI bannerUri = fileManagerService.uploadThemeBanner(file);
            return ResponseEntity.ok(bannerUri.toString());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao fazer upload do banner: " + e.getMessage());
        }
    }
    
    @PostMapping("/upload-agent-photo")
    public ResponseEntity<String> uploadAgentPhoto(@RequestParam("file") MultipartFile file) {
        try {
            URI agentPhotoUri = fileManagerService.uploadThemeAgentPhoto(file);
            return ResponseEntity.ok(agentPhotoUri.toString());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao fazer upload da foto do corretor: " + e.getMessage());
        }
    }
}