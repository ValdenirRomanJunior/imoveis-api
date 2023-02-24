package com.dynamous.imoveis.controllers;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dynamous.imoveis.dto.CityDTO;
import com.dynamous.imoveis.dto.EmailDTO;
import com.dynamous.imoveis.dto.TenantUpdateDTO;
import com.dynamous.imoveis.entities.City;
import com.dynamous.imoveis.services.CityService;
import com.dynamous.imoveis.services.VerifyEmailTenantService;

@RestController
@RequestMapping("/verification")
public class EmailVerificationController {
	
	@Autowired
	private VerifyEmailTenantService verifyEmailTenantService;
	
	@PutMapping(value="/confirmation")
	  public ResponseEntity<Void> emailVerification(@Valid @RequestBody EmailDTO email){
		verifyEmailTenantService.verifyEmailTenant(email);
		return ResponseEntity.noContent().build();
	}
}
