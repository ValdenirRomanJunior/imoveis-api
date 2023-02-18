package com.dynamous.imoveis.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Verification;
import com.dynamous.imoveis.repositories.TenantRepository;

@Service
public class VerifyEmailTenantService {
	
	@Autowired	
	private TenantRepository tenantRepository;
	
	@Autowired
	private TenantService tenantService;
	
	
	public void verifyEmailTenant(String email) {
		
	
			Tenant tenant = tenantRepository.findByEmail(email);
	
			 if (tenant == null){
		           throw new UsernameNotFoundException(email);
			 }
			 System.out.println(tenant.getEmail());
			 tenant.setVerification(Verification.VERIFICADO);
			 tenantService.update(tenant);
	}

}
