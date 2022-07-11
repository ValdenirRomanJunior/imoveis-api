package com.dynamous.imoveis.dto;


import com.dynamous.imoveis.entities.State;

public class StateDTO {
	
	private Integer id;
	private String name;
	
	public StateDTO() {
		// TODO Auto-generated constructor stub
	}

	public StateDTO(Integer id, String name) {
		super();
		this.id = id;
		this.name = name;
	}
	
	public StateDTO(State state) {
		id = state.getId();
		name = state.getName();
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
