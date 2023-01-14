package com.dynamous.imoveis.dto;

import java.io.Serializable;


import com.dynamous.imoveis.entities.Property;

public class PropertySimpleDTO implements Serializable{
	
	  private static final long serialVersionUID = 1L;

	    private Long id;
	    private String name;
	    private String description;
	    private String cityName;
	    private String districtName;
	    private String image;
	    


	    public PropertySimpleDTO(){

	    }

	    public PropertySimpleDTO(Property obj) {
	        this.id = obj.getId();
	        this.name = obj.getName();
	        this.description = obj.getDescription();
	        this.cityName=obj.getAddress().getCity().getName();
	        this.districtName=obj.getAddress().getDistrict();
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

		public String getCityName() {
			return cityName;
		}

		public void setCityName(String cityName) {
			this.cityName = cityName;
		}

		public String getDistrictName() {
			return districtName;
		}

		public void setDistrictName(String districtName) {
			this.districtName = districtName;
		}

		public String getImage() {
			return image;
		}

		public void setImage(String image) {
			this.image = image;
		}
	    
	    
	}



