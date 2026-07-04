package com.dynamous.imoveis.dto;

import com.dynamous.imoveis.entities.Lead;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Status;
import com.dynamous.imoveis.services.validation.TenantUpdate;
import org.hibernate.validator.constraints.Length;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.util.Date;

@TenantUpdate
public class LeadDTO implements Serializable {
    private static final long serialVersionUID = 1L;


    private Long id;

    private String name;
  
    private String email;
   
    private String phone;
    
    private String message;
    
    private Long propertyId;
    
    private Long accountId;
    
    private String instant;
    
    private Long opportunityId;

    private String lpPayload;

    public LeadDTO(){

    }

    public LeadDTO(Lead lead){
        id=lead.getId();
        name= lead.getName();
        email= lead.getEmail(); 
        phone=lead.getPhone();
        message=lead.getMessage();
        propertyId=(lead.getPropertyId() == null) ? null : lead.getPropertyId();
        accountId=lead.getAccount().getId();
        instant=lead.getInstant();
        opportunityId=(lead.getOpportunity()== null) ? null : lead.getOpportunity().getId();
        lpPayload=lead.getLpPayload();
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

    public void setEmail(String email) {
        this.email = email;
    }


	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getLpPayload() {
		return lpPayload;
	}

	public void setLpPayload(String lpPayload) {
		this.lpPayload = lpPayload;
	}
	
	

	public String getInstant() {
		return instant;
	}

	public void setInstant(String instant) {
		this.instant = instant;
	}

	public Long getPropertyId() {
		return propertyId;
	}

	public void setPropertyId(Long propertyId) {
		this.propertyId = propertyId;
	}



	public Long getAccountId() {
		return accountId;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}

	public Long getOpportunityId() {
		return opportunityId;
	}

	public void setOpportunityId(Long opportunityId) {
		this.opportunityId = opportunityId;
	}

	
    
}
