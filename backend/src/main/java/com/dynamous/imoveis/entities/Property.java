package com.dynamous.imoveis.entities;



import javax.persistence.*;

import org.hibernate.annotations.Type;
import org.springframework.data.domain.Page;

import com.dynamous.imoveis.dto.FeatureDTO;
import com.dynamous.imoveis.enums.Feature;
import com.dynamous.imoveis.enums.Goal;
import com.dynamous.imoveis.enums.Perfil;
import com.dynamous.imoveis.enums.StatusFeatured;
import com.dynamous.imoveis.enums.StatusProperty;
import com.dynamous.imoveis.enums.TypeProperty;
import com.dynamous.imoveis.enums.Warranty;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;


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
    @Type(type="org.hibernate.type.TextType")
    private String description;
    private Integer typeProperty;
    private Integer goal;
    private String numberRooms;
    private String suites;
    private String bathRooms;
    private String area;
    private String iptu;
    private String vacancies;
    private String condominium;
    private String price;
    private Integer statusProperty;
    private String areaTotal;
    private Integer statusFeatured;
    private String typeDescription;
    private String rentalprice;
    private String publicationType;
    private String constructionStatus;
    private String propertyAdministrationFee;
    private String floors;
    private String buildings;
    private String permuta;
    private String financeable;
    private String gatedCondominium;
    private String unitFloor;
    	
    		
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name="WARRANTIES")
    private Set<Integer> warranties  =new HashSet<>();
    
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name="FEATURES")
    private Set<Integer> features =new HashSet<>();
    	
    @JsonIgnore
    @OneToMany(mappedBy = "property",cascade = CascadeType.ALL)
    private List<Image> imagesBucket = new ArrayList<Image>();
 
    
    //fetch = FetchType.EAGER,mappedBy = "property",cascade=CascadeType.REMOVE, orphanRemoval = tru
    @OneToMany(mappedBy = "property",fetch = FetchType.EAGER,cascade = CascadeType.REMOVE)
    private List<ImageUrl> images= new ArrayList<ImageUrl>();


    
    //@ManyToOne
    //@JoinColumn(name="tenant_id") 
    //private Tenant tenant;	
    
    @ManyToOne
    @JoinColumn(name="account_id")
    private Account account;
    	

    @OneToOne(mappedBy = "property",cascade = CascadeType.ALL,orphanRemoval = true)
    private Address address;
    
 
    public Property() {
		// TODO Auto-generated constructor stub
	}
   
    public Property(Long id, String name, String description, TypeProperty typeProperty, Goal goal, String numberRooms,String suites,
    		String bathRooms,String area, String iptu,String vacancies,String condominium, String price, String areaTotal, StatusProperty statusProperty, StatusFeatured statusFeatured, String financeable, String permuta) {
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
        this.statusFeatured=statusFeatured.getCod();
        this.financeable=financeable;
        this.permuta=permuta;
        this.suites=suites;
       
   
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
    
    public StatusFeatured getStatusFeatured() {
        return StatusFeatured.toEnum(statusFeatured);
    }

    public void setStatusFeatured(StatusFeatured statusFeatured) {
        this.statusFeatured = statusFeatured.getCod();
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


    public void setAddress(Address address) {
        this.address = address;
    }

    public List<ImageUrl> getImages() {
        return images;
    }

    public void setImages(List<ImageUrl> images) {
        this.images = images;
    }
   


	public List<Image> getImagesBucket() {
		return imagesBucket;
	}

	public void setImagesBucket(List<Image> imagesBucket) {
		this.imagesBucket = imagesBucket;
	}

	
	
	public String getTypeDescription() {
		return TypeProperty.toEnum(typeProperty).getDescription();
	}

	public void setTypeDescription(String typeDescription) {
		this.typeDescription = typeDescription;
	}
	
	public Set<Warranty> getWarranties(){
        return warranties.stream().map(x -> Warranty.toEnum(x)).collect(Collectors.toSet());
    }

    public void addPerfil(Warranty warranty){
        warranties.add(warranty.getCod());
    }
    
	public Set<FeatureDTO> getfeatures(){
        return features.stream().map(x -> FeatureDTO.toDescription(x)).collect(Collectors.toSet());
    }

    public void addFeature(Feature feature){
    	
        features.add(feature.getCod());
    }
    
	public String getRentalprice() {
		return rentalprice;
	}

	public void setRentalprice(String rentalprice) {
		this.rentalprice = rentalprice;
	}

	public String getPublicationType() {
		return publicationType;
	}

	public void setPublicationType(String publicationType) {
		this.publicationType = publicationType;
	}

	
	public String getConstructionStatus() {
		return constructionStatus;
	}

	public void setConstructionStatus(String constructionStatus) {
		this.constructionStatus = constructionStatus;
	}

	public String getPropertyAdministrationFee() {
		return propertyAdministrationFee;
	}

	public void setPropertyAdministrationFee(String propertyAdministrationFee) {
		this.propertyAdministrationFee = propertyAdministrationFee;
	}

	

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	public String getPermuta() {
		return permuta;
	}

	public void setPermuta(String permuta) {
		this.permuta = permuta;
	}

	public String getFinanceable() {
		return financeable;
	}

	public void setFinanceable(String financeable) {
		this.financeable = financeable;
	}

	public String getSuites() {
		return suites;
	}

	public void setSuites(String suites) {
		this.suites = suites;
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
