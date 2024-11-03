package com.dynamous.imoveis.services;

import com.dynamous.imoveis.dto.LeadDTO;
import com.dynamous.imoveis.dto.LeadNewDTO;
import com.dynamous.imoveis.dto.LeadNewHomeSiteDTO;
import com.dynamous.imoveis.dto.LeadNewSiteDTO;
import com.dynamous.imoveis.dto.OpportunityDTO;
import com.dynamous.imoveis.dto.OpportunityNewDTOCRM;
import com.dynamous.imoveis.dto.OpportunityNewHomeSiteDTO;
import com.dynamous.imoveis.dto.OpportunityNewSiteDetailDTO;
import com.dynamous.imoveis.dto.TenantDTO;
import com.dynamous.imoveis.dto.TenantNewDTO;
import com.dynamous.imoveis.entities.Lead;
import com.dynamous.imoveis.entities.Opportunity;
import com.dynamous.imoveis.entities.Property;
import com.dynamous.imoveis.entities.Step;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Perfil;
import com.dynamous.imoveis.enums.Status;
import com.dynamous.imoveis.repositories.LeadRepository;
import com.dynamous.imoveis.repositories.OpportunityRepository;
import com.dynamous.imoveis.repositories.PropertyRepository;
import com.dynamous.imoveis.repositories.StepRepository;
import com.dynamous.imoveis.repositories.TenantRepository;
import com.dynamous.imoveis.security.UserSS;
import com.dynamous.imoveis.services.exceptions.AuthorizationException;
import com.dynamous.imoveis.services.exceptions.DataIntegrityException;
import com.dynamous.imoveis.services.exceptions.ObjectNotFoundException;

import org.hibernate.StaleStateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OpportunityService {

    @Autowired
    private OpportunityRepository opportunityRepository;
    
    @Autowired
    private StepRepository stepRepository;
    
    @Autowired
    private TenantService tenantService;
    
    @Autowired
    private PropertyService propertyService;
    
    @Autowired
    private LeadService leadService;
    
  
    public Opportunity find(Long id) {
    	 UserSS user = UserService.authenticated();
         
         if(user == null && id==null){
             throw new AuthorizationException("Acesso negado");
         }
         
         Tenant tenant= tenantService.find(user.getId());
        Optional<Opportunity> opportunity = opportunityRepository.findByIdAndTenant(id,tenant);

        return opportunity.orElseThrow(() -> new ObjectNotFoundException(
                "Página não encontrada! Id:" + ", Type" + Opportunity.class.getName()));
    }
    
    @Transactional
    public Opportunity insert(Opportunity obj) {
    	obj.setId(null);
   
    
    	//obj.setStep(obj.getStep().);
        opportunityRepository.save(obj);      
        return obj;
    }


    public void delete(Long id) {
    	System.out.println(id + "ID DA OPP");
        find(id);
       try {
    	   opportunityRepository.deleteById(id);
        } catch (DataIntegrityViolationException  | EmptyResultDataAccessException | StaleStateException e) {
          throw new DataIntegrityException("Não é possivel deletar porque tem objetos anexados: ");
        }
    }

    public List<Opportunity> findAll() {
    	 UserSS user = UserService.authenticated();
         Tenant tenant = tenantService.find(user.getId());
         
          if(user==null || !user.hasRole(Perfil.TENANT)){
              throw new AuthorizationException("Acesso negado");
          }
        return opportunityRepository.findAllByTenant(tenant);
        
    }

    public Page<Opportunity> findPage(Integer page, Integer linesPerPage, String orderBy, String direction){
        UserSS user = UserService.authenticated();
       Tenant tenant = tenantService.find(user.getId());
       
        if(user==null || !user.hasRole(Perfil.TENANT)){
            throw new AuthorizationException("Acesso negado");
        }
       
        PageRequest pageRequest = PageRequest.of(page,linesPerPage, Sort.Direction.valueOf(direction),orderBy);
        return opportunityRepository.findByTenantOpportunityIn(tenant, pageRequest);
    }

    //oportunidade que vem crm, quando cria a oportunidade ou pelo lead com ou sem vinculo com imovel
    public Opportunity fromDTOCRM(OpportunityNewDTOCRM objDto){  
    
    		UserSS user = UserService.authenticated();  		
    	     
    		 if(user==null || !user.hasRole(Perfil.TENANT)){
    	            throw new AuthorizationException("Acesso negado");
    	        }
    			SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");  		
        		String newDate= sdf.format(new Date());
        		
        		 Tenant tenant=tenantService.find(user.getId());
        		 Opportunity opportunity = new Opportunity(null,newDate);
         		opportunity.setTenant(tenant);
         		        		 
        		 Step firtsStep= stepRepository.findFirstByTenant(tenant);
         		if(firtsStep != null ) {
         			opportunity.setStep(firtsStep);
         		}
         		if(firtsStep == null ) {
         			 throw new DataIntegrityException("Precisa ter pelo menos 1 etapa cadastrada ");
         		}
        		 
    	        Lead lead= new Lead(null,objDto.getName(),objDto.getEmail(),objDto.getPhone(),objDto.getMessage(),newDate);
    	       	     	        	 
    	         lead.setPropertyId(objDto.getPropertyId());
    	    	 opportunity.setPropertyId(objDto.getPropertyId());   	    	  	   	    
    	    	 
    	       	     
    	        lead.setTenant(tenant);
    	        leadService.insert(lead);
    	              		
    	        opportunity.setLead(lead);
    			
    	        lead.setOpportunity(opportunity);
    		
    	        return opportunity; 		   
    }

    //oportunidade que vem da home do site do cliente
    public Opportunity fromDTOHomeSite(OpportunityNewHomeSiteDTO objDto){ 
    	
    	SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");		
		String newDate= sdf.format(new Date());
		Opportunity opportunity = new Opportunity(null,newDate);	
		Tenant tenant= tenantService.findByDomain(objDto.getUrl());	
		opportunity.setTenant(tenant);
        return opportunity;
		   
}
    //oportunidade que vem do detalhe do imovel do site do cliente
    public Opportunity fromDTODetailSite(OpportunityNewSiteDetailDTO objDto){ 
    	
    	SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");		
    	String newDate= sdf.format(new Date());
    	Opportunity opportunity = new Opportunity(null, newDate);
    	opportunity.setPropertyId(objDto.getPropertyId());
		Tenant tenant= tenantService.findSite(objDto.getTenantId());
		opportunity.setTenant(tenant);
        return opportunity;
		   
}
 
    
    @Transactional
    public void deleteAllByTenant(Long id) {
    	Tenant tenant= tenantService.find(id);
       try {
    	   opportunityRepository.deleteAllByTenant(tenant);
        } catch (DataIntegrityViolationException  | EmptyResultDataAccessException | StaleStateException e) {
          throw new DataIntegrityException("Não é possivel deletar porque tem objetos anexados: ");
        }
    }

	public OpportunityDTO fromDTOFind(Opportunity opportunity) {
			OpportunityDTO opportunityDTO = new OpportunityDTO(opportunity);		
		return opportunityDTO;
	}
}