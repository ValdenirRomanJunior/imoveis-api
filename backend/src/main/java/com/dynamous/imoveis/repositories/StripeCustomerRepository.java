package com.dynamous.imoveis.repositories;

import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.entities.StripeCustomer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional
public interface StripeCustomerRepository extends JpaRepository<StripeCustomer, Long> {

    @Transactional(readOnly = true)
    Optional<StripeCustomer> findByStripeCustomerId(String stripeCustomerId);

    @Transactional(readOnly = true)
    Optional<StripeCustomer> findByAccount(Account account);

    @Transactional(readOnly = true)
    Optional<StripeCustomer> findByEmail(String email);

    @Transactional(readOnly = true)
    boolean existsByStripeCustomerId(String stripeCustomerId);

    @Transactional(readOnly = true)
    boolean existsByAccount(Account account);
}