package com.dynamous.imoveis.repositories;


import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.entities.Lead;
import com.dynamous.imoveis.entities.Property;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Status;
import com.dynamous.imoveis.enums.Verification;

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
public interface LeadRepository extends JpaRepository <Lead,Long> {

    @Transactional(readOnly = true)
    Lead findByEmail(String email);

    @Query("SELECT count(l) FROM Lead l WHERE l.account.id= :id")
	Long countLeadByAccountId(Long id);
    
    
	 @Query("SELECT l FROM Lead l where LOWER(l.name) like %:name% AND l.account = :account")
	    Page<Lead> findByNameAndAccountLeadsIn(@Param("name")String name, @Param("account") Account account, Pageable pageable);

	 
	void deleteAllByAccount(Account account);

	Optional<Lead> findByIdAndAccount(Long id, Account account);

}
