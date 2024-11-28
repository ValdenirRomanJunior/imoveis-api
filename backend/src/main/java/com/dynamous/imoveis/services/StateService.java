package com.dynamous.imoveis.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.entities.State;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.repositories.StateRepository;
import com.dynamous.imoveis.security.UserSS;
import com.dynamous.imoveis.services.exceptions.AuthorizationException;

@Service
public class StateService {
	
	@Autowired
	private StateRepository repo;
	
	@Autowired
	private AccountService accountService;
	
	 @Autowired
	    TenantService tenantService;
	 
	public List<State>findAll(){
		UserSS user = UserService.authenticated();
   	 if(user == null){
            throw new AuthorizationException("Acesso negado");
        }
   	 
   	 Tenant tenant = tenantService.findSite(user.getId());
	   Account account= accountService.find(tenant.getAccount().getId());
		return repo.findAllByAccountOrderByName(account);
		
	}

}
