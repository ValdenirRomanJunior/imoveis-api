package com.dynamous.imoveis.repositories;


import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.entities.Lead;
import com.dynamous.imoveis.entities.Opportunity;
import com.dynamous.imoveis.entities.Property;
import com.dynamous.imoveis.entities.Step;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Status;
import com.dynamous.imoveis.enums.Verification;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface OpportunityRepository extends JpaRepository <Opportunity,Long> {

 
    @Query("SELECT count(l) FROM Opportunity l WHERE l.account.id= :id")
	Long countOpportunityByAccountId(Long id);
    
    @Query("SELECT l FROM Opportunity l where l.account = :account")
	    Page<Opportunity> findByAccountOpportunityIn(@Param("account") Account account, Pageable pageable);

	 
	void deleteAllByAccount(Account account);

	List<Opportunity> findAllByAccount(Account account);

	Optional<Opportunity> findByIdAndAccount(Long id, Account account);
	
	@Query("SELECT count(o) FROM Opportunity o WHERE o.step.id= :id")
	Long countByStep(@Param("id")Long id);
	

}
