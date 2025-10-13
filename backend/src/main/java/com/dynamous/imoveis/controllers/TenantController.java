package com.dynamous.imoveis.controllers;

import com.dynamous.imoveis.dto.TenantDTO;
import com.dynamous.imoveis.dto.TenantNewDTO;
import com.dynamous.imoveis.dto.TenantRegistrationResponseDTO;
import com.dynamous.imoveis.dto.TenantUpdateDTO;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Status;
import com.dynamous.imoveis.enums.Verification;
import com.dynamous.imoveis.repositories.TenantRepository;
import com.dynamous.imoveis.services.EmailService;
import com.dynamous.imoveis.services.TenantService;
import com.dynamous.imoveis.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.net.UnknownHostException;
import java.util.List;
import java.util.stream.Collectors;


/// CONTROLLER PARA ACCOUNTS
@RestController
@RequestMapping(value = "/tenants", produces = {MediaType.APPLICATION_JSON_VALUE})
public class TenantController {
	

    @Autowired
    private TenantService service;
    
    @Autowired
    private NotificationService notificationService;

   
   // @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping(value = "/find/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> findById(@PathVariable Long id){
        Tenant tenant=service.find(id);
        return ResponseEntity.ok().body(tenant);
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @PostMapping(value="/save", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Void> save(@Valid @RequestBody TenantNewDTO objDto) throws UnknownHostException{
        Tenant obj = service.fromDTO(objDto);

        service.insert(obj);
               
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").
                  buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PostMapping(value="/register", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<TenantRegistrationResponseDTO> register(@Valid @RequestBody TenantNewDTO objDto) throws UnknownHostException{
        Tenant obj = service.fromDTO(objDto);
        Tenant savedTenant = service.insert(obj);
        
        // Criar notificação para novo usuário cadastrado
        notificationService.createNewUserNotification(
            savedTenant.getId(), 
            savedTenant.getSlug(), 
            savedTenant.getEmail()
        );
        
        // Usar a senha gerada automaticamente que está armazenada em plainPassword
        TenantRegistrationResponseDTO response = new TenantRegistrationResponseDTO(savedTenant, savedTenant.getPlainPassword());
        return ResponseEntity.ok(response);
    }
   
    @PreAuthorize("hasAnyRole('ADMIN')")
    @PutMapping(value = "/update/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Void> update(@Valid @RequestBody TenantUpdateDTO objDto, @PathVariable Long id){
    	
    	if(objDto.getPassword() ==null || objDto.getPassword().isEmpty()) {
    		Tenant tenantAux=service.find(id);
    		objDto.setId(id);
    		objDto.setPassword(tenantAux.getPassword());
    		  Tenant tenant= service.fromUpdateDTO(objDto);
    		  	tenant.setPassword(tenantAux.getPassword());
    	        tenant.setId(id);
    	        tenant=service.update(tenant);
    	        return ResponseEntity.noContent().build();
    	}
    		
    	objDto.setId(id);
    	
        Tenant tenant= service.fromUpdateDTO(objDto);
        tenant.setId(id);
        tenant=service.update(tenant);
        return ResponseEntity.noContent().build();

    }
    
    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping(value = "/delete/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Void> delete(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping(value = "/page", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity <Page<Tenant>> findPage(
            @RequestParam(value = "page",defaultValue = "0") Integer page,
            @RequestParam(value = "linesPerPage",defaultValue = "24")  Integer linesPerPage,
            @RequestParam(value = "orderBy",defaultValue = "slug")String orderBy,
            @RequestParam(value = "direction",defaultValue = "ASC")  String direction){
        Page<Tenant> list=service.findPage(page,linesPerPage,orderBy,direction);
      ///  Page<TenantDTO>listDTO=list.map(x -> new TenantDTO(x));
        return ResponseEntity.ok().body(list);
    }
}
