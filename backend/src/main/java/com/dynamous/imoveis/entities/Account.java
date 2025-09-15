package com.dynamous.imoveis.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Account implements Serializable {
    private static final long serialVersionUID = 1L; 
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String logo;
    private String companyName;
    private String cnpj;
    private String creci;
    private String proprietario;
     
    private String slug;
    private String email;
    private String password;
    private Integer status;
    private String lastName; 
    private Integer verification;
    private String start;
    private String endDate;
    private String domain;
    private String customDomain;
    private String netlifySiteId;
    private String netlifyToken;
    private String renovation;
    private String officeName;
    private String phone;
    private String country;
    private String state;
    private String city;
    private String neighborhood;
    private String street;
    private String number;
    private String cep;
    
    
    @JsonIgnore
    @OneToMany(mappedBy = "account")
    private List<Tenant> tenants = new ArrayList<Tenant>();

    
    
    public Account() {
    	
    }
    
	public Account(Long id, String logo,String domain, String companyName, String cnpj, String creci, String proprietario) {
		this.id = id;
		this.logo = logo;
		this.domain=domain;
		this.companyName = companyName;
		this.cnpj = cnpj;
		this.creci = creci;
		this.proprietario=proprietario;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
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

	public String getCreci() {
		return creci;
	}

	public void setCreci(String creci) {
		this.creci = creci;
	}

	public List<Tenant> getTenants() {
		return tenants;
	}

	public void setTenants(List<Tenant> tenants) {
		this.tenants = tenants;
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

    public String getNetlifySiteId() {
        return netlifySiteId;
    }

    public void setNetlifySiteId(String netlifySiteId) {
        this.netlifySiteId = netlifySiteId;
    }

    public String getNetlifyToken() {
        return netlifyToken;
    }

    public void setNetlifyToken(String netlifyToken) {
        this.netlifyToken = netlifyToken;
    }

	public String getProprietario() {
		return proprietario;
	}

	public void setProprietario(String proprietario) {
		this.proprietario = proprietario;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
    
    	
    

}
