package com.dynamous.imoveis.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import com.dynamous.imoveis.dto.PropertyDTO;
import com.dynamous.imoveis.dto.PropertyNewDTO;
import com.dynamous.imoveis.entities.Address;
import com.dynamous.imoveis.entities.City;
import com.dynamous.imoveis.entities.Property;
import com.dynamous.imoveis.entities.State;
import com.dynamous.imoveis.repositories.AddressRepository;
import com.dynamous.imoveis.repositories.CityRepository;
import com.dynamous.imoveis.repositories.PropertyRepository;
import com.dynamous.imoveis.repositories.StateRepository;

@Service
public class PropertyService {
	
	@Autowired
	private PropertyRepository repository;
	
	@Autowired
	private AddressRepository addressRepository;
	
	@Autowired
	private CityRepository cityRepository;
	
	@Autowired
	private StateRepository stateRepository;
	

	
	
	


	@Transactional(readOnly = true)
	public Page<PropertyDTO> findAll(Pageable pageable){
		Page<Property> result=repository.findAll(pageable);
		Page<PropertyDTO> page = result.map(x -> new PropertyDTO(x));
		return page;
	}
	@Transactional(readOnly = true)
	public PropertyDTO findById(Integer id){
		Property result=repository.findById(id).get();
		PropertyDTO dto= new PropertyDTO(result);
		return dto;
	}
	
	@Transactional
	public Property save( Property property){
			property.setId(null);
			addressRepository.save(property.getAddress());
			repository.save(property);		
			return property;
		
	}
	public Property update(Property property) {
		findById(property.getId());
		return repository.save(property);
	}
	
	public Property fromDTO(PropertyNewDTO propertyNewDTO) {
		Property property = new Property(null,propertyNewDTO.getTitle(),propertyNewDTO.getDescription(),propertyNewDTO.getPrice(),propertyNewDTO.getBeds(),propertyNewDTO.getBaths(),propertyNewDTO.getBuilt(),propertyNewDTO.getSqft(),propertyNewDTO.getInformationLink(),propertyNewDTO.getMapLink());
		property.getImages().addAll(propertyNewDTO.getImages());
		State state =stateRepository.findById(propertyNewDTO.getStateId()).get();	
		City city=cityRepository.findById(propertyNewDTO.getCityId()).get();

		Address ad= new Address(null,propertyNewDTO.getStreet(),propertyNewDTO.getNumber(),city,property);		
		property.setAddress(ad);
		
		return property;
		
	}
	

}
