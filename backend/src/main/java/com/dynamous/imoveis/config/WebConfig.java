package com.dynamous.imoveis.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.dynamous.imoveis.services.EmailService;

@Configuration
@EnableWebMvc
public class WebConfig extends WebMvcConfigurerAdapter {
 @Override
 public void addResourceHandlers(ResourceHandlerRegistry registry) {
registry.addResourceHandler("/webjars/**", "/resources/**", "/static/**", "/images/**", "/css/**", "/js/**",
				"classpath:/static/", "classpath:/resources/")
		.addResourceLocations("/webjars/", "/resources/",
						"classpath:/static/**", "classpath:/static/img/**", "classpath:/static/",
						"classpath:/resources/", "classpath:/static/css/", "classpath:/static/js/", "/resources/**",
						"/WEB-INF/classes/static/**");
		
 }
 
 @Bean
 public EmailService emailService () {
     return emailService();
 }
}

