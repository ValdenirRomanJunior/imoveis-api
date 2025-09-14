package com.dynamous.imoveis.repositories;

import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.entities.City;
import com.dynamous.imoveis.entities.Property;
import com.dynamous.imoveis.entities.State;
import com.dynamous.imoveis.entities.Tenant;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface AccountRepository extends JpaRepository<Account,Long> {

	Optional<Account> findByDomain(String domain);
	Optional<Account> findByCompanyName(String companyName);
	Optional<Account> findByCustomDomain(String customDomain);
	
	@Query("SELECT a FROM Account a LEFT JOIN FETCH a.tenants WHERE a.companyName = :companyName")
	List<Account> findByCompanyNameWithTenants(@Param("companyName") String companyName);
	
	Long countByStatus(Integer status);

 
    
  
  
}

	
