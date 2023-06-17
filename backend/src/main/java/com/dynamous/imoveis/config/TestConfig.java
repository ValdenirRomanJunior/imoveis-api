package com.dynamous.imoveis.config;

import com.dynamous.imoveis.services.EmailService;
import com.dynamous.imoveis.services.SmtpEmailService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("test")
public class TestConfig {

    @Bean
    public EmailService emailService(){
        return new SmtpEmailService();
    }


}
