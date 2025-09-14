package com.dynamous.imoveis.repositories;

import com.dynamous.imoveis.entities.Theme;
import com.dynamous.imoveis.entities.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ThemeRepository extends JpaRepository<Theme, Long> {
    Optional<Theme> findByTenant(Tenant tenant);
    Optional<Theme> findByTenantId(Long tenantId);
}