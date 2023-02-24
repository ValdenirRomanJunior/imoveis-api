package com.dynamous.imoveis.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.dynamous.imoveis.dto.EmailDTO;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Verification;
import com.dynamous.imoveis.repositories.TenantRepository;

@Service
public class VerifyEmailTenantService {
	
	@Autowired	
	private TenantRepository tenantRepository;
	
	@Autowired
	private TenantService tenantService;
	
	
	public void verifyEmailTenant(EmailDTO emailDto) {
		
			
			Tenant tenant = tenantRepository.findByEmail(emailDto.getEmail());
	
			 if (tenant == null){
		           throw new UsernameNotFoundException(emailDto.getEmail());
			 }
			 if(tenant.getVerification().equals(Verification.VERIFICADO)) {
				 throw new com.dynamous.imoveis.services.exceptions.IllegalArgumentException("Email já verificado"+ tenant.getEmail());
			 }
			 tenant.setVerification(Verification.VERIFICADO);
			 tenantService.update(tenant);
	}

}
