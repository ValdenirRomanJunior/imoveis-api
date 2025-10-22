package com.dynamous.imoveis.services;


import com.amazonaws.services.s3.AmazonS3;
import com.dynamous.imoveis.dto.FeatureDTO;
import com.dynamous.imoveis.dto.PropertyNewDTO;
import com.dynamous.imoveis.dto.PropertyUpdateDTO;
import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.entities.Address;
import com.dynamous.imoveis.entities.City;
import com.dynamous.imoveis.entities.Image;
import com.dynamous.imoveis.entities.ImageUrl;
import com.dynamous.imoveis.entities.Property;
import com.dynamous.imoveis.entities.State;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Feature;
import com.dynamous.imoveis.enums.Goal;
import com.dynamous.imoveis.enums.Perfil;
import com.dynamous.imoveis.enums.StatusFeatured;
import com.dynamous.imoveis.enums.StatusProperty;
import com.dynamous.imoveis.enums.TypeProperty;
import com.dynamous.imoveis.repositories.AddressRepository;
import com.dynamous.imoveis.repositories.CityRepository;

import com.dynamous.imoveis.repositories.ImageRepository;
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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.expression.Maps;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.mail.Multipart;


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
    
    @Autowired
    private FileManagerService serviceFile;
    
    @Autowired
    private S3Service s3Service;
    
    @Autowired
    private ImageRepository imageRepo;
    
    @Autowired
    private ImageService imageService;
    
    @Autowired
    private CityService cityService;
    

    
    @Autowired
    private AmazonS3 s3client;	
    
    @Value("${s3.bucket}")
    private String bucketName;
    
    
	@Autowired
	private AccountService accountService;

    // Helper to resolve Account by custom domain, slug, or companyName
	private Account resolveAccountKey(String key) {
		if (key == null || key.trim().isEmpty()) {
			return null;
		}
		// Try custom domain
		Optional<Account> accountOpt = accountService.findByCustomDomain(key);
		if (accountOpt.isPresent()) {
			return accountOpt.get();
		}
		// Try tenant slug
		Optional<Tenant> tenantOpt = tenantRepository.findBySlug(key);
		if (tenantOpt.isPresent()) {
			Tenant tenant = tenantOpt.get();
			return accountService.find(tenant.getAccount().getId());
		}
		// Try account domain
		try {
			return accountService.findByDomain(key);
		} catch (ObjectNotFoundException e) {
			// ignore
		}
		// Try company name
		try {
			return accountService.findByCompanyName(key);
		} catch (ObjectNotFoundException e) {
			// ignore
		}
		// Try tenant service by domain
		try {
			Tenant tenant = tenantService.findByDomain(key);
			return accountService.find(tenant.getAccount().getId());
		} catch (ObjectNotFoundException e) {
			// ignore
		}
		return null;
	}

    //PROCURA POR ID
    public Property find(Long id) {
        Optional<Property> property = propertyRepository.findById(id);
        return property.orElseThrow(() -> new ObjectNotFoundException(
                "Object Not Found! Idss:" + ", Type" + Property.class.getName()));

    }
    public Property findByTenant(Long id) {
    	
   	 UserSS user = UserService.authenticated();
     Tenant tenant = tenantService.find(user.getId());
 	Account account= accountService.find(tenant.getAccount().getId());   
      if(user==null || !user.hasRole(Perfil.TENANT)){
          throw new AuthorizationException("Acesso negado");
      }
   
        Optional<Property> property = propertyRepository.findByIdAndAccount(id,account);
        return property.orElseThrow(() -> new ObjectNotFoundException(
                "Object Not Found! Id:" + ", Type" + Property.class.getName()));

    }
    
    //CRIA UM IMOVEL
    @Transactional
    public Property save(Property property,List<MultipartFile>files) {
         
    	Account account = accountService.find(property.getAccount().getId());
    	property = propertyRepository.save(property);
         if(files !=null) {
             // Validação: máximo de 20 fotos por imóvel
             if(files.size() > 20) {
                 throw new IllegalArgumentException("É permitido no máximo 20 fotos por imóvel");
             }
             
    	     for( MultipartFile file: files ) {    		    		  
    		     URI uri=serviceFile.uploadPropertyPictures(file,account, property);
    		
    	     }	 
         }    	    	    	 
           addressRepository.save(property.getAddress());
                    
           
        return property;		
    }
    		
   
    //ATUALIZA STATUS IMÓVEL
    public Property updateStatus(Property property) {
    	   
       //imageUrlRepository.saveAll(property.getImages());
       addressRepository.save(property.getAddress()); 
       return propertyRepository.save(property);
   }
    
    	
    	

    //DELETA UM IMÓVEL
    public void delete(Long id) throws URISyntaxException {
        UserSS user = UserService.authenticated();
        //buscar com sql se tem mais de 1 imovel com este nome de cidade cadastrada. 
        Property property= find(id);
        
        if(user==null || !user.hasRole(Perfil.TENANT)){
            throw new AuthorizationException("Acesso negado");
        }	
     
    
     
        try {
        	 s3Service.deleteAllFiles(id);
            propertyRepository.deleteById(id);
           
            //se tem mais existe algum imovel cadastrado com esta cidade e estado, caso não tem excluir esta cidade
        } catch (DataIntegrityViolationException  | EmptyResultDataAccessException | StaleStateException e) {
            throw new DataIntegrityException("impossible delete with other objects: ");
        } 
           
    }

    
    public Property fromDTO(PropertyNewDTO propertyNewDTO, List<MultipartFile> files) {
    	UserSS user = UserService.authenticated();
    		   		
    		Property property = new Property(null, propertyNewDTO.getName(), propertyNewDTO.getDescription(), TypeProperty.toEnum(propertyNewDTO.getTypeProperty()),Goal.toEnum(propertyNewDTO.getGoal()), 
					   propertyNewDTO.getNumberRooms(),propertyNewDTO.getSuites(), propertyNewDTO.getBathRooms(), propertyNewDTO.getArea(), propertyNewDTO.getIptu(),
					   	propertyNewDTO.getVacancies(),propertyNewDTO.getCondominium(), propertyNewDTO.getPrice(), propertyNewDTO.getAreaTotal(),StatusProperty.NAO_PUBLICADO, StatusFeatured.NAO_DESTACADO,propertyNewDTO.getFinanceable(),propertyNewDTO.getPermuta());    		
    			
    			if(!propertyNewDTO.getFeatures().isEmpty()) {
    				  for(FeatureDTO feature : propertyNewDTO.getFeatures()) {
    					
    					  	Integer i=feature.getId(); 					  		
    	    	        	property.addFeature(Feature.toEnum(i));
    					
    	    	        }
    			}
    				
    		    Tenant tenant = tenantRepository.findById(user.getId()).get();
    	        Account account= accountService.find(tenant.getAccount().getId());
    	        
    	     State state= stateRepository.findByName(propertyNewDTO.getState());  	     
    	     City city = cityRepository.findByNameAndState(propertyNewDTO.getCity(),state);
        	if(state == null) {
        		State stateAux = new State(null,propertyNewDTO.getState());
        	
        		City cityAux= new City(null,propertyNewDTO.getCity(), stateAux);
        	
     
        		stateRepository.save(stateAux);
        		cityRepository.save(cityAux);
        			
        		 Address address = new Address(null, propertyNewDTO.getStreet(), propertyNewDTO.getNumber(), propertyNewDTO.getDistrict(), propertyNewDTO.getCep(), property, cityAux);
        		 property.setAddress(address);
        		
        		 address.setAccount(account);
        		       	
        	}else if(state != null && city== null){
        		City cityAux= new City(null,propertyNewDTO.getCity(), state);
        	
        		cityRepository.save(cityAux);
        		 Address address = new Address(null, propertyNewDTO.getStreet(), propertyNewDTO.getNumber(), propertyNewDTO.getDistrict(), propertyNewDTO.getCep(), property, cityAux);
        		 property.setAddress(address);
        	
        		 address.setAccount(account);
        	}else {
        	  	city.setState(state);
        	
                Address address = new Address(null, propertyNewDTO.getStreet(), propertyNewDTO.getNumber(), propertyNewDTO.getDistrict(), propertyNewDTO.getCep(), property, city);
                property.setAddress(address);
                address.setAccount(account);
                
               
                
        	}
        	       	
        	
        property.setAccount(account);
       // property.setTenant(tenant);
   
        return property;
        	    
    }
    

    public Property update(Property property,List<FeatureDTO> features) {  	
        Property newObj = find(property.getId());    
        updateData(newObj, property, features);
        if(!features.isEmpty()) {
    			 for(FeatureDTO featureNew : features) {	
    						 	Integer i=featureNew.getId(); 					  		
    			  	        	newObj.addFeature(Feature.toEnum(i));
    							
    	        }
    		}
        
        
        //imageUrlRepository.saveAll(newObj.getImages());
        addressRepository.save(newObj.getAddress()); // problema em salvar adress     
        
        
        return propertyRepository.save(newObj);
    }

    //METODO AUX PARA ATUALIZAR PROPRIEDADE
    private void updateData(Property newObj, Property property, List<FeatureDTO> features) {
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
        //newObj.getImages().addAll(property.getImages());
        newObj.setAddress(property.getAddress());                                 		            		
        newObj.setAccount(newObj.getAccount());
        newObj.setSuites(property.getSuites());
        Set<Integer> featuresEmpty =new HashSet<>();
        	newObj.setFeatures(featuresEmpty);
	       
	        
    
        stateRepository.save(property.getAddress().getCity().getState());
		cityRepository.save(property.getAddress().getCity());
		        			
    }
      	
	public Property fromDTOUpdate(PropertyUpdateDTO propertyUpdateDTO,List<MultipartFile> files) throws URISyntaxException {	
    	UserSS user = UserService.authenticated();
    	 if(user == null){
             throw new AuthorizationException("Acesso negado");
         }
    	 
    	 	
    	 Property propAux= find(propertyUpdateDTO.getId());
   
        Property property = new Property(propertyUpdateDTO.getId(), propertyUpdateDTO.getName(), propertyUpdateDTO.getDescription(), TypeProperty.toEnum(propertyUpdateDTO.getTypeProperty()), Goal.toEnum(propertyUpdateDTO.getGoal()), 
        		propertyUpdateDTO.getNumberRooms(),propertyUpdateDTO.getSuites() ,propertyUpdateDTO.getBathRooms(), propertyUpdateDTO.getArea(), propertyUpdateDTO.getIptu(),
        		propertyUpdateDTO.getVacancies(),propertyUpdateDTO.getCondominium(), propertyUpdateDTO.getPrice(), propertyUpdateDTO.getAreaTotal(),propAux.getStatusProperty(),propAux.getStatusFeatured(),propertyUpdateDTO.getFinanceable(),propertyUpdateDTO.getPermuta());
        
        
        
	
		
        
        State state= stateRepository.findByName(propertyUpdateDTO.getState());
        //verificar se tem uma cidade deste estado cadastrada, se tiver tra
        
        City city = cityRepository.findByNameAndState(propertyUpdateDTO.getCity(),state);
    	Tenant tenant = tenantRepository.findById(user.getId()).get();
   	   Account account= accountService.find(tenant.getAccount().getId());
	 
	 if(state == null) {
		State stateAux = new State(null,propertyUpdateDTO.getState());
	
		 City cityAux= new City(null,propertyUpdateDTO.getCity(), stateAux);	
	
		 Address address = new Address(propertyUpdateDTO.getId(),propertyUpdateDTO.getStreet(),propertyUpdateDTO.getNumber(), propertyUpdateDTO.getDistrict(), propertyUpdateDTO.getCep(), property, cityAux);
		 address.setAccount(account);
	
		 property.setAddress(address);
		
		       	
	}else if(state != null && city == null){
		
		 City cityAux= new City(null,propertyUpdateDTO.getCity(), state);
		 cityAux.setState(state);
		
		 Address address = new Address(propertyUpdateDTO.getId(), propertyUpdateDTO.getStreet(), propertyUpdateDTO.getNumber(), propertyUpdateDTO.getDistrict(), propertyUpdateDTO.getCep(), property, cityAux);
		 property.setAddress(address);
		
		 address.setAccount(account);
		 
	}else {
		
	  	city.setState(state);
	
        Address address = new Address(propertyUpdateDTO.getId(), propertyUpdateDTO.getStreet(), propertyUpdateDTO.getNumber(), propertyUpdateDTO.getDistrict(), propertyUpdateDTO.getCep(), property, city);
        property.setAddress(address);
       
        address.setAccount(account);
		
	}

	
	property.setAccount(account);
	
	 List<Image> listToDelete=imageRepo.findByIdIn(propertyUpdateDTO.getDeletedIds());
	 s3Service.deleteAllFilesFromUpdate(listToDelete);
	 

    if(files !=null) {
        // Validação: máximo de 20 fotos por imóvel (considerando fotos existentes + novas fotos)
        int existingImagesCount = propAux.getImages() != null ? propAux.getImages().size() : 0;
        int totalImagesAfterUpdate = existingImagesCount + files.size() - (propertyUpdateDTO.getDeletedIds() != null ? propertyUpdateDTO.getDeletedIds().size() : 0);
        
        if(totalImagesAfterUpdate > 20) {
            throw new IllegalArgumentException("É permitido no máximo 20 fotos por imóvel. Atualmente há " + existingImagesCount + " fotos, você está tentando adicionar " + files.size() + " novas fotos.");
        }
        
	    for( MultipartFile file: files ) {
		    		  
		     URI uri= serviceFile.uploadPropertyPictures(file,account,propAux);
			       		
		}	 		
	}
    			
	return property;
	}
		

	//busca paginada por tenant 20/05/2024
	 @Transactional(readOnly = true)
	 public Page<Property> findByTenantMatchAnyParam(Integer goal,Integer typeProperty, String name, String domain, Integer page, Integer linesPerPage, String orderBy, String direction){
		  PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		  Account account = resolveAccountKey(domain);
		  if (account == null) {
		      return new PageImpl<>(java.util.Collections.emptyList(), pageRequest, 0);
		  }
		  return propertyRepository.findByGoalAndAccountPropertiesIn(name,goal, typeProperty, account, pageRequest);

	}
	 	
	 @Transactional
	 public Page<Property> findByTenantBaseView(Integer goal,Integer typeProperty, String name, Integer page, Integer linesPerPage, String orderBy, String direction){
		   UserSS user = UserService.authenticated();
	        if (user == null) {
	        	throw new AuthorizationException("erro");
	        }
	     
		 PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);		  		  		    
		  	return propertyRepository.findAll(pageRequest);

	}

	 @Transactional(readOnly = true)
	public List<Address> findResultSearch() {
		 //buscar somente endereços deste tenant
			List<Address>resultList= addressRepository.findAll();
			return resultList;
	}

	 @Transactional(readOnly = true)
	public List<Property> findByStatusFeatured(String companyOrSlug) {
        Account account = resolveAccountKey(companyOrSlug);
        if (account == null) {
            return java.util.Collections.emptyList();
        }
        return propertyRepository.findFirst4ByAccountAndStatusFeaturedAndStatusProperty(account, 1, 1);
    }

    // Novo: lista TODAS as propriedades em destaque e publicadas para um tenant resolvido por slug ou companyName
    public List<Property> findAllFeaturedPropertiesPublicByCompanyOrSlug(String companyOrSlug) {
        Account account = null;

        // Primeiro tenta resolver via slug de tenant
        Optional<Tenant> tenantOpt = tenantRepository.findBySlug(companyOrSlug);
        if (tenantOpt.isPresent()) {
            Tenant tenant = tenantOpt.get();
            account = accountService.find(tenant.getAccount().getId());
        }

        // Fallback: tenta por companyName
        if (account == null) {
            try {
                account = accountService.findByCompanyName(companyOrSlug);
            } catch (ObjectNotFoundException ignored) {
                // Se não encontrar, retorna lista vazia abaixo
            }
        }

        if (account == null) {
            return java.util.Collections.emptyList();
        }

        // Já filtra por destacados e publicados no repositório
        return propertyRepository.findAllByAccountAndStatusFeatureAndStatusProperty(account.getId());
    }
    
    public List<Property> findFourByTenant(Long id) {
         Tenant tenant = tenantService.find(id);
            Account account= accountService.find(tenant.getAccount().getId());
        List<Property> list = propertyRepository.findFirst4ByAccountAndStatusPropertyLessThanEqual(account,1);
        return list;
    }
	 //busca endereços por tenant(20/05/2024) do site
	public List<Address> findAddressByTenant(String domain) {
		 Account account = resolveAccountKey(domain);
		 if (account == null) {
		     return java.util.Collections.emptyList();
		 }
		 List<Property> list = propertyRepository.findAllByAccount(account);
		 List<Address>listAddress= new ArrayList<Address>();
			for(Property property : list) {
				listAddress.add(property.getAddress());		
				
	}
			return listAddress;
	}

	public List<Property> findAll() {	
		return propertyRepository.findAll();
	}
	public List<Property> findAllByTenantAndStatusFeatured() {
		   UserSS user = UserService.authenticated();
	        if (user == null) {
	        	throw new AuthorizationException("erro");
	        }
	        Tenant tenant= tenantService.find(user.getId());
	    	Account account= accountService.find(tenant.getAccount().getId());
	        List<Property> returnList= propertyRepository.findAllByAccountAndStatusFeatureAndStatusProperty(account.getId());
		return returnList;
	}
	
	public Feature[] findAllByTenantAndFeatured() {
		   UserSS user = UserService.authenticated();
	        if (user == null) {
	        	throw new AuthorizationException("erro");
	        }
	       
	        Feature[] features = Feature.values();
		return features;
	}
	public List<String> findAllDistrictsByAccount() {	
		   UserSS user = UserService.authenticated();
	        if (user == null) {
	        	throw new AuthorizationException("erro");
	        }
	        Tenant tenant= tenantService.find(user.getId());
	    	Account account= accountService.find(tenant.getAccount().getId());
		
		return addressRepository.findAllDistrictsByAccountAndDistrict(account);
	}
	
	public List<Property> findAllFeaturedPropertiesPublic() {
		// Buscar propriedades em destaque apenas da conta do usuário autenticado
		UserSS user = UserService.authenticated();
		if (user == null) {
			throw new AuthorizationException("Acesso negado");
		}
		
		Tenant tenant = tenantService.find(user.getId());
		Account account = accountService.find(tenant.getAccount().getId());
		
		// Retorna apenas propriedades em destaque da conta específica
		return propertyRepository.findAllByAccountAndStatusFeatureAndStatusProperty(account.getId())
				.stream()
				.filter(property -> property.getStatusFeatured() == com.dynamous.imoveis.enums.StatusFeatured.DESTACADO)
				.collect(java.util.stream.Collectors.toList());
	}
}
	