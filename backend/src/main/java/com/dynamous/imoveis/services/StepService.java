package com.dynamous.imoveis.services;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.hibernate.StaleStateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dynamous.imoveis.dto.LeadUpdateDTO;
import com.dynamous.imoveis.dto.StepNewDTO;
import com.dynamous.imoveis.dto.StepUpdateDTO;
import com.dynamous.imoveis.dto.TenantNewDTO;
import com.dynamous.imoveis.entities.Lead;
import com.dynamous.imoveis.entities.Opportunity;
import com.dynamous.imoveis.entities.Step;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Perfil;
import com.dynamous.imoveis.enums.Status;
import com.dynamous.imoveis.enums.Verification;
import com.dynamous.imoveis.repositories.StepRepository;
import com.dynamous.imoveis.security.UserSS;
import com.dynamous.imoveis.services.exceptions.AuthorizationException;
import com.dynamous.imoveis.services.exceptions.DataIntegrityException;
import com.dynamous.imoveis.services.exceptions.ObjectNotFoundException;

@Service
public class StepService {
	
	@Autowired
	private StepRepository repo;
	
	@Autowired
	private TenantService tenantService;
	

    public Step find(Long id) {
        UserSS user = UserService.authenticated();
        
         if(user.getId() == null){
             throw new AuthorizationException("Acesso negado");
         }
         Optional<Step> step = repo.findById(id);
         return step.orElseThrow(() -> new ObjectNotFoundException(
                 "Página não encontrada! Id:" + ", Type" + Step.class.getName()));
     }
    
	public List<Step> findAll() {
		return repo.findAll();
	}
	
    @Transactional
    public Step insert(Step obj) {
    
    	 UserSS user = UserService.authenticated();
    	  if(user.getId() ==null){
              throw new AuthorizationException("Acesso negado");
          }
    		obj.setId(null);
    		Tenant tenant= tenantService.find(user.getId()); 
        	obj.setTenant(tenant);
    	Long count= repo.countStepByTenantId(user.getId());
    	  System.out.println(count+ "COUNT COUNT");
    	  if(count ==8){
    		
              throw new   DataIntegrityException("Você não pode cadastrar mais que 8 etapas");
    	  }
    	  if(count<8){
    		   repo.save(obj);
    	  }
     
      
        return obj;
    }
    
    public void delete(Long id) {
        find(id);
       try {
    	   repo.deleteById(id);
        } catch (DataIntegrityViolationException  | EmptyResultDataAccessException | StaleStateException e) {
          throw new DataIntegrityException("Não é possivel deletar porque tem objetos anexados: ");
        }
    }
    
    public Step fromNewStepDTO(StepNewDTO objDto){
    	 UserSS user = UserService.authenticated();
   	  if(user.getId() ==null){
             throw new AuthorizationException("Acesso negado");
         }
   	  	Tenant tenant = tenantService.find(user.getId());
		Step step = new Step(null,objDto.getName());
		step.setTenant(tenant);
       
        return step;
		
	   
}
    public Step update(StepUpdateDTO step) {
        Step newObj= find(step.getId());
        updateData(newObj, step);
        return repo.save(newObj);
    }
    
    private void updateData(Step newObj, StepUpdateDTO step) {
    
        newObj.setName(step.getName());
        Tenant tenant= tenantService.find(newObj.getTenant().getId());
        newObj.setTenant(tenant);
    
    

    }

}
