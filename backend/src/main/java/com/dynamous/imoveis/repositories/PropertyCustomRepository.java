package com.dynamous.imoveis.repositories;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import com.dynamous.imoveis.entities.Property;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.security.UserSS;
import com.dynamous.imoveis.services.UserService;
import com.dynamous.imoveis.services.exceptions.AuthorizationException;

@Repository
public class PropertyCustomRepository {
	
	private final EntityManager em;
	
	@Autowired
	private TenantRepository tenantRepository;
	
	public PropertyCustomRepository(EntityManager em) {
		this.em=em;
	}
	
  
	@SuppressWarnings("deprecation")
	public Page<Property> findByPage(Long id,Long state, Long city, Integer goal, Integer typeProperty, Integer page, Integer linesPerPage, String orderBy, String direction){
    	
    	UserSS user = UserService.authenticated();
         if(user == null){
             throw new AuthorizationException("Acesso negado");
         }
         
     	PageRequest pageRequest = PageRequest.of(page, linesPerPage, Sort.Direction.valueOf(direction), orderBy);
     	Pageable pr= pageRequest;
        Tenant tenant= tenantRepository.findById(user.getId()).get();
    	
        
    	String query="select P from Property P ";
    	String condition = "where";
    	
    	if(tenant != null) {
    		query += condition + " P.tenant= :tenant ";
    		condition = " and ";
    	}
    	
    	if(id != null) {
    		query += condition + " P.id= :id ";
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
    		
    	}
    	
    

    	var q = em.createQuery(query, Property.class);
    
    	
    	
    	if(tenant != null) {
    		q.setParameter("tenant", tenant);
    	}
    	if(id != null) {
    		q.setParameter("id", id);
    	}
    	
    	if(state != null) {
    		q.setParameter("state", state);
    	}
    	
    	if(city != null) {
    		q.setParameter("city", city);
    	}
    	
    	if(goal != null) {
    		q.setParameter("goal", goal);
    	}
    	
    	if(typeProperty != null) {
    		q.setParameter("typeProperty", typeProperty);
    	}
    	
 
    
    	List<Property> l=q.getResultList();
    	final int start = (int) pr.getOffset();
    	final int end = Math.min((start+pr.getPageSize()), l.size());
    	
   
    	 if(start > l.size()) {
    		
    		  return  new  PageImpl<>(l, pr, l.size());
    	 }
    	
    	 return new PageImpl<>(l.subList(start, end), pr, l.size());
        	//Page<Property> p = new  PageImpl<Property>(l, pr, l.size());
       	 
   	
    	
    }
	
	
	
	
	
	public List<Property> findSearchSite(Integer goal, Integer typeProperty,String name,@Param("properties") List<Property> properties){
    	
   
     
    	String query="select P from Property P ";
    	String condition = "where";
    	
 
    	
    	if(goal != null) {
    		query += condition + " P.goal= :goal and P IN :properties";
    		condition = " and ";
    		
    				
    	}
    	
    	if(typeProperty != null) {
    		query += condition + " P.typeProperty= :typeProperty and P IN :properties"; 
    		condition = " and ";
    		
    	}
    	if(name != null) {
    		query += condition + " P.address.city.state.name = :name and P IN :properties" ;
    		
    	}
    	

    	var q = em.createQuery(query, Property.class);
    
    	q.setParameter("properties", properties);
    	
    	if(goal != null) {
    		q.setParameter("goal", goal);
    	}
    	
    	if(typeProperty != null) {
    		q.setParameter("typeProperty", typeProperty);
    	}
    	
    	if(name != null) {
    		q.setParameter("name", name);
    	}
    	
    	 
    
    	List<Property> l=q.getResultList();
    	
    	System.out.println(l+ "ijdajdjadadadjadjadadasdasdadadadadadadadadadadaddadaDDDDD");
    	  	
    	 return l;
       	 
   	  	
    }
    

}
