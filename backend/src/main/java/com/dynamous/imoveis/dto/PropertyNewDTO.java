package com.dynamous.imoveis.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

public class PropertyNewDTO  implements Serializable{
	private static final long serialVersionUID = 1L; 

	
	
	private String title;
	private String description;	
	private Integer beds;
	private Integer baths;
	private Integer built;
	private Double price;
	private Integer sqft;
	private String street;
	private Integer number;
	
	private Integer cityId;	
	private Integer countyId;	
	private Integer stateId;
	private String informationLink;
	private String mapLink;
	
	@JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
	private List<String> images = new ArrayList<>();

	public PropertyNewDTO() {
	
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

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public Integer getNumber() {
		return number;
	}

	public void setNumber(Integer number) {
		this.number = number;
	}

	public Integer getCityId() {
		return cityId;
	}

	public void setCity(Integer cityId) {
		this.cityId = cityId;
	}

	public Integer getCountyId() {
		return countyId;
	}

	public void setCounty(Integer countyId) {
		this.countyId = countyId;
	}

	public Integer getStateId() {
		return stateId;
	}

	public void setState(Integer stateId) {
		this.stateId = stateId;
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



	
	
}
