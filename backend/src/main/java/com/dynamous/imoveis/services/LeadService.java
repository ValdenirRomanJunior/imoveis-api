package com.dynamous.imoveis.services;

import com.dynamous.imoveis.dto.LeadDTO;
import com.dynamous.imoveis.dto.LeadNewDTO;
import com.dynamous.imoveis.dto.LeadNewHomeSiteDTO;
import com.dynamous.imoveis.dto.LeadNewSiteDTO;
import com.dynamous.imoveis.dto.LeadUpdateDTO;
import com.dynamous.imoveis.dto.TenantDTO;
import com.dynamous.imoveis.dto.TenantNewDTO;
import com.dynamous.imoveis.entities.Lead;
import com.dynamous.imoveis.entities.Opportunity;
import com.dynamous.imoveis.entities.Property;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Perfil;
import com.dynamous.imoveis.enums.Status;
import com.dynamous.imoveis.repositories.LeadRepository;
import com.dynamous.imoveis.repositories.OpportunityRepository;
import com.dynamous.imoveis.repositories.PropertyRepository;
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
public class LeadService {

    @Autowired
    private LeadRepository leadRepository;

    
    @Autowired
    private TenantService tenantService;
    
    @Autowired
    private OpportunityService opportunityService;
    
    @Autowired
    private TenantRepository tenRepository;
    
    @Autowired
    private OpportunityRepository opRepository;
    
   
    public Lead find(Long id) {
      UserSS user = UserService.authenticated();
       
        if(user == null && id==null){
            throw new AuthorizationException("Acesso negado");
        }
        Tenant tenant= tenantService.find(user.getId());
        Optional<Lead> lead = leadRepository.findByIdAndTenant(id, tenant);
        return lead.orElseThrow(() -> new ObjectNotFoundException(
                "Página não encontrada! Id:" + ", Type" + Lead.class.getName()));
    }
    
    @Transactional
    public Lead insert(Lead obj) {
        obj.setId(null);       
        leadRepository.save(obj);
      
        return obj;
    }


    public void delete(Long id) {
        find(id);
       try {
            leadRepository.deleteById(id);
        } catch (DataIntegrityViolationException  | EmptyResultDataAccessException | StaleStateException e) {
          throw new DataIntegrityException("Não é possivel deletar porque tem objetos anexados: ");
        }
    }

    public List<Lead> findAll() {
        return leadRepository.findAll();
    }
    public Lead update(LeadUpdateDTO lead) {
        Lead newObj= find(lead.getId());
        updateData(newObj,lead);
        return leadRepository.save(newObj);
    }
    
    public Lead updateLeadStep(Lead lead) {   
       return leadRepository.save(lead);
       
    }
    
    private void updateData(Lead newObj, LeadUpdateDTO lead) {
        newObj.setName(lead.getName());
        newObj.setEmail(lead.getEmail());
        newObj.setPhone(lead.getPhone());
        newObj.setMessage(newObj.getMessage());
        newObj.setInstant(newObj.getInstant());
        Tenant tenant= tenantService.find(newObj.getTenant().getId());
        newObj.setTenant(tenant);
        newObj.setPropertyId(newObj.getPropertyId());
        Opportunity opportunity= opportunityService.find(newObj.getOpportunity().getId());
        newObj.setOpportunity(opportunity);
    

    }

    public Page<Lead> findPage(String name,Integer page, Integer linesPerPage, String orderBy, String direction){
        UserSS user = UserService.authenticated();
       Tenant tenant = tenantService.find(user.getId());
       
        if(user==null || !user.hasRole(Perfil.TENANT)){
            throw new AuthorizationException("Acesso negado");
        }
       
        PageRequest pageRequest = PageRequest.of(page,linesPerPage, Sort.Direction.valueOf(direction),orderBy);
        return leadRepository.findByNameAndTenantLeadsIn(name, tenant, pageRequest);
    }

    public Lead fromDTO(LeadNewDTO objDto){
    		UserSS user = UserService.authenticated();
    		Tenant tenant= tenantService.find(user.getId());
    		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");
    		
    		String newDate= sdf.format(new Date());
    		Lead lead = new Lead(null, objDto.getName(), objDto.getEmail(),objDto.getPhone(),objDto.getMessage(),newDate);
    		lead.setTenant(tenant);   		
            return lead; 		   
    }

    public Lead fromDTOSite(LeadNewSiteDTO objDto){ 
    	SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");
		
    	String newDate= sdf.format(new Date());
		Lead lead = new Lead(null, objDto.getName(), objDto.getEmail(),objDto.getPhone(),objDto.getMessage(),newDate);
		lead.setPropertyId(objDto.getPropertyId());
		Tenant tenant= tenantService.findSite(objDto.getTenantId());
		lead.setTenant(tenant);
        return lead;
		   
}
    

    
    public Lead fromDTOHomeSite(LeadNewHomeSiteDTO objDto){ 
    	SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");
		
		String newDate= sdf.format(new Date());
		Lead lead = new Lead(null, objDto.getName(), objDto.getEmail(),objDto.getPhone(),objDto.getMessage(),newDate);	
		Tenant tenant= tenantService.findByDomain(objDto.getUrl());
		
		lead.setTenant(tenant);
        return lead;
		   
}
 
    public Lead fromDTO(LeadDTO objDto) {    		
			
     		Lead lead = new Lead(objDto.getId(), objDto.getName(), objDto.getEmail(),objDto.getPhone(),objDto.getMessage(), objDto.getInstant());
    		return lead;
    		
    	  	
    }
    
    @Transactional
    public void deleteAllByTenant(Long id) {
    	Tenant tenant= tenantService.find(id);
       try {
            leadRepository.deleteAllByTenant(tenant);
        } catch (DataIntegrityViolationException  | EmptyResultDataAccessException | StaleStateException e) {
          throw new DataIntegrityException("Não é possivel deletar porque tem objetos anexados: ");
        }
    }
	public LeadDTO fromDTOInverse(Lead lead) {
		LeadDTO leadDTO = new LeadDTO(lead);
		return leadDTO;
	}
}