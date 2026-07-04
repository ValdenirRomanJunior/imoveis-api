package com.dynamous.imoveis.controllers;

import com.dynamous.imoveis.dto.LeadDTO;
import com.dynamous.imoveis.dto.LeadNewDTO;
import com.dynamous.imoveis.dto.LeadNewHomeSiteDTO;
import com.dynamous.imoveis.dto.LeadNewSiteDTO;
import com.dynamous.imoveis.dto.OpportunityDTO;
import com.dynamous.imoveis.dto.OpportunityNewDTOCRM;
import com.dynamous.imoveis.dto.OpportunityNewHomeSiteDTO;
import com.dynamous.imoveis.dto.OpportunityNewSiteDetailDTO;
import com.dynamous.imoveis.dto.OpportunityLPDTO;
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
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;



@RestController
@RequestMapping(value = "/opportunities", produces = {MediaType.APPLICATION_JSON_VALUE})
public class OpportunityController {

    @Autowired
    private OpportunityService service;
    
    @Autowired
    private StepService stepService;


    @Autowired
    private OpportunityRepository opportunityRepository;
   
    @PreAuthorize("hasAnyRole('TENANT')")
    @GetMapping(value = "/find/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> findById(@PathVariable Long id){
        Opportunity opportunity=service.find(id);
        OpportunityDTO opportunityDTO= service.fromDTOFind(opportunity);
        return ResponseEntity.ok().body(opportunityDTO);
    }
 
    @PreAuthorize("hasAnyRole('TENANT')")
    @PostMapping(value="/save", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Void> saveCRM(@Valid @RequestBody OpportunityNewDTOCRM objDto){	
    	Opportunity obj = service.fromDTOCRM(objDto);  	
    	  
        service.insert(obj);       
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").
                  buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

     
    @PostMapping(value="/saveLeadHome", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Void> saveHomeSite(@Valid @RequestBody OpportunityNewHomeSiteDTO objDto){   	
    	Opportunity obj = service.fromDTOHomeSite(objDto);  
        service.insert(obj);  
     
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").
                  buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }
    
    @PostMapping(value="/saveDetailSite", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Void> saveDetailSite(@Valid @RequestBody OpportunityNewSiteDetailDTO objDto){   	
        Opportunity obj = service.fromDTODetailSite(objDto);
        service.insert(obj);       
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").
                  buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }
    
    @PostMapping(value="/saveLp", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Void> saveLp(@Valid @RequestBody OpportunityLPDTO objDto){   	
        Opportunity obj = service.fromDTOLP(objDto);
        service.insert(obj);       
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").
                  buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PreAuthorize("hasAnyRole('TENANT')")
    @DeleteMapping(value = "/delete/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Void> delete(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasAnyRole('TENANT')")
    @GetMapping(value = "/page", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity <List<OpportunityDTO>> findPage(){
    	
        List<Opportunity> list=service.findAll();
        
      List<OpportunityDTO>listDTO=list.stream().map(x-> new OpportunityDTO(x)).collect(Collectors.toList());      
        return ResponseEntity.ok().body(listDTO);
    }
    
    @PreAuthorize("hasAnyRole('TENANT')")
    @GetMapping(value = "/totalOpportunities/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> getTotalLeads(@PathVariable Long id){    	  	
       Long total= opportunityRepository.countOpportunityByAccountId(id);      
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
    @GetMapping(value="/steps", produces = {MediaType.APPLICATION_JSON_VALUE,MediaType.APPLICATION_XML_VALUE})
	public ResponseEntity <List<Step>> findAllStepsWithOpportunities(){
		List<Step> list = stepService.findAll();
		return ResponseEntity.ok().body(list);
	
	}
    
    @GetMapping(value="/stepsName", produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity <List<String>> findStepsName(){
		List<Step> list = stepService.findAll();
		List<String>listName= new ArrayList<String>();
		for(Step l:list) {
			listName.add(l.getName());
		}
		return ResponseEntity.ok().body(listName);
	
	}
    @GetMapping(value="/countOpportByStep", produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity <List<CountOpportunity>> findCountOppByStepName(){
		List<CountOpportunity> list = service.countByStepName();
	
		return ResponseEntity.ok().body(list);
	
	}
		
		   
	    @PreAuthorize("hasAnyRole('TENANT')")
	    @DeleteMapping(value = "/deleteStep/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
	    public ResponseEntity<Void> deleteStep(@PathVariable Long id){
	        stepService.delete(id);
	        return ResponseEntity.noContent().build();
	    }
	   
	   
	    @GetMapping(value="/SSe", produces = {MediaType.TEXT_EVENT_STREAM_VALUE})
		public SseEmitter subscribe(){
	    
			SseEmitter emitter = new  SseEmitter(Long.MAX_VALUE);
			service.adEmitter(emitter);
			return emitter;
		
		}
			
}
