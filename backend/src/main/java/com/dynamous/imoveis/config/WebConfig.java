package com.dynamous.imoveis.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;



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
 

}

