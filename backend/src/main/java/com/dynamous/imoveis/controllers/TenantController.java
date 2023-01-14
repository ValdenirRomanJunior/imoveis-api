package com.dynamous.imoveis.controllers;

import com.dynamous.imoveis.dto.TenantDTO;

import com.dynamous.imoveis.dto.TenantNewDTO;
import com.dynamous.imoveis.entities.Tenant;
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
@RequestMapping(value = "/tenants")
public class TenantController {

    @Autowired
    private TenantService service;

   
    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping(value = "/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
        Tenant tenant=service.find(id);
        return ResponseEntity.ok().body(tenant);
    }

    
    @PostMapping()
    public ResponseEntity<Void> save(@Valid @RequestBody TenantNewDTO objDto){
        Tenant obj = service.fromDTO(objDto);

        service.insert(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").
                  buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }
   
    @PutMapping(value = "/{id}")
    public ResponseEntity<Void> update(@Valid @RequestBody TenantDTO objDto, @PathVariable Long id){
        Tenant tenant= service.fromDTO(objDto);
        tenant.setId(id);
        tenant=service.update(tenant);
        return ResponseEntity.noContent().build();

    }
    
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

   
    @GetMapping(value = "/page")
    public ResponseEntity <Page<TenantDTO>> findPage(
            @RequestParam(value = "page",defaultValue = "0") Integer page,
            @RequestParam(value = "linesPerPage",defaultValue = "24")  Integer linesPerPage,
            @RequestParam(value = "orderBy",defaultValue = "slug")String orderBy,
            @RequestParam(value = "direction",defaultValue = "ASC")  String direction){
        Page<Tenant> list=service.findPage(page,linesPerPage,orderBy,direction);
        Page<TenantDTO>listDTO=list.map(x -> new TenantDTO(x));
        return ResponseEntity.ok().body(listDTO);
    }
}
