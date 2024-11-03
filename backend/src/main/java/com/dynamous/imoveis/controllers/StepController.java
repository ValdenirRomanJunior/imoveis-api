package com.dynamous.imoveis.controllers;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.dynamous.imoveis.dto.CityDTO;
import com.dynamous.imoveis.dto.StepNewDTO;
import com.dynamous.imoveis.dto.StepUpdateDTO;
import com.dynamous.imoveis.entities.City;
import com.dynamous.imoveis.entities.Step;
import com.dynamous.imoveis.repositories.StepRepository;
import com.dynamous.imoveis.services.CityService;
import com.dynamous.imoveis.services.StepService;
import com.dynamous.imoveis.services.exceptions.DataIntegrityException;

@RestController
@RequestMapping(value = "/steps", produces = {MediaType.APPLICATION_JSON_VALUE})
public class StepController {
	
	  @Autowired 
	    private StepRepository stepRepo;
	  
	   @Autowired
	    private StepService stepService;
	    
	   
	   @PostMapping(value="/saveStep", produces = {MediaType.APPLICATION_JSON_VALUE})
	    public ResponseEntity<Void> saveStep(@Valid @RequestBody StepNewDTO obj){
		   Step step= stepService.fromNewStepDTO(obj);
		   stepService.insert(step);       
	        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").
	                  buildAndExpand(obj.getId()).toUri();
	        return ResponseEntity.created(uri).build();
	    }
	
	  @PreAuthorize("hasAnyRole('TENANT')")
	    @PutMapping(value = "/updateStep/{id}", produces = {MediaType.APPLICATION_JSON_VALUE}) 
	    public ResponseEntity<Void> updateStep(@Valid @RequestBody StepUpdateDTO obj, @PathVariable Long id){
		  	obj.setId(id);
		  
		  	stepService.update(obj);	    	        	
	        return ResponseEntity.noContent().build();
	          
	    }  
}
