package com.dynamous.imoveis.services;

import com.dynamous.imoveis.entities.Lead;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Date;

import javax.mail.MessagingException;
import javax.mail.SendFailedException;
import javax.mail.internet.AddressException;
import javax.mail.internet.MimeMessage;
import javax.validation.NoProviderFoundException;

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
    
    
    //confirmação de cadastro por email HTML
    protected String htmlFromTemplateTenant(Tenant obj) {
    	Context context = new Context();
    	context.setVariable("tenant", obj);
    	
    	
    	return templateEngine.process("email/registrationTenantEmail", context);
    }
    
    @Override
    public void sendRegistrationHtmlEmail(Tenant obj){
    	try {
    	MimeMessage mm= prepareMimeMessageFromTenant(obj);
    	sendHtmlEmail(mm);
    	
    	}
             
    	 catch (MessagingException e) {
    		 System.out.println("Email não enviado");
     		sendRegistrationTenantEmail(obj);
    	 }
			
	  	
    	
    }

	protected MimeMessage prepareMimeMessageFromTenant(Tenant obj) throws MessagingException {
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper mmh;
		
			mmh = new MimeMessageHelper(mimeMessage, true);
			mmh.setTo(obj.getEmail());
			mmh.setFrom(sender);	
			mmh.setSubject("Cadastro confirmado! :" +  obj.getSlug());
			mmh.setSentDate(new Date(System.currentTimeMillis()));
			mmh.setText(htmlFromTemplateTenant(obj),true);
					
		return mimeMessage;
	}
	
	
	//nova senha por email
	
	@Override
	public void sendNewPasswordEmail(Tenant tenant,String newPass) {
		  SimpleMailMessage sm= prepareNewPasswordEmail(tenant,newPass);
	        sendEmail(sm);
		
	}

	protected SimpleMailMessage prepareNewPasswordEmail(Tenant tenant, String newPass) {
	    SimpleMailMessage sm= new SimpleMailMessage();
        sm.setTo(tenant.getEmail());
        sm.setFrom(sender);
        sm.setSubject("Solicitação de uma nova senha");
        sm.setSentDate(new Date(System.currentTimeMillis()));
        sm.setText("Nova senha: " + newPass);
        return sm;
	}
	
		
	//nova senha por email HTML
	
	  protected String htmlFromTemplateNewPasswordTenant(Tenant obj,String newPass) {
	    	Context context = new Context();
	    	context.setVariable("tenant", obj);
	    	context.setVariable("newPass", newPass);
	    	return templateEngine.process("email/newPasswordTenantEmail", context);
	    }
	  
	   
	   @Override  
	    public void sendNewPasswordHtmlEmail(Tenant tenant,String newPass) {
	    	try {
	    	MimeMessage mm=  prepareMimeMessageNewPasswordFromTenant(tenant,newPass);
	    	sendHtmlEmail(mm);
	    	}
	    	catch(MessagingException e) {
	    		sendNewPasswordEmail(tenant,newPass);
	    	}
	    	
	    	
	    }
	    
		protected MimeMessage prepareMimeMessageNewPasswordFromTenant(Tenant obj, String newPass) throws MessagingException {
			MimeMessage mimeMessage = javaMailSender.createMimeMessage();
			MimeMessageHelper mmh = new MimeMessageHelper(mimeMessage, true);
			mmh.setTo(obj.getEmail());
			mmh.setFrom(sender);
			mmh.setSubject("Senha atualizada!");
			mmh.setSentDate(new Date(System.currentTimeMillis()));
			mmh.setText(htmlFromTemplateNewPasswordTenant(obj,newPass),true);	
			return mimeMessage;
		}
		
		//lead send emails
		   public  void sendRegistrationLeadEmail(Lead obj){
		        SimpleMailMessage sm = prepareSimpleMailMessageFromLead(obj);
		        sendEmail(sm);
		    }

		    protected  SimpleMailMessage prepareSimpleMailMessageFromLead(Lead obj){
		        SimpleMailMessage sm= new SimpleMailMessage();
		        sm.setTo(obj.getEmail());
		        sm.setFrom(sender);
		        sm.setSubject("Cadastro Dynamob");
		        sm.setSentDate(new Date(System.currentTimeMillis()));
		        sm.setText(obj.toString());
		        return sm;
		    }
		
	    //confirmação de cadastro por email HTML
	    protected String htmlFromTemplateLead(Lead obj) {
	    	Context context = new Context();
	    	context.setVariable("lead", obj);
	    	
	    	return templateEngine.process("email/registrationEmailEmail", context);
	    }
	    
	    @Override
	    public void sendRegistrationHtmlEmail(Lead obj) {
	    	try {
	    	MimeMessage mm= prepareMimeMessageFromLead(obj);
	    	sendHtmlEmail(mm);
	    	}
	    	catch(MessagingException e) {
	    		sendRegistrationLeadEmail(obj);
	    	}
	    	
	    	
	    }

		protected MimeMessage prepareMimeMessageFromLead(Lead obj) throws MessagingException {
			MimeMessage mimeMessage = javaMailSender.createMimeMessage();
			MimeMessageHelper mmh = new MimeMessageHelper(mimeMessage, true);
			mmh.setTo(obj.getEmail());
			mmh.setFrom(sender);
			mmh.setSubject("Cadastro confirmado! :" +  obj.getName());
			mmh.setSentDate(new Date(System.currentTimeMillis()));
			mmh.setText(htmlFromTemplateLead(obj),true);	
			return mimeMessage;
		}
		
}
