package com.dynamous.imoveis.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dynamous.imoveis.dto.PropertyDTO;
import com.dynamous.imoveis.services.PropertyService;

@RestController
@RequestMapping(value = "/properties")
public class PropertyController {
	
	@Autowired
	private PropertyService service;
	
	@GetMapping
	public Page<PropertyDTO> findAll(Pageable pageable){
		return service.findAll(pageable);
	}
	@GetMapping(value = "/{id}")
	public PropertyDTO findById(@PathVariable Integer id){
		return service.findById(id);
	}
	
	

}
