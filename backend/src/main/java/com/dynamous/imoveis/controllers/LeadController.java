package com.dynamous.imoveis.controllers;

import com.dynamous.imoveis.dto.LeadDTO;
import com.dynamous.imoveis.dto.LeadNewDTO;
import com.dynamous.imoveis.dto.TenantDTO;

import com.dynamous.imoveis.dto.TenantNewDTO;
import com.dynamous.imoveis.entities.Lead;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.repositories.LeadRepository;
import com.dynamous.imoveis.repositories.TenantRepository;
import com.dynamous.imoveis.services.LeadService;
import com.dynamous.imoveis.services.TenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/leads")
public class LeadController {

    @Autowired
    private LeadService service;

    @Autowired
    private LeadRepository leadRepository;
   
   // @PreAuthorize("hasAnyRole('ADMIN')")
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
   

    
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

   
    @GetMapping(value = "/page")
    public ResponseEntity <Page<LeadDTO>> findPage(
            @RequestParam(value = "page",defaultValue = "0") Integer page,
            @RequestParam(value = "linesPerPage",defaultValue = "24")  Integer linesPerPage,
            @RequestParam(value = "orderBy",defaultValue = "id")String orderBy,
            @RequestParam(value = "direction",defaultValue = "ASC")  String direction){
        Page<Lead> list=service.findPage(page,linesPerPage,orderBy,direction);
        Page<LeadDTO>listDTO=list.map(x -> new LeadDTO(x));
        return ResponseEntity.ok().body(listDTO);
    }
    
    @GetMapping(value = "/totalLeads/{id}")
    public ResponseEntity<?> getTotalLeads(@PathVariable Long id){    	  	
       Long total= leadRepository.countLeadByTenantId(id);      
        return ResponseEntity.ok().body(total);
    }
}
