package com.dynamous.imoveis.controllers;

import com.dynamous.imoveis.dto.PropertyNewDTO;
import com.dynamous.imoveis.dto.PropertyUpdateDTO;
import com.dynamous.imoveis.entities.Address;
import com.dynamous.imoveis.entities.ImageUrl;
import com.dynamous.imoveis.entities.Property;
import com.dynamous.imoveis.enums.StatusProperty;
import com.dynamous.imoveis.repositories.CityRepository;
import com.dynamous.imoveis.repositories.PropertyCustomRepository;
import com.dynamous.imoveis.repositories.PropertyRepository;
import com.dynamous.imoveis.services.PropertyService;
import com.dynamous.imoveis.services.TenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import javax.validation.Valid;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping(value = "/properties", produces = {MediaType.APPLICATION_JSON_VALUE})
public class PropertyController {

    @Autowired
    private PropertyService service;
    
    @Autowired
    private PropertyRepository propertyRepository;
    
    @Autowired
    private  PropertyCustomRepository propertyCustomRepo;
    
    

    
    @GetMapping(value = "/find/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> findById(@PathVariable Long id){ 
    	
        Property property=service.find(id);
        return ResponseEntity.ok().body(property);
    }

    @PreAuthorize("hasAnyRole('TENANT')")
    @PostMapping(value="/save", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Void> save(@Valid @RequestBody PropertyNewDTO propertyNewDTO){
   	  
        Property property = service.fromDTO(propertyNewDTO);
      
        service.save(property);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").
                buildAndExpand(property.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PreAuthorize("hasAnyRole('TENANT')")
    @PutMapping(value = "/update/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Void> update(@Valid @RequestBody PropertyUpdateDTO propertyUpdateDTO, @PathVariable Long id){
    	propertyUpdateDTO.setId(id);
  
    	Property property = service.fromDTOUpdate(propertyUpdateDTO); 
    	
        property.setId(id);			     				
        service.update(property);
        return ResponseEntity.noContent().build();

    }

    @PreAuthorize("hasAnyRole('TENANT')")
    @DeleteMapping(value = "/delete/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Void> delete(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }



    //liberar este endpoint para ser publico
    @GetMapping(value = "/search", produces = {MediaType.APPLICATION_JSON_VALUE})
    @Transactional
   public ResponseEntity <Page<Property>> findPageSearch(
		    @RequestParam(value = "id",defaultValue = "",required = false) Long id,
		    @RequestParam(value = "state",defaultValue = "",required = false) Long state,
            @RequestParam(value = "city",defaultValue = "",required = false) Long city,
            @RequestParam(value = "goal",defaultValue = "",required = false) Integer goal,
            @RequestParam(value = "typeProperty",defaultValue = "",required = false) Integer typeProperty,
            @RequestParam(value = "page",defaultValue = "0") Integer page,
            @RequestParam(value = "linesPerPage",defaultValue = "12")  Integer linesPerPage,
            @RequestParam(value = "orderBy",defaultValue = "id")String orderBy,
            @RequestParam(value = "direction",defaultValue = "DESC")  String direction){
        //verificar se vem nullo nos parametros
        
    	
    		//Page<Property> list= service.findByTenantBaseView(goal, typeProperty, name,  page, linesPerPage, orderBy, direction);
    Page<Property> list = propertyCustomRepo.findByPage(id,state, city, goal, typeProperty, page, linesPerPage, orderBy, direction);
    System.out.println(list.getTotalElements() + " "+ "TOTAL DE IMAGENS");
         ImageUrl imgux=null;
         List<ImageUrl> OneImg=null;
       	for( Property item : list) {       		 		
       		if( item.getImages().size() >0 ) {  
       	    imgux = item.getImages().get(0);    		
       		OneImg = new ArrayList<ImageUrl>();
       		item.setImages(OneImg);
       		item.getImages().add(imgux);
       		}
       	}
       	
       
        return ResponseEntity.ok().body(list);
    }
    
    @PreAuthorize("hasAnyRole('TENANT')")
    @GetMapping(value = "/totalProperties/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> getTotalProperties(@PathVariable Long id){ 
    
    	
       Long total= propertyRepository.countByTenantId(id);     
        return ResponseEntity.ok().body(total);
    }
    
    @GetMapping(value = "/findLeadProperty/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> findByIdLeadProperty(@PathVariable Long id){    
        Property property=service.findByTenant(id);
        ImageUrl imgux=null;
        List<ImageUrl> OneImg=null;
    	if( property.getImages().size() >0 ) {  
       		imgux = property.getImages().get(0);    		
       		OneImg = new ArrayList<ImageUrl>();
       		property.setImages(OneImg);
       		property.getImages().add(imgux);
       		}
        return ResponseEntity.ok().body(property);
    }
    
    @PreAuthorize("hasAnyRole('TENANT')")
    @PutMapping(value = "/updateStatus/{id}/{statusP}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Void> updateStatus(@PathVariable Long id, @PathVariable Integer statusP ){
    	
    	Property property= service.find(id);
    	property.setStatusProperty(StatusProperty.toEnum(statusP));
        service.updateStatus(property);

        return ResponseEntity.noContent().build();

    }
    
    @PreAuthorize("hasAnyRole('TENANT')")
    @GetMapping(value = "/publishedProperties/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> getPublishedProperties(@PathVariable Long id){ 
    	 	
       Long total= propertyRepository.publishedByTenantId(id);     
        return ResponseEntity.ok().body(total);
    }
    //busca paginada site tenant
    @GetMapping(value = "/searchTest", produces = {MediaType.APPLICATION_JSON_VALUE})
   public ResponseEntity <Page<Property>> findByTenantWithParams(
		   @RequestParam(value = "name",defaultValue = "",required = false) String name,   
		   @RequestParam(value = "goal",defaultValue = "",required = false) Integer goal,
		   @RequestParam(value = "typeProperty",defaultValue = "",required = false) Integer typeProperty,               
		   @RequestParam(value = "nameUrl",defaultValue = "",required = false) String nameUrl,   
            @RequestParam(value = "page",defaultValue = "0") Integer page,
            @RequestParam(value = "linesPerPage",defaultValue = "12")  Integer linesPerPage,
            @RequestParam(value = "orderBy",defaultValue = "name")String orderBy,
            @RequestParam(value = "direction",defaultValue = "ASC")  String direction){
        //verificar se vem nullo nos parametros
    	
          
    	 //Page<Property> list= service.search(id,state, city, goal, typeProperty, page, linesPerPage, orderBy, direction);
         Page<Property> list = service.findByTenantMatchAnyParam(goal,typeProperty,name, nameUrl,page, linesPerPage, orderBy, direction);
         ImageUrl imgux=null;
         List<ImageUrl> OneImg=null;
         
       	for( Property item : list) {
       		
       		if( item.getImages().size() >0 ) {  
       		imgux = item.getImages().get(0);    		
       		OneImg = new ArrayList<ImageUrl>();
       		item.setImages(OneImg);
       		item.getImages().add(imgux);
       		
       		}
       	} 
       	Page<Property> pageWithFilteredData = new PageImpl<Property>(list.stream().filter(p -> !p.getStatusProperty().getDescription().contains("NÃO"))
       		    .collect(Collectors.toList()), list.getPageable(), list.getTotalElements());
        return ResponseEntity.ok().body(pageWithFilteredData);
    }
    
    
    @GetMapping(value = "/getAllAddress", produces = {MediaType.APPLICATION_JSON_VALUE})
   public ResponseEntity <List<Address>>getResultSearch() {    
    	//pegar somente endereços deste tenant
    	List<Address> list = service.findResultSearch();            
        return ResponseEntity.ok().body(list);
    }
    //busca endereços por tenant
    
    @GetMapping(value= "/findAddress/{nameUrl}", produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity <List<Address>> findAddressByTenant(@PathVariable String nameUrl){
    	List<Address> list = service.findAddressByTenant(nameUrl);	
    	
		return ResponseEntity.ok().body(list);
		
	}
    @GetMapping(value= "/findAll/{nameUrl}", produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity <List<Property>> findAll(@PathVariable String nameUrl){
    	List<Property> list = service.findFourByTenant(nameUrl);
    	
		return ResponseEntity.ok().body(list);
		
	}
    @GetMapping(value= "/findAll", produces = {MediaType.APPLICATION_JSON_VALUE})
  	public ResponseEntity <List<Property>> findAllPropertiesAsList(){
      	List<Property> list = service.findAll();
      	
  		return ResponseEntity.ok().body(list);
  		
  	}

}
