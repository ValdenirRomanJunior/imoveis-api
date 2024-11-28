package com.dynamous.imoveis.controllers;

import com.dynamous.imoveis.dto.TenantDTO;

import com.dynamous.imoveis.dto.TenantNewDTO;
import com.dynamous.imoveis.dto.TenantUpdateDTO;
import com.dynamous.imoveis.dto.UserTenantNewDTO;
import com.dynamous.imoveis.dto.UserTenantUpdateDTO;
import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Perfil;
import com.dynamous.imoveis.enums.Status;
import com.dynamous.imoveis.enums.Verification;
import com.dynamous.imoveis.repositories.TenantRepository;
import com.dynamous.imoveis.security.UserSS;
import com.dynamous.imoveis.services.AccountService;
import com.dynamous.imoveis.services.EmailService;
import com.dynamous.imoveis.services.TenantService;
import com.dynamous.imoveis.services.UserService;
import com.dynamous.imoveis.services.UserTenantService;
import com.dynamous.imoveis.services.exceptions.AuthorizationException;

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
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


/// CONTROLLER PARA CADASTRAR USER TENANTS
@RestController
@RequestMapping(value = "/usertenants", produces = {MediaType.APPLICATION_JSON_VALUE})
public class UserTenantController {
	

    @Autowired
    private UserTenantService service;
    
    @Autowired
    private TenantRepository repo;

    @Autowired
    private AccountService accountService;


    @GetMapping(value = "/find/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> findById(@PathVariable Long id){
        Tenant tenant=service.find(id);
        return ResponseEntity.ok().body(tenant);
    }

    @PreAuthorize("hasAnyRole('ACCOUNT')")
    @PostMapping(value="/save", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Void> save(@Valid @RequestBody UserTenantNewDTO objDto) throws UnknownHostException{
        Tenant obj = service.fromDTO(objDto);

        service.insert(obj);
               
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").
                  buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }
   
    @PreAuthorize("hasAnyRole('ACCOUNT')")
    @PutMapping(value = "/update/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Void> update(@Valid @RequestBody UserTenantUpdateDTO objDto, @PathVariable Long id){
    	
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
    
    @PreAuthorize("hasAnyRole('ACCOUNT')")
    @DeleteMapping(value = "/delete/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Void> delete(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }


    	
    @PreAuthorize("hasAnyRole('ACCOUNT')")
    @GetMapping(value = "/findAll", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity <List<Tenant>> findAll(){
    	
    	 UserSS user = UserService.authenticated();       
         if(user==null || !user.hasRole(Perfil.ACCOUNT)){
             throw new AuthorizationException("Acesso negado");
         }
         Tenant tenant = service.find(user.getId());
         Account account = accountService.find(tenant.getAccount().getId());
        List<Tenant> list=repo.findAllByAccount(account);
      ///  Page<TenantDTO>listDTO=list.map(x -> new TenantDTO(x));
        return ResponseEntity.ok().body(list);
    }
}
