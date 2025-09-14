package com.dynamous.imoveis.dto;

import java.io.Serializable;
import java.util.Date;

public class UserDetailsDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private Long userId;
    private String slug;
    private String email;
    private String lastName;
    private String creci;
    private Integer status;
    private Integer verification;
    private String start;
    private String endDate;
    private String userType; // TENANT or ADMIN
    
    // Account information (for tenants)
    private Long accountId;
    private String companyName;
    private String cnpj;
    private String domain;
    private String customDomain;
    private String proprietario;
    private String phone;
    private String city;
    private String state;
    
    // Statistics
    private Long totalProperties;
    private Long activeProperties;
    private Long inactiveProperties;
    private Long totalLeads;
    
    public UserDetailsDTO() {
    }
    
    public UserDetailsDTO(Long userId, String slug, String email, String lastName, 
                         String creci, Integer status, Integer verification, 
                         String start, String endDate, String userType) {
        this.userId = userId;
        this.slug = slug;
        this.email = email;
        this.lastName = lastName;
        this.creci = creci;
        this.status = status;
        this.verification = verification;
        this.start = start;
        this.endDate = endDate;
        this.userType = userType;
    }
    
    // Getters and Setters
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public String getSlug() {
        return slug;
    }
    
    public void setSlug(String slug) {
        this.slug = slug;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getLastName() {
        return lastName;
    }
    
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    public String getCreci() {
        return creci;
    }
    
    public void setCreci(String creci) {
        this.creci = creci;
    }
    
    public Integer getStatus() {
        return status;
    }
    
    public void setStatus(Integer status) {
        this.status = status;
    }
    
    public Integer getVerification() {
        return verification;
    }
    
    public void setVerification(Integer verification) {
        this.verification = verification;
    }
    
    public String getStart() {
        return start;
    }
    
    public void setStart(String start) {
        this.start = start;
    }
    
    public String getEndDate() {
        return endDate;
    }
    
    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }
    
    public String getUserType() {
        return userType;
    }
    
    public void setUserType(String userType) {
        this.userType = userType;
    }
    
    public Long getAccountId() {
        return accountId;
    }
    
    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }
    
    public String getCompanyName() {
        return companyName;
    }
    
    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
    
    public String getCnpj() {
        return cnpj;
    }
    
    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }
    
    public String getDomain() {
        return domain;
    }
    
    public void setDomain(String domain) {
        this.domain = domain;
    }
    
    public String getCustomDomain() {
        return customDomain;
    }
    
    public void setCustomDomain(String customDomain) {
        this.customDomain = customDomain;
    }
    
    public String getProprietario() {
        return proprietario;
    }
    
    public void setProprietario(String proprietario) {
        this.proprietario = proprietario;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public String getCity() {
        return city;
    }
    
    public void setCity(String city) {
        this.city = city;
    }
    
    public String getState() {
        return state;
    }
    
    public void setState(String state) {
        this.state = state;
    }
    
    public Long getTotalProperties() {
        return totalProperties;
    }
    
    public void setTotalProperties(Long totalProperties) {
        this.totalProperties = totalProperties;
    }
    
    public Long getActiveProperties() {
        return activeProperties;
    }
    
    public void setActiveProperties(Long activeProperties) {
        this.activeProperties = activeProperties;
    }
    
    public Long getInactiveProperties() {
        return inactiveProperties;
    }
    
    public void setInactiveProperties(Long inactiveProperties) {
        this.inactiveProperties = inactiveProperties;
    }
    
    public Long getTotalLeads() {
        return totalLeads;
    }
    
    public void setTotalLeads(Long totalLeads) {
        this.totalLeads = totalLeads;
    }
}