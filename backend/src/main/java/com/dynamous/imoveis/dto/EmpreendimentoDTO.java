package com.dynamous.imoveis.dto;

import com.dynamous.imoveis.entities.Empreendimento;
import java.io.Serializable;
import java.time.Instant;

public class EmpreendimentoDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String nome;
    private String slug;
    private Instant createdAt;
    private Instant updatedAt;

    public EmpreendimentoDTO() {
    }

    public EmpreendimentoDTO(Long id, String nome, String slug, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.nome = nome;
        this.slug = slug;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public EmpreendimentoDTO(Empreendimento entity) {
        this.id = entity.getId();
        this.nome = entity.getNome();
        this.slug = entity.getSlug();
        this.createdAt = entity.getCreatedAt();
        this.updatedAt = entity.getUpdatedAt();
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
