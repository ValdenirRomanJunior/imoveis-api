package com.dynamous.imoveis.dto;

import com.dynamous.imoveis.entities.Lead;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Status;
import com.dynamous.imoveis.services.validation.TenantUpdate;
import org.hibernate.validator.constraints.Length;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;

@TenantUpdate
public class LeadDTO implements Serializable {
    private static final long serialVersionUID = 1L;


    private Long id;

    private String name;
  
    private String email;
   
    private String phone;
    
    private String message;
    
    private Long propertyId;
    
    private Long tenantId;

    public LeadDTO(){

    }

    public LeadDTO(Lead lead){
        id=lead.getId();
        name= lead.getName();
        email= lead.getEmail(); 
        phone=lead.getPhone();
        message=lead.getMessage();
        propertyId=(lead.getPropertyId() == null) ? null : lead.getPropertyId();
        tenantId=lead.getTenant().getId();
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

	public Long getPropertyId() {
		return propertyId;
	}

	public void setPropertyId(Long propertyId) {
		this.propertyId = propertyId;
	}

	public Long getTenantId() {
		return tenantId;
	}

	public void setTenantId(Long tenantId) {
		this.tenantId = tenantId;
	}

	
    
}
