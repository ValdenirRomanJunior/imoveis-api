package com.dynamous.imoveis.services;

import com.dynamous.imoveis.entities.Tenant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Date;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

public abstract class AbstractEmailService implements EmailService {

    @Value("${default.sender}")
    private String sender;

    @Autowired
    private TemplateEngine templateEngine;
    
    @Autowired
    private JavaMailSender javaMailSender;
    
    @Override
    public  void sendRegistrationTenantEmail(Tenant obj){
        SimpleMailMessage sm = prepareSimpleMailMessageFromTenant(obj);
        sendEmail(sm);
    }

    protected  SimpleMailMessage prepareSimpleMailMessageFromTenant(Tenant obj){
        SimpleMailMessage sm= new SimpleMailMessage();
        sm.setTo(obj.getEmail());
        sm.setFrom(sender);
        sm.setSubject("Cadastro Dynamob");
        sm.setSentDate(new Date(System.currentTimeMillis()));
        sm.setText(obj.toString());
        return sm;
    }
    
    protected String htmlFromTemplateTenant(Tenant obj) {
    	Context context = new Context();
    	context.setVariable("tenant", obj);
    	return templateEngine.process("email/registrationTenantEmail", context);
    }
    
    @Override
    public void sendRegistrationHtmlEmail(Tenant obj) {
    	try {
    	MimeMessage mm= prepareMimeMessageFromTenant(obj);
    	sendHtmlEmail(mm);
    	}
    	catch(MessagingException e) {
    		sendRegistrationTenantEmail(obj);
    	}
    	
    	
    }

	protected MimeMessage prepareMimeMessageFromTenant(Tenant obj) throws MessagingException {
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper mmh = new MimeMessageHelper(mimeMessage, true);
		mmh.setTo(obj.getEmail());
		mmh.setFrom(sender);
		mmh.setSubject("Cadastro confirmado! :" +  obj.getSlug());
		mmh.setSentDate(new Date(System.currentTimeMillis()));
		mmh.setText(htmlFromTemplateTenant(obj),true);	
		return mimeMessage;
	}
	
	@Override
	public void sendNewPasswordEmail(Tenant tenant, String newPass) {
		  SimpleMailMessage sm= prepareNewPasswordEmail(tenant,newPass);
	        sendEmail(sm);
		
	}

	protected SimpleMailMessage prepareNewPasswordEmail(Tenant tenant, String newPass) {
	    SimpleMailMessage sm= new SimpleMailMessage();
        sm.setTo(tenant.getEmail());
        sm.setFrom(sender);
        sm.setSubject("Solicitação de uma nova senha");
        sm.setSentDate(new Date(System.currentTimeMillis()));
        sm.setText("nova senha" + newPass);
        return sm;
	}
}
