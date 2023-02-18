package com.dynamous.imoveis.services;

import com.dynamous.imoveis.entities.Lead;
import com.dynamous.imoveis.entities.Tenant;

import javax.mail.SendFailedException;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.SimpleMailMessage;

public interface EmailService {

    void sendRegistrationTenantEmail(Tenant obj);

    void sendEmail(SimpleMailMessage msg);
    
    
    void sendRegistrationHtmlEmail(Tenant obj);
    
    void sendHtmlEmail(MimeMessage msg) throws SendFailedException;
    
    
    void sendNewPasswordEmail(Tenant tenant,String newPass);
    
	void sendNewPasswordHtmlEmail(Tenant tenant,String newPass);
	
	 void sendRegistrationHtmlEmail(Lead obj);
    
   
}
