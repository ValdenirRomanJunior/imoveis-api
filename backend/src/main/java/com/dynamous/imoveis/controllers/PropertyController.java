package com.dynamous.imoveis.controllers;

import com.dynamous.imoveis.dto.PropertyDTO;
import com.dynamous.imoveis.dto.PropertyNewDTO;
import com.dynamous.imoveis.dto.TenantDTO;
import com.dynamous.imoveis.entities.Address;
import com.dynamous.imoveis.entities.City;
import com.dynamous.imoveis.entities.Property;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.repositories.AddressRepository;
import com.dynamous.imoveis.repositories.CityRepository;
import com.dynamous.imoveis.repositories.TenantRepository;
import com.dynamous.imoveis.services.PropertyService;
import com.dynamous.imoveis.services.TenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
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

    //liberar este endpoint para ser publico
    @GetMapping(value = "/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
        Property property=service.find(id);
        return ResponseEntity.ok().body(property);
    }

    @PreAuthorize("hasAnyRole('TENANT')")
    @PostMapping
    public ResponseEntity<Void> save(@Valid @RequestBody PropertyNewDTO propertyNewDTO){
        Property property = service.fromDTO(propertyNewDTO);
        service.save(property);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").
                buildAndExpand(property.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PreAuthorize("hasAnyRole('TENANT')")
    @PutMapping(value = "/{id}")
    public ResponseEntity<Void> update(@RequestBody Property property, @PathVariable Long id){
        property.setId(id);
        service.update(property);
        return ResponseEntity.noContent().build();

    }

    @PreAuthorize("hasAnyRole('TENANT')")
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    //liberar este endpoint para ser publico
    @GetMapping(value = "/page")
    public ResponseEntity <Page<PropertyDTO>> findPage(
            @RequestParam(value = "page",defaultValue = "0") Integer page,
            @RequestParam(value = "linesPerPage",defaultValue = "24")  Integer linesPerPage,
            @RequestParam(value = "orderBy",defaultValue = "slug")String orderBy,
            @RequestParam(value = "direction",defaultValue = "ASC")  String direction){
        Page<Property> list=service.findPage(page,linesPerPage,orderBy,direction);
        Page<PropertyDTO>listDTO=list.map(x -> new PropertyDTO(x));
        return ResponseEntity.ok().body(listDTO);
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
            Long cityId = Long.parseLong(city);
            Integer goalAux = Integer.parseInt(goal);
            Integer typeAux=Integer.parseInt(type);
        Page<Property> list =service.search(cityId,goalAux, typeAux,page, linesPerPage, orderBy, direction);
        Page<PropertyDTO>listDTO=list.map(x -> new PropertyDTO(x));
        return ResponseEntity.ok().body(list);
    }


}
