package com.dynamous.imoveis.dto;

import java.io.Serializable;

public class AdminStatsDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private Long totalUsers;
    private Long totalProperties;
    private Long totalLeads;
    private Long publishedProperties;
    private Long activeUsers;
    
    public AdminStatsDTO() {
    }
    
    public AdminStatsDTO(Long totalUsers, Long totalProperties, Long totalLeads, 
                        Long publishedProperties, Long activeUsers) {
        this.totalUsers = totalUsers;
        this.totalProperties = totalProperties;
        this.totalLeads = totalLeads;
        this.publishedProperties = publishedProperties;
        this.activeUsers = activeUsers;
    }
    
    public Long getTotalUsers() {
        return totalUsers;
    }
    
    public void setTotalUsers(Long totalUsers) {
        this.totalUsers = totalUsers;
    }
    
    public Long getTotalProperties() {
        return totalProperties;
    }
    
    public void setTotalProperties(Long totalProperties) {
        this.totalProperties = totalProperties;
    }
    
    public Long getTotalLeads() {
        return totalLeads;
    }
    
    public void setTotalLeads(Long totalLeads) {
        this.totalLeads = totalLeads;
    }
    
    public Long getPublishedProperties() {
        return publishedProperties;
    }
    
    public void setPublishedProperties(Long publishedProperties) {
        this.publishedProperties = publishedProperties;
    }
    
    public Long getActiveUsers() {
        return activeUsers;
    }
    
    public void setActiveUsers(Long activeUsers) {
        this.activeUsers = activeUsers;
    }
}