package com.dynamous.imoveis.entities;

import com.dynamous.imoveis.enums.Perfil;
import com.dynamous.imoveis.enums.Status;
import com.dynamous.imoveis.enums.Verification;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
public class UserAdmin implements Serializable {
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
    private String creci;
    private String start;
    private String endDate;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name="USER_ADMIN_PERFIS")
    private Set<Integer> perfis = new HashSet<>();

    public UserAdmin(){
        addPerfil(Perfil.ADMIN);

    }

    public UserAdmin(Long id, String slug, String email, String password, Status status, String lastName, Verification verification,String creci,String start, String endDate) {
        this.id = id;
        this.slug = slug;
        this.email = email;
        this.password = password;
        this.status= (status == null) ? null : status.getCod();
        this.lastName=lastName;
        this.verification=(verification == null) ? null : verification.getCod();
        this.creci=creci;
        this.start=start;
        this.endDate=endDate;
        addPerfil(Perfil.ADMIN);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Set<Perfil> getPerfis(){
        return perfis.stream().map(x -> Perfil.toEnum(x)).collect(Collectors.toSet());
    }

    public void addPerfil(Perfil perfil){
        perfis.add(perfil.getCod());
    }
    
    

    public String getSlug() {
		return slug;
	}

	public void setSlug(String slug) {
		this.slug = slug;
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

	 public Verification getVerification() {
	        return Verification.toEnum(verification);
	    }
	    
	    public void setVerification(Verification verification) {
	        this.verification = (verification == null) ? null : verification.getCod();
	    }
	    
	
	

	public String getCreci() {
		return creci;
	}

	public void setCreci(String creci) {
		this.creci = creci;
	}

	public String getStart() {
		return start;
	}

	public void setStart(String start) {
		this.start = start;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserAdmin userAdmin = (UserAdmin) o;
        return Objects.equals(id, userAdmin.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
