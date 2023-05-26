package com.dynamous.imoveis.dto;


import com.dynamous.imoveis.enums.Status;
import com.dynamous.imoveis.services.validation.TenantUpdate;

import org.hibernate.validator.constraints.Length;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;


@TenantUpdate
public class TenantUpdateDTO implements Serializable {
    private static final long serialVersionUID = 1L;


    private Long id;

    @NotEmpty(message = "Preenchimento obrigatório")
    @Length(min=2, max=25, message = "O tamanho deve ser entre 2 e 25 caracteres")
    private String slug;

    @NotEmpty(message = "Preenchimento obrigatório")
    @Length(min=2, max=40, message = "O tamanho deve ser entre 2 e 40 caracteres")
    @Email(message = "E-mail inválido")
    private String email;
    
    private Integer status;
    
    @NotEmpty(message = "Preenchimento obrigatório")
    @Length(min=2, max=35, message = "O tamanho deve ser entre 2 e 35 caracteres")
    private String lastName;
    
    private Integer verification; 
    
    private String password;
    @Length(max=15, message = "O tamanho deve ser no máximo 15 caracteres")
    private String creci;
    
    @Length( max=100, message = "O tamanho deve ser no máximo 100 caracteres")
    private String domain;

    public TenantUpdateDTO(){

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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}


	public Integer getVerification() {
		return verification;
	}


	public void setVerification(Integer verification) {
		this.verification = (verification == null) ? null : verification;
	}


	public String getCreci() {
		return creci;
	}


	public void setCreci(String creci) {
		this.creci = creci;
	}
	
	public String getDomain() {
		return domain;
	}


	public void setDomain(String domain) {
		this.domain = domain;
	}
	
	
	
    
}
