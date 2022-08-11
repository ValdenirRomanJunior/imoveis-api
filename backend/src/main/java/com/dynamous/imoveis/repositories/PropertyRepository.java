package com.dynamous.imoveis.repositories;

import com.dynamous.imoveis.entities.Address;
import com.dynamous.imoveis.entities.City;
import com.dynamous.imoveis.entities.Property;
import com.dynamous.imoveis.entities.Tenant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface PropertyRepository extends JpaRepository<Property,Long> {


    @Transactional(readOnly = true)
    @Query("SELECT p FROM Property p WHERE p.address.city.id= :city and p.tenant= :tenant  and p.goal = :goal and p.type= :type ORDER BY p.name")
    Page<Property> findByAddressAndTenant(@Param("city") Long city, @Param("tenant") Tenant tenant,@Param("goal") Integer goal,@Param("type") Integer type, Pageable pageRequest);
}



