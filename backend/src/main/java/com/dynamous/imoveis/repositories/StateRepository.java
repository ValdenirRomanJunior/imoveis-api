package com.dynamous.imoveis.repositories;

import org.springframework.data.jpa.repository.JpaRepository;


import com.dynamous.imoveis.entities.State;

public interface StateRepository extends JpaRepository<State, Integer>{

}
