package com.dynamous.imoveis.repositories;


import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.entities.ImageUrl;
import com.dynamous.imoveis.entities.Property;
import com.dynamous.imoveis.entities.Tenant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;


@Repository
@Transactional
public interface PropertyRepository extends JpaRepository<Property,Long> {
	
 
	 	
	@Transactional(readOnly = true)	
	Page<Property> findByAccount(Account account, Pageable PageRequest);
	
	@Transactional(readOnly = true)
    @Query("SELECT p FROM Property p WHERE p.account= :account and p.address.city.state.id= :state and p.address.city.id= :city and p.goal = :goal and p.typeProperty= :typeProperty ORDER BY p.name")
    Page<Property> findByPage(Account account,Long state, Long city, Integer goal, Integer typeProperty,  Pageable pageRequest);
    
    
    @Query("SELECT count(p) FROM Property p WHERE p.account.id= :id")
	Long countByAccountId(Long id);

    @Query("SELECT count(p) FROM Property p WHERE p.account.id= :id and p.statusProperty =1")
	Long publishedByAccountId(Long id);
    
   
    //busca paginada por tenant 20/05/2024
    @EntityGraph(		    
		    attributePaths = {
		      "account",
		      "address",
		      "address.city",
		      "address.city.state",
		      "images"
		      
		      		
		    },type = EntityGraph.EntityGraphType.LOAD)
          //"SELECT p FROM Property p LEFT JOIN p.tenant t JOIN p.address a JOIN a.city c JOIN c.state s WHERE t= :tenant AND lower(c.name) like lower(concat('%',:name,'%')) OR lower(a.district) like lower(concat('%',:name,'%')) AND (:goal IS NULL or p.goal = :goal) AND (:typeProperty IS NULL or p.typeProperty = :typeProperty) AND p.statusProperty =1 "
    @Query("SELECT p FROM Property p JOIN p.account JOIN p.address a LEFT JOIN a.city c LEFT JOIN c.state LEFT JOIN p.images where p.account = :account AND (lower(c.name) like lower(concat('%',:name,'%')) OR lower(a.district) like lower(concat('%',:name,'%'))) AND (:goal IS NULL or p.goal = :goal) AND (:typeProperty IS NULL or p.typeProperty = :typeProperty) AND p.statusProperty = 1"
)
    Page<Property> findByGoalAndAccountPropertiesIn(@Param("name")String name,@Param("goal")Integer goal,@Param("typeProperty")Integer typeProperty, @Param("account") Account account, Pageable pageable);
   
      
   //erro aqui,esta indo as nao publicadas para a home
	List<Property> findFirst4ByAccountAndStatusPropertyLessThanEqual(Account account, Integer number);
	
	
	    Page<Property> findAll(Pageable pageable);
	    //busca imoveis por tenat
		List<Property> findAllByAccount(Account account);

		//Optional<Property> findByIdAndTenant(Long id, Tenant tenant);
		
		@Query("SELECT p FROM Property p WHERE p.account.id= :id and p.statusFeatured =1 and p.statusProperty =1")
		List<Property> findAllByAccountAndStatusFeatureAndStatusProperty(@Param("id")Long id);

		Optional<Property> findByIdAndAccount(Long id, Account account);

		List<Property> findFirst4ByAccountAndStatusFeaturedAndStatusProperty(Account account, int statusFeatured, int statusProperty);
		

  
}


