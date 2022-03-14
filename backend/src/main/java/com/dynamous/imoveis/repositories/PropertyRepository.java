package com.dynamous.imoveis.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dynamous.imoveis.entities.Property;

public interface PropertyRepository extends JpaRepository<Property, Integer>{

}
