package com.dynamous.imoveis.entities;

import com.dynamous.imoveis.enums.Perfil;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.*;
import java.util.stream.Collectors;


public class TenantCustomer {

 
    private Long id;

    private String name;

    private String email;

    private String password;



    private Tenant tenant;


    private Set<Integer> perfis = new HashSet<>();

  
    private List<Contract> contracts = new ArrayList<>();

    public TenantCustomer(){
        addPerfil(Perfil.TENANT_CUSTOMER);

    }

    public TenantCustomer(Long id, String name, String email, String password, Tenant tenant) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.tenant = tenant;
        addPerfil(Perfil.TENANT_CUSTOMER);
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

    public String getEmail() {
        return email;
    }

    public void setemail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Tenant getTenant() {
        return tenant;
    }

    public void setTenant(Tenant tenant) {
        this.tenant = tenant;
    }

    public Set<Perfil> getPerfis(){
        return perfis.stream().map(x -> Perfil.toEnum(x)).collect(Collectors.toSet());
    }

    public void addPerfil(Perfil perfil){
        perfis.add(perfil.getCod());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TenantCustomer that = (TenantCustomer) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    public List<Contract> getContracts() {
        return contracts;
    }

    public void setContracts(List<Contract> contracts) {
        this.contracts = contracts;
    }
}
