package com.dynamous.imoveis.services;

import java.net.UnknownHostException;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.dynamous.imoveis.dto.EmailDTO;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.repositories.TenantRepository;
import com.dynamous.imoveis.services.exceptions.ObjectNotFoundException;

@Service
public class AuthService {
	
	@Autowired
	private TenantRepository tenantRepository;
	
	@Autowired
	private BCryptPasswordEncoder pe;
	
	@Autowired
	private EmailService emailService;
	
	private Random rand = new Random();
	
	public void sendNewPassword(EmailDTO email) {
		
		Tenant tenant = tenantRepository.findByEmail(email.getEmail());
		if(tenant == null) {
			throw new ObjectNotFoundException("Email não encontrado");
		}
		
		String newPass = newPassword();
		tenant.setPassword(pe.encode(newPass));
				
		tenantRepository.save(tenant);
		emailService.sendNewPasswordHtmlEmail(tenant,newPass);
		
	}

	private String newPassword() {
		
		char[] vet = new char[10];
		for(int i=0; i<10; i++) {
			vet[i] = ramdomChat();
		}
		return new String(vet);
	}

	private char ramdomChat() {
		int opt = rand.nextInt(3);
		if(opt==0) {//gera um digito
			return (char)(rand.nextInt(10)+48);
		}
		else if(opt== 1) {//gera letra maiuscula
			return (char)(rand.nextInt(26) + 65);
		}
	
		else {//gera letra minuscula
			return (char)(rand.nextInt(26) + 97);
		}
}
	
public void sendConfirmationRegistration(Tenant tenant) throws UnknownHostException {
					
		tenantRepository.save(tenant);
		emailService.sendRegistrationHtmlEmail(tenant);
		
	}
}
