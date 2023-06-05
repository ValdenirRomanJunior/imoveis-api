package com.dynamous.imoveis.services;

import com.dynamous.imoveis.entities.Lead;
import com.dynamous.imoveis.entities.Tenant;

import java.net.UnknownHostException;

import javax.mail.SendFailedException;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

@Service
public interface EmailService {
	
	   void sendHtmlEmail(MimeMessage msg) throws SendFailedException;   
	   void sendEmail(SimpleMailMessage msg);
	
	   ///verification
	 void sendVerificationTenantEmail(Tenant obj);	 
	 void sendVerificationHtmlEmail(Tenant obj) throws UnknownHostException;
	 
	 ///registration
    void sendRegistrationTenantEmail(Tenant obj);      
    void sendRegistrationHtmlEmail(Tenant obj) throws UnknownHostException;
    
    //sendNewPassword
    void sendNewPasswordEmail(Tenant tenant,String newPass);  
	void sendNewPasswordHtmlEmail(Tenant tenant,String newPass);
	
	//lead
	void sendRegistrationHtmlEmail(Lead obj);
    
   
}
