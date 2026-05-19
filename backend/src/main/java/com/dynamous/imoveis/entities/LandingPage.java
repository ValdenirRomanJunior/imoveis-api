package com.dynamous.imoveis.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;

@Entity
@Table(name = "tb_landing_page")
public class LandingPage implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    
    @Column(unique = true)
    private String slug;

    private String status; // 'RASCUNHO', 'PUBLICADA'
    
    private String templateId; // 'residencial', 'mcmv'

    @Column(columnDefinition = "TEXT")
    private String briefing; // JSON string

    @Column(columnDefinition = "TEXT")
    private String conteudoGerado; // JSON string

    @Column(columnDefinition = "TEXT")
    private String lpConfig; // JSON string

    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private Instant createdAt;

    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private Instant updatedAt;

    @ManyToOne
    @JoinColumn(name = "empreendimento_id")
    private Empreendimento empreendimento;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "tenant_id")
    private Tenant tenant;

    public LandingPage() {
    }

    public LandingPage(Long id, String nome, String slug, String status, String templateId, String briefing, String conteudoGerado, String lpConfig, Instant createdAt, Instant updatedAt, Empreendimento empreendimento, Tenant tenant) {
        this.id = id;
        this.nome = nome;
        this.slug = slug;
        this.status = status;
        this.templateId = templateId;
        this.briefing = briefing;
        this.conteudoGerado = conteudoGerado;
        this.lpConfig = lpConfig;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.empreendimento = empreendimento;
        this.tenant = tenant;
    }

    @PrePersist
    public void prePersist() {
        createdAt = Instant.now();
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Empreendimento getEmpreendimento() {
        return empreendimento;
    }

    public void setEmpreendimento(Empreendimento empreendimento) {
        this.empreendimento = empreendimento;
    }

    public Tenant getTenant() {
        return tenant;
    }

    public void setTenant(Tenant tenant) {
        this.tenant = tenant;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        LandingPage other = (LandingPage) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }
}
