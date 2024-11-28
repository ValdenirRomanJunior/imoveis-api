package com.dynamous.imoveis.dto;

import com.dynamous.imoveis.entities.Lead;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Status;
import com.dynamous.imoveis.services.validation.TenantUpdate;
import org.hibernate.validator.constraints.Length;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;


public class OpportunityNewSiteDetailDTO implements Serializable {
    private static final long serialVersionUID = 1L;


    @NotEmpty(message = "Preenchimento obrigatório")
    @Length(min=2, max=41, message = "O tamanho deve ser entre 2 e 41 caracteres")
    private String name;
    
    @NotEmpty(message = "Preenchimento obrigatório")
    @Length(min=2, max=40, message = "O tamanho deve ser entre 2 e 40 caracteres")
    @Email(message = "E-mail inválido")
    private String email;
 
    @NotEmpty(message = "Preenchimento obrigatório")
    @Length(min=14, max=14, message = "O tamanho deve ser entre 14 e 14 caracteres")
    private String phone;
    
    @Length(max=80, message = "O tamanho deve ser de no máximo 80 caracteres")
    private String message;
      
    private Long leadId;
    
    private Long propertyId;
    

    

    
	public OpportunityNewSiteDetailDTO(){

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


	public Long getLeadId() {
		return leadId;
	}


	public void setLeadId(Long leadId) {
		this.leadId = leadId;
	}


	public Long getPropertyId() {
		return propertyId;
	}


	public void setPropertyId(Long propertyId) {
		this.propertyId = propertyId;
	}

	
	
    
}
