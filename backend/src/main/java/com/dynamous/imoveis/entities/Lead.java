package com.dynamous.imoveis.entities;

import com.dynamous.imoveis.enums.Perfil;
import com.dynamous.imoveis.enums.Status;
import com.dynamous.imoveis.services.validation.TenantInsert;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.util.*;



@Entity
public class Lead implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phone;
    private String message;  
    private String instant;
 
    @Column(columnDefinition = "TEXT")
    private String lpPayload;
    
    private Long propertyId;
   
    	
    @OneToOne(mappedBy = "lead")  
    private Opportunity opportunity;
    
    @ManyToOne
    @JoinColumn(name="account_id")
    private Account account;
    

    
    public Lead(){
     
    }

    public Lead(Long id, String name, String email, String phone, String message,String instant) {
        this.id = id;
        this.name=name;
        this.email = email;    
        this.phone=phone;
        this.message=message;
        this.instant=instant;
    }
    
    public Lead(Long id, String name, String email, String phone, String message,String instant, String lpPayload) {
        this.id = id;
        this.name=name;
        this.email = email;    
        this.phone=phone;
        this.message=message;
        this.instant=instant;
        this.lpPayload = lpPayload;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
  
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	

	public String getInstant() {
		return instant;
	}

	public void setInstant(String instant) {
		this.instant = instant;
	}

	public String getLpPayload() {
		return lpPayload;
	}

	public void setLpPayload(String lpPayload) {
		this.lpPayload = lpPayload;
	}

	public Long getPropertyId() {
		return propertyId;
	}

	public void setPropertyId(Long property) {
		this.propertyId = property;
	}

    public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((account == null) ? 0 : account.hashCode());
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((instant == null) ? 0 : instant.hashCode());
		result = prime * result + ((message == null) ? 0 : message.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((opportunity == null) ? 0 : opportunity.hashCode());
		result = prime * result + ((phone == null) ? 0 : phone.hashCode());
		result = prime * result + ((propertyId == null) ? 0 : propertyId.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Lead other = (Lead) obj;
		if (account == null) {
			if (other.account != null)
				return false;
		} else if (!account.equals(other.account))
			return false;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (instant == null) {
			if (other.instant != null)
				return false;
		} else if (!instant.equals(other.instant))
			return false;
		if (message == null) {
			if (other.message != null)
				return false;
		} else if (!message.equals(other.message))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (opportunity == null) {
			if (other.opportunity != null)
				return false;
		} else if (!opportunity.equals(other.opportunity))
			return false;
		if (phone == null) {
			if (other.phone != null)
				return false;
		} else if (!phone.equals(other.phone))
			return false;
		if (propertyId == null) {
			if (other.propertyId != null)
				return false;
		} else if (!propertyId.equals(other.propertyId))
			return false;
		return true;
	}

	@Override
    public String toString() {
        final StringBuilder sb = new StringBuilder();
        sb.append(getName());
        sb.append(",Email: ");
        sb.append(getEmail());
        sb.append('\n');
        return sb.toString();
    }

	public Opportunity getOpportunity() {
		return opportunity;
	}

	public void setOpportunity(Opportunity opportunity) {
		this.opportunity = opportunity;
	}
}
