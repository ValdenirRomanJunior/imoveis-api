package com.dynamous.imoveis.repositories;

import com.dynamous.imoveis.entities.Address;
import com.dynamous.imoveis.entities.City;
import com.dynamous.imoveis.entities.Property;
import com.dynamous.imoveis.entities.Tenant;

import org.hibernate.query.NativeQuery;
import org.hibernate.query.internal.NativeQueryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.AbstractJpaQuery;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

@Repository
@Transactional
public interface PropertyRepository extends JpaRepository<Property,Long> {
	
	



	
	public default Page<Property> findByPageReq(Tenant tenant,Long state, Long city, Integer goal, Integer typeProperty, Integer page, Integer linesPerPage, String orderBy, String direction, Pageable pageRequest) {
		
	
		String query="select P from Property P ";
		String condition = "where";
		
		
    	
    	if(tenant != null) {
    		query += condition + " P.tenant= :tenant ";
    		condition = " and ";
    	}
    	
    	if(state != null) {
    		query += condition + " P.address.city.state.id= :state ";
    		condition = " and ";
    	}
    	
    	if(city != null) {
    		query += condition + " P.address.city.id= :city ";
    		condition = " and ";
    	}
    	
    	if(goal != null) {
    		query += condition + " P.goal= :goal ";
    		condition = " and ";
    	}
    	
    	if(typeProperty != null) {
    		query += condition + " P.typeProperty= :typeProperty ";
    		condition = " and ";
    		
    	}
    	
    	PageRequest pageReques = PageRequest.of(page, linesPerPage, Sort.Direction.valueOf(direction), orderBy);
     	Pageable pr= pageReques;
    	
    
 
    	 return null;
			
		
	}
	
	
	
	@Transactional(readOnly = true)	
	Page<Property> findByTenant(Tenant tenant, Pageable PageRequest);
	
	@Transactional(readOnly = true)
    @Query("SELECT p FROM Property p WHERE p.tenant= :tenant and p.address.city.state.id= :state and p.address.city.id= :city and p.goal = :goal and p.typeProperty= :typeProperty ORDER BY p.name")
    Page<Property> findByPage(Tenant tenant,Long state, Long city, Integer goal, Integer typeProperty,  Pageable pageRequest);
    
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


    @Query("SELECT count(p) FROM Property p WHERE p.tenant.id= :id and p.statusProperty =1")
	Long publishedByTenantId(Long id);
}



