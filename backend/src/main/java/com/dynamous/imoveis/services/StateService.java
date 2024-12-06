package com.dynamous.imoveis.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.entities.City;
import com.dynamous.imoveis.entities.State;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.repositories.AddressRepository;
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
	private AddressRepository addressRepo;
	
	 @Autowired
	    TenantService tenantService;
	 
	public List<State>findAll(){
		UserSS user = UserService.authenticated();
   	 if(user == null){
            throw new AuthorizationException("Acesso negado");
        }
     Tenant tenant = tenantService.find(user.getId());
    	Account account= accountService.find(tenant.getAccount().getId());   
   	 	
    	List<City> cities = addressRepo.findAllCitiesByAccount(account);  
    	List<State> states= new ArrayList<State>();
    	
    	//State aux= new State();
    	for(City city : cities) {
    	//	if(city.getState().getId() == aux.getId()) {
    			states.add(city.getState());
    		//}
    	}
		return states.stream().distinct().collect(Collectors.toList());
		
	}

}
