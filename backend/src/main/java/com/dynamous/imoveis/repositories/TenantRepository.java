package com.dynamous.imoveis.repositories;


import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Perfil;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface TenantRepository extends JpaRepository <Tenant,Long> {

	 @EntityGraph(
			    
			    attributePaths = {
			    	"perfis"
			      
			    },type = EntityGraph.EntityGraphType.LOAD)
    @Transactional(readOnly = true)
	 @Query("SELECT t FROM Tenant t LEFT JOIN FETCH t.perfis WHERE t.email = :email")
    Tenant findByEmail(@Param("email")String email);
    
    @Transactional(readOnly = true)
	Optional<Tenant> findByDomain(String domain);

	@Transactional(readOnly = true)
	Optional<Tenant> findBySlug(String slug);

	Page<Tenant> findAllByPerfis(PageRequest pageRequest, int perfil);

	//@Query("SELECT t FROM Tenant t LEFT JOIN t.perfis p WHERE t.account = :account")
	List<Tenant> findAllByAccount(Account account);

	// Métodos para buscar tenants recentes por ID (já que não temos createdAt)
	List<Tenant> findTop10ByOrderByIdDesc();
	
	Page<Tenant> findAllByOrderByIdDesc(org.springframework.data.domain.Pageable pageable);
    
	}
