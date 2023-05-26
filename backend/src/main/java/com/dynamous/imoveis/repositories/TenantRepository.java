package com.dynamous.imoveis.repositories;


import com.dynamous.imoveis.entities.Tenant;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface TenantRepository extends JpaRepository <Tenant,Long> {

    @Transactional(readOnly = true)
    Tenant findByEmail(String email);
    
    @Transactional(readOnly = true)
	Optional<Tenant> findByDomain(String domain);

}
