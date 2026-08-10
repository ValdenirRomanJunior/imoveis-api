package com.dynamous.imoveis.entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Theme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String mainColor;
    
    // Logo and branding
    private String logo;
    private String logoSize;
    
    // Menu and navigation
    @Column(columnDefinition = "TEXT")
    private String menuLinks; // JSON string
    private String phone;
    
    // Banner configuration
    private String bannerImage;
    private String bannerImage2;
    private String bannerImage3;
    private Integer bannerOverlayOpacity;
    private String bannerColor;
    private String bannerTitle;
    private String bannerTitleColor;
    private Integer bannerTitleSize;
    private String bannerSearchButtonTextColor;
    
    // Services configuration
    @Column(columnDefinition = "TEXT")
    private String services; // JSON string
    
    // Contact and agent info
    private String contactTitle;
    private String contactImage;
    private String agentPhoto;
    private String agentQuote;
    private String agentName;
    private String email;
    private String address;
    @Column(columnDefinition = "TEXT")
    private String mapIframe;
    
    // Footer configuration
    private String footerLogo;
    @Column(columnDefinition = "TEXT")
    private String socialLinks; // JSON string
    private String footerText;
    private String footerBackgroundColor;
    
    // Color scheme
    private String textColor;
    private String buttonColor;
    private String h2Color;
    private String h3Color;
    
    // Legal pages
    @Column(columnDefinition = "TEXT")
    private String privacyPolicy;
    @Column(columnDefinition = "TEXT")
    private String aboutUs;
    
    // Agencia (Why Choose)
    @Column(columnDefinition = "TEXT")
    private String agencia; // JSON string
    
    // Announce Section
    private String announceImage;
    private String announceBackground;
    @Column(columnDefinition = "TEXT")
    private String announceText;
    
    // SEO and Marketing
    private String customDomain;
    private String facebookPixel;
    @Column(columnDefinition = "TEXT")
    private String seoKeywords;
    private String siteTitle;
    private String favicon;
    private String creci;
    private String contactIconColor;
    private String brandColor2;
    private String brandColor2Text;

    @OneToOne
    @JoinColumn(name = "tenant_id")
    private Tenant tenant;

    public Theme(){

    }

    public Theme(Long id, String name, String mainColor, String logo, String logoSize, String menuLinks, String phone, String bannerImage, String bannerColor, String bannerTitle, String bannerTitleColor, Integer bannerTitleSize, String services, String contactTitle, String contactImage, String agentPhoto, String agentQuote, String agentName, String footerLogo, String socialLinks, String footerText, String footerBackgroundColor, String textColor, String buttonColor, String h2Color, String h3Color, String privacyPolicy, String aboutUs, Tenant tenant) {
        this.id = id;
        this.name = name;
        this.mainColor = mainColor;
        this.logo = logo;
        this.logoSize = logoSize;
        this.menuLinks = menuLinks;
        this.phone = phone;
        this.bannerImage = bannerImage;
        this.bannerColor = bannerColor;
        this.bannerTitle = bannerTitle;
        this.bannerTitleColor = bannerTitleColor;
        this.bannerTitleSize = bannerTitleSize;
        this.services = services;
        this.contactTitle = contactTitle;
        this.contactImage = contactImage;
        this.agentPhoto = agentPhoto;
        this.agentQuote = agentQuote;
        this.agentName = agentName;
        this.footerLogo = footerLogo;
        this.socialLinks = socialLinks;
        this.footerText = footerText;
        this.footerBackgroundColor = footerBackgroundColor;
        this.textColor = textColor;
        this.buttonColor = buttonColor;
        this.h2Color = h2Color;
        this.h3Color = h3Color;
        this.privacyPolicy = privacyPolicy;
        this.aboutUs = aboutUs;
        this.tenant = tenant;
    }

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

    public String getBannerImage() {
        return bannerImage;
    }

    public void setBannerImage(String bannerImage) {
        this.bannerImage = bannerImage;
    }

    public String getBannerImage2() {
        return bannerImage2;
    }

    public void setBannerImage2(String bannerImage2) {
        this.bannerImage2 = bannerImage2;
    }

    public String getBannerImage3() {
        return bannerImage3;
    }

    public void setBannerImage3(String bannerImage3) {
        this.bannerImage3 = bannerImage3;
    }

    public Integer getBannerOverlayOpacity() {
        return bannerOverlayOpacity;
    }

    public void setBannerOverlayOpacity(Integer bannerOverlayOpacity) {
        this.bannerOverlayOpacity = bannerOverlayOpacity;
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

    public String getBannerSearchButtonTextColor() {
        return bannerSearchButtonTextColor;
    }

    public void setBannerSearchButtonTextColor(String bannerSearchButtonTextColor) {
        this.bannerSearchButtonTextColor = bannerSearchButtonTextColor;
    }

    public String getServices() {
        return services;
    }

    public void setServices(String services) {
        this.services = services;
    }

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMapIframe() {
        return mapIframe;
    }

    public void setMapIframe(String mapIframe) {
        this.mapIframe = mapIframe;
    }

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

    public Tenant getTenant() {
        return tenant;
    }

    public void setTenant(Tenant tenant) {
        this.tenant = tenant;
    }

    public String getAgencia() {
        return agencia;
    }

    public void setAgencia(String agencia) {
        this.agencia = agencia;
    }

    public String getAnnounceImage() {
        return announceImage;
    }

    public void setAnnounceImage(String announceImage) {
        this.announceImage = announceImage;
    }

    public String getAnnounceBackground() {
        return announceBackground;
    }

    public void setAnnounceBackground(String announceBackground) {
        this.announceBackground = announceBackground;
    }

    public String getAnnounceText() {
        return announceText;
    }

    public void setAnnounceText(String announceText) {
        this.announceText = announceText;
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

    public String getSiteTitle() {
        return siteTitle;
    }

    public void setSiteTitle(String siteTitle) {
        this.siteTitle = siteTitle;
    }

    public String getFavicon() {
        return favicon;
    }

    public void setFavicon(String favicon) {
        this.favicon = favicon;
    }

    public String getCreci() {
        return creci;
    }

    public void setCreci(String creci) {
        this.creci = creci;
    }

    public String getContactIconColor() {
        return contactIconColor;
    }

    public void setContactIconColor(String contactIconColor) {
        this.contactIconColor = contactIconColor;
    }

    public String getBrandColor2() {
        return brandColor2;
    }

    public void setBrandColor2(String brandColor2) {
        this.brandColor2 = brandColor2;
    }

    public String getBrandColor2Text() {
        return brandColor2Text;
    }

    public void setBrandColor2Text(String brandColor2Text) {
        this.brandColor2Text = brandColor2Text;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Theme theme = (Theme) o;
        return Objects.equals(id, theme.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
