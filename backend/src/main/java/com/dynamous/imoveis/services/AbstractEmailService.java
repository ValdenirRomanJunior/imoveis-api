package com.dynamous.imoveis.services;

import com.dynamous.imoveis.entities.Lead;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.net.UnknownHostException;
import java.util.Date;

import javax.mail.MessagingException;
import javax.mail.SendFailedException;
import javax.mail.internet.AddressException;
import javax.mail.internet.MimeMessage;
import javax.validation.NoProviderFoundException;

@Service
public abstract class AbstractEmailService implements EmailService {

    @Value("${default.sender}")
    private String sender;

    @Autowired
    private TemplateEngine templateEngine;
    
    @Autowired
    private JavaMailSender javaMailSender;
    
    //verification
    @Override
    public  void sendVerificationTenantEmail(Tenant obj){
        SimpleMailMessage sm = prepareSimpleMailMessageFromTenantVerification(obj);
        sendEmail(sm);
    }

    protected  SimpleMailMessage prepareSimpleMailMessageFromTenantVerification(Tenant obj){
        SimpleMailMessage sm= new SimpleMailMessage();
        sm.setTo(obj.getEmail());
        sm.setFrom(sender);
        sm.setSubject("Verificação Cadastro");
        sm.setSentDate(new Date(System.currentTimeMillis()));
        sm.setText(obj.toString());
        return sm;
    }
    
    
    //confirmação de cadastro por email HTML
    protected String htmlFromTemplateTenantVerification(Tenant obj) {
    	Context context = new Context();
    	context.setVariable("tenant", obj);   	
    	return templateEngine.process("email/confirmationCodeTenantEmail", context);
    }
    
    @Override
    public void sendVerificationHtmlEmail(Tenant obj) throws UnknownHostException{
    	try {
    	MimeMessage mm= prepareMimeMessageFromTenantVerification(obj);
    	sendHtmlEmail(mm);
    	
    	}            
    	 catch (MessagingException | MailSendException e) {
    		 
    		 throw new UnknownHostException("Falha ao enviar email");
    		
    		 
    	 }    	
    }
    

	protected MimeMessage prepareMimeMessageFromTenantVerification(Tenant obj) throws MessagingException, MailSendException {
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper mmh;
		
			mmh = new MimeMessageHelper(mimeMessage, true);
			mmh.setTo(obj.getEmail());
			mmh.setFrom(sender);	
			mmh.setSubject("Verificação de Cadastro :" +  obj.getSlug());
			mmh.setSentDate(new Date(System.currentTimeMillis()));
			mmh.setText(htmlFromTemplateTenantVerification(obj),true);
					
		return mimeMessage;
	}
	
	
	
	
	//registration
    @Override
    public  void sendRegistrationTenantEmail(Tenant obj){
        SimpleMailMessage sm = prepareSimpleMailMessageFromTenantRegistration(obj);
        sendEmail(sm);
    }

    protected  SimpleMailMessage prepareSimpleMailMessageFromTenantRegistration(Tenant obj){
        SimpleMailMessage sm= new SimpleMailMessage();
        sm.setTo(obj.getEmail());
        sm.setFrom(sender);
        sm.setSubject("Cadastro realizado");
        sm.setSentDate(new Date(System.currentTimeMillis()));
        sm.setText(obj.toString());
        return sm;
    }
    
    
    protected String htmlFromTemplateTenantRegistration(Tenant obj) {
    	Context context = new Context();
    	context.setVariable("tenant", obj);   	
    	return templateEngine.process("email/registrationTenantEmail", context);
    }
    
    @Override
    public void sendRegistrationHtmlEmail(Tenant obj) throws UnknownHostException{
    	try {
    	MimeMessage mm= prepareMimeMessageFromTenantRegistration(obj);
    	sendHtmlEmail(mm);
    	
    	}            
    	 catch (MessagingException | MailSendException e) {
    		
    		 throw new UnknownHostException("Falha ao enviar email");
    		 
     		
    	 }    	
    }

	protected MimeMessage prepareMimeMessageFromTenantRegistration(Tenant obj) throws MessagingException, MailSendException {
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper mmh;
		
			mmh = new MimeMessageHelper(mimeMessage, true);
			mmh.setTo(obj.getEmail());
			mmh.setFrom(sender);	
			mmh.setSubject("Cadastro realizado :" +  obj.getSlug());
			mmh.setSentDate(new Date(System.currentTimeMillis()));
			mmh.setText(htmlFromTemplateTenantRegistration(obj),true);
					
		return mimeMessage;
	}
	

	
	
	
	//nova senha por email/////////////////////////////////////////////////////////////////////////
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
		
		
		
		
		//lead send emails//////////////////////////////////////////////////////////////////////////
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
