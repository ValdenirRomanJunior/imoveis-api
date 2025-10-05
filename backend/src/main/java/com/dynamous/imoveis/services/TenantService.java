package com.dynamous.imoveis.services;

import com.amazonaws.AmazonServiceException;
import com.dynamous.imoveis.dto.TenantDTO;
import com.dynamous.imoveis.dto.TenantNewDTO;
import com.dynamous.imoveis.dto.TenantUpdateDTO;
import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.entities.Property;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Perfil;
import com.dynamous.imoveis.enums.PlanType;
import com.dynamous.imoveis.enums.Status;
import com.dynamous.imoveis.enums.Verification;
import com.dynamous.imoveis.repositories.AccountRepository;
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
import java.time.LocalDateTime;
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
    
	@Autowired
	private AccountService accountService;
	
	@Autowired
	private AccountRepository accountRepo;
	
	@Autowired
	private VercelDomainService vercelDomainService;
    
   
    public Tenant find(Long id) {
        UserSS user = UserService.authenticated();
       
        if(id==null || !user.hasRole(Perfil.ADMIN) && !id.equals(user.getId())){
            throw new AuthorizationException("Acesso negado");
        }
        Optional<Tenant> tenant = tenantRepository.findById(id);
        return tenant.orElseThrow(() -> new ObjectNotFoundException(
                "Página não encontrada! Id:" + ", Type" + Tenant.class.getName()));
    }
    
    public Tenant findTenantStep(Long id) {
      
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
       // try {
        	//emailService.sendVerificationHtmlEmail(obj);
       // }catch (UnknownHostException e) {
			//throw new UnknownHostException("falha ao enviar email");
		//}

	
         obj.addPerfil(Perfil.ACCOUNT);
         Account account = new Account(null,null,obj.getDomain(),obj.getSlug(),null,obj.getCreci(),obj.getProprietario());
         account.setEmail(obj.getEmail()); // Copiar o email do tenant para a account
         account.setCpf(obj.getCpf()); // Copiar o CPF do tenant para a account
         
         // Definir plano de teste automaticamente para novas contas
         account.setPlanType(PlanType.TESTE);
         account.setPlanStartDate(LocalDateTime.now());
         account.setPlanEndDate(LocalDateTime.now().plusDays(7)); // 7 dias de teste
         account.setIsTrialActive(true);
         
         // Salvar a Account primeiro para obter o ID
         accountRepo.save(account);
         
         // Criar subdomínio automaticamente na Vercel usando companyName + accountId
         try {
             String createdSubdomain = vercelDomainService.createSubdomain(obj.getSlug(), account.getId());
             if (createdSubdomain != null) {
                 account.setDomain(createdSubdomain);
                 accountRepo.save(account); // Atualizar com o domínio criado
                 System.out.println("Subdomínio criado com sucesso: " + account.getDomain());
             } else {
                 System.err.println("Falha ao criar subdomínio para: " + obj.getSlug());
             }
         } catch (Exception e) {
             System.err.println("Erro ao criar subdomínio: " + e.getMessage());
         }
         
         obj.setAccount(account);
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
    	Tenant tenant = find(id);
    	Account account= accountService.find(tenant.getAccount().getId());
    		
  			 		 
    	//   try {   	    
          //  s3Service.deleteAllFiles(id);
            //} catch (URISyntaxException | AmazonServiceException  e) {
               // throw new AmazonServiceException("Não é possivel deletar porque tem objetos anexados: ");
                
           // }

    	if(tenant.getPerfis().contains(Perfil.ACCOUNT)) {  		
    		  try {    	    
    	            accountRepo.deleteById(account.getId());
    	           
    	        } catch (DataIntegrityViolationException e) {
    	          throw new DataIntegrityException("Não é possivel deletar porque tem objetos anexados: ");
    	        }    		
    	
       try {    	    
            tenantRepository.deleteById(id);
           
        } catch (DataIntegrityViolationException e) {
          throw new DataIntegrityException("Não é possivel deletar porque tem objetos anexadoss: ");
        }
    	}
    	                  
    }

    
    public List<Tenant> findAll() {
        return tenantRepository.findAll();
    }

    public Page<Tenant> findPage(Integer page, Integer linesPerPage, String orderBy, String direction){
        PageRequest pageRequest = PageRequest.of(page,linesPerPage, Sort.Direction.valueOf(direction),orderBy);
        
        UserSS user = UserService.authenticated();       
        if(user==null || !user.hasRole(Perfil.ADMIN)){
            throw new AuthorizationException("Acesso negado");
        }
          
        return tenantRepository.findAllByPerfis(pageRequest,4);
    }

    public Tenant fromDTO(TenantNewDTO objDto){
    		
    		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");   		
    		String newDate= sdf.format(new Date()); 
    		Tenant tenant = new Tenant(null, objDto.getSlug(), objDto.getEmail(),pe.encode(objDto.getPassword()), Status.ATIVO,objDto.getLastName(),Verification.VERIFICADO,objDto.getCreci(),objDto.getCpf(),newDate,null,null,null,objDto.getProprietario());  		
            tenant.setPhone(objDto.getPhone());
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
    		tenant = new Tenant(objDto.getId(), objDto.getSlug(), objDto.getEmail(),pe.encode(objDto.getPassword()), Status.toEnum(objDto.getStatus()),objDto.getLastName(),Verification.toEnum(objDto.getVerification()),objDto.getCreci(),null,ten.getStart(),renovation,endDate,objDto.getDomain(),objDto.getProprietario());
    	    tenant.addPerfil(Perfil.TENANT);
    	    tenant.addPerfil(Perfil.ACCOUNT);
           
            return tenant;
    	}
    	 	
    	Tenant tenantAux = find(objDto.getId());
		 Account  newObj =  accountService.find(tenantAux.getAccount().getId());
	     Account account = new Account(newObj.getId(),null,objDto.getDomain(),objDto.getSlug(),null,objDto.getCreci(), objDto.getProprietario());
        accountRepo.save(account);
        tenantAux.setAccount(account);
    	
		tenant = new Tenant(objDto.getId(), objDto.getSlug(), objDto.getEmail(),pe.encode(objDto.getPassword()), Status.toEnum(objDto.getStatus()),objDto.getLastName(),Verification.toEnum(objDto.getVerification()),objDto.getCreci(),null,ten.getStart(),ten.getRenovation(),ten.getEndDate(),objDto.getDomain(),objDto.getProprietario());
        tenant.addPerfil(Perfil.TENANT);
        tenant.addPerfil(Perfil.ACCOUNT);
        
        return tenant;
		
	   
}


    public Tenant fromDTO(TenantDTO objDto) { 
    		Tenant tenant = new Tenant(objDto.getId(), objDto.getSlug(), objDto.getEmail(), pe.encode(objDto.getPassword()), Status.toEnum(objDto.getStatus().getCod()),objDto.getLastName(),Verification.toEnum(objDto.getVerification().getCod()),objDto.getCreci(),null,objDto.getStart(),objDto.getRenovation(),objDto.getEndDate(),null,null);
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