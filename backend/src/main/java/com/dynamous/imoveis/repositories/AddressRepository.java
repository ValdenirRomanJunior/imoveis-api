package com.dynamous.imoveis.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dynamous.imoveis.entities.Address;


public interface AddressRepository extends JpaRepository<Address, Integer>{

}
