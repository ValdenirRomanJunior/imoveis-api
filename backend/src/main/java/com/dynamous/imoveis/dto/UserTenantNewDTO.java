package com.dynamous.imoveis.dto;

import com.dynamous.imoveis.services.validation.TenantInsert;
import com.dynamous.imoveis.services.validation.UserTenantInsert;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import java.io.Serializable;

@UserTenantInsert
public class UserTenantNewDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @NotEmpty(message = "Preenchimento obrigatório")
    @Length(min=2, max=25, message = "O tamanho deve ser entre 2 e 25 caracteres")
    private String slug;

    @NotEmpty(message = "Preenchimento obrigatório")
    @Length(min=2, max=45, message = "O tamanho deve ser entre 2 e 45 caracteres")
    @Email(message = "E-mail inválido")
    private String email;

    @NotEmpty(message = "Preenchimento obrigatório")
    @Length(min=8, max=20, message = "O tamanho deve ser entre 8 e 20 caracteres")
    private String password;
    
    @NotEmpty(message = "Preenchimento obrigatório")
    @Length( max=20, message = "O tamanho deve ser no máximo 15 caracteres")
    private String creci;
    

 

    public UserTenantNewDTO(){

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

    public void setemail(String email) {
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
