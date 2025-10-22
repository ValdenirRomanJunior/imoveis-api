package com.dynamous.imoveis.services;

import com.dynamous.imoveis.dto.ThemeDTO;
import com.dynamous.imoveis.entities.Theme;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.repositories.ThemeRepository;
import com.dynamous.imoveis.repositories.TenantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

@Service
public class ThemeService {

    @Autowired
    private ThemeRepository themeRepository;

    @Autowired
    private TenantRepository tenantRepository;
    
    @Autowired
    private AccountService accountService;
    
    public Tenant findTenantBySlug(String slug) {
        Optional<Tenant> tenant = tenantRepository.findBySlug(slug);
        return tenant.orElseThrow(() -> new EntityNotFoundException("Tenant not found with slug: " + slug));
    }
    


    @Transactional
    public ThemeDTO findByTenantId(Long tenantId) {
        Optional<Theme> theme = themeRepository.findByTenantId(tenantId);
        if (theme.isPresent()) {
            return new ThemeDTO(theme.get());
        }
        // Create and save default theme if not found
        return createAndSaveDefaultTheme(tenantId);
    }

    @Transactional
    public ThemeDTO save(ThemeDTO themeDTO) {
        Tenant tenant = tenantRepository.findById(themeDTO.getTenantId())
                .orElseThrow(() -> new EntityNotFoundException("Tenant not found"));

        Theme theme;
        Optional<Theme> existingTheme = themeRepository.findByTenantId(themeDTO.getTenantId());
        
        if (existingTheme.isPresent()) {
            theme = existingTheme.get();
        } else {
            theme = new Theme();
            theme.setTenant(tenant);
        }
        
        // Set ID if provided in DTO
        if (themeDTO.getId() != null) {
            theme.setId(themeDTO.getId());
        }

        // Update theme properties
        theme.setName(themeDTO.getName());
        theme.setMainColor(themeDTO.getMainColor());
        
        // Logo and branding
        theme.setLogo(themeDTO.getLogo());
        theme.setLogoSize(themeDTO.getLogoSize());
        
        // Menu and navigation
        theme.setMenuLinks(themeDTO.getMenuLinks());
        theme.setPhone(themeDTO.getPhone());
        
        // Banner configuration
        theme.setBannerImage(themeDTO.getBannerImage());
        theme.setBannerColor(themeDTO.getBannerColor());
        theme.setBannerTitle(themeDTO.getBannerTitle());
        theme.setBannerTitleColor(themeDTO.getBannerTitleColor());
        theme.setBannerTitleSize(themeDTO.getBannerTitleSize());
        
        // Services configuration
        theme.setServices(themeDTO.getServices());
        
        // Contact and agent info
        theme.setContactTitle(themeDTO.getContactTitle());
        theme.setContactImage(themeDTO.getContactImage());
        theme.setAgentPhoto(themeDTO.getAgentPhoto());
        theme.setAgentQuote(themeDTO.getAgentQuote());
        theme.setAgentName(themeDTO.getAgentName());
        
        // Footer configuration
        theme.setFooterLogo(themeDTO.getFooterLogo());
        theme.setSocialLinks(themeDTO.getSocialLinks());
        theme.setFooterText(themeDTO.getFooterText());
        theme.setFooterBackgroundColor(themeDTO.getFooterBackgroundColor());
        
        // Color scheme
        theme.setTextColor(themeDTO.getTextColor());
        theme.setButtonColor(themeDTO.getButtonColor());
        theme.setH2Color(themeDTO.getH2Color());
        theme.setH3Color(themeDTO.getH3Color());
        
        // Legal pages
        theme.setPrivacyPolicy(themeDTO.getPrivacyPolicy());
        theme.setAboutUs(themeDTO.getAboutUs());
        
        // SEO and Marketing
        theme.setFacebookPixel(themeDTO.getFacebookPixel());
        theme.setSeoKeywords(themeDTO.getSeoKeywords());
        theme.setSiteTitle(themeDTO.getSiteTitle());
        
        // Favicon
        if (themeDTO.getFavicon() != null && !themeDTO.getFavicon().isEmpty()) {
            theme.setFavicon(themeDTO.getFavicon());
        }
        
        theme.setCustomDomain(themeDTO.getCustomDomain());
        theme = themeRepository.save(theme);
        themeRepository.flush(); // Force immediate persistence to database
        
        return new ThemeDTO(theme);
    }

    private ThemeDTO createAndSaveDefaultTheme(Long tenantId) {
        Tenant tenant = tenantRepository.findById(tenantId)
                .orElseThrow(() -> new EntityNotFoundException("Tenant not found"));
        
        Theme theme = new Theme();
        theme.setTenant(tenant);
        theme.setName("Tema Padrão");
        theme.setMainColor("#2563eb");
        
        // Set default values for all fields
        theme.setLogo("");
        theme.setLogoSize("medium");
        theme.setMenuLinks("[{\"label\":\"Início\",\"url\":\"/\"},{\"label\":\"Imóveis\",\"url\":\"/imoveis\"},{\"label\":\"Contato\",\"url\":\"/contato\"}]");
        theme.setPhone("(85) 9999-6895");
        theme.setBannerImage("");
        theme.setBannerColor("#f8fafc");
        theme.setBannerTitle("Sempre entregando o imóvel do seu sonho.");
        theme.setBannerTitleColor("#ffffff");
        theme.setBannerTitleSize(48);
        theme.setServices("[{\"icon\":\"home\",\"title\":\"Venda de Imóveis\",\"description\":\"Encontre o imóvel perfeito para você\",\"active\":true},{\"icon\":\"key\",\"title\":\"Locação\",\"description\":\"Alugue com segurança e praticidade\",\"active\":true},{\"icon\":\"calculator\",\"title\":\"Financiamento\",\"description\":\"Facilitamos seu financiamento\",\"active\":true}]");
        theme.setContactTitle("Entre em contato conosco");
        theme.setContactImage("");
        theme.setAgentPhoto("");
        theme.setAgentQuote("Mais de 10 anos ajudando pessoas a encontrar o lar dos seus sonhos.");
        theme.setAgentName("João Silva");
        theme.setFooterLogo("");
        theme.setSocialLinks("{\"facebook\":\"#\",\"instagram\":\"#\",\"whatsapp\":\"#\"}");
        theme.setFooterText("© 2024 Imobiliária. Todos os direitos reservados.");
        theme.setFooterBackgroundColor("#1f2937");
        theme.setTextColor("#2563eb");
        theme.setButtonColor("#64748b");
        theme.setH2Color("#1f2937");
        theme.setH3Color("#374151");
        theme.setPrivacyPolicy("Política de privacidade padrão.");
        theme.setAboutUs("Sobre nós padrão.");
        theme.setFacebookPixel("");
        theme.setSeoKeywords("");
        theme.setSiteTitle("Imobiliária - Encontre seu imóvel");
        
        theme = themeRepository.save(theme);
        return new ThemeDTO(theme);
    }
    

}