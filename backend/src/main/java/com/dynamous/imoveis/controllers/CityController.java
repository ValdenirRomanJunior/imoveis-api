package com.dynamous.imoveis.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.dynamous.imoveis.dto.CityDTO;
import com.dynamous.imoveis.entities.City;
import com.dynamous.imoveis.services.CityService;

@RestController
public class CityController {
	
	@Autowired
	private CityService cityService;
	
	public ResponseEntity<List<CityDTO>> findAll(){	
		List<City> cities= cityService.findAll();
		List<CityDTO> citiesDTO = cities.stream().map(x -> new CityDTO(x)).collect(Collectors.toList());
		return ResponseEntity.ok().body(citiesDTO);
	}

}
