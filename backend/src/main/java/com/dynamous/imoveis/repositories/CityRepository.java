package com.dynamous.imoveis.repositories;

import com.dynamous.imoveis.entities.City;
import com.dynamous.imoveis.entities.Property;
import com.dynamous.imoveis.entities.State;
import com.dynamous.imoveis.entities.Tenant;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface CityRepository extends JpaRepository<City,Long> {

    @Transactional(readOnly = true)
    City findByName(String name);
    
    @Query("SELECT obj FROM City obj WHERE obj.state.id = :stateId ORDER BY obj.name")
    public List<City> findCities(@Param("stateId") Long state_id);
    
    @Query("SELECT obj FROM City obj WHERE obj.state.name = :name ORDER BY obj.name")
    public List<City> findCitiesByState(@Param("name") String name);

	City findByNameAndState(String city, State state);
    
  
  
}

	
