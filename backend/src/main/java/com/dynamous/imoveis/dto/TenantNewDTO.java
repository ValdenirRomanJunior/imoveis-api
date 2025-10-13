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
    private String slug; // Nome da Imobiliária

    @NotEmpty(message = "Preenchimento obrigatório")
    @Length(min=2, max=45, message = "O tamanho deve ser entre 2 e 45 caracteres")
    @Email(message = "E-mail inválido")
    private String email;
    

    
    @NotEmpty(message = "Preenchimento obrigatório")
    @Length(min=11, max=11, message = "O tamanho deve ser entre 11 e 11 caracteres")
    private String phone; // Telefone
    
    // Campos removidos: password, lastName, creci, cpf
    // A senha será gerada automaticamente no backend
 

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

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
}
