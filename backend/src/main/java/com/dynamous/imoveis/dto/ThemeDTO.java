package com.dynamous.imoveis.dto;

import com.dynamous.imoveis.entities.Theme;

public class ThemeDTO {
    private Long id;
    private String name;
    private String mainColor;
    private Long tenantId;
    
    // Logo and branding
    private String logo;
    private String logoSize;
    
    // Menu and navigation
    private String menuLinks; // JSON string
    private String phone;
    
    // Banner configuration
    private String bannerImage;
    private String bannerColor;
    private String bannerTitle;
    private String bannerTitleColor;
    private Integer bannerTitleSize;
    
    // Services configuration
    private String services; // JSON string
    
    // Contact and agent info
    private String contactTitle;
    private String contactImage;
    private String agentPhoto;
    private String agentQuote;
    private String agentName;
    
    // Footer configuration
    private String footerLogo;
    private String socialLinks; // JSON string
    private String footerText;
    private String footerBackgroundColor;
    
    // Color scheme
    private String textColor;
    private String buttonColor;
    private String h2Color;
    private String h3Color;
    
    // Legal pages
    private String privacyPolicy;
    private String aboutUs;
    
    // SEO and Marketing
    private String customDomain;
    private String facebookPixel;
    private String seoKeywords;
    private String favicon;

    public ThemeDTO() {}

    public ThemeDTO(Theme theme) {
        this.id = theme.getId();
        this.name = theme.getName();
        this.mainColor = theme.getMainColor();
        this.tenantId = theme.getTenant() != null ? theme.getTenant().getId() : null;
        
        // Logo and branding
        this.logo = theme.getLogo();
        this.logoSize = theme.getLogoSize();
        
        // Menu and navigation
        this.menuLinks = theme.getMenuLinks();
        this.phone = theme.getPhone();
        
        // Banner configuration
        this.bannerImage = theme.getBannerImage();
        this.bannerColor = theme.getBannerColor();
        this.bannerTitle = theme.getBannerTitle();
        this.bannerTitleColor = theme.getBannerTitleColor();
        this.bannerTitleSize = theme.getBannerTitleSize();
        
        // Services configuration
        this.services = theme.getServices();
        
        // Contact and agent info
        this.contactTitle = theme.getContactTitle();
        this.contactImage = theme.getContactImage();
        this.agentPhoto = theme.getAgentPhoto();
        this.agentQuote = theme.getAgentQuote();
        this.agentName = theme.getAgentName();
        
        // Footer configuration
        this.footerLogo = theme.getFooterLogo();
        this.socialLinks = theme.getSocialLinks();
        this.footerText = theme.getFooterText();
        this.footerBackgroundColor = theme.getFooterBackgroundColor();
        
        // Color scheme
        this.textColor = theme.getTextColor();
        this.buttonColor = theme.getButtonColor();
        this.h2Color = theme.getH2Color();
        this.h3Color = theme.getH3Color();
        
        // Legal pages
        this.privacyPolicy = theme.getPrivacyPolicy();
        this.aboutUs = theme.getAboutUs();
        
        // SEO and Marketing
        this.customDomain = theme.getCustomDomain();
        this.facebookPixel = theme.getFacebookPixel();
        this.seoKeywords = theme.getSeoKeywords();
        this.favicon = theme.getFavicon();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMainColor() {
        return mainColor;
    }

    public void setMainColor(String mainColor) {
        this.mainColor = mainColor;
    }

    public Long getTenantId() {
        return tenantId;
    }

    public void setTenantId(Long tenantId) {
        this.tenantId = tenantId;
    }

    // Logo and branding getters/setters
    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getLogoSize() {
        return logoSize;
    }

    public void setLogoSize(String logoSize) {
        this.logoSize = logoSize;
    }

    // Menu and navigation getters/setters
    public String getMenuLinks() {
        return menuLinks;
    }

    public void setMenuLinks(String menuLinks) {
        this.menuLinks = menuLinks;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    // Banner configuration getters/setters
    public String getBannerImage() {
        return bannerImage;
    }

    public void setBannerImage(String bannerImage) {
        this.bannerImage = bannerImage;
    }

    public String getBannerColor() {
        return bannerColor;
    }

    public void setBannerColor(String bannerColor) {
        this.bannerColor = bannerColor;
    }

    public String getBannerTitle() {
        return bannerTitle;
    }

    public void setBannerTitle(String bannerTitle) {
        this.bannerTitle = bannerTitle;
    }

    public String getBannerTitleColor() {
        return bannerTitleColor;
    }

    public void setBannerTitleColor(String bannerTitleColor) {
        this.bannerTitleColor = bannerTitleColor;
    }

    public Integer getBannerTitleSize() {
        return bannerTitleSize;
    }

    public void setBannerTitleSize(Integer bannerTitleSize) {
        this.bannerTitleSize = bannerTitleSize;
    }

    // Services configuration getters/setters
    public String getServices() {
        return services;
    }

    public void setServices(String services) {
        this.services = services;
    }

    // Contact and agent info getters/setters
    public String getContactTitle() {
        return contactTitle;
    }

    public void setContactTitle(String contactTitle) {
        this.contactTitle = contactTitle;
    }

    public String getContactImage() {
        return contactImage;
    }

    public void setContactImage(String contactImage) {
        this.contactImage = contactImage;
    }

    public String getAgentPhoto() {
        return agentPhoto;
    }

    public void setAgentPhoto(String agentPhoto) {
        this.agentPhoto = agentPhoto;
    }

    public String getAgentQuote() {
        return agentQuote;
    }

    public void setAgentQuote(String agentQuote) {
        this.agentQuote = agentQuote;
    }

    public String getAgentName() {
        return agentName;
    }

    public void setAgentName(String agentName) {
        this.agentName = agentName;
    }

    // Footer configuration getters/setters
    public String getFooterLogo() {
        return footerLogo;
    }

    public void setFooterLogo(String footerLogo) {
        this.footerLogo = footerLogo;
    }

    public String getSocialLinks() {
        return socialLinks;
    }

    public void setSocialLinks(String socialLinks) {
        this.socialLinks = socialLinks;
    }

    public String getFooterText() {
        return footerText;
    }

    public void setFooterText(String footerText) {
        this.footerText = footerText;
    }

    public String getFooterBackgroundColor() {
        return footerBackgroundColor;
    }

    public void setFooterBackgroundColor(String footerBackgroundColor) {
        this.footerBackgroundColor = footerBackgroundColor;
    }

    // Color scheme getters/setters
    public String getTextColor() {
        return textColor;
    }

    public void setTextColor(String textColor) {
        this.textColor = textColor;
    }

    public String getButtonColor() {
        return buttonColor;
    }

    public void setButtonColor(String buttonColor) {
        this.buttonColor = buttonColor;
    }

    public String getH2Color() {
        return h2Color;
    }

    public void setH2Color(String h2Color) {
        this.h2Color = h2Color;
    }

    public String getH3Color() {
        return h3Color;
    }

    public void setH3Color(String h3Color) {
        this.h3Color = h3Color;
    }

    // Legal pages getters/setters
    public String getPrivacyPolicy() {
        return privacyPolicy;
    }

    public void setPrivacyPolicy(String privacyPolicy) {
        this.privacyPolicy = privacyPolicy;
    }

    public String getAboutUs() {
        return aboutUs;
    }

    public void setAboutUs(String aboutUs) {
        this.aboutUs = aboutUs;
    }

    public String getCustomDomain() {
        return customDomain;
    }

    public void setCustomDomain(String customDomain) {
        this.customDomain = customDomain;
    }

    public String getFacebookPixel() {
        return facebookPixel;
    }

    public void setFacebookPixel(String facebookPixel) {
        this.facebookPixel = facebookPixel;
    }

    public String getSeoKeywords() {
        return seoKeywords;
    }

    public void setSeoKeywords(String seoKeywords) {
        this.seoKeywords = seoKeywords;
    }

    public String getFavicon() {
        return favicon;
    }

    public void setFavicon(String favicon) {
        this.favicon = favicon;
    }
}