package com.dynamous.imoveis.config;


import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.accept.ContentNegotiationManager;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.ContentNegotiatingViewResolver;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.ViewResolverComposite;



@Configuration
@EnableWebMvc
public class WebConfig extends WebMvcConfigurerAdapter {

 @Autowired
 private RateLimitingInterceptor rateLimitingInterceptor;

 @Override
 public void addInterceptors(InterceptorRegistry registry) {
     registry.addInterceptor(rateLimitingInterceptor)
             .addPathPatterns("/**") // Aplica a todos os endpoints
             .excludePathPatterns("/webjars/**", "/resources/**", "/static/**", "/images/**", "/css/**", "/js/**"); // Exclui recursos estáticos
 }

 @Override
 public void addResourceHandlers(ResourceHandlerRegistry registry) {
registry.addResourceHandler("/webjars/**", "/resources/**", "/static/**", "/images/**", "/css/**", "/js/**",
				"classpath:/static/", "classpath:/resources/")
		.addResourceLocations("/webjars/", "/resources/",
						"classpath:/static/**", "classpath:/static/img/**", "classpath:/static/",
						"classpath:/resources/", "classpath:/static/css/", "classpath:/static/js/", "/resources/**",
						"/WEB-INF/classes/static/**");
		
 }
 
 @Override
 public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
     StringHttpMessageConverter stringConverter = new StringHttpMessageConverter(StandardCharsets.UTF_8);
     stringConverter.setWriteAcceptCharset(false);
     converters.add(stringConverter);
     
     MappingJackson2HttpMessageConverter jsonConverter = new MappingJackson2HttpMessageConverter();
     jsonConverter.setDefaultCharset(StandardCharsets.UTF_8);
     converters.add(jsonConverter);
 }
 

}

