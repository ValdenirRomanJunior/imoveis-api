package com.dynamous.imoveis.repositories;

import com.dynamous.imoveis.entities.Address;
import com.dynamous.imoveis.entities.City;
import com.dynamous.imoveis.entities.Lead;
import com.dynamous.imoveis.entities.Property;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Goal;
import com.dynamous.imoveis.enums.TypeProperty;
import com.dynamous.imoveis.security.UserSS;
import com.dynamous.imoveis.services.UserService;
import com.dynamous.imoveis.services.exceptions.AuthorizationException;


import org.hibernate.query.NativeQuery;
import org.hibernate.query.internal.NativeQueryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.AbstractJpaQuery;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

@Repository
@Transactional
public interface PropertyRepository extends JpaRepository<Property,Long> {
	
 
	 
	
	@Transactional(readOnly = true)	
	Page<Property> findByTenant(Tenant tenant, Pageable PageRequest);
	
	@Transactional(readOnly = true)
    @Query("SELECT p FROM Property p WHERE p.tenant= :tenant and p.address.city.state.id= :state and p.address.city.id= :city and p.goal = :goal and p.typeProperty= :typeProperty ORDER BY p.name")
    Page<Property> findByPage(Tenant tenant,Long state, Long city, Integer goal, Integer typeProperty,  Pageable pageRequest);
    
   // @Query("SELECT p FROM Property p WHERE p.tenant= :tenant  and p.goal = :goal and p.typeProperty= :typeProperty ORDER BY p.name")
  //  Page<Property> findByGoalAndTenant( Tenant tenant, Integer goal,Integer typeProperty, Pageable pageRequest);

  //  @Query("SELECT p FROM Property p WHERE p.address.city.id= :city and p.tenant= :tenant  ORDER BY p.name")
   // Page<Property> findByCityAndTenant( Long city, Tenant tenant,Pageable pageRequest);
    
   // @Query("SELECT p FROM Property p WHERE p.address.city.id= :city and p.tenant= :tenant  and p.goal = :goal ORDER BY p.name")
  //  Page<Property> findByCityAndGoal( Long city, Integer goal,Tenant tenant,Pageable pageRequest);

    //@Query("SELECT p FROM Property p WHERE  p.tenant= :tenant and p.typeProperty= :typeProperty ORDER BY p.name")
  //  Page<Property> findByTypeAndTenant( Integer typeProperty,Tenant tenant,Pageable pageRequest);
    
    @Query("SELECT count(p) FROM Property p WHERE p.tenant.id= :id")
	Long countByTenantId(Long id);

    @Query("SELECT count(p) FROM Property p WHERE p.tenant.id= :id and p.statusProperty =1")
	Long publishedByTenantId(Long id);
    
    
    @EntityGraph(		    
		    attributePaths = {
		      "tenant",
		      "tenant.perfis",
		      "address",
		      "address.city",
		      "address.city.state",
		      "images"
		      
		    },type = EntityGraph.EntityGraphType.LOAD)
    @Query("SELECT p FROM Property p JOIN p.tenant JOIN p.address a LEFT JOIN a.city c LEFT JOIN c.state LEFT JOIN p.images where p.tenant = :tenant AND c.name like %:name% AND (:goal IS NULL or p.goal = :goal) AND (:typeProperty IS NULL or p.typeProperty = :typeProperty) AND p.statusProperty = 1")
    Page<Property> findByGoalAndTEnantPropertiesIn(@Param("name")String name,@Param("goal")Integer goal,@Param("typeProperty")Integer typeProperty, @Param("tenant") Tenant tenant, Pageable pageable);
    
   
	List<Property> findFirst4ByTenant(Tenant tenant);
	

	    Page<Property> findAll(Pageable pageable);

   

  
    
}




