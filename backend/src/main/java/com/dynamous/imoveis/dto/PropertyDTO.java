package com.dynamous.imoveis.dto;

import com.dynamous.imoveis.entities.Property;

public class PropertyDTO {

	private Integer id;
	private String title;
	private Double price;
	private String image;
	private Integer beds;
	private Integer baths;
	private Integer built;
	
	public PropertyDTO() {
		// TODO Auto-generated constructor stub
	}

	public PropertyDTO(Integer id, String title, Double price, String image, Integer beds, Integer baths, Integer built) {
		this.id = id;
		this.title = title;
		this.price = price;
		this.image = image;
		this.beds = beds;
		this.baths = baths;
		this.built = built;
	}
	public PropertyDTO(Property property) {
		id = property.getId();
		title =property.getTitle();
		price = property.getPrice();
		image = property.getImage();
		beds = property.getBeds();
		baths = property.getBaths();
		built = property.getBuilt();
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

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
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
	
	
}
