package com.dynamous.imoveis;


import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication(scanBasePackages = {"com.dynamous.imoveis","com.dynamous.imoveis.config"})
@EnableWebMvc
public class ImoveisApplication {


	public static void main(String[] args) {

		SpringApplication.run(ImoveisApplication.class, args);
		
		
	}


		 	 
	 @SuppressWarnings("deprecation")
		@Bean
		    public WebMvcConfigurer corsConfigurer() {
		        return new WebMvcConfigurerAdapter() {
		            @Override
		            public void addCorsMappings(CorsRegistry registry) {
		                registry.addMapping("/**").allowedOrigins("http://localhost:3000");
		            }
		        };
	 }
}
