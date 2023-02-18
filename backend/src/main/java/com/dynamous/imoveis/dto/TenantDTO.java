package com.dynamous.imoveis.dto;

import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Status;
import com.dynamous.imoveis.enums.Verification;
import com.dynamous.imoveis.services.validation.TenantUpdate;
import org.hibernate.validator.constraints.Length;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;

@TenantUpdate
public class TenantDTO implements Serializable {
    private static final long serialVersionUID = 1L;


    private Long id;
    private String slug;
    private String email;
    private Status status;
    private String lastName;  
    private String password;
    private Verification verification;

    public TenantDTO(){

    }

    public TenantDTO(Tenant tenant){
        id=tenant.getId();
        slug= tenant.getSlug();
        email= tenant.getEmail();
        status=tenant.getStatus();
        lastName=tenant.getLastName();
        password=tenant.getPassword();
        verification= tenant.getVerification();
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

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
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

	public Verification getVerification() {
		return verification;
	}

	public void setVerification(Verification verification) {
		this.verification = verification;
	}
	
	
	
	
    
}
