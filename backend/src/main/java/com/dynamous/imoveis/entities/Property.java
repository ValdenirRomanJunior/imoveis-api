package com.dynamous.imoveis.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name="tb_property")
public class Property implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String title;
	private String description;
	private Double price;
	private Integer beds;
	private Integer baths;
	private Integer built;
	private Integer sqft;
	private String informationLink;
	private String mapLink;
	
	@ElementCollection
	@CollectionTable(name="IMAGES")
	private List<String> images = new ArrayList<>();
	
	
	@JsonManagedReference
	@OneToOne(cascade = CascadeType.ALL, mappedBy = "property")
	private Address address;

	
	public Property() {
		// TODO Auto-generated constructor stub
	}

	public Property(Integer id, String title, String description, Double price, Integer beds, Integer baths, Integer yearBuilt,Integer sqft, String informationLink, String mapLink) {
		super();
		this.id = id;
		this.title = title;
		this.description=description;
		this.price = price;
		this.beds = beds;
		this.baths = baths;
		this.built = yearBuilt;
		this.sqft=sqft;
		this.informationLink=informationLink;
		this.mapLink=mapLink;
			
	}


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getPrice() {
		return price;
	}

	public void sePrice(Double price) {
		this.price = price;
	}


	public Integer getBeds() {
		return beds;
	}

	public void setBeds(Integer beds) {
		this.beds = beds;
	}

	public Integer getBaths() {
		return baths;
	}

	public void setBaths(Integer baths) {
		this.baths = baths;
	}

	public Integer getBuilt() {
		return built;
	}

	public void setBuilt(Integer built) {
		this.built = built;
	}
	

	public Integer getSqft() {
		return sqft;
	}

	public void setSqft(Integer sqft) {
		this.sqft = sqft;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}
	
	

	public String getInformationLink() {
		return informationLink;
	}

	public void setInformationLink(String informationLink) {
		this.informationLink = informationLink;
	}

	public String getMapLink() {
		return mapLink;
	}

	public void setMapLink(String mapLink) {
		this.mapLink = mapLink;
	}
	
	

	public List<String> getImages() {
		return images;
	}

	public void setImages(List<String> images) {
		this.images = images;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
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
		Property other = (Property) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
	
	

}
