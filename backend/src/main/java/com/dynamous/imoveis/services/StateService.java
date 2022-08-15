package com.dynamous.imoveis.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dynamous.imoveis.entities.State;
import com.dynamous.imoveis.repositories.StateRepository;

@Service
public class StateService {
	
	@Autowired
	private StateRepository repo;
	
	public List<State>findAll(){
		return repo.findAllByOrderByName();
		
	}

}
