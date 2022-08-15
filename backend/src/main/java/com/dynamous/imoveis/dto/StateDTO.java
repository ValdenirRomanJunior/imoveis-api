package com.dynamous.imoveis.dto;

import java.io.Serializable;

import com.dynamous.imoveis.entities.State;

public class StateDTO implements Serializable{
	private static final long serialVersionUID = 1L;

	private Long id;
	private String name;
	
	public StateDTO() {
		// TODO Auto-generated constructor stub
	}
	
	public StateDTO(State estado){
		this.id=estado.getId();
		this.name=estado.getName();
		
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
