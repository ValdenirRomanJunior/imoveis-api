package com.dynamous.imoveis.dto;


import com.dynamous.imoveis.enums.Status;
import com.dynamous.imoveis.services.validation.TenantUpdate;
import com.dynamous.imoveis.services.validation.UserTenantUpdate;

import org.hibernate.validator.constraints.Length;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import java.io.Serializable;


@UserTenantUpdate
public class UserTenantUpdateDTO implements Serializable {
    private static final long serialVersionUID = 1L;


    private Long id;

    @NotEmpty(message = "Preenchimento obrigatório")
    @Length(min=2, max=25, message = "O tamanho deve ser entre 2 e 25 caracteres")
    private String slug;

    @NotEmpty(message = "Preenchimento obrigatório")
    @Length(min=2, max=40, message = "O tamanho deve ser entre 2 e 40 caracteres")
    @Email(message = "E-mail inválido")
    private String email;
         
    private String password;
    @Length(max=15, message = "O tamanho deve ser no máximo 15 caracteres")
    
    private String creci;
    
    
 

    public UserTenantUpdateDTO(){

    }

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}


	public String getCreci() {
		return creci;
	}


	public void setCreci(String creci) {
		this.creci = creci;
	}
	
    
}
