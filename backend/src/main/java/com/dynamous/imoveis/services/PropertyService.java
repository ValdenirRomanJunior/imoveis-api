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
import com.dynamous.imoveis.enums.StatusProperty;
import com.dynamous.imoveis.enums.TypeProperty;
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

import org.hibernate.StaleStateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;



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
    
    @Autowired
    TenantService tenantService;

    //PROCURA POR ID
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
        Property newObj = find(property.getId());       
        updateData(newObj, property);
        imageUrlRepository.saveAll(newObj.getImages());
        addressRepository.save(newObj.getAddress()); // problema em salvar adress     
        return propertyRepository.save(newObj);
    }

    //METODO AUX PARA ATUALIZAR PROPRIEDADE
    private void updateData(Property newObj, Property property) {
        newObj.setName(property.getName());
        newObj.setDescription(property.getDescription());
        newObj.setTypeProperty(property.getTypeProperty());
        newObj.setGoal(property.getGoal());
        newObj.setNumberRooms(property.getNumberRooms());
        newObj.setBathRooms(property.getBathRooms());
        newObj.setArea(property.getArea());
        newObj.setIptu(property.getIptu());
        newObj.setVacancies(property.getVacancies());
        newObj.setCondominium(property.getCondominium());
        newObj.setPrice(property.getPrice());
        newObj.setStatusProperty(property.getStatusProperty());
        newObj.setAreaTotal(property.getAreaTotal());               	        			     		
        newObj.getImages().addAll(property.getImages());
        newObj.setAddress(property.getAddress());                                 		            		
        newObj.setTenant(newObj.getTenant());
        stateRepository.save(property.getAddress().getCity().getState());
		cityRepository.save(property.getAddress().getCity());
		
        			
    }
    
    //ATUALIZA STATUS IMÓVEL
    public Property updateStatus(Property property) {
    	   
       imageUrlRepository.saveAll(property.getImages());
       addressRepository.save(property.getAddress()); 
       return propertyRepository.save(property);
   }

    //DELETA UM IMÓVEL
    public void delete(Long id) {
        UserSS user = UserService.authenticated();
        Property property= find(id);
      //quando deleta propriedade deleta leads dele que propiedade vinculada
        if(user==null || !user.hasRole(Perfil.TENANT) && !property.getTenant().getId().equals(user.getId())){
            throw new AuthorizationException("Acesso negado");
        }

        try {
            propertyRepository.deleteById(id);
        } catch (DataIntegrityViolationException  | EmptyResultDataAccessException | StaleStateException e) {
            throw new DataIntegrityException("impossible delete with other objects: ");
        }
    }

   

    public Property fromDTO(PropertyNewDTO propertyNewDTO) {
    	UserSS user = UserService.authenticated();
  
    		Property property = new Property(null, propertyNewDTO.getName(), propertyNewDTO.getDescription(), TypeProperty.toEnum(propertyNewDTO.getTypeProperty()),Goal.toEnum(propertyNewDTO.getGoal()), 
					   propertyNewDTO.getNumberRooms(), propertyNewDTO.getBathRooms(), propertyNewDTO.getArea(), propertyNewDTO.getIptu(),
					   	propertyNewDTO.getVacancies(),propertyNewDTO.getCondominium(), propertyNewDTO.getPrice(), propertyNewDTO.getAreaTotal(),StatusProperty.NAO_PUBLICADO);    		
    	
    	        
    	        
    	     State state= stateRepository.findByName(propertyNewDTO.getState());  	     
    	     City city = cityRepository.findByNameAndState(propertyNewDTO.getCity(),state);
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
        List<ImageUrl> listImages=propertyNewDTO.getImages();
        if(listImages != null){
        	for(ImageUrl img : listImages) {
        		img.setId(null);
        		img.setUrl(img.getUrl());
        		img.setIdTenant(img.getIdTenant());       		
        		img.setProperty(property);
        		property.getImages().addAll(listImages);
        	}           
        }   
        return property;	
    }
    

       
	public Property fromDTOUpdate(PropertyUpdateDTO propertyUpdateDTO) {
		
    	UserSS user = UserService.authenticated();
    	 if(user == null){
             throw new AuthorizationException("Acesso negado");
         }
    	 
    	 Property propAux= find(propertyUpdateDTO.getId());
    	//jogar excpetion ususrio nulo
        Property property = new Property(propertyUpdateDTO.getId(), propertyUpdateDTO.getName(), propertyUpdateDTO.getDescription(), TypeProperty.toEnum(propertyUpdateDTO.getTypeProperty()), Goal.toEnum(propertyUpdateDTO.getGoal()), 
        		propertyUpdateDTO.getNumberRooms(), propertyUpdateDTO.getBathRooms(), propertyUpdateDTO.getArea(), propertyUpdateDTO.getIptu(),
        		propertyUpdateDTO.getVacancies(),propertyUpdateDTO.getCondominium(), propertyUpdateDTO.getPrice(), propertyUpdateDTO.getAreaTotal(),propAux.getStatusProperty());
        
        State state= stateRepository.findByName(propertyUpdateDTO.getState());
        //verificar se tem uma cidade deste estado cadastrada, se tiver tra
        
        City city = cityRepository.findByNameAndState(propertyUpdateDTO.getCity(),state);
      
	 
	 if(state == null) {
		State stateAux = new State(null,propertyUpdateDTO.getState());
		 City cityAux= new City(null,propertyUpdateDTO.getCity(), stateAux);		
		 Address address = new Address(propertyUpdateDTO.getId(),propertyUpdateDTO.getStreet(),propertyUpdateDTO.getNumber(), propertyUpdateDTO.getDistrict(), propertyUpdateDTO.getCep(), property, cityAux);
		 property.setAddress(address);
		       	
	}else if(state != null && city == null){
		
		 City cityAux= new City(null,propertyUpdateDTO.getCity(), state);
		 cityAux.setState(state);	
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

	try {
		
  	  	imageUrlRepository.deleteByPropertyId(propertyUpdateDTO.getId()); // pode haver um erro  aqui nesta deleção
  	  	
       } catch (DataIntegrityViolationException  | EmptyResultDataAccessException | StaleStateException e ) {
      new DataIntegrityException("impossible delete with other objects: ");
        }
	 List<ImageUrl> listImages=propertyUpdateDTO.getImages();
	for(ImageUrl img : listImages) {
		
		img.setId(null);
		img.setUrl(img.getUrl());
		img.setIdTenant(img.getIdTenant());       		
		img.setProperty(property);
	    property.getImages().addAll(listImages);
    	}
	

	return property;
	
}
	
	
	 @Transactional(readOnly = true)
	 public Page<Property> findByTenantMatchAnyParam(Integer goal,Integer typeProperty, String name, String domain, Integer page, Integer linesPerPage, String orderBy, String direction){
		  PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);		  
		  	
		  	Tenant tenant = tenantService.findByDomain(domain);
		  	return propertyRepository.findByGoalAndTEnantPropertiesIn(name,goal, typeProperty, tenant, pageRequest);

	}
	 @Transactional
	 public Page<Property> findByTenantBaseView(Integer goal,Integer typeProperty, String name, Integer page, Integer linesPerPage, String orderBy, String direction){
		   UserSS user = UserService.authenticated();
	        if (user == null) {
	        	throw new AuthorizationException("erro");
	        }
	        Tenant tenant = tenantService.find(user.getId());
		 PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);		  		  	
		   // Page<City> address= cityRepository.findAll(pageRequest);
		  //  Page<Property> pageR= propertyRepository.findAll(pageRequest);
		    
		  	return propertyRepository.findAll(pageRequest);

	}

	 @Transactional(readOnly = true)
	public List<Address> findResultSearch() {
			List<Address>resultList= addressRepository.findAll();
			return resultList;
	}

	 @Transactional(readOnly = true)
	public List<Property> findFourByTenant(String domain) {
		 Tenant tenant = tenantService.findByDomain(domain);
		List<Property> list = propertyRepository.findFirst4ByTenant(tenant);
		return list;
	}
	
	 public List<Property> findFourByTenant(Long id) {
		 Tenant tenant = tenantService.find(id);
		List<Property> list = propertyRepository.findFirst4ByTenant(tenant);
		return list;
	}
}