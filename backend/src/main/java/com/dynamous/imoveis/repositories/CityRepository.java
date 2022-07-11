package com.dynamous.imoveis.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dynamous.imoveis.entities.City;


public interface CityRepository extends JpaRepository<City, Integer>{

}
