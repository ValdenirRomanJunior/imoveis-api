package com.dynamous.imoveis.controllers;

import com.dynamous.imoveis.dto.LeadDTO;
import com.dynamous.imoveis.dto.LeadNewDTO;
import com.dynamous.imoveis.dto.LeadNewHomeSiteDTO;
import com.dynamous.imoveis.dto.LeadNewSiteDTO;
import com.dynamous.imoveis.dto.OpportunityDTO;
import com.dynamous.imoveis.dto.OpportunityNewDTOCRM;
import com.dynamous.imoveis.dto.OpportunityNewHomeSiteDTO;
import com.dynamous.imoveis.dto.OpportunityNewSiteDetailDTO;
import com.dynamous.imoveis.dto.StateDTO;
import com.dynamous.imoveis.entities.Lead;
import com.dynamous.imoveis.entities.Opportunity;
import com.dynamous.imoveis.entities.Step;
import com.dynamous.imoveis.repositories.LeadRepository;
import com.dynamous.imoveis.repositories.OpportunityRepository;
import com.dynamous.imoveis.services.LeadService;
import com.dynamous.imoveis.services.OpportunityService;
import com.dynamous.imoveis.services.StepService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLDecoder;
import java.util.List;



@RestController
@RequestMapping(value = "/opportunities")
public class OpportunityController {

    @Autowired
    private OpportunityService service;
    
    @Autowired
    private StepService stepService;

    @Autowired
    private OpportunityRepository opportunityRepository;
   
    @PreAuthorize("hasAnyRole('TENANT')")
    @GetMapping(value = "/find/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
        Opportunity opportunity=service.find(id);
        OpportunityDTO opportunityDTO= service.fromDTOFind(opportunity);
        return ResponseEntity.ok().body(opportunityDTO);
    }
 
    @PreAuthorize("hasAnyRole('TENANT')")
    @PostMapping(value="/save")
    public ResponseEntity<Void> saveCRM(@Valid @RequestBody OpportunityNewDTOCRM objDto){	
    	Opportunity obj = service.fromDTOCRM(objDto);  
    	  
        service.insert(obj);       
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").
                  buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }
    
    @PostMapping(value="/saveLeadHome")
    public ResponseEntity<Void> saveHomeSite(@Valid @RequestBody OpportunityNewHomeSiteDTO objDto){   	
    	Opportunity obj = service.fromDTOHomeSite(objDto);  
        service.insert(obj);       
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").
                  buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }
    
    @PostMapping(value="/saveDetailSite")
    public ResponseEntity<Void> saveDetailSite(@Valid @RequestBody OpportunityNewSiteDetailDTO objDto){   	
        Opportunity obj = service.fromDTODetailSite(objDto);
        service.insert(obj);       
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").
                  buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }
      
    @PreAuthorize("hasAnyRole('TENANT')")
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasAnyRole('TENANT')")
    @GetMapping(value = "/page")
    public ResponseEntity <Page<OpportunityDTO>> findPage(
            @RequestParam(value = "page",defaultValue = "0") Integer page,
            @RequestParam(value = "linesPerPage",defaultValue = "12")  Integer linesPerPage,
            @RequestParam(value = "orderBy",defaultValue = "instant")String orderBy,
            @RequestParam(value = "direction",defaultValue = "DESC")  String direction){
    	
        Page<Opportunity> list=service.findPage(page,linesPerPage,orderBy,direction);
        
      Page<OpportunityDTO>listDTO=list.map(x -> new OpportunityDTO(x));
        return ResponseEntity.ok().body(listDTO);
    }
    
    @PreAuthorize("hasAnyRole('TENANT')")
    @GetMapping(value = "/totalOpportunities/{id}")
    public ResponseEntity<?> getTotalLeads(@PathVariable Long id){    	  	
       Long total= opportunityRepository.countOpportunityByTenantId(id);      
        return ResponseEntity.ok().body(total);
    }
    
    public static String decodeParam(String s) {
    	try {
			return URLDecoder.decode(s, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			
			return "";
		}
    }
    
    //pega as estapas com as oportunidades
    @GetMapping(value="/steps")
	public ResponseEntity <List<Step>> findAllStepsWithOpportunities(){

		List<Step> list = stepService.findAll();
		return ResponseEntity.ok().body(list);
	
	}
		
	   @PostMapping(value="/saveStep")
	    public ResponseEntity<Void> saveStep(@Valid @RequestBody Step obj){
		   
	    stepService.insert(obj);       
	        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").
	                  buildAndExpand(obj.getId()).toUri();
	        return ResponseEntity.created(uri).build();
	    }
	   
	    @PreAuthorize("hasAnyRole('TENANT')")
	    @DeleteMapping(value = "/deleteStep/{id}")
	    public ResponseEntity<Void> deleteStep(@PathVariable Long id){
	        stepService.delete(id);
	        return ResponseEntity.noContent().build();
	    }
	
}
