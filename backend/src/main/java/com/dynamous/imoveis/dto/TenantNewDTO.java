package com.dynamous.imoveis.dto;

import com.dynamous.imoveis.services.validation.TenantInsert;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import java.io.Serializable;

@TenantInsert
public class TenantNewDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @NotEmpty(message = "Preenchimento obrigatório")
    @Length(min=2, max=25, message = "O tamanho deve ser entre 2 e 25 caracteres")
    private String slug;

    @NotEmpty(message = "Preenchimento obrigatório")
    @Length(min=2, max=45, message = "O tamanho deve ser entre 2 e 45 caracteres")
    @Email(message = "E-mail inválido")
    private String email;
    
    @NotEmpty(message = "Preenchimento obrigatório")
    @Length(min=2, max=35, message = "O tamanho deve ser entre 2 e 35 caracteres")
    private String lastName;

    @NotEmpty(message = "Preenchimento obrigatório")
    @Length(min=8, max=20, message = "O tamanho deve ser entre 8 e 20 caracteres")
    private String password;
    
    @Length( max=20, message = "O tamanho deve ser no máximo 15 caracteres")
    private String creci;
    
    @NotEmpty(message = "Preenchimento obrigatório")
    @Length(min=11, max=11, message = "O tamanho deve ser entre 11 e 11 caracteres")
    private String phone;
    
    @Length(min=11, max=14, message = "O CPF deve ter entre 11 e 14 caracteres")
    private String cpf;
    
    private String proprietario;
 

    public TenantNewDTO(){

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

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getCreci() {
		return creci;
	}

	public void setCreci(String creci) {
		this.creci = creci;
	}

	public String getProprietario() {
		return proprietario;
	}

	public void setProprietario(String proprietario) {
		this.proprietario = proprietario;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	


   	
    
}
