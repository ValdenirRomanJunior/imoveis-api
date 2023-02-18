package com.dynamous.imoveis.entities;

import com.dynamous.imoveis.enums.Perfil;
import com.dynamous.imoveis.enums.Status;
import com.dynamous.imoveis.enums.Verification;
import com.dynamous.imoveis.services.validation.TenantInsert;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.util.*;
import java.util.stream.Collectors;


@Entity
public class Tenant implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String slug;

    @Column(unique = true)
    private String email;
    private String password;
    private Integer status;
    private String lastName; 
    private Integer verification; 
    

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name="PERFIS")
    private Set<Integer> perfis = new HashSet<>();

    public Tenant() {
        addPerfil(Perfil.TENANT);
    }

    public Tenant(Long id, String slug, String email, String password, Status status, String lastName, Verification verification) {
        this.id = id;
        this.slug = slug;
        this.email = email;
        this.password = password;
        this.status= (status == null) ? null : status.getCod();
        this.lastName=lastName;
        this.verification=(verification == null) ? null : verification.getCod();
        addPerfil(Perfil.TENANT);

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

    public Status getStatus() {
        return Status.toEnum(status);
    }
    
    public void setStatus(Status status) {
        this.status = status.getCod();
    }
    
    public Verification getVerification() {
        return Verification.toEnum(verification);
    }
    
    public void setVerification(Verification verification) {
        this.verification = verification.getCod();
    }
    
    


    public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Set<Perfil> getPerfis(){
        return perfis.stream().map(x -> Perfil.toEnum(x)).collect(Collectors.toSet());
    }

    public void addPerfil(Perfil perfil){
        perfis.add(perfil.getCod());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Tenant tenant = (Tenant) o;
        return Objects.equals(id, tenant.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder();
        sb.append(getSlug());
        sb.append(",Email: ");
        sb.append(getEmail());
        sb.append('\n');
        return sb.toString();
    }
}
