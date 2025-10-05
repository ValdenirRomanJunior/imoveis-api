package com.dynamous.imoveis.repositories;

import com.dynamous.imoveis.entities.AsaasCustomer;
import com.dynamous.imoveis.entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AsaasCustomerRepository extends JpaRepository<AsaasCustomer, Long> {
    
    Optional<AsaasCustomer> findByAsaasCustomerId(String asaasCustomerId);
    
    Optional<AsaasCustomer> findByAccount(Account account);
    
    Optional<AsaasCustomer> findByAccountId(Long accountId);
    
    boolean existsByAsaasCustomerId(String asaasCustomerId);
    
    boolean existsByAccount(Account account);
}