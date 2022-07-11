package com.dynamous.imoveis.dto;

import com.dynamous.imoveis.entities.City;

public class CityDTO {
	
	private Integer id;
	private String name;
	
	public CityDTO() {
		// TODO Auto-generated constructor stub
	}

	public CityDTO(Integer id, String name) {
		super();
		this.id = id;
		this.name = name;
	}
	
	public CityDTO(City city) {
		id = city.getId();
		name = city.getName();
	}
	

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	

}
