package com.dynamous.imoveis;

import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Status;
import com.dynamous.imoveis.repositories.TenantRepository;
import com.dynamous.imoveis.services.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

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
		Tenant tenant= new Tenant(null,"corretor1","corretor1@gmail.com","$2a$10$SlOVSeeJSFR07DXoDdvZ..chnzSwkJXW0IZlL6K1CwbAX9eKd5XYa", Status.ACTIVE);
		repository.save(tenant);
		}
}
