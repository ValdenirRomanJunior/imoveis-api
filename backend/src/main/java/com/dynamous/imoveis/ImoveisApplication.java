package com.dynamous.imoveis;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectListing;
import com.amazonaws.services.s3.model.S3Object;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Status;
import com.dynamous.imoveis.repositories.TenantRepository;
import com.dynamous.imoveis.services.S3Service;

import software.amazon.awssdk.services.s3.model.ListObjectsResponse;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
@EnableWebMvc
public class ImoveisApplication implements CommandLineRunner {

	
	@Autowired
	private TenantRepository repository;


	public static void main(String[] args) {

		SpringApplication.run(ImoveisApplication.class, args);
		
		

	}

	@Override
	public void run(String... args) throws Exception {
		
		
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
