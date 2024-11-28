package com.dynamous.imoveis.repositories;

import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.entities.Address;
import com.dynamous.imoveis.entities.City;
import com.dynamous.imoveis.entities.Property;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface AddressRepository extends JpaRepository<Address,Long> {
    @Query("select obj FROM Address obj where obj.city.id = city" )
    List<Address> findByCity(Long city);

    @Query("SELECT DISTINCT district FROM Address a WHERE a.account= :account")
	List<String> findAllDistrictsByAccountAndDistrict(Account account);
    
   
    	
}
