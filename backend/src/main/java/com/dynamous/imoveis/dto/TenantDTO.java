package com.dynamous.imoveis.dto;

import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.services.validation.TenantUpdate;
import org.hibernate.validator.constraints.Length;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;

@TenantUpdate
public class TenantDTO implements Serializable {
    private static final long serialVersionUID = 1L;


    private Long id;

    @NotEmpty(message = "Preenchimento obrigatório")
    @Length(min=5, max=80, message = "O tamanho deve ser entre 5 e 80 caracteres")
    private String slug;

    @Email(message = "E-mail inválido")
    private String email;
    private Integer status;
    private String lastName;

    public TenantDTO(){

    }

    public TenantDTO(Tenant tenant){
        id=tenant.getId();
        slug= tenant.getSlug();
        email= tenant.getEmail();
        status=tenant.getStatus().getCod();
        lastName=tenant.getLastName();
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

    public void setemail(String email) {
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
    
}
