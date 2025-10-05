package com.dynamous.imoveis.entities;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.dynamous.imoveis.enums.PlanType;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Account implements Serializable {
    private static final long serialVersionUID = 1L; 
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String logo;
    
    private String companyName;
    private String cpf;
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
    
    // Campos relacionados aos planos
    @Enumerated(EnumType.ORDINAL)
    private PlanType planType;
    
    private LocalDateTime planStartDate;
    private LocalDateTime planEndDate;
    private Boolean isTrialActive;
    
    
    @JsonIgnore
    @OneToMany(mappedBy = "account")
    private List<Tenant> tenants = new ArrayList<Tenant>();

    
    
    public Account() {
    	
    }
    
	public Account(Long id, String logo,String domain, String companyName, String cpf, String creci, String proprietario) {
		this.id = id;
		this.logo = logo;
		this.domain=domain;
		this.companyName = companyName;
		this.cpf = cpf;
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

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
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

	public String getSlug() {
		return slug;
	}

	public void setSlug(String slug) {
		this.slug = slug;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Integer getVerification() {
		return verification;
	}

	public void setVerification(Integer verification) {
		this.verification = verification;
	}

	public String getStart() {
		return start;
	}

	public void setStart(String start) {
		this.start = start;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getRenovation() {
		return renovation;
	}

	public void setRenovation(String renovation) {
		this.renovation = renovation;
	}

	public String getOfficeName() {
		return officeName;
	}

	public void setOfficeName(String officeName) {
		this.officeName = officeName;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getNeighborhood() {
		return neighborhood;
	}

	public void setNeighborhood(String neighborhood) {
		this.neighborhood = neighborhood;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	// Getters e Setters para os campos de planos
	public PlanType getPlanType() {
		return planType;
	}

	public void setPlanType(PlanType planType) {
		this.planType = planType;
	}

	public LocalDateTime getPlanStartDate() {
		return planStartDate;
	}

	public void setPlanStartDate(LocalDateTime planStartDate) {
		this.planStartDate = planStartDate;
	}

	public LocalDateTime getPlanEndDate() {
		return planEndDate;
	}

	public void setPlanEndDate(LocalDateTime planEndDate) {
		this.planEndDate = planEndDate;
	}

	public Boolean getIsTrialActive() {
		return isTrialActive;
	}

	public void setIsTrialActive(Boolean isTrialActive) {
		this.isTrialActive = isTrialActive;
	}

	// Método utilitário para verificar se o plano está ativo
	public Boolean isPlanActive() {
		if (planEndDate == null) {
			return false;
		}
		return LocalDateTime.now().isBefore(planEndDate);
	}

	// Método utilitário para verificar se está no período de teste
	public Boolean isInTrialPeriod() {
		return isTrialActive != null && isTrialActive && isPlanActive();
	}
    
    	
    

}
