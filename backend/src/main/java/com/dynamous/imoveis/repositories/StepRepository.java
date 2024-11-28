package com.dynamous.imoveis.repositories;

import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.entities.City;
import com.dynamous.imoveis.entities.Property;
import com.dynamous.imoveis.entities.State;
import com.dynamous.imoveis.entities.Step;
import com.dynamous.imoveis.entities.Tenant;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface StepRepository extends JpaRepository<Step,Long> {

	// @Query("SELECT count(l) FROM Step l WHERE l.tenant.id= :id")
		//Long countStepByTenantId(Long id);
	 	
	 	//Step findFirstByTenant(Tenant tenant);

		//Step findByNameAndTenant(String name, Tenant tenant);

		//List<Step> findAllByTenant(Tenant tenant);

		Long countStepByAccount(Account account);

		List<Step> findAllByAccount(Account account);
	
		Step findByNameAndAccount(String name, Account account);
	
		Step findFirstByAccount(Account account);

	
	    
  
  
}

	
