package com.dynamous.imoveis.repositories;

import com.dynamous.imoveis.entities.AsaasSubscription;
import com.dynamous.imoveis.entities.AsaasCustomer;
import com.dynamous.imoveis.enums.AsaasSubscriptionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface AsaasSubscriptionRepository extends JpaRepository<AsaasSubscription, Long> {
    
    Optional<AsaasSubscription> findByAsaasSubscriptionId(String asaasSubscriptionId);
    
    List<AsaasSubscription> findByAsaasCustomer(AsaasCustomer asaasCustomer);
    
    List<AsaasSubscription> findByAsaasCustomerAndStatus(AsaasCustomer asaasCustomer, AsaasSubscriptionStatus status);
    
    Optional<AsaasSubscription> findByAsaasCustomerAndStatusOrderByCreatedAtDesc(AsaasCustomer asaasCustomer, AsaasSubscriptionStatus status);
    
    boolean existsByAsaasSubscriptionId(String asaasSubscriptionId);
    
    List<AsaasSubscription> findByStatus(AsaasSubscriptionStatus status);
}