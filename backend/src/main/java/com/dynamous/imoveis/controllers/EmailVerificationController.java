package com.dynamous.imoveis.controllers;

import java.net.UnknownHostException;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.dynamous.imoveis.dto.EmailDTO;
import com.dynamous.imoveis.services.VerifyEmailTenantService;

@RestController
@RequestMapping("/verification")
public class EmailVerificationController {
	
	@Autowired
	private VerifyEmailTenantService verifyEmailTenantService;
	
	@PutMapping(value="/confirmation")
	  public ResponseEntity<Void> emailVerification(@Valid @RequestBody EmailDTO email) throws UnknownHostException{
		verifyEmailTenantService.verifyEmailTenant(email);
		return ResponseEntity.noContent().build();
	}
	
	@PostMapping(value="/resend")
	  public ResponseEntity<Void> resendVerification(@Valid @RequestBody EmailDTO email) throws UnknownHostException{
		verifyEmailTenantService.resendEmailTenant(email);
		return ResponseEntity.noContent().build();
	}
}
