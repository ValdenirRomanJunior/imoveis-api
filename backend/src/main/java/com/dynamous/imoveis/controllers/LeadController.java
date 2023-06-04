package com.dynamous.imoveis.controllers;

import com.dynamous.imoveis.dto.LeadDTO;
import com.dynamous.imoveis.dto.LeadNewDTO;
import com.dynamous.imoveis.dto.LeadNewHomeSiteDTO;
import com.dynamous.imoveis.dto.LeadNewSiteDTO;
import com.dynamous.imoveis.entities.Lead;
import com.dynamous.imoveis.repositories.LeadRepository;
import com.dynamous.imoveis.services.LeadService;
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


@RestController
@RequestMapping(value = "/leads")
public class LeadController {

    @Autowired
    private LeadService service;

    @Autowired
    private LeadRepository leadRepository;
   
    @PreAuthorize("hasAnyRole('TENANT')")
    @GetMapping(value = "/find/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
        Lead lead=service.find(id);
        return ResponseEntity.ok().body(lead);
    }

    
    @PostMapping(value="/save")
    public ResponseEntity<Void> save(@Valid @RequestBody LeadNewDTO objDto){
    	
        Lead obj = service.fromDTO(objDto);
       
        service.insert(obj);       
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").
                  buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }
    
    @PostMapping(value="/saveSite")
    public ResponseEntity<Void> saveSite(@Valid @RequestBody LeadNewSiteDTO objDto){
    	
        Lead obj = service.fromDTOSite(objDto);  
        service.insert(obj);       
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").
                  buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }
    
    @PostMapping(value="/saveLeadHome")
    public ResponseEntity<Void> saveHomeSite(@Valid @RequestBody LeadNewHomeSiteDTO objDto){
    	
        Lead obj = service.fromDTOHomeSite(objDto);  
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
    @GetMapping(value = "/totalLeads/{id}")
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
