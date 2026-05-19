package com.dynamous.imoveis.repositories;

import com.dynamous.imoveis.entities.Empreendimento;
import com.dynamous.imoveis.entities.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmpreendimentoRepository extends JpaRepository<Empreendimento, Long> {
    List<Empreendimento> findByTenant(Tenant tenant);
    Optional<Empreendimento> findByIdAndTenant(Long id, Tenant tenant);
}
