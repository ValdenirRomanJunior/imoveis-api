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

		
    
    @Query("SELECT p FROM Property p WHERE p.address.city.id= :city and p.tenant= :tenant  and p.goal = :goal and p.typeProperty= :typeProperty ORDER BY p.name")
    Page<Property> findByAddressAndTenant( Long city,  Tenant tenant, Integer goal,Integer typeProperty, Pageable pageRequest);
    
    @Query("SELECT p FROM Property p WHERE p.tenant= :tenant  and p.goal = :goal and p.typeProperty= :typeProperty ORDER BY p.name")
    Page<Property> findByGoalAndTenant( Tenant tenant, Integer goal,Integer typeProperty, Pageable pageRequest);

    @Query("SELECT p FROM Property p WHERE p.address.city.id= :city and p.tenant= :tenant  ORDER BY p.name")
    Page<Property> findByCityAndTenant( Long city, Tenant tenant,Pageable pageRequest);
    
    @Query("SELECT p FROM Property p WHERE p.address.city.id= :city and p.tenant= :tenant  and p.goal = :goal ORDER BY p.name")
    Page<Property> findByCityAndGoal( Long city, Integer goal,Tenant tenant,Pageable pageRequest);

    @Query("SELECT p FROM Property p WHERE  p.tenant= :tenant and p.typeProperty= :typeProperty ORDER BY p.name")
    Page<Property> findByTypeAndTenant( Integer typeProperty,Tenant tenant,Pageable pageRequest);
    
    @Query("SELECT count(p) FROM Property p WHERE p.tenant.id= :id")
	Long countByTenantId(Long id);
}



