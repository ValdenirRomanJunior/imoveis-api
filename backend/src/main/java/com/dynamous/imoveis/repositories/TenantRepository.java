package com.dynamous.imoveis.repositories;


import com.dynamous.imoveis.entities.Tenant;

import java.util.Optional;

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

}
