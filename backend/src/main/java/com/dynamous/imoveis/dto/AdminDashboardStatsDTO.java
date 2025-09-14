package com.dynamous.imoveis.dto;

import java.io.Serializable;

public class AdminDashboardStatsDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private Long totalUsers;
    private Long totalAccounts;
    private Long totalProperties;
    private Long totalTenants;
    private Long activeAccounts;
    private Long inactiveAccounts;
    private Long propertiesForSale;
    private Long propertiesForRent;
    
    public AdminDashboardStatsDTO() {
    }
    
    public AdminDashboardStatsDTO(Long totalUsers, Long totalAccounts, Long totalProperties, 
                                 Long totalTenants, Long activeAccounts, Long inactiveAccounts,
                                 Long propertiesForSale, Long propertiesForRent) {
        this.totalUsers = totalUsers;
        this.totalAccounts = totalAccounts;
        this.totalProperties = totalProperties;
        this.totalTenants = totalTenants;
        this.activeAccounts = activeAccounts;
        this.inactiveAccounts = inactiveAccounts;
        this.propertiesForSale = propertiesForSale;
        this.propertiesForRent = propertiesForRent;
    }
    
    public Long getTotalUsers() {
        return totalUsers;
    }
    
    public void setTotalUsers(Long totalUsers) {
        this.totalUsers = totalUsers;
    }
    
    public Long getTotalAccounts() {
        return totalAccounts;
    }
    
    public void setTotalAccounts(Long totalAccounts) {
        this.totalAccounts = totalAccounts;
    }
    
    public Long getTotalProperties() {
        return totalProperties;
    }
    
    public void setTotalProperties(Long totalProperties) {
        this.totalProperties = totalProperties;
    }
    
    public Long getTotalTenants() {
        return totalTenants;
    }
    
    public void setTotalTenants(Long totalTenants) {
        this.totalTenants = totalTenants;
    }
    
    public Long getActiveAccounts() {
        return activeAccounts;
    }
    
    public void setActiveAccounts(Long activeAccounts) {
        this.activeAccounts = activeAccounts;
    }
    
    public Long getInactiveAccounts() {
        return inactiveAccounts;
    }
    
    public void setInactiveAccounts(Long inactiveAccounts) {
        this.inactiveAccounts = inactiveAccounts;
    }
    
    public Long getPropertiesForSale() {
        return propertiesForSale;
    }
    
    public void setPropertiesForSale(Long propertiesForSale) {
        this.propertiesForSale = propertiesForSale;
    }
    
    public Long getPropertiesForRent() {
        return propertiesForRent;
    }
    
    public void setPropertiesForRent(Long propertiesForRent) {
        this.propertiesForRent = propertiesForRent;
    }
}