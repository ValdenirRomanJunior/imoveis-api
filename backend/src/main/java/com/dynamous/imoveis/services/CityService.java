package com.dynamous.imoveis.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dynamous.imoveis.entities.City;
import com.dynamous.imoveis.repositories.CityRepository;

@Service
public class CityService {
	
	@Autowired
	private CityRepository repo;
	
	public List<City> findByState(Long stateId){
		return repo.findCities(stateId);
	}

	public List<City> findAll() {
		return repo.findAll();
	}

}
