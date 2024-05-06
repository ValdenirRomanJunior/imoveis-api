package com.dynamous.imoveis.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.dynamous.imoveis.dto.CityDTO;
import com.dynamous.imoveis.dto.StateDTO;
import com.dynamous.imoveis.entities.City;
import com.dynamous.imoveis.entities.State;
import com.dynamous.imoveis.services.CityService;
import com.dynamous.imoveis.services.StateService;

@RestController
@RequestMapping(value="/states")
public class StateController {
	
	@Autowired
	private StateService stateService;
	
	@Autowired
	private CityService cityService;
	
	@GetMapping
	public ResponseEntity <List<StateDTO>> findAll(){
		//bsucar somente estados do tenant
		List<State> list = stateService.findAll();
		List<StateDTO> listDto=list.stream().map(x -> new StateDTO(x)).collect(Collectors.toList());
		return ResponseEntity.ok().body(listDto);
		
	}
	
	@GetMapping(value = "/{stateId}/cities")
	public ResponseEntity <List<CityDTO>> findCitiesByState(@PathVariable Long stateId){
		List<City> list= cityService.findByState(stateId);
		List<CityDTO> listDTO= list.stream().map(x -> new CityDTO(x)).collect(Collectors.toList());
		return ResponseEntity.ok().body(listDTO);
		
	}
	


}
