package com.dynamous.imoveis.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dynamous.imoveis.dto.PropertyDTO;
import com.dynamous.imoveis.entities.Property;
import com.dynamous.imoveis.repositories.PropertyRepository;

@Service
public class PropertyService {
	
	@Autowired
	private PropertyRepository repository;

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
}
