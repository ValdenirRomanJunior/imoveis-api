package com.dynamous.imoveis.controllers;

import com.dynamous.imoveis.dto.LeadDTO;
import com.dynamous.imoveis.dto.LeadNewDTO;
import com.dynamous.imoveis.dto.LeadNewHomeSiteDTO;
import com.dynamous.imoveis.dto.LeadNewSiteDTO;
import com.dynamous.imoveis.dto.LeadUpdateDTO;
import com.dynamous.imoveis.dto.PropertyUpdateDTO;
import com.dynamous.imoveis.entities.Lead;
import com.dynamous.imoveis.entities.Opportunity;
import com.dynamous.imoveis.entities.Property;
import com.dynamous.imoveis.entities.Step;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.repositories.LeadRepository;
import com.dynamous.imoveis.repositories.OpportunityRepository;
import com.dynamous.imoveis.repositories.StepRepository;
import com.dynamous.imoveis.repositories.TenantRepository;
import com.dynamous.imoveis.services.LeadService;
import com.dynamous.imoveis.services.OpportunityService;
import com.dynamous.imoveis.services.StepService;
import com.dynamous.imoveis.services.TenantService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLDecoder;


@RestController
@RequestMapping(value = "/leads", produces = {MediaType.APPLICATION_JSON_VALUE})
public class LeadController {

    @Autowired
    private LeadService service;
    
    @Autowired
    private StepService stepService;
    
    @Autowired
    private OpportunityService opService;
    
    @Autowired
    private TenantService tenantService;

    @Autowired
    private LeadRepository leadRepository;
    
    @Autowired
    private TenantRepository tenRepository;
    
    @Autowired
    private OpportunityRepository opRepository;
    
    @Autowired 
    private StepRepository stepRepo;
    
   
    @PreAuthorize("hasAnyRole('TENANT')")
    @GetMapping(value = "/find/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> findById(@PathVariable Long id){
        Lead lead=service.find(id);
        LeadDTO leadDTO= service.fromDTOInverse(lead);
        return ResponseEntity.ok().body(leadDTO);
    }

      
    @PreAuthorize("hasAnyRole('TENANT')")
    @DeleteMapping(value = "/delete/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Void> delete(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    @PreAuthorize("hasAnyRole('TENANT')")
    @PutMapping(value = "/update/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Void> update(@Valid @RequestBody LeadUpdateDTO leadUpdateDTO, @PathVariable Long id){
    	leadUpdateDTO.setId(id);	    		     				
        service.update(leadUpdateDTO);
        return ResponseEntity.noContent().build();

    }
    @PreAuthorize("hasAnyRole('TENANT')")
    @PutMapping(value = "/updateStepLead/{id}/{stepId}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Void> update(@PathVariable Long id, @PathVariable Long stepId){
    
    	Lead lead= service.find(id);
    	Step step= stepService.find(stepId);
    	Tenant tenant= tenantService.find(lead.getTenant().getId());
    	lead.setTenant(tenant);
    	Opportunity opportunity= opService.find(lead.getOpportunity().getId());
    	opportunity.setStep(step);
    	lead.setOpportunity(opportunity);
    	opRepository.save(opportunity);
    	tenRepository.save(tenant);
    	stepRepo.save(step);
        service.updateLeadStep(lead);
        return ResponseEntity.noContent().build();

    }

    @PreAuthorize("hasAnyRole('TENANT')")
    @GetMapping(value = "/page", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity <Page<LeadDTO>> findPage(
    		@RequestParam(value = "name",defaultValue = "") String name,
            @RequestParam(value = "page",defaultValue = "0") Integer page,
            @RequestParam(value = "linesPerPage",defaultValue = "12")  Integer linesPerPage,
            @RequestParam(value = "orderBy",defaultValue = "instant")String orderBy,
            @RequestParam(value = "direction",defaultValue = "DESC")  String direction){
    	
    	String nameDecoded = decodeParam(name);
        Page<Lead> list=service.findPage(nameDecoded,page,linesPerPage,orderBy,direction);
        
        Page<LeadDTO>listDTO=list.map(x -> new LeadDTO(x));
        return ResponseEntity.ok().body(listDTO);
    }
    
    @PreAuthorize("hasAnyRole('TENANT')")
    @GetMapping(value = "/totalLeads/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> getTotalLeads(@PathVariable Long id){    	  	
       Long total= leadRepository.countLeadByTenantId(id);      
        return ResponseEntity.ok().body(total);
    }
    
    public static String decodeParam(String s) {
    	try {
			return URLDecoder.decode(s, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			
			return "";
		}
    }
    
  
}
