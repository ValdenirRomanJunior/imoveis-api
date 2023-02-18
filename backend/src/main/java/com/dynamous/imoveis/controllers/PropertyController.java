package com.dynamous.imoveis.controllers;

import com.dynamous.imoveis.dto.PropertyDTO;
import com.dynamous.imoveis.dto.PropertyNewDTO;
import com.dynamous.imoveis.dto.PropertySimpleDTO;
import com.dynamous.imoveis.dto.PropertyUpdateDTO;
import com.dynamous.imoveis.dto.TenantDTO;
import com.dynamous.imoveis.entities.Address;
import com.dynamous.imoveis.entities.City;
import com.dynamous.imoveis.entities.ImageUrl;
import com.dynamous.imoveis.entities.Property;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.repositories.AddressRepository;
import com.dynamous.imoveis.repositories.CityRepository;
import com.dynamous.imoveis.repositories.ImageUrlRepository;
import com.dynamous.imoveis.repositories.PropertyRepository;
import com.dynamous.imoveis.repositories.TenantRepository;
import com.dynamous.imoveis.services.PropertyService;
import com.dynamous.imoveis.services.TenantService;
import com.dynamous.imoveis.services.exceptions.DataIntegrityException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.CrudRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/properties")
public class PropertyController {

    @Autowired
    private PropertyService service;

    @Autowired
    private TenantService tenantService;

    @Autowired
    private AddressRepository addressRepository;
    
    @Autowired
     private ImageUrlRepository imageUrlRepository;
    
    @Autowired
    private PropertyRepository propertyRepository;

    
    @GetMapping(value = "/find/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){    
        Property property=service.find(id);
        return ResponseEntity.ok().body(property);
    }

    
    @PostMapping(value="/save")
    public ResponseEntity<Void> save(@Valid @RequestBody PropertyNewDTO propertyNewDTO){
    	  System.out.println(propertyNewDTO.getImages());
        Property property = service.fromDTO(propertyNewDTO);
      
        service.save(property);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").
                buildAndExpand(property.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

  
    @PutMapping(value = "/update/{id}")
    public ResponseEntity<Void> update(@RequestBody PropertyUpdateDTO propertyUpdateDTO, @PathVariable Long id){
    	propertyUpdateDTO.setId(id);
    	Property property = service.fromDTOUpdate(propertyUpdateDTO); 
    	
        property.setId(id);			     				
        service.update(property);
        return ResponseEntity.noContent().build();

    }

  
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    //liberar este endpoint para ser publico
    @GetMapping(value = "/page")
    public ResponseEntity <Page<Property>> findPage(
            @RequestParam(value = "page",defaultValue = "0") Integer page,
            @RequestParam(value = "linesPerPage",defaultValue = "24")  Integer linesPerPage,
            @RequestParam(value = "orderBy",defaultValue = "name")String orderBy,
            @RequestParam(value = "direction",defaultValue = "ASC")  String direction){
        Page<Property> list=service.findPage(page,linesPerPage,orderBy,direction);
        System.out.println(list);
      //  Page<PropertyDTO>listDTO=list.map(x -> new PropertyDTO(x));
        return ResponseEntity.ok().body(list);
    }

    //liberar este endpoint para ser publico
    @GetMapping(value = "/search")
   public ResponseEntity <Page<Property>> findPageSearch(
            @RequestParam(value = "city",defaultValue = "") String city,
            @RequestParam(value = "goal",defaultValue = "") String goal,
            @RequestParam(value = "type",defaultValue = "") String type,
            @RequestParam(value = "page",defaultValue = "0") Integer page,
            @RequestParam(value = "linesPerPage",defaultValue = "24")  Integer linesPerPage,
            @RequestParam(value = "orderBy",defaultValue = "name")String orderBy,
            @RequestParam(value = "direction",defaultValue = "ASC")  String direction){
        //verificar se vem nullo nos parametros
        
       Page<Property> list =service.search(city,goal, type,page, linesPerPage, orderBy, direction);
       
       	for( Property item : list) {
       		 		
       		if( item.getImages().size() >0 ) {  
       		ImageUrl imgux = item.getImages().get(0);    		
       		List<ImageUrl> OneImg = new ArrayList<ImageUrl>();
       		item.setImages(OneImg);
       		item.getImages().add(imgux);
       		}
       	}
       	
        Page<PropertySimpleDTO>listDTO=list.map(x -> new PropertySimpleDTO(x));
        return ResponseEntity.ok().body(list);
    }
    
    @GetMapping(value = "/totalProperties/{id}")
    public ResponseEntity<?> getTotalProperties(@PathVariable Long id){ 
    	System.out.println(id);
    	
       Long total= propertyRepository.countByTenantId(id);     
        return ResponseEntity.ok().body(total);
    }
    
    @GetMapping(value = "/findLeadProperty/{id}")
    public ResponseEntity<?> findByIdLeadProperty(@PathVariable Long id){    
        Property property=service.find(id);
        
    	if( property.getImages().size() >0 ) {  
       		ImageUrl imgux = property.getImages().get(0);    		
       		List<ImageUrl> OneImg = new ArrayList<ImageUrl>();
       		property.setImages(OneImg);
       		property.getImages().add(imgux);
       		}
        return ResponseEntity.ok().body(property);
    }


}
