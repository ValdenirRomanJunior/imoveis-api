package com.dynamous.imoveis.services;

import com.dynamous.imoveis.dto.TenantDTO;
import com.dynamous.imoveis.dto.TenantNewDTO;
import com.dynamous.imoveis.dto.TenantUpdateDTO;
import com.dynamous.imoveis.entities.Property;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Perfil;
import com.dynamous.imoveis.enums.Status;
import com.dynamous.imoveis.enums.Verification;
import com.dynamous.imoveis.repositories.PropertyRepository;
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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    
   
    public Tenant find(Long id) {
        UserSS user = UserService.authenticated();
       
        if(id==null || !user.hasRole(Perfil.ADMIN) && !id.equals(user.getId())){
            throw new AuthorizationException("Acesso negado");
        }
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
        System.out.println(obj);
        
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

    }

    public void delete(Long id) {
        find(id);
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
    		String endDate= generateEndDate(new Date(),objDto.getSignedDays());
    		Tenant tenant = new Tenant(null, objDto.getSlug(), objDto.getEmail(),pe.encode(objDto.getPassword()), Status.ATIVO,objDto.getLastName(),Verification.NAO_VERIFICADO,objDto.getCreci(),newDate,endDate);
            tenant.addPerfil(Perfil.TENANT);
            return tenant;
    		
    	   
    }
    
    public Tenant fromUpdateDTO(TenantUpdateDTO objDto){
    	//Date endDate= generateEndDate(new Date(),objDto.getSignedDays()); 
    	SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy hh:mm");
    	Tenant ten = find(objDto.getId());
		Tenant tenant = new Tenant(objDto.getId(), objDto.getSlug(), objDto.getEmail(),pe.encode(objDto.getPassword()), Status.toEnum(objDto.getStatus()),objDto.getLastName(),Verification.toEnum(objDto.getVerification()),objDto.getCreci(),ten.getStart(),ten.getEndDate());
        tenant.addPerfil(Perfil.TENANT);
        return tenant;
		
	   
}


    public Tenant fromDTO(TenantDTO objDto) {
    	Tenant ten = find(objDto.getId());
    		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy hh:mm");
    		Tenant tenant = new Tenant(objDto.getId(), objDto.getSlug(), objDto.getEmail(), pe.encode(objDto.getPassword()), Status.toEnum(objDto.getStatus().getCod()),objDto.getLastName(),Verification.toEnum(objDto.getVerification().getCod()),objDto.getCreci(),ten.getStart(),objDto.getEndDate());
            tenant.addPerfil(Perfil.TENANT);
            return tenant;
    		  	
    }
    
    public static String generateEndDate(Date start, Integer signedDays) {
    	Calendar cal = Calendar.getInstance();
    	cal.setTime(start);
    	cal.add(Calendar.DAY_OF_MONTH, signedDays);
    	SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
    	return sdf.format(cal.getTime());
    	
    }
    
}