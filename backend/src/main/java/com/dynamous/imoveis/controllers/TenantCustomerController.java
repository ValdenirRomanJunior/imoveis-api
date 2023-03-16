package com.dynamous.imoveis.controllers;

import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.entities.TenantCustomer;
import com.dynamous.imoveis.services.TenantCustomerService;
import com.dynamous.imoveis.services.TenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/tenantCustomers")
public class TenantCustomerController {



    @GetMapping(value = "/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
      
        return ResponseEntity.ok().body("");
    }
}
