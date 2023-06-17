package com.dynamous.imoveis.controllers;

import com.dynamous.imoveis.dto.EmailDTO;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.entities.UserAdmin;
import com.dynamous.imoveis.enums.Perfil;
import com.dynamous.imoveis.repositories.TenantRepository;
import com.dynamous.imoveis.repositories.UserAdminRepository;
import com.dynamous.imoveis.security.JWTUtil;
import com.dynamous.imoveis.security.UserSS;
import com.dynamous.imoveis.services.AuthService;
import com.dynamous.imoveis.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@RequestMapping(value = "/auth")
public class AuthController {
	
	@Autowired
	private TenantRepository tenantRepository;
	

	
	@Autowired
	private UserAdminRepository userAdminRepository;

    @Autowired
    private JWTUtil jwtUtil;
    
    @Autowired
    private AuthService authService;

    @PostMapping(value = "/refresh_token")
    public ResponseEntity<Void> refreshToken(HttpServletResponse response) throws UsernameNotFoundException{
    	
    	//se user for 1= null busca ele
        UserSS user= UserService.authenticated();
        
        if(user != null ) {
        
        	 String token = jwtUtil.GenerateToken(user.getUsername());
             response.addHeader("Authorization", "Bearer " + token);
             response.addHeader("access-control-expose-headers", "Authorization");
             return ResponseEntity.noContent().build();      	
        }
        return ResponseEntity.noContent().build(); 
       
    }
    
    @PostMapping(value = "/forgot")
    public ResponseEntity<Void> forgot(@Valid @RequestBody EmailDTO emaildDto){  	
    	authService.sendNewPassword(emaildDto);
        return ResponseEntity.noContent().build();
    }
    
    
    @GetMapping(value="/getuser")
    public ResponseEntity<?> getUserData() throws UsernameNotFoundException{
    
    	UserSS user= UserService.authenticated();
    	
    	String email=user.getUsername();
    	 UserAdmin userAdmin= null;
    	 Tenant tenant= null;
     		if(email.equals("admin@outlook.com")) {
     			 userAdmin = userAdminRepository.findByEmail(email);
     		}
     		else {
     			  tenant = tenantRepository.findByEmail(email);
     		}
        
         
               
          
          if (tenant == null && userAdmin == null) {
              throw new UsernameNotFoundException(email);
              
          } else if (tenant != null && tenant.getPerfis().contains(Perfil.TENANT)) {       	  
              return  ResponseEntity.ok().body(tenant);
              
          } else {
        	  return  ResponseEntity.ok().body(userAdmin);

          }
    	
    	
    }
}
