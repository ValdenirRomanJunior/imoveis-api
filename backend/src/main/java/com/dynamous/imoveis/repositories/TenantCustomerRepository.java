package com.dynamous.imoveis.repositories;

import com.dynamous.imoveis.entities.TenantCustomer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface TenantCustomerRepository extends JpaRepository <TenantCustomer,Long> {

    @Transactional(readOnly = true)
    TenantCustomer findByemail(String email);
}
