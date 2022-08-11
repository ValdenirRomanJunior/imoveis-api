package com.dynamous.imoveis.dto;

import com.dynamous.imoveis.services.validation.TenantInsert;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;

@TenantInsert
public class TenantNewDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    @NotEmpty(message = "Preenchimento obrigatório")
    @Length(min=5, max=80, message = "O tamanho deve ser entre 5 e 80 caracteres")
    private String slug;

    @NotEmpty(message = "Preenchimento obrigatório")
    @Email
    private String email;

    @NotEmpty(message = "Preenchimento obrigatório")
    @Length(min=8, max=20, message = "O tamanho deve ser entre 8 e 20 caracteres")
    private String password;

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
}
