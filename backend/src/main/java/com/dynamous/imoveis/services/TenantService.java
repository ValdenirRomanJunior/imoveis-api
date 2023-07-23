package com.dynamous.imoveis.services;

import com.amazonaws.AmazonServiceException;
import com.dynamous.imoveis.dto.TenantDTO;
import com.dynamous.imoveis.dto.TenantNewDTO;
import com.dynamous.imoveis.dto.TenantUpdateDTO;
import com.dynamous.imoveis.entities.Property;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Perfil;
import com.dynamous.imoveis.enums.Status;
import com.dynamous.imoveis.enums.Verification;
import com.dynamous.imoveis.repositories.LeadRepository;
import com.dynamous.imoveis.repositories.TenantRepository;
import com.dynamous.imoveis.security.UserSS;
import com.dynamous.imoveis.services.exceptions.AuthorizationException;
import com.dynamous.imoveis.services.exceptions.DataIntegrityException;
import com.dynamous.imoveis.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.net.URISyntaxException;
import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
public class TenantService {

    @Autowired
    private TenantRepository tenantRepository;

    @Autowired
    private BCryptPasswordEncoder pe;

    @Autowired
    private EmailService emailService;
    
    @Autowired
    private S3Service s3Service;
    
    
    @Autowired
    private PropertyService propertyService;
    
    
    @Autowired
    private LeadRepository leadRepository;
    
   
    public Tenant find(Long id) {
        UserSS user = UserService.authenticated();
       
        if(id==null || !user.hasRole(Perfil.ADMIN) && !id.equals(user.getId())){
            throw new AuthorizationException("Acesso negado");
        }
        Optional<Tenant> tenant = tenantRepository.findById(id);
        return tenant.orElseThrow(() -> new ObjectNotFoundException(
                "Página não encontrada! Id:" + ", Type" + Tenant.class.getName()));
    }
    
    public Tenant findSite(Long id) {
      
        Optional<Tenant> tenant = tenantRepository.findById(id);
        return tenant.orElseThrow(() -> new ObjectNotFoundException(
                "Página não encontrada! Id:" + ", Type" + Tenant.class.getName()));
    }
    
    @Transactional
    public Tenant insert(Tenant obj) throws UnknownHostException{
        obj.setId(null);
        try {
        	emailService.sendVerificationHtmlEmail(obj);
        }catch (UnknownHostException e) {
			throw new UnknownHostException("falha ao enviar email");
		}
        	
        tenantRepository.save(obj);   
        return obj;
    }


    public Tenant update(Tenant tenant) {
        Tenant newObj= find(tenant.getId());
        updateData(newObj,tenant);
        return tenantRepository.save(newObj);
    }
    
    

    private void updateData(Tenant newObj, Tenant tenant) {
        newObj.setSlug(tenant.getSlug());
        newObj.setEmail(tenant.getEmail());
        newObj.setLastName(tenant.getLastName());
        newObj.setStatus(tenant.getStatus());
        newObj.setPassword(tenant.getPassword());
        newObj.setVerification(tenant.getVerification());
        newObj.setDomain(tenant.getDomain());
        newObj.setCreci(tenant.getCreci());
        newObj.setRenovation(tenant.getRenovation());
        newObj.setEndDate(tenant.getEndDate());

    }

    public Tenant updateNoLogin(Tenant tenant) {
        Tenant newObj= findSite(tenant.getId());
        updateData(newObj,tenant);
        return tenantRepository.save(newObj);
    }
	public void delete(Long id){
    	find(id);
    	//leadService.deleteAllByTenant(id);
    	Long countLeads=leadRepository.countLeadByTenantId(id);
    	List<Property> properties= propertyService.findFourByTenant(id);
    	
    	
    	//deletar todos os leads
    	if((countLeads == 0) && (properties.size() ==0)) {
    			 		 
        try {   	    
            s3Service.deleteAllFiles(id);
            } catch (URISyntaxException | AmazonServiceException  e) {
                throw new AmazonServiceException("Não é possivel deletar porque tem objetos anexados: ");
                
            }
    	}
    	                                  	             
       try {    	    
            tenantRepository.deleteById(id);
           
        } catch (DataIntegrityViolationException e) {
          throw new DataIntegrityException("Não é possivel deletar porque tem objetos anexados: ");
        }
    	                  
    }

    
    public List<Tenant> findAll() {
        return tenantRepository.findAll();
    }

    public Page<Tenant> findPage(Integer page, Integer linesPerPage, String orderBy, String direction){
        PageRequest pageRequest = PageRequest.of(page,linesPerPage, Sort.Direction.valueOf(direction),orderBy);
        return tenantRepository.findAll(pageRequest);
    }

    public Tenant fromDTO(TenantNewDTO objDto){
    		
    		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");   		
    		String newDate= sdf.format(new Date()); 
    		Tenant tenant = new Tenant(null, objDto.getSlug(), objDto.getEmail(),pe.encode(objDto.getPassword()), Status.ATIVO,objDto.getLastName(),Verification.NAO_VERIFICADO,objDto.getCreci(),newDate,null,null);
    		
            tenant.addPerfil(Perfil.TENANT);
            return tenant;
    		
    	   
    }
    
    public Tenant fromUpdateDTO(TenantUpdateDTO objDto){
   
    	SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy hh:mm");
    	String renovation= sdf.format(new Date());
    
    	Tenant ten = find(objDto.getId());
    	Tenant tenant=null;
    	if(objDto.getSignedDays() != null) {
    			
    		String endDate= generateEndDate(new Date(),objDto.getSignedDays());
    		tenant = new Tenant(objDto.getId(), objDto.getSlug(), objDto.getEmail(),pe.encode(objDto.getPassword()), Status.toEnum(objDto.getStatus()),objDto.getLastName(),Verification.toEnum(objDto.getVerification()),objDto.getCreci(),ten.getStart(),renovation,endDate);
    	    tenant.addPerfil(Perfil.TENANT);
            tenant.setDomain(objDto.getDomain());
            return tenant;
    	}
    	 	
		tenant = new Tenant(objDto.getId(), objDto.getSlug(), objDto.getEmail(),pe.encode(objDto.getPassword()), Status.toEnum(objDto.getStatus()),objDto.getLastName(),Verification.toEnum(objDto.getVerification()),objDto.getCreci(),ten.getStart(),ten.getRenovation(),ten.getEndDate());
        tenant.addPerfil(Perfil.TENANT);
        tenant.setDomain(objDto.getDomain());
        return tenant;
		
	   
}


    public Tenant fromDTO(TenantDTO objDto) { 
    		Tenant tenant = new Tenant(objDto.getId(), objDto.getSlug(), objDto.getEmail(), pe.encode(objDto.getPassword()), Status.toEnum(objDto.getStatus().getCod()),objDto.getLastName(),Verification.toEnum(objDto.getVerification().getCod()),objDto.getCreci(),objDto.getStart(),objDto.getRenovation(),objDto.getEndDate());
            tenant.addPerfil(Perfil.TENANT);
            return tenant;
    		  	
    }
    
    public static String generateEndDate(Date renovation, Integer signedDays) {
    		 
    	  Calendar cal = Calendar.getInstance();
    	 cal.setTime(renovation);
    	  	 
    	SimpleDateFormat sd = new SimpleDateFormat("dd/MM/yyyy");
    	
    	if(signedDays == 30) {
    		cal.add(Calendar.DAY_OF_MONTH, 30);
    	}
    	if(signedDays == 90) {
    		cal.add(Calendar.DAY_OF_MONTH, 90);
    	}
    	if(signedDays == 180) {
    		cal.add(Calendar.DAY_OF_MONTH, 180);
    	}
    	if(signedDays == 365) {
    		cal.add(Calendar.DAY_OF_MONTH, 365);
    	}
    	
    	
    	return sd.format(cal.getTime());
    	
    }

	   public Tenant findByDomain(String domain) {
		      
		        Optional<Tenant> tenant = tenantRepository.findByDomain(domain);
		        return tenant.orElseThrow(() -> new ObjectNotFoundException(
		                "Página não encontrada! Id:" + ", Type" + Tenant.class.getName()));
		    }
	  
}