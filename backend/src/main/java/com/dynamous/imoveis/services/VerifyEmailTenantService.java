package com.dynamous.imoveis.services;

import java.net.UnknownHostException;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.dynamous.imoveis.dto.EmailDTO;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Verification;
import com.dynamous.imoveis.repositories.TenantRepository;
import com.dynamous.imoveis.services.exceptions.UserNameNotFoundException;

@Service
public class VerifyEmailTenantService {
	
	@Autowired	
	private TenantRepository tenantRepository;
	
	@Autowired
	private TenantService tenantService;
	
	@Autowired
	private EmailService emailService;
	
	public void verifyEmailTenant(EmailDTO emailDto) throws UnknownHostException {
		
			Tenant tenant = tenantRepository.findByEmail(emailDto.getEmail());				
			 if (tenant == null){
		           throw new UserNameNotFoundException("Usuario não encontrado");
			 }
			 if(tenant.getVerification().equals(Verification.VERIFICADO)) {
				 throw new com.dynamous.imoveis.services.exceptions.IllegalArgumentException("Cadastro já verificado");
			 }
			 tenant.setVerification(Verification.VERIFICADO);	 
			 tenantService.update(tenant);
			 
			 emailService.sendRegistrationHtmlEmail(tenant);
			 
						 
	}
	
	public void resendEmailTenant(EmailDTO emailDto) throws UnknownHostException {
		
		Tenant tenant = tenantRepository.findByEmail(emailDto.getEmail());				
		 if (tenant == null){
	           throw new UserNameNotFoundException("Usuario não encontrado");
		 }
		 if(tenant.getVerification().equals(Verification.VERIFICADO)) {
			 throw new com.dynamous.imoveis.services.exceptions.IllegalArgumentException("Cadastro já verificado");
		 }
		 
		 emailService.sendVerificationHtmlEmail(tenant);
		 					 
}
	


}
