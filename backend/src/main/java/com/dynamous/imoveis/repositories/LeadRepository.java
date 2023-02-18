package com.dynamous.imoveis.repositories;


import com.dynamous.imoveis.entities.Lead;
import com.dynamous.imoveis.entities.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface LeadRepository extends JpaRepository <Lead,Long> {

    @Transactional(readOnly = true)
    Lead findByEmail(String email);

    @Query("SELECT count(l) FROM Lead l WHERE l.tenant.id= :id")
	Long countLeadByTenantId(Long id);

}
