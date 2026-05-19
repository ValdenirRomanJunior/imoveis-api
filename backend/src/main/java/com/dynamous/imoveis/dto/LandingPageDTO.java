package com.dynamous.imoveis.dto;

import com.dynamous.imoveis.entities.LandingPage;
import java.io.Serializable;
import java.time.Instant;

public class LandingPageDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private Long empreendimentoId;
    private String nome;
    private String slug;
    private String status;
    private String templateId;
    private String tenantSlug;
    private String briefing;
    private String conteudoGerado;
    private String lpConfig;
    private Instant createdAt;
    private Instant updatedAt;

    public LandingPageDTO() {
    }

    public LandingPageDTO(LandingPage entity) {
        this.id = entity.getId();
        if (entity.getEmpreendimento() != null) {
            this.empreendimentoId = entity.getEmpreendimento().getId();
        }
        this.nome = entity.getNome();
        this.slug = entity.getSlug();
        this.status = entity.getStatus();
        this.templateId = entity.getTemplateId();
        if (entity.getTenant() != null) {
            this.tenantSlug = entity.getTenant().getSlug();
        }
        this.briefing = entity.getBriefing();
        this.conteudoGerado = entity.getConteudoGerado();
        this.lpConfig = entity.getLpConfig();
        this.createdAt = entity.getCreatedAt();
        this.updatedAt = entity.getUpdatedAt();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEmpreendimentoId() {
        return empreendimentoId;
    }

    public void setEmpreendimentoId(Long empreendimentoId) {
        this.empreendimentoId = empreendimentoId;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTemplateId() {
        return templateId;
    }

    public void setTemplateId(String templateId) {
        this.templateId = templateId;
    }

    public String getTenantSlug() {
        return tenantSlug;
    }

    public void setTenantSlug(String tenantSlug) {
        this.tenantSlug = tenantSlug;
    }

    public String getBriefing() {
        return briefing;
    }

    public void setBriefing(String briefing) {
        this.briefing = briefing;
    }

    public String getConteudoGerado() {
        return conteudoGerado;
    }

    public void setConteudoGerado(String conteudoGerado) {
        this.conteudoGerado = conteudoGerado;
    }

    public String getLpConfig() {
        return lpConfig;
    }

    public void setLpConfig(String lpConfig) {
        this.lpConfig = lpConfig;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}
