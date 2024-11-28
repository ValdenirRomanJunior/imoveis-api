package com.dynamous.imoveis.dto;

import java.io.Serializable;

import com.dynamous.imoveis.entities.City;
import com.dynamous.imoveis.enums.Feature;

public class FeatureDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	
	private int id;
	private String name;
	
	public FeatureDTO() {
		// TODO Auto-generated constructor stub
	}
	public FeatureDTO(Feature feature) {
		id=feature.getCod();
		name=feature.getDescription();
	}
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	 public static FeatureDTO toDescription(Integer cod) {
	        if (cod == null) {
	            return null;
	        }
	        for (Feature x : Feature.values()) {
	            if (cod.equals(x.getCod())) {           
	                return new FeatureDTO(x);
	            }
	        }
	            throw new com.dynamous.imoveis.services.exceptions.IllegalArgumentException("Tipo invalido"+ cod);
	        }

}
