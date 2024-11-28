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
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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
    private AmazonS3 s3client;	
    
    @Value("${s3.bucket}")
    private String bucketName;
    
    
	@Autowired
	private AccountService accountService;

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
        property.setId(null);
        
    	 UserSS user = UserService.authenticated();
    	 
         if(user==null || !user.hasRole(Perfil.TENANT)){
             throw new AuthorizationException("Acesso negado");
         }
         Tenant tenant = tenantService.find(user.getId());
      	 Account account= accountService.find(tenant.getAccount().getId());   
         property = propertyRepository.save(property);
         
         Property propertyBack= find(property.getId());
         
    
          	
         if(files !=null) {       	       	 	
    	for( MultipartFile file: files ) {
    		    		  
    		 URI uri= serviceFile.uploadPropertyPictures(file,propertyBack);
    		  	
    		 Image image =imageRepo.findByUrl(String.valueOf(uri));   			  	 				     			
    			 image.setUrl(String.valueOf(uri));    			
    			 	
    			  List<ImageUrl> listImages= new ArrayList<ImageUrl>();
    	     		ImageUrl img = new ImageUrl();
	           		img.setId(null);
	           		img.setUrl(String.valueOf(uri));
	           		//setar depois que salvar property
	           			
	        		img.setIdAccount(account.getId()); 
	        		img.setProperty(property);
	        		listImages.add(img);
	        		property.getImages().addAll(listImages);
	        			        		
    	}	 
     }
    	     	  
        // imageRepo.saveAll(property.getImagesBucket());     
         addressRepository.save(property.getAddress());
         imageUrlRepository.saveAll(property.getImages());
               
        return property;		
    }
    		
   
    //ATUALIZA STATUS IMÓVEL
    public Property updateStatus(Property property) {
    	   
       imageUrlRepository.saveAll(property.getImages());
       addressRepository.save(property.getAddress()); 
       return propertyRepository.save(property);
   }

    //DELETA UM IMÓVEL
    public void delete(Long id) throws URISyntaxException {
        UserSS user = UserService.authenticated();
        //buscar com sql se tem mais de 1 imovel com este nome de cidade cadastrada. 
        Property property= find(id);
   
      
        if(user==null || !user.hasRole(Perfil.TENANT) && !property.getAccount().getId().equals(user.getId())){
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
        		stateAux.setAccount(account);
        		City cityAux= new City(null,propertyNewDTO.getCity(), stateAux);
        		stateAux.setAccount(account);
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
        newObj.setAccount(newObj.getAccount());
        newObj.setSuites(property.getSuites());
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
		stateAux.setAccount(account);
		 City cityAux= new City(null,propertyUpdateDTO.getCity(), stateAux);		
		 Address address = new Address(propertyUpdateDTO.getId(),propertyUpdateDTO.getStreet(),propertyUpdateDTO.getNumber(), propertyUpdateDTO.getDistrict(), propertyUpdateDTO.getCep(), property, cityAux);
		 address.setAccount(account);
		 property.setAddress(address);
		stateAux.setAccount(account);
		       	
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
	//property.setTenant(tenant);

	
	 //List<ImageUrl> listImages=propertyUpdateDTO.getImages();	 
	
	 List<Image> listToDelete=imageRepo.findByIdIn(propertyUpdateDTO.getDeletedIds());
	 s3Service.deleteAllFilesFromUpdate(listToDelete);
	 
	 
	 List<Image> listToUpdate= imageRepo.findAllByProperty(property);
	 
		try {				
	  	  	imageUrlRepository.deleteByPropertyId(propertyUpdateDTO.getId()); // pode haver um erro  aqui nesta deleção
	  	  	
	   } catch (DataIntegrityViolationException  | EmptyResultDataAccessException | StaleStateException e ) {
	     new DataIntegrityException("impossible delete with other objects: ");
	       }
		List<ImageUrl> listUrl= new ArrayList<ImageUrl>();	 
	for(Image img : listToUpdate) {	
		ImageUrl imgUrl = new ImageUrl();
		imgUrl.setId(null);
		imgUrl.setUrl(img.getUrl());
		imgUrl.setIdAccount(img.getIdAccount());       		
		imgUrl.setProperty(property);
		listUrl.add(imgUrl);		
	    property.getImages().addAll(listUrl);
    	}
	 		
	
    if(files !=null) {       	       	 	
	for( MultipartFile file: files ) {
		    		  
		 URI uri= serviceFile.uploadPropertyPictures(file,propAux);
		 
		 Image image =imageRepo.findByUrl(String.valueOf(uri));   			  	 				     			
			 image.setUrl(String.valueOf(uri));    			
			 	
			  List<ImageUrl> listImageBucket= new ArrayList<ImageUrl>();
	     		ImageUrl img = new ImageUrl();
          		img.setId(null);
          		img.setUrl(String.valueOf(uri));
          		//setar depois que salvar property
          			
	       		img.setIdAccount(account.getId()); 
	       		img.setProperty(property);
	       		listImageBucket.add(img);
	       		property.getImages().addAll(listImageBucket);
       		
	}	 
}
    
	return property;
	
}
	
	//busca paginada por tenant 20/05/2024
	 @Transactional(readOnly = true)
	 public Page<Property> findByTenantMatchAnyParam(Integer goal,Integer typeProperty, String name, String domain, Integer page, Integer linesPerPage, String orderBy, String direction){
		  PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);		  
		  	
		  	Tenant tenant = tenantService.findByDomain(domain);
			Account account= accountService.find(tenant.getAccount().getId());
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
	public List<Property> findByStatusFeatured(String domain) {
		   
	     Account account = accountService.findByDomain(domain);  
		List<Property> list = propertyRepository.findFirst4ByAccountAndStatusFeaturedAndStatusProperty(account,1,1);
		return list;
	}
	
	 public List<Property> findFourByTenant(Long id) {
		 Tenant tenant = tenantService.find(id);
			Account account= accountService.find(tenant.getAccount().getId());
		List<Property> list = propertyRepository.findFirst4ByAccountAndStatusPropertyLessThanEqual(account,1);
		return list;
	}
	 //busca endereços por tenant(20/05/2024) do site
	public List<Address> findAddressByTenant(String domain) {
		 Tenant tenant = tenantService.findByDomain(domain);
			Account account= accountService.find(tenant.getAccount().getId());
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
}		
	