package com.dynamous.imoveis.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.dynamous.imoveis.dto.CityDTO;
import com.dynamous.imoveis.dto.PropertyDTO;
import com.dynamous.imoveis.dto.PropertyNewDTO;
import com.dynamous.imoveis.entities.City;
import com.dynamous.imoveis.entities.Property;
import com.dynamous.imoveis.services.CityService;
import com.dynamous.imoveis.services.PropertyService;

@RestController
@RequestMapping(value = "/cities")
public class CityController {
	
	@Autowired
	private CityService service;
	
	@GetMapping
	public List<CityDTO> findAll(){
		return service.findAll();
	}

	
	@PostMapping
	public ResponseEntity<Void> save(@RequestBody CityDTO cityDTO){
		City city=service.fromDTO(cityDTO);
		service.save(city);
		URI uri= ServletUriComponentsBuilder.fromCurrentRequest()
		.path("/{id}").buildAndExpand(city.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}
	

	
	

}
