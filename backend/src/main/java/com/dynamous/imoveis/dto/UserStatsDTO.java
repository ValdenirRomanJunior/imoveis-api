package com.dynamous.imoveis.dto;

import java.io.Serializable;
import java.time.Instant;

public class UserStatsDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private Long id;
    private String slug;
    private String lastName;
    private String email;
    private String phone;
    private String cpf;
    private Instant createdAt;
    private Long propertiesCount;
    private Long leadsCount;
    private Long publishedPropertiesCount;
    
    public UserStatsDTO() {
    }
    
    public UserStatsDTO(Long id, String slug, String lastName, String email, String phone, 
                       String cpf, Instant createdAt, Long propertiesCount, Long leadsCount, 
                       Long publishedPropertiesCount) {
        this.id = id;
        this.slug = slug;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.cpf = cpf;
        this.createdAt = createdAt;
        this.propertiesCount = propertiesCount;
        this.leadsCount = leadsCount;
        this.publishedPropertiesCount = publishedPropertiesCount;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getSlug() {
        return slug;
    }
    
    public void setSlug(String slug) {
        this.slug = slug;
    }
    
    public String getLastName() {
        return lastName;
    }
    
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public String getCpf() {
        return cpf;
    }
    
    public void setCpf(String cpf) {
        this.cpf = cpf;
    }
    
    public Instant getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
    
    public Long getPropertiesCount() {
        return propertiesCount;
    }
    
    public void setPropertiesCount(Long propertiesCount) {
        this.propertiesCount = propertiesCount;
    }
    
    public Long getLeadsCount() {
        return leadsCount;
    }
    
    public void setLeadsCount(Long leadsCount) {
        this.leadsCount = leadsCount;
    }
    
    public Long getPublishedPropertiesCount() {
        return publishedPropertiesCount;
    }
    
    public void setPublishedPropertiesCount(Long publishedPropertiesCount) {
        this.publishedPropertiesCount = publishedPropertiesCount;
    }
}