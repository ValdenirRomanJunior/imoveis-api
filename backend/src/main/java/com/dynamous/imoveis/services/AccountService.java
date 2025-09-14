package com.dynamous.imoveis.services;


import com.dynamous.imoveis.dto.PropertyNewDTO;
import com.dynamous.imoveis.dto.PropertyUpdateDTO;
import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.entities.Address;
import com.dynamous.imoveis.entities.City;
import com.dynamous.imoveis.entities.Image;
import com.dynamous.imoveis.entities.ImageUrl;
import com.dynamous.imoveis.entities.Property;
import com.dynamous.imoveis.entities.State;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Feature;
import com.dynamous.imoveis.enums.Goal;
import com.dynamous.imoveis.enums.Perfil;
import com.dynamous.imoveis.enums.StatusFeatured;
import com.dynamous.imoveis.enums.StatusProperty;
import com.dynamous.imoveis.enums.TypeProperty;
import com.dynamous.imoveis.repositories.AccountRepository;
import com.dynamous.imoveis.repositories.AddressRepository;
import com.dynamous.imoveis.repositories.CityRepository;
import com.dynamous.imoveis.repositories.ImageRepository;
import com.dynamous.imoveis.repositories.ImageUrlRepository;
import com.dynamous.imoveis.repositories.PropertyRepository;
import com.dynamous.imoveis.repositories.StateRepository;
import com.dynamous.imoveis.repositories.TenantRepository;
import com.dynamous.imoveis.security.UserSS;

import java.util.List;

import com.dynamous.imoveis.services.exceptions.ObjectNotFoundException;

import org.hibernate.StaleStateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.mail.Multipart;



@Service
public class AccountService {

	@Autowired
	private AccountRepository repo;

    //PROCURA POR ID
    public Account find(Long id) {
        Optional<Account> account = repo.findById(id);
        return account.orElseThrow(() -> new ObjectNotFoundException(
                "Object Not Found! Idss:" + ", Type" + Account.class.getName()));

    }
    

    
    public Account findByDomain(String domain) {
	      
        Optional<Account> account = repo.findByDomain(domain);
        return account.orElseThrow(() -> new ObjectNotFoundException(
                "Página não encontrada! Id:" + ", Type" + Account.class.getName()));
    }
    
    public Account findByCompanyName(String companyName) throws ObjectNotFoundException {
        List<Account> accounts = repo.findByCompanyNameWithTenants(companyName);
        if (accounts.isEmpty()) {
            throw new ObjectNotFoundException("Account not found with company name: " + companyName);
        }
        // Return the first account if multiple exist
        return accounts.get(0);
    }
    
    public List<Account> findAll() {
        List<Account> accounts = repo.findAll();
        System.out.println("Total accounts found: " + accounts.size());
        for (Account account : accounts) {
            System.out.println("Account ID: " + account.getId() + ", CompanyName: " + account.getCompanyName());
        }
        return accounts;
    }
    
    public Optional<Account> findByCustomDomain(String customDomain) {
        return repo.findByCustomDomain(customDomain);
    }
    
    public Account update(Account account) {
        return repo.save(account);
    }
 
}
	