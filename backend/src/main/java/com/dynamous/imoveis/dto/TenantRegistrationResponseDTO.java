package com.dynamous.imoveis.dto;

import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Status;
import com.dynamous.imoveis.enums.Verification;

public class TenantRegistrationResponseDTO {
    
    private Long id;
    private String slug;
    private String email;
    private String password; // Senha em texto plano
    private Status status;
    private String lastName;
    private Verification verification;
    private String creci;
    private String start;
    private String renovation;
    private String endDate;
    private String domain;
    private String proprietario;
    private String phone;

    public TenantRegistrationResponseDTO() {
    }

    public TenantRegistrationResponseDTO(Tenant tenant, String plainPassword) {
        this.id = tenant.getId();
        this.slug = tenant.getSlug();
        this.email = tenant.getEmail();
        this.password = plainPassword; // Usar a senha em texto plano
        this.status = tenant.getStatus();
        this.lastName = tenant.getLastName();
        this.verification = tenant.getVerification();
        this.creci = tenant.getCreci();
        this.start = tenant.getStart();
        this.renovation = tenant.getRenovation();
        this.endDate = tenant.getEndDate();
        // Pegar o domain da Account associada (subdomínio criado)
        this.domain = tenant.getAccount() != null ? tenant.getAccount().getDomain() : tenant.getDomain();
        this.proprietario = tenant.getProprietario();
        this.phone = tenant.getPhone();
    }

    // Getters and Setters
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Verification getVerification() {
        return verification;
    }

    public void setVerification(Verification verification) {
        this.verification = verification;
    }

    public String getCreci() {
        return creci;
    }

    public void setCreci(String creci) {
        this.creci = creci;
    }

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getRenovation() {
        return renovation;
    }

    public void setRenovation(String renovation) {
        this.renovation = renovation;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
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
}