package com.dynamous.imoveis.repositories;

import com.dynamous.imoveis.entities.Empreendimento;
import com.dynamous.imoveis.entities.LandingPage;
import com.dynamous.imoveis.entities.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LandingPageRepository extends JpaRepository<LandingPage, Long> {
    List<LandingPage> findByEmpreendimento(Empreendimento empreendimento);
    List<LandingPage> findByTenant(Tenant tenant);
    Optional<LandingPage> findByIdAndTenant(Long id, Tenant tenant);
    Optional<LandingPage> findBySlug(String slug);
}
