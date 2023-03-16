package com.dynamous.imoveis.entities;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.Objects;

public class Contract {


    private Long id;
    private String name;
    private String description;
    private String fileUrl;


    private TenantCustomer tenantCustomer;

    public Contract(){

    }

    public Contract(Long id, String name, String description, String fileUrl, TenantCustomer tenantCustomer) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.fileUrl = fileUrl;
        this.tenantCustomer = tenantCustomer;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public TenantCustomer getTenantCustomer() {
        return tenantCustomer;
    }

    public void setTenantCustomer(TenantCustomer tenantCustomer) {
        this.tenantCustomer = tenantCustomer;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Contract contract = (Contract) o;
        return Objects.equals(id, contract.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
