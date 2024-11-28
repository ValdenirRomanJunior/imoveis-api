package com.dynamous.imoveis.dto;

import com.dynamous.imoveis.entities.Lead;
import com.dynamous.imoveis.entities.Opportunity;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Status;
import com.dynamous.imoveis.services.validation.TenantUpdate;
import org.hibernate.validator.constraints.Length;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.util.Date;

@TenantUpdate
public class OpportunityDTO implements Serializable {
    private static final long serialVersionUID = 1L;


    private Long id;
    private String instant;
    
    private Long idLead;

    private String nameLead;
  
    private String emailLead;
   
    private String phoneLead;
    
    private String messageLead;
    
    private String stepName;
    
    private Long stepId;
    
    private Long propertyId;
    
    private Long accountId;
    
 

    public OpportunityDTO(){

    }

    public OpportunityDTO(Opportunity opportunity){
        id=opportunity.getId();
        nameLead= opportunity.getLead().getName();
        emailLead= opportunity.getLead().getEmail(); 
        phoneLead=opportunity.getLead().getPhone();
        stepName=(opportunity.getStep() == null) ? null : opportunity.getStep().getName();
        stepId=(opportunity.getStep() == null) ? null : opportunity.getStep().getId();
        messageLead=opportunity.getLead().getMessage();
        propertyId=(opportunity.getPropertyId() == null) ? null : opportunity.getPropertyId();
        accountId=opportunity.getAccount().getId();
        instant=opportunity.getInstant();
        idLead=opportunity.getLead().getId();
       
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

	public String getNameLead() {
		return nameLead;
	}

	public void setNameLead(String nameLead) {
		this.nameLead = nameLead;
	}

	public String getEmailLead() {
		return emailLead;
	}

	public void setEmailLead(String emailLead) {
		this.emailLead = emailLead;
	}

	public String getPhoneLead() {
		return phoneLead;
	}

	public void setPhoneLead(String phoneLead) {
		this.phoneLead = phoneLead;
	}

	public String getMessageLead() {
		return messageLead;
	}

	public void setMessageLead(String messageLead) {
		this.messageLead = messageLead;
	}

	public String getStepName() {
		return stepName;
	}

	public void setStepName(String stepName) {
		this.stepName = stepName;
	}

	public Long getStepId() {
		return stepId;
	}

	public void setStepId(Long stepId) {
		this.stepId = stepId;
	}

	public Long getIdLead() {
		return idLead;
	}

	public void setIdLead(Long idLead) {
		this.idLead = idLead;
	}

 
}
