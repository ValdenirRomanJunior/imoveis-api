package com.dynamous.imoveis.dto;

import com.dynamous.imoveis.entities.Address;
import com.dynamous.imoveis.entities.Property;

public class PropertyDTO {

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
	
	
	private Address address;
	
	public PropertyDTO() {
		// TODO Auto-generated constructor stub
	}

	public PropertyDTO(Integer id, String title,String description, Double price, Integer beds, Integer baths, Integer built, Integer sqft, Address address,  String informationLink, String mapLink) {
		this.id = id;
		this.title = title;
		this.description=description;
		this.price = price;
		this.beds = beds;
		this.baths = baths;
		this.built = built;
		this.sqft=sqft;
		this.address=address;
		this.informationLink=informationLink;
		this.mapLink=mapLink;
		}
	public PropertyDTO(Property property) {
		id = property.getId();
		title =property.getTitle();
		description=property.getDescription();
		price = property.getPrice();
		beds = property.getBeds();
		baths = property.getBaths();
		built = property.getBuilt();
		sqft=property.getSqft();
		address=property.getAddress();
		informationLink=property.getInformationLink();
		mapLink=property.getMapLink();
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

	public void setPrice(Double price) {
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
	
	
}
