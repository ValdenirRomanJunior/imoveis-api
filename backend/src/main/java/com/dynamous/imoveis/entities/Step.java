package com.dynamous.imoveis.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import org.hibernate.validator.constraints.Length;

import com.dynamous.imoveis.services.validation.StepInsert;
import com.dynamous.imoveis.services.validation.StepUpdate;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;



@Entity
public class Step implements Serializable {
	
	   private static final long serialVersionUID = 1L;
	   
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    
	    @NotEmpty(message = "Preenchimento obrigatório")
	    @Length(min=1, max=15, message = "O tamanho deve ter entre 1 e 15 caracteres")
	    private String name;
	    
	  //  @ManyToOne
	   // @JoinColumn(name="tenant_id")
	  //  private Tenant tenant;
	    
	    @ManyToOne
	    @JoinColumn(name="account_id")
	    private Account account;
	    
	    
	    @JsonIgnore
	    @OneToMany(mappedBy = "step")
	    private List<Opportunity> opportunities = new ArrayList<>();
	    
	    public Step() {
			// TODO Auto-generated constructor stub
		}

		public Step(Long id, String name) {
			this.id = id;
			this.name = name;
			
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

		public List<Opportunity> getOpportunities() {
			return opportunities;
		}

		public void setOpportunities(List<Opportunity> opportunities) {
			this.opportunities = opportunities;
		}
		
		

	//	public Tenant getTenant() {
		//	return tenant;
		//}

		//public void setTenant(Tenant tenant) {
		//	this.tenant = tenant;
		//}

	
		public Account getAccount() {
			return account;
		}

		@Override
		public int hashCode() {
			final int prime = 31;
			int result = 1;
			result = prime * result + ((account == null) ? 0 : account.hashCode());
			result = prime * result + ((id == null) ? 0 : id.hashCode());
			result = prime * result + ((name == null) ? 0 : name.hashCode());
			result = prime * result + ((opportunities == null) ? 0 : opportunities.hashCode());
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
			Step other = (Step) obj;
			if (account == null) {
				if (other.account != null)
					return false;
			} else if (!account.equals(other.account))
				return false;
			if (id == null) {
				if (other.id != null)
					return false;
			} else if (!id.equals(other.id))
				return false;
			if (name == null) {
				if (other.name != null)
					return false;
			} else if (!name.equals(other.name))
				return false;
			if (opportunities == null) {
				if (other.opportunities != null)
					return false;
			} else if (!opportunities.equals(other.opportunities))
				return false;
			return true;
		}

		public void setAccount(Account account) {
			this.account = account;
		}



	
		    
	    
}
