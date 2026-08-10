package com.dynamous.imoveis.controllers;

import com.dynamous.imoveis.dto.FeatureDTO;
import com.dynamous.imoveis.dto.PropertyFilterOptionsDTO;
import com.dynamous.imoveis.dto.PropertyNewDTO;
import com.dynamous.imoveis.dto.PropertyUpdateDTO;
import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.entities.Address;
import com.dynamous.imoveis.entities.Image;
import com.dynamous.imoveis.entities.ImageUrl;
import com.dynamous.imoveis.entities.Property;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Feature;
import com.dynamous.imoveis.enums.StatusFeatured;
import com.dynamous.imoveis.enums.StatusProperty;
import com.dynamous.imoveis.repositories.AccountRepository;
import com.dynamous.imoveis.repositories.CityRepository;
import com.dynamous.imoveis.repositories.PropertyCustomRepository;
import com.dynamous.imoveis.repositories.PropertyRepository;
import com.dynamous.imoveis.security.UserSS;
import com.dynamous.imoveis.services.AccountService;
import com.dynamous.imoveis.services.FileManagerService;
import com.dynamous.imoveis.services.PropertyService;
import com.dynamous.imoveis.services.TenantService;
import com.dynamous.imoveis.services.UserService;
import com.dynamous.imoveis.services.exceptions.AuthorizationException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import javax.validation.Valid;
import java.math.BigDecimal;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.SortedSet;
import java.util.stream.Collectors;


@RestController
@RequestMapping(value = "/properties")
public class PropertyController {

    @Autowired
    private PropertyService service;
    
    @Autowired
    private PropertyRepository propertyRepository;
    
    @Autowired
    private  PropertyCustomRepository propertyCustomRepo;
    
	@Autowired
	private TenantService tenantService;
	
	@Autowired
	private AccountService accountService;
	
	@Autowired
	private AccountRepository accountRepository;
    
    
    
    @GetMapping(value = "/find/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> findById(@PathVariable Long id){ 
    	
        Property property=service.find(id);
        return ResponseEntity.ok().body(property);
    }

    @PreAuthorize("hasAnyRole('TENANT')")
    @PostMapping(value="/save", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Void> save(@Valid @RequestPart("propertyNewDTO") PropertyNewDTO propertyNewDTO,@RequestPart(name="file", required = false) List<MultipartFile> file) throws JsonMappingException, JsonProcessingException{
    		 	
    Property property = service.fromDTO(propertyNewDTO,file);
       service.save(property,file);
       
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").
             buildAndExpand(property.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }
    
    @PreAuthorize("hasAnyRole('TENANT')")
    @PutMapping(value = "/update/{id}",  consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Void> update(@Valid @RequestPart("propertyUpdateDTO") PropertyUpdateDTO propertyUpdateDTO, @PathVariable Long id,@RequestPart(name="file", required = false) List<MultipartFile> files) throws URISyntaxException{
    	propertyUpdateDTO.setId(id);
    	Property property = service.fromDTOUpdate(propertyUpdateDTO,files);   	
        property.setId(id);			     				
        service.update(property, propertyUpdateDTO.getFeatures());
        
        return ResponseEntity.noContent().build();

    }

    @PreAuthorize("hasAnyRole('TENANT')")
    @DeleteMapping(value = "/delete/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Void> delete(@PathVariable Long id) throws URISyntaxException{
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
         Image imgux=null;
         Set<Image> OneImg=null;
       	for( Property item : list) {       		 		
       		if( item.getImages().size() >0 ) {  
       	    imgux = item.getImages().iterator().next();    		
       		OneImg = new HashSet<>();
       		item.setImages(OneImg);
       		item.getImages().add(imgux);
       		}
       	}
       	
       
        return ResponseEntity.ok().body(list);
    }
    
    @PreAuthorize("hasAnyRole('TENANT')")
    @GetMapping(value = "/totalProperties/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> getTotalProperties(@PathVariable Long id){ 
    
		 UserSS user = UserService.authenticated();
	        
         if(user.getId() == null){
             throw new AuthorizationException("Acesso negado");
         }
         Tenant tenant = tenantService.find(user.getId());
     	Account account= accountService.find(tenant.getAccount().getId());
     	
       Long total= propertyRepository.countByAccountId(account.getId());     
        return ResponseEntity.ok().body(total);
    }
    
    @GetMapping(value = "/findLeadProperty/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> findByIdLeadProperty(@PathVariable Long id){    
        Property property=service.findByTenant(id);
        Image imgux=null;
        Set<Image> OneImg=null;
    	if( property.getImages().size() >0 ) {  
       		imgux = property.getImages().iterator().next();    		
       		OneImg = new HashSet<>();
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
    @PutMapping(value = "/updateStatusFeatured/{id}/{statusF}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Void> updateStatusFeatured(@PathVariable Long id, @PathVariable Integer statusF ){
    	
    	Property property= service.find(id);
    	property.setStatusFeatured(StatusFeatured.toEnum(statusF));
        service.updateStatus(property);
        
        return ResponseEntity.noContent().build();
        
    }		
    	
    		
    @PreAuthorize("hasAnyRole('TENANT')")
    @GetMapping(value = "/publishedProperties/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> getPublishedProperties(@PathVariable Long id){ 
		 UserSS user = UserService.authenticated();
	        
         if(user.getId() == null){
             throw new AuthorizationException("Acesso negado");
         }
         Tenant tenant = tenantService.find(user.getId());
     	Account account= accountService.find(tenant.getAccount().getId());
       Long total= propertyRepository.publishedByAccountId(account.getId());     
        return ResponseEntity.ok().body(total);
    }
    //busca paginada site tenant
    @GetMapping(value = "/searchTest", produces = {MediaType.APPLICATION_JSON_VALUE})
   public ResponseEntity <Page<Property>> findByTenantWithParams(
		   @RequestParam(value = "name",defaultValue = "",required = false) String name,   
		   @RequestParam(value = "goal",defaultValue = "",required = false) Integer goal,
		   @RequestParam(value = "typeProperty",defaultValue = "",required = false) Integer typeProperty,               
		   @RequestParam(value = "city", defaultValue = "", required = false) String city,
		   @RequestParam(value = "district", defaultValue = "", required = false) String district,
		   @RequestParam(value = "minPrice", defaultValue = "", required = false) BigDecimal minPrice,
		   @RequestParam(value = "maxPrice", defaultValue = "", required = false) BigDecimal maxPrice,
		   @RequestParam(value = "minRooms", defaultValue = "", required = false) Integer minRooms,
		   @RequestParam(value = "minSuites", defaultValue = "", required = false) Integer minSuites,
		   @RequestParam(value = "minVacancies", defaultValue = "", required = false) Integer minVacancies,
		   @RequestParam(value = "minArea", defaultValue = "", required = false) BigDecimal minArea,
		   @RequestParam(value = "maxArea", defaultValue = "", required = false) BigDecimal maxArea,
		   @RequestParam(value = "nameUrl",defaultValue = "",required = false) String nameUrl,   
            @RequestParam(value = "page",defaultValue = "0") Integer page,
            @RequestParam(value = "linesPerPage",defaultValue = "12")  Integer linesPerPage,
            @RequestParam(value = "orderBy",defaultValue = "name")String orderBy,
            @RequestParam(value = "direction",defaultValue = "ASC")  String direction){
        Page<Property> list = service.findByTenantMatchAnyParam(
                goal,
                typeProperty,
                name,
                city,
                district,
                minPrice,
                maxPrice,
                minRooms,
                minSuites,
                minVacancies,
                minArea,
                maxArea,
                nameUrl,
                page,
                linesPerPage,
                orderBy,
                direction
        );

         Image imgux=null;
         Set<Image> OneImg=null;
         
       	for( Property item : list) {
       		
       		if( item.getImages().size() >0 ) {  
       			imgux = item.getImages().iterator().next();    		
       		OneImg =  new HashSet<>();
       		item.setImages(OneImg);
       		item.getImages().add(imgux);
       		
       		}
       	} 
        return ResponseEntity.ok().body(list);
    }
    
    
    @GetMapping(value = "/getAllAddress", produces = {MediaType.APPLICATION_JSON_VALUE})
   public ResponseEntity <List<Address>>getResultSearch() {    
    	//pegar somente endereços deste tenant
    	List<Address> list = service.findResultSearch();            
        return ResponseEntity.ok().body(list);
    }
    //busca endereços por tenant
    
    @GetMapping(value= "/findAddress/{nameUrl:.+}", produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity <List<Address>> findAddressByTenant(@PathVariable String nameUrl){
    	List<Address> list = service.findAddressByTenant(nameUrl);	
    	
		return ResponseEntity.ok().body(list);
		
	}

    @GetMapping(value = "/filter-options/{nameUrl:.+}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<PropertyFilterOptionsDTO> getFilterOptions(@PathVariable String nameUrl) {
        PropertyFilterOptionsDTO options = service.getPublicFilterOptions(nameUrl);
        return ResponseEntity.ok().body(options);
    }
    //busca home site
    @GetMapping(value= "/findAll/{nameUrl}", produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity <List<Property>> findAll(@PathVariable String nameUrl){
        // Suporte a subdomínio com hífen (ex: 'slug-123'), extraindo o ID da Account
        String resolvedKey = nameUrl;
        Long accountId = null;
        int lastHyphen = nameUrl.lastIndexOf('-');
        if (lastHyphen > 0 && lastHyphen < nameUrl.length() - 1) {
            String suffix = nameUrl.substring(lastHyphen + 1);
            if (suffix.matches("\\d+")) {
                try {
                    accountId = Long.parseLong(suffix);
                } catch (NumberFormatException ignored) {}
                resolvedKey = nameUrl.substring(0, lastHyphen);
            }
        }

        List<Property> list;
        if (accountId != null) {
            Account account = accountService.find(accountId);
            list = propertyRepository.findFirst4ByAccountAndStatusFeaturedAndStatusProperty(account, 1, 1);
        } else {
            list = service.findByStatusFeatured(resolvedKey);
        }
		return ResponseEntity.ok().body(list);
	}
    @GetMapping(value= "/findAllFeatures", produces = {MediaType.APPLICATION_JSON_VALUE})
  	public ResponseEntity <List<Property>> findAllPropertiesAsList(){
      	List<Property> list = service.findAllFeaturedPropertiesPublic();
      	
  		return ResponseEntity.ok().body(list);
  		
  	}

    // Novo: endpoint público para listar todos os destaques por slug/companyName
    @GetMapping(value= "/findAllFeatures/{nameUrl}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<List<Property>> findAllFeaturedByCompanyOrSlug(@PathVariable String nameUrl){
        List<Property> list = service.findAllFeaturedPropertiesPublicByCompanyOrSlug(nameUrl);
        return ResponseEntity.ok().body(list);
    }
    
    @GetMapping(value= "/findAllFeature", produces = {MediaType.APPLICATION_JSON_VALUE})
  	public ResponseEntity<List<FeatureDTO>> findAllFeatures(){
    	
  
    	List<FeatureDTO> features= new ArrayList<FeatureDTO>();
    	  for (Feature x : Feature.values()) {
    		  		FeatureDTO feature= new FeatureDTO();
    		  		feature.setId(x.getCod());
    		  		feature.setName(x.getDescription());
    		  		features.add(feature);
    	  		}
    	      	  
    	  return ResponseEntity.ok().body(features);
    }
    
    @GetMapping(value= "/findAllDistricts", produces = {MediaType.APPLICATION_JSON_VALUE})
  	public ResponseEntity <List<String>> findAllDistrictsByAccount(){
      	List<String> list = service.findAllDistrictsByAccount();
      	
  		return ResponseEntity.ok().body(list);
  		
  	}
    
}
