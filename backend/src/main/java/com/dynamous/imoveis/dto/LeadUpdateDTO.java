package com.dynamous.imoveis.dto;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.validator.constraints.Length;


import com.dynamous.imoveis.entities.ImageUrl;
import com.dynamous.imoveis.entities.Lead;
import com.dynamous.imoveis.entities.Property;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class LeadUpdateDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    
   
    private Long id;
    @NotEmpty(message = "Preenchimento obrigatório")
    @Length(min=1, max=80, message = "O tamanho deve ser entre 1 e 80 caracteres")
    private String name;
    
    @NotEmpty(message = "Preenchimento obrigatório")
    @Length(min=2, max=40, message = "O tamanho deve ser entre 2 e 40 caracteres")
    @Email(message = "E-mail inválido")
    private String email;
  
    @NotEmpty(message = "Preenchimento obrigatório")
    @Length(min=14, max=14, message = "O tamanho deve ser entre 14 e 14 caracteres")
    private String phone;
    
    private Long tenantId;
    


    public LeadUpdateDTO(){

    }
    public LeadUpdateDTO(Lead obj){
    	id=obj.getId();
    	
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
	public Long getTenantId() {
		return tenantId;
	}
	public void setTenantId(Long tenantId) {
		this.tenantId = tenantId;
	}


}

