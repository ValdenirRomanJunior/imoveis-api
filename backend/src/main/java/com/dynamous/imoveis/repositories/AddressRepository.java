package com.dynamous.imoveis.repositories;

import com.dynamous.imoveis.entities.Address;
import com.dynamous.imoveis.entities.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface AddressRepository extends JpaRepository<Address,Long> {
    @Query("select obj FROM Address obj where obj.city = city" )
    List<Address> findByCity(Long city);
}
