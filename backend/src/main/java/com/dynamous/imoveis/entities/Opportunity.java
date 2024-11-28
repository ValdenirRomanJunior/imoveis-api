package com.dynamous.imoveis.entities;

import com.dynamous.imoveis.enums.Perfil;
import com.dynamous.imoveis.enums.Status;
import com.dynamous.imoveis.services.validation.TenantInsert;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import net.bytebuddy.build.HashCodeAndEqualsPlugin;

import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.util.*;



@Entity
public class Opportunity implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String instant;

    private Long propertyId;
    
    @JsonIgnore
    @OneToOne
    @JoinColumn(name="lead_id")
    private Lead lead;
    

    @ManyToOne
    @JoinColumn(name="step_id")
    private Step step;
    
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="account_id")
    private Account account;
    
     
    public Opportunity(){
     
    }
    
    public Opportunity (Long id, String instant) {
        this.id = id;
        this.instant=instant;
        
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

   
	public Long getPropertyId() {
		return propertyId;
	}

	public void setPropertyId(Long property) {
		this.propertyId = property;
	}
	
		

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	public Lead getLead() {
		return lead;
	}

	public void setLead(Lead lead) {
		this.lead = lead;
	}

	public Step getStep() {
		return step;
	}

	public void setStep(Step step) {
		this.step = step;
	}
	
	
	public String getInstant() {
		return instant;
	}

	public void setInstant(String instant) {
		this.instant = instant;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((account == null) ? 0 : account.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((instant == null) ? 0 : instant.hashCode());
		result = prime * result + ((lead == null) ? 0 : lead.hashCode());
		result = prime * result + ((propertyId == null) ? 0 : propertyId.hashCode());
		result = prime * result + ((step == null) ? 0 : step.hashCode());
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
		Opportunity other = (Opportunity) obj;
		if (account == null) {
			if (other.account != null)
				return false;
		} else if (!account.equals(other.account))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (instant == null) {
			if (other.instant != null)
				return false;
		} else if (!instant.equals(other.instant))
			return false;
		if (lead == null) {
			if (other.lead != null)
				return false;
		} else if (!lead.equals(other.lead))
			return false;
		if (propertyId == null) {
			if (other.propertyId != null)
				return false;
		} else if (!propertyId.equals(other.propertyId))
			return false;
		if (step == null) {
			if (other.step != null)
				return false;
		} else if (!step.equals(other.step))
			return false;
		return true;
	}
	
	


	
}
