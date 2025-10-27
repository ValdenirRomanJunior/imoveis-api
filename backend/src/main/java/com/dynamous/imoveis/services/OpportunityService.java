package com.dynamous.imoveis.services;

import com.dynamous.imoveis.controllers.CountOpportunity;
import com.dynamous.imoveis.dto.CountObjectDTO;
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
import com.dynamous.imoveis.entities.Account;
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
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;

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
    
	@Autowired
	private AccountService accountService;
	
  private final List<SseEmitter> emitters=new CopyOnWriteArrayList<SseEmitter>();
    
    public Opportunity find(Long id) {
    	 UserSS user = UserService.authenticated();
         
         if(user == null && id==null){
             throw new AuthorizationException("Acesso negado");
         }
         
         Tenant tenant= tenantService.find(user.getId());
       	Account account= accountService.find(tenant.getAccount().getId());   
        Optional<Opportunity> opportunity = opportunityRepository.findByIdAndAccount(id,account);

        return opportunity.orElseThrow(() -> new ObjectNotFoundException(
                "Página não encontradaOP! Id:" + ", Type" + Opportunity.class.getName()));
    }
    
    @Transactional
    public Opportunity insert(Opportunity obj) {
    	obj.setId(null);
   
    
    	//obj.setStep(obj.getStep().);
        opportunityRepository.save(obj);    
        
        for(SseEmitter emitter: emitters) {
        	try {
        		emitter.send("nova oportunidade");
        	}catch (IOException e) {
			emitter.complete();
			emitters.remove(emitter);
			}
        }
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
    
         
          if(user==null || !user.hasRole(Perfil.TENANT)){
              throw new AuthorizationException("Acesso negado");
          }
          Tenant tenant = tenantService.find(user.getId());
        	Account account= accountService.find(tenant.getAccount().getId());  
        return opportunityRepository.findAllByAccount(account);
        
    }

    public Page<Opportunity> findPage(Integer page, Integer linesPerPage, String orderBy, String direction){
        UserSS user = UserService.authenticated();
     
       
        if(user==null || !user.hasRole(Perfil.TENANT)){
            throw new AuthorizationException("Acesso negado");
        }
        Tenant tenant = tenantService.find(user.getId());
    	Account account= accountService.find(tenant.getAccount().getId()); 
        PageRequest pageRequest = PageRequest.of(page,linesPerPage, Sort.Direction.valueOf(direction),orderBy);
        return opportunityRepository.findByAccountOpportunityIn(account, pageRequest);
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
        		 Account account= accountService.find(tenant.getAccount().getId()); 
        		 
        		 Opportunity opportunity = new Opportunity(null,newDate);
         		opportunity.setAccount(account);  		 
        		 Step firtsStep= stepRepository.findFirstByAccount(account);
         		if(firtsStep != null ) {
         			opportunity.setStep(firtsStep);
         		}
         		if(firtsStep == null ) {
         			 throw new DataIntegrityException("Precisa ter pelo menos 1 etapa cadastrada ");
         		}
        		 
    	        Lead lead= new Lead(null,objDto.getName(),objDto.getEmail(),objDto.getPhone(),objDto.getMessage(),newDate);
    	       	     	        	 
    	         lead.setPropertyId(objDto.getPropertyId());
    	    	 opportunity.setPropertyId(objDto.getPropertyId());   	    	  	   	    
    	    	 	   	       	     
    	        lead.setAccount(account);
    	        leadService.insert(lead);
    	              		
    	        opportunity.setLead(lead);
    			
    	        lead.setOpportunity(opportunity);
    		
    	        return opportunity; 		   
    }

    //oportunidade que vem da home do site do cliente
    public Opportunity fromDTOHomeSite(OpportunityNewHomeSiteDTO objDto){ 
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        String newDate = sdf.format(new Date());
        Opportunity opportunity = new Opportunity(null, newDate);

        Account account;
        if (objDto.getCompanyName() != null && !objDto.getCompanyName().isEmpty()) {
            account = accountService.findByCompanyName(objDto.getCompanyName());
        } else {
            String domainInput = objDto.getDomain();
            if (domainInput == null || domainInput.trim().isEmpty()) {
                throw new DataIntegrityException("Domínio não informado");
            }

            String host = extractHost(domainInput);
            String bare = stripWWW(host);
            String withWWW = host.startsWith("www.") ? host : "www." + host;

            Optional<Account> accountOpt = accountService.findByCustomDomain(host);
            if (accountOpt.isEmpty()) accountOpt = accountService.findByCustomDomain(bare);
            if (accountOpt.isEmpty()) accountOpt = accountService.findByCustomDomain(withWWW);

            if (accountOpt.isPresent()) {
                account = accountOpt.get();
            } else {
                throw new DataIntegrityException("Empresa não encontrada para o domínio: " + host);
            }
        }

        opportunity.setAccount(account);
        Step firtsStep = stepRepository.findFirstByAccount(account);
        if (firtsStep != null) {
            opportunity.setStep(firtsStep);
        } else {
            throw new DataIntegrityException("Precisa ter pelo menos 1 etapa cadastrada ");
        }

        Lead lead = new Lead(null, objDto.getName(), objDto.getEmail(), objDto.getPhone(), objDto.getMessage(), newDate);
        lead.setPropertyId(null);
        opportunity.setPropertyId(null);
        lead.setAccount(account);
        leadService.insert(lead);
        opportunity.setLead(lead);
        lead.setOpportunity(opportunity);

        return opportunity;
    }

    private String extractHost(String input) {
        String domain = input.trim();
        if (domain.startsWith("http://") || domain.startsWith("https://")) {
            try {
                java.net.URI uri = new java.net.URI(domain);
                String host = uri.getHost();
                if (host != null) {
                    domain = host;
                } else {
                    domain = domain.replace("http://", "").replace("https://", "");
                }
            } catch (java.net.URISyntaxException e) {
                domain = domain.replace("http://", "").replace("https://", "");
            }
        }
        int slashIndex = domain.indexOf('/');
        if (slashIndex > -1) {
            domain = domain.substring(0, slashIndex);
        }
        int colonIndex = domain.indexOf(':');
        if (colonIndex > -1) {
            domain = domain.substring(0, colonIndex);
        }
        return domain.toLowerCase();
    }

    private String stripWWW(String host) {
        return host.startsWith("www.") ? host.substring(4) : host;
    }

    //oportunidade que vem do detalhe do imovel do site do cliente
    public Opportunity fromDTODetailSite(OpportunityNewSiteDetailDTO objDto){ 
    	
    	SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");    	
    	String newDate= sdf.format(new Date());
    	
    	Property property = propertyService.find(objDto.getPropertyId());
		 Account account= accountService.find(property.getAccount().getId()); 
		 
    	Opportunity opportunity = new Opportunity(null, newDate);
    	opportunity.setAccount(account);
    	opportunity.setPropertyId(objDto.getPropertyId());
    	 Step firtsStep= stepRepository.findFirstByAccount(account);
  		if(firtsStep != null ) {
  			opportunity.setStep(firtsStep);
  		}
  		if(firtsStep == null ) {
  			 throw new DataIntegrityException("Precisa ter pelo menos 1 etapa cadastrada ");
  		}
  	   Lead lead= new Lead(null,objDto.getName(),objDto.getEmail(),objDto.getPhone(),objDto.getMessage(),newDate);
  	   lead.setPropertyId(objDto.getPropertyId());
  	   lead.setAccount(account);
    	leadService.insert(lead);
    	
    	 opportunity.setLead(lead);			
	     lead.setOpportunity(opportunity);
        return opportunity;
		   
}
 
    
    @Transactional
    public void deleteAllByTenant(Long id) {
    	Tenant tenant= tenantService.find(id);
    	 Account account= accountService.find(tenant.getAccount().getId()); 
       try {
    	   opportunityRepository.deleteAllByAccount(account);
        } catch (DataIntegrityViolationException  | EmptyResultDataAccessException | StaleStateException e) {
          throw new DataIntegrityException("Não é possivel deletar porque tem objetos anexados: ");
        }
    }

	public OpportunityDTO fromDTOFind(Opportunity opportunity) {
			OpportunityDTO opportunityDTO = new OpportunityDTO(opportunity);		
		return opportunityDTO;
	}
	
	public void adEmitter(SseEmitter emitter) {
		emitters.add(emitter);
		emitter.onCompletion(()-> emitters.remove(emitter));
		emitter.onTimeout(()-> emitters.remove(emitter));
		
	}
		
	public List<CountOpportunity> countByStepName() {
		
 	 UserSS user = UserService.authenticated();        
         if(user == null){
             throw new AuthorizationException("Acesso negado");
         }
         
         Tenant tenant= tenantService.find(user.getId());
     	Account account= accountService.find(tenant.getAccount().getId());   
		List<Step> steps= stepRepository.findAllByAccount(account);
		Long count;
		List<CountOpportunity> list= new ArrayList<CountOpportunity>();
		
			for(Step step: steps) {
			 CountOpportunity countOpportunity = new CountOpportunity();
			  count= opportunityRepository.countByStep(step.getId());
				countOpportunity.setCount(count);
				countOpportunity.setName(step.getName());
				list.add(countOpportunity);
			
					
			}
		return list;
	}
}