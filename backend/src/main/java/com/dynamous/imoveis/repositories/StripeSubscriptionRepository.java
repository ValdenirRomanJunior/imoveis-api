package com.dynamous.imoveis.repositories;

import com.dynamous.imoveis.entities.StripeCustomer;
import com.dynamous.imoveis.entities.StripeSubscription;
import com.dynamous.imoveis.enums.SubscriptionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface StripeSubscriptionRepository extends JpaRepository<StripeSubscription, Long> {

    @Transactional(readOnly = true)
    Optional<StripeSubscription> findByStripeSubscriptionId(String stripeSubscriptionId);

    @Transactional(readOnly = true)
    List<StripeSubscription> findByStripeCustomer(StripeCustomer stripeCustomer);

    @Transactional(readOnly = true)
    List<StripeSubscription> findByStripeCustomerAndStatus(StripeCustomer stripeCustomer, SubscriptionStatus status);

    @Transactional(readOnly = true)
    @Query("SELECT s FROM StripeSubscription s WHERE s.stripeCustomer.account.id = :accountId")
    List<StripeSubscription> findByAccountId(@Param("accountId") Long accountId);

    @Transactional(readOnly = true)
    @Query("SELECT s FROM StripeSubscription s WHERE s.stripeCustomer.account.id = :accountId AND s.status = :status")
    List<StripeSubscription> findByAccountIdAndStatus(@Param("accountId") Long accountId, @Param("status") SubscriptionStatus status);

    @Transactional(readOnly = true)
    boolean existsByStripeSubscriptionId(String stripeSubscriptionId);

    @Transactional(readOnly = true)
    @Query("SELECT COUNT(s) FROM StripeSubscription s WHERE s.stripeCustomer.account.id = :accountId AND s.status = :status")
    Long countByAccountIdAndStatus(@Param("accountId") Long accountId, @Param("status") SubscriptionStatus status);

    @Transactional(readOnly = true)
    @Query("SELECT s FROM StripeSubscription s WHERE s.stripeCustomer = :customer AND s.status = 'ACTIVE'")
    List<StripeSubscription> findActiveByCustomer(@Param("customer") StripeCustomer customer);
}