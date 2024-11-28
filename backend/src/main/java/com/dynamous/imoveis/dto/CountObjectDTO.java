package com.dynamous.imoveis.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.dynamous.imoveis.entities.City;

public class CountObjectDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	
	private List<String> categories = new ArrayList<String>();
	private List<Long> data = new ArrayList<Long>();
	
	public List<String> getCategories() {
		return categories;
	}
	public void setCategories(List<String> categories) {
		this.categories = categories;
	}
	public List<Long> getData() {
		return data;
	}
	public void setData(List<Long> data) {
		this.data = data;
	}
	
	
	 

}
