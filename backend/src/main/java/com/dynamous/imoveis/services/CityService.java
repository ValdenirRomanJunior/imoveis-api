package com.dynamous.imoveis.services;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dynamous.imoveis.dto.CityDTO;
import com.dynamous.imoveis.entities.City;
import com.dynamous.imoveis.repositories.CityRepository;


@Service
public class CityService {
	
	@Autowired
	private CityRepository repository;
	

	
	@Transactional(readOnly = true)
	public List<CityDTO> findAll(){
		List<City> result=repository.findAll();
		List<CityDTO> list = result.stream().map(x -> new CityDTO(x)).collect(Collectors.toList());
		return list;
	}
	
	@Transactional
	public City save(City city){
			 city.setId(null);
			 city=repository.save( city);
			return  city;
		
	}

	public City fromDTO(CityDTO cityDTO) {		
		return new City(cityDTO.getId(),cityDTO.getName());
	}


	

}
