package com.dynamous.imoveis.repositories;

import com.dynamous.imoveis.entities.AsaasPayment;
import com.dynamous.imoveis.entities.AsaasSubscription;
import com.dynamous.imoveis.entities.AsaasCustomer;
import com.dynamous.imoveis.enums.AsaasPaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface AsaasPaymentRepository extends JpaRepository<AsaasPayment, Long> {
    
    Optional<AsaasPayment> findByAsaasPaymentId(String asaasPaymentId);
    
    List<AsaasPayment> findByAsaasSubscription(AsaasSubscription asaasSubscription);
    
    List<AsaasPayment> findByAsaasCustomer(AsaasCustomer asaasCustomer);
    
    List<AsaasPayment> findByAsaasCustomerAndStatus(AsaasCustomer asaasCustomer, AsaasPaymentStatus status);
    
    List<AsaasPayment> findByStatus(AsaasPaymentStatus status);
    
    boolean existsByAsaasPaymentId(String asaasPaymentId);
    
    List<AsaasPayment> findByAsaasSubscriptionOrderByCreatedAtDesc(AsaasSubscription asaasSubscription);
}