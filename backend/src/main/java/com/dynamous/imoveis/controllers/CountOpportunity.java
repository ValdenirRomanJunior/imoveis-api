package com.dynamous.imoveis.controllers;

import java.io.Serializable;

public class CountOpportunity implements Serializable{
	private static final long serialVersionUID = 1L;
	
	
	private String name;
	private Long count;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Long getCount() {
		return count;
	}
	public void setCount(Long count) {
		this.count = count;
	}
	
	
	
	
	
		

}
