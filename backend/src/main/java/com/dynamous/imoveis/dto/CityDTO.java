package com.dynamous.imoveis.dto;

import java.io.Serializable;

import com.dynamous.imoveis.entities.City;

public class CityDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	
	private Long id;
	private String name;
	
	public CityDTO() {
		// TODO Auto-generated constructor stub
	}
	
	public CityDTO(City city) {
		id=city.getId();
		name=city.getName();
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
	
	

}
