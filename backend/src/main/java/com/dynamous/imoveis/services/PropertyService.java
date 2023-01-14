package com.dynamous.imoveis.services;


import com.dynamous.imoveis.dto.PropertyNewDTO;
import com.dynamous.imoveis.dto.PropertyUpdateDTO;
import com.dynamous.imoveis.entities.Address;
import com.dynamous.imoveis.entities.City;
import com.dynamous.imoveis.entities.ImageUrl;
import com.dynamous.imoveis.entities.Property;
import com.dynamous.imoveis.entities.State;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Goal;
import com.dynamous.imoveis.enums.Perfil;
import com.dynamous.imoveis.enums.Type;
import com.dynamous.imoveis.repositories.AddressRepository;
import com.dynamous.imoveis.repositories.CityRepository;
import com.dynamous.imoveis.repositories.ImageUrlRepository;
import com.dynamous.imoveis.repositories.PropertyRepository;
import com.dynamous.imoveis.repositories.StateRepository;
import com.dynamous.imoveis.repositories.TenantRepository;
import com.dynamous.imoveis.security.UserSS;
import com.dynamous.imoveis.services.exceptions.AuthorizationException;
import com.dynamous.imoveis.services.exceptions.DataIntegrityException;
import com.dynamous.imoveis.services.exceptions.ObjectNotFoundException;
import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private CityRepository cityRepository;
    
    @Autowired
    private StateRepository stateRepository;

    @Autowired
    private TenantRepository tenantRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired 
    ImageUrlRepository imageUrlRepository;


    public Property find(Long id) {
        Optional<Property> property = propertyRepository.findById(id);
        return property.orElseThrow(() -> new ObjectNotFoundException(
                "Object Not Found! Id:" + ", Type" + Property.class.getName()));

    }

    //CRIA UM IMOVEL
    @Transactional
    public Property save(Property property) {
        property.setId(null);
        property = propertyRepository.save(property);
        addressRepository.save(property.getAddress());
        imageUrlRepository.saveAll(property.getImages());
        return property;	
    }

    //ATUALIZA UM IMOVEL
    public Property update(Property property) {
    	
    	 try {
     	    	imageUrlRepository.deleteByPropertyId(property.getId());
           } catch (DataIntegrityViolationException e) {
               throw new DataIntegrityException("impossible delete with other objects: ");
           }
  
        Property newObj = find(property.getId());
        System.out.println(newObj.getImages().toString());
        updateData(newObj, property);
        imageUrlRepository.saveAll(newObj.getImages());
        addressRepository.save(newObj.getAddress()); // problema em salvar adress
        return propertyRepository.save(newObj);
    }

    //METODO AUX PARA ATUALIZAR PROPRIEDADE
    private void updateData(Property newObj, Property property) {
        newObj.setName(property.getName());
        newObj.setDescription(property.getDescription());
        newObj.setType(property.getType());
        newObj.setGoal(property.getGoal());
        newObj.setNumberRooms(property.getNumberRooms());
        newObj.setBathRooms(property.getBathRooms());
        newObj.setArea(property.getArea());
        newObj.setIptu(property.getIptu());
        newObj.setVacancies(property.getVacancies());
        newObj.setCondominium(property.getCondominium());
        newObj.setPrice(property.getPrice());
               	        			
        			for(ImageUrl img : property.getImages()) {      
        				
        				img.setId(null);
                		img.setUrl(img.getUrl());
                		img.setIdTenant(newObj.getTenant().getId());       		
                		img.setProperty(newObj);
                		newObj.getImages().addAll(property.getImages());
                                          		            		
                	}
        			
        			
        				// VERIFICA SE TEM ESTADO E CIDADE JÁ CADASTRADA
        			 State state= stateRepository.findByName(property.getAddress().getCity().getState().getName());  	     
            	     City city = cityRepository.findByName(property.getAddress().getCity().getName());
        			 	
        	        	if(state == null) {
        	        		State stateAux = new State(null,property.getAddress().getCity().getState().getName());
        	        		City cityAux= new City(null,property.getAddress().getCity().getName(), stateAux);
        	        		stateRepository.save(stateAux);
        	        		cityRepository.save(cityAux);
        	        		Address address = new Address(property.getAddress().getId(), property.getAddress().getStreet(), property.getAddress().getNumber(), property.getAddress().getDistrict(), property.getAddress().getCep(), property, cityAux);     	        		 
        	        		 
        	        		 newObj.setAddress(address);
        	        		       	
        	        	}else if(state != null && city == null){
        	        		City cityAux= new City(null,property.getAddress().getCity().getName(), newObj.getAddress().getCity().getState());
        	        		cityRepository.save(cityAux);
        	        		 Address address = new Address(property.getAddress().getId(),  property.getAddress().getStreet(), property.getAddress().getNumber(), property.getAddress().getDistrict(), property.getAddress().getCep(), property, cityAux);
        	        		 newObj.setAddress(address);
        	        	}else {
        	        	  	city.setState(state);
        	                Address address = new Address(property.getAddress().getId(), property.getAddress().getStreet(), property.getAddress().getNumber(), property.getAddress().getDistrict(), property.getAddress().getCep(), property, city);        	   
        	                newObj.setAddress(address);
        	        		
        	        	}
        				    		     	           	
        	        	newObj.setTenant(newObj.getTenant());
        	        	
        
    }

    //DELETA UM IMÓVEL
    public void delete(Long id) {
        UserSS user = UserService.authenticated();
        Property property= propertyRepository.findById(id).get();
        if(user==null || !user.hasRole(Perfil.TENANT) && !property.getTenant().getId().equals(user.getId())){
            throw new AuthorizationException("Acesso negado");
        }

        try {
            propertyRepository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityException("impossible delete with other objects: ");
        }
    }

   

    //BUSCA TODOS OS IMOVEIS PAGINADOS
    public Page<Property> findPage(Integer page, Integer linesPerPage, String orderBy, String direction){
        PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
        return propertyRepository.findAll(pageRequest);
    }

 

    public Property fromDTO(PropertyNewDTO propertyNewDTO) {
    	UserSS user = UserService.authenticated();
    	        Property property = new Property(null, propertyNewDTO.getName(), propertyNewDTO.getDescription(), Type.toEnum(propertyNewDTO.getType()), Goal.toEnum(propertyNewDTO.getGoal()), 
    	        									   propertyNewDTO.getNumberRooms(), propertyNewDTO.getBathRooms(), propertyNewDTO.getArea(), propertyNewDTO.getIptu(),
    	        									   	propertyNewDTO.getVacancies(),propertyNewDTO.getCondominium(), propertyNewDTO.getPrice());
    	        
    	     State state= stateRepository.findByName(propertyNewDTO.getState());  	     
    	     City city = cityRepository.findByName(propertyNewDTO.getCity());
        	if(state == null) {
        		State stateAux = new State(null,propertyNewDTO.getState());
        		City cityAux= new City(null,propertyNewDTO.getCity(), stateAux);
        		stateRepository.save(stateAux);
        		cityRepository.save(cityAux);
        		
        		 Address address = new Address(null, propertyNewDTO.getStreet(), propertyNewDTO.getNumber(), propertyNewDTO.getDistrict(), propertyNewDTO.getCep(), property, cityAux);
        		 property.setAddress(address);
        		       	
        	}else if(state != null && city== null){
        		City cityAux= new City(null,propertyNewDTO.getCity(), state);
        		cityRepository.save(cityAux);
        		 Address address = new Address(null, propertyNewDTO.getStreet(), propertyNewDTO.getNumber(), propertyNewDTO.getDistrict(), propertyNewDTO.getCep(), property, cityAux);
        		 property.setAddress(address);
        	}else {
        	  	city.setState(state);
                Address address = new Address(null, propertyNewDTO.getStreet(), propertyNewDTO.getNumber(), propertyNewDTO.getDistrict(), propertyNewDTO.getCep(), property, city);
                property.setAddress(address);
        		
        	}
        	
      
        Tenant tenant = tenantRepository.findById(user.getId()).get();
        property.setTenant(tenant);
        
        
        //salvo aqui  o objeto depois pego o id no banco da propriedade
        if(propertyNewDTO.getImages() != null){
        	for(ImageUrl img : propertyNewDTO.getImages()) {
        		img.setId(null);
        		img.setUrl(img.getUrl());
        		img.setIdTenant(img.getIdTenant());       		
        		img.setProperty(property);
        		 property.getImages().addAll(propertyNewDTO.getImages());
        	}
           
        }
   
        return property;
    }

    //SERVIÇO PARA BUSCA PAGINADA DE IMÓVEIS
    public Page<Property> search(String city,  String goal, String type, Integer page, Integer linesPerPage, String orderBy, String direction) {
            UserSS user = UserService.authenticated();
            if(user == null){
                throw new AuthorizationException("Acesso negado");
            }
            Tenant tenant= tenantRepository.findById(user.getId()).get();
            
            if((city.isEmpty()) && (goal.isEmpty()) && (type.isEmpty())) {            	
            	 Page<Property>listAll = findPage(page,linesPerPage,orderBy,direction);           	
            	return listAll;
            }
            else if ((city.isEmpty()) && (!goal.isEmpty()) && (!type.isEmpty())) {  
            	  Integer goalAux = Integer.parseInt(goal);
                  Integer typeAux=Integer.parseInt(type);
                  PageRequest pageRequest = PageRequest.of(page, linesPerPage, Sort.Direction.valueOf(direction), orderBy);
            	return propertyRepository.findByGoalAndTenant(tenant, goalAux, typeAux, pageRequest);
            }
            // se tem cidade, não tem goal e não tem type
            else if ((!city.isEmpty()) && (goal.isEmpty()) && (type.isEmpty())) {  
            	Long cityId = Long.parseLong(city);
                PageRequest pageRequest = PageRequest.of(page, linesPerPage, Sort.Direction.valueOf(direction), orderBy);
          	return propertyRepository.findByCityAndTenant(cityId,tenant, pageRequest);
          }
            else if ((!city.isEmpty()) && (!goal.isEmpty()) && (type.isEmpty())) {  
            	Long cityId = Long.parseLong(city);
            	 Integer goalAux = Integer.parseInt(goal);
                PageRequest pageRequest = PageRequest.of(page, linesPerPage, Sort.Direction.valueOf(direction), orderBy);
          	return propertyRepository.findByCityAndGoal(cityId,goalAux,tenant, pageRequest);
          }
            
            else if ((city.isEmpty()) && (goal.isEmpty()) && (!type.isEmpty())) {            	
            	 Integer typeAux=Integer.parseInt(type);
                 PageRequest pageRequest = PageRequest.of(page, linesPerPage, Sort.Direction.valueOf(direction), orderBy);
          	return propertyRepository.findByTypeAndTenant(typeAux,tenant, pageRequest);
          }
             Long cityId = Long.parseLong(city);
             Integer goalAux = Integer.parseInt(goal);
             Integer typeAux=Integer.parseInt(type);
          
        PageRequest pageRequest = PageRequest.of(page, linesPerPage, Sort.Direction.valueOf(direction), orderBy);
        return propertyRepository.findByAddressAndTenant(cityId, tenant, goalAux, typeAux, pageRequest);
    

    }

	public Property fromDTOUpdate(PropertyUpdateDTO propertyUpdateDTO) {
		
    	UserSS user = UserService.authenticated();
        Property property = new Property(propertyUpdateDTO.getId(), propertyUpdateDTO.getName(), propertyUpdateDTO.getDescription(), Type.toEnum(propertyUpdateDTO.getType()), Goal.toEnum(propertyUpdateDTO.getGoal()), 
        		propertyUpdateDTO.getNumberRooms(), propertyUpdateDTO.getBathRooms(), propertyUpdateDTO.getArea(), propertyUpdateDTO.getIptu(),
        		propertyUpdateDTO.getVacancies(),propertyUpdateDTO.getCondominium(), propertyUpdateDTO.getPrice());
        
     State state= stateRepository.findByName(propertyUpdateDTO.getState());  	     
     City city = cityRepository.findByName(propertyUpdateDTO.getCity());
	if(state == null) {
		State stateAux = new State(null,propertyUpdateDTO.getState());
		 City cityAux= new City(null,propertyUpdateDTO.getCity(), stateAux);		
		 Address address = new Address(propertyUpdateDTO.getId(),propertyUpdateDTO.getStreet(),propertyUpdateDTO.getNumber(), propertyUpdateDTO.getDistrict(), propertyUpdateDTO.getCep(), property, cityAux);
		 property.setAddress(address);
		       	
	}else if(state != null && city == null){
		 City cityAux= new City(null,propertyUpdateDTO.getCity(), state);		
		 Address address = new Address(propertyUpdateDTO.getId(), propertyUpdateDTO.getStreet(), propertyUpdateDTO.getNumber(), propertyUpdateDTO.getDistrict(), propertyUpdateDTO.getCep(), property, cityAux);
		 property.setAddress(address);
		 
	}else {
	  	city.setState(state);
        Address address = new Address(propertyUpdateDTO.getId(), propertyUpdateDTO.getStreet(), propertyUpdateDTO.getNumber(), propertyUpdateDTO.getDistrict(), propertyUpdateDTO.getCep(), property, city);
        property.setAddress(address);
		
	}
	
	Tenant tenant = tenantRepository.findById(user.getId()).get();
	property.setTenant(tenant);


//salvo aqui  o objeto depois pego o id no banco da propriedade
if(propertyUpdateDTO.getImages() != null){
	for(ImageUrl img : propertyUpdateDTO.getImages()) {
		img.setId(null);
		img.setUrl(img.getUrl());
		img.setIdTenant(img.getIdTenant());       		
		img.setProperty(property);
		 property.getImages().addAll(propertyUpdateDTO.getImages());
	}
   
}

return property;
	}
	
	//IMPLEMENTAR PAGINATION

}