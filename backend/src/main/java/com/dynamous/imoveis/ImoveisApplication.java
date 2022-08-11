package com.dynamous.imoveis;

import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.services.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class ImoveisApplication implements CommandLineRunner {



	public static void main(String[] args) {

		SpringApplication.run(ImoveisApplication.class, args);

	}

	@Override
	public void run(String... args) throws Exception {

		}
}
