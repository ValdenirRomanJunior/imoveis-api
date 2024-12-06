package com.dynamous.imoveis.services;

import java.util.List;
import java.util.Optional;

import org.hibernate.StaleStateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.entities.City;
import com.dynamous.imoveis.entities.Lead;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.repositories.CityRepository;
import com.dynamous.imoveis.security.UserSS;
import com.dynamous.imoveis.services.exceptions.AuthorizationException;
import com.dynamous.imoveis.services.exceptions.DataIntegrityException;
import com.dynamous.imoveis.services.exceptions.ObjectNotFoundException;

@Service
public class CityService {
	
	@Autowired
	private CityRepository repo;
	
    public City find(Long id) {
        UserSS user = UserService.authenticated();
         
          if(user == null && id==null){
              throw new AuthorizationException("Acesso negado");
          }
          
          Optional<City> city = repo.findById(id);
          return city.orElseThrow(() -> new ObjectNotFoundException(
                  "Página não encontrada! Id:" + ", Type" + City.class.getName()));
      }
    
    public void delete(Long id) {
        find(id);
       try {
            repo.deleteById(id);
        } catch (DataIntegrityViolationException  | EmptyResultDataAccessException | StaleStateException e) {
          throw new DataIntegrityException("Não é possivel deletar porque tem objetos anexados: ");
        }
    }
	
	public List<City> findByState(Long stateId){
		return repo.findCities(stateId);
	}

	public List<City> findAll() {
		return repo.findAll();
	}

}
