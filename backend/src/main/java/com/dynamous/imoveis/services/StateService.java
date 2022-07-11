package com.dynamous.imoveis.services;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dynamous.imoveis.dto.CityDTO;
import com.dynamous.imoveis.dto.StateDTO;
import com.dynamous.imoveis.entities.City;
import com.dynamous.imoveis.entities.State;
import com.dynamous.imoveis.repositories.CityRepository;
import com.dynamous.imoveis.repositories.StateRepository;


@Service
public class StateService {
	
	@Autowired
	private StateRepository repository;
	

	
	@Transactional(readOnly = true)
	public List<StateDTO> findAll(){
		List<State> result=repository.findAll();
		List<StateDTO> list = result.stream().map(x -> new StateDTO(x)).collect(Collectors.toList());
		return list;
	}
	
	@Transactional
	public State save(State state){
			 state.setId(null);
			 state=repository.save( state);
			return  state;
		
	}

	public State fromDTO(StateDTO stateDTO) {		
		return new State(stateDTO.getId(),stateDTO.getName());
	}


	

}
