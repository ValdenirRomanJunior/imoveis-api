package com.dynamous.imoveis.entities;



import javax.persistence.*;

import org.springframework.data.domain.Page;

import com.dynamous.imoveis.enums.Goal;
import com.dynamous.imoveis.enums.StatusProperty;
import com.dynamous.imoveis.enums.TypeProperty;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "property")
@NamedEntityGraph(name = Property.WITH_ADDRESS_AND_CITY_GRAPH,
attributeNodes = {
        @NamedAttributeNode(
                value = "address",
                subgraph = "city-subgraph"
        )
},
subgraphs = {
        @NamedSubgraph(
                name = "city-subgraph",
                attributeNodes =
                        {
                                @NamedAttributeNode("city")
                        }
        )
}
)
public class Property implements Serializable {
    private static final long serialVersionUID = 1L;

    public static final String WITH_ADDRESS_AND_CITY_GRAPH = "graph.Property.address.city";
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private Integer typeProperty;
    private Integer goal;
    private String numberRooms;
    private String bathRooms;
    private String area;
    private String iptu;
    private String vacancies;
    private String condominium;
    private String price;
    private Integer statusProperty;
    private String areaTotal;
    
    
    
    //fetch = FetchType.EAGER,mappedBy = "property",cascade=CascadeType.REMOVE, orphanRemoval = tru
    @OneToMany(mappedBy = "property",fetch = FetchType.EAGER,cascade = CascadeType.REMOVE)
    private List<ImageUrl> images= new ArrayList<ImageUrl>();



    @ManyToOne
    @JoinColumn(name="tenant_id") 
    private Tenant tenant;

    @OneToOne(mappedBy = "property",cascade = CascadeType.ALL,orphanRemoval = true)
    private Address address;
    
 
    public Property() {
		// TODO Auto-generated constructor stub
	}
   
    public Property(Long id, String name, String description, TypeProperty typeProperty, Goal goal, String numberRooms,
    		String bathRooms,String area, String iptu,String vacancies,String condominium, String price, String areaTotal, StatusProperty statusProperty) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.typeProperty = (typeProperty == null) ? null : typeProperty.getCod();
        this.goal = (goal == null) ? null : goal.getCod();
        this.numberRooms=numberRooms;
        this.bathRooms=bathRooms;
        this.area=area;
        this.iptu=iptu;
        this.vacancies=vacancies;
        this.condominium=condominium;
        this.price=price;
        this.areaTotal=areaTotal;
        this.statusProperty= statusProperty.getCod();
       
     

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TypeProperty getTypeProperty() {
        return TypeProperty.toEnum(typeProperty);
    }

    public void setTypeProperty(TypeProperty typeProperty) {
        this.typeProperty = typeProperty.getCod();
    }

    public Goal getGoal() {
        return Goal.toEnum(goal);
    }

    public void setGoal(Goal goal) {
        this.goal = goal.getCod();
    }
    
    public StatusProperty getStatusProperty() {
        return StatusProperty.toEnum(statusProperty);
    }

    public void setStatusProperty(StatusProperty statusProperty) {
        this.statusProperty = statusProperty.getCod();
    }
    
    public String getNumberRooms() {
		return numberRooms;
	}

	public void setNumberRooms(String numberRooms) {
		this.numberRooms = numberRooms;
	}

	public String getBathRooms() {
		return bathRooms;
	}

	public void setBathRooms(String bathRooms) {
		this.bathRooms = bathRooms;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getIptu() {
		return iptu;
	}

	public void setIptu(String iptu) {
		this.iptu = iptu;
	}

	public String getVacancies() {
		return vacancies;
	}

	public void setVacancies(String vacancies) {
		this.vacancies = vacancies;
	}

	public String getCondominium() {
		return condominium;
	}

	public void setCondominium(String condominium) {
		this.condominium = condominium;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	

	public String getAreaTotal() {
		return areaTotal;
	}

	public void setAreaTotal(String areaTotal) {
		this.areaTotal = areaTotal;
	}

	public Tenant getTenant() {
        return tenant;
    }

    public void setTenant(Tenant tenantId) {
        this.tenant = tenantId;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public List<ImageUrl> getImages() {
        return images;
    }

    public void setImages(List<ImageUrl> images) {
        this.images = images;
    }
   


	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Property property = (Property) o;
        return Objects.equals(id, property.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }


    public Address getAddress() {
        return address;
    }
}
