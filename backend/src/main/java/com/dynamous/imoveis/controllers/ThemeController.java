package com.dynamous.imoveis.controllers;

import com.dynamous.imoveis.dto.ThemeDTO;
import com.dynamous.imoveis.services.ThemeService;
import com.dynamous.imoveis.services.FileManagerService;
import com.dynamous.imoveis.services.AccountService;
import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.entities.Tenant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/themes")
public class ThemeController {

    @Autowired
    private ThemeService themeService;
    
    @Autowired
    private FileManagerService fileManagerService;
    
    @Autowired
    private AccountService accountService;

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