package com.dynamous.imoveis.repositories;

import com.dynamous.imoveis.entities.City;
import com.dynamous.imoveis.entities.State;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface StateRepository extends JpaRepository<State,Long> {
	
	@Transactional(readOnly = true)
	State findByName(String name);
	
	@Transactional(readOnly = true)
	public List<State> findAllByOrderByName();
	

	
	
}

	
