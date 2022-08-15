package com.dynamous.imoveis.services;

import com.dynamous.imoveis.dto.PropertyDTO;
import com.dynamous.imoveis.dto.PropertyNewDTO;
import com.dynamous.imoveis.entities.Address;
import com.dynamous.imoveis.entities.City;
import com.dynamous.imoveis.entities.Property;

import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Perfil;
import com.dynamous.imoveis.repositories.AddressRepository;
import com.dynamous.imoveis.repositories.CityRepository;
import com.dynamous.imoveis.repositories.PropertyRepository;
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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private TenantRepository tenantRepository;

    @Autowired
    private AddressRepository addressRepository;



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
        return property;	
    }

    //ATUALIZA UM IMOVEL
    public Property update(Property property) {
        Property newObj = find(property.getId());
        updateData(newObj, property);
        return propertyRepository.save(newObj);
    }

    //METODO AUX PARA ATUALIZAR PROPRIEDADE
    private void updateData(Property newObj, Property property) {
        newObj.setName(property.getName());
        newObj.setDescription(property.getDescription());
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

    //BUSCA TODOS OS IMOVEIS SEM PAGINAÇÃO
    public List<Property> findAll() {
        return propertyRepository.findAll();
    }

    //BUSCA TODOS OS IMOVEIS PAGINADOS
    public Page<Property> findPage(Integer page, Integer linesPerPage, String orderBy, String direction) {
        PageRequest pageRequest = PageRequest.of(page, linesPerPage, Sort.Direction.valueOf(direction), orderBy);
        return propertyRepository.findAll(pageRequest);
    }

    //CONVERTE DTO PARA ENTIDADE "PROPERTY"
    public Property fromDTO1(PropertyDTO propertyDTO) {
        return new Property(propertyDTO.getId(), propertyDTO.getName(), propertyDTO.getDescription(), null, null);
    }

    public Property fromDTO(PropertyNewDTO propertyNewDTO) {
        Property property = new Property(null, propertyNewDTO.getName(), propertyNewDTO.getDescription(), propertyNewDTO.getType(), propertyNewDTO.getGoal());
        City city = cityRepository.findById(propertyNewDTO.getCityId()).get();
        Address address = new Address(null, propertyNewDTO.getStreet(), propertyNewDTO.getNumber(), propertyNewDTO.getDistrict(), propertyNewDTO.getCep(), property, city);
        property.setAddress(address);
        Tenant tenant = tenantRepository.findById(propertyNewDTO.getTenantId()).get();
        property.setTenant(tenant);
        if(propertyNewDTO.getImage1() != null){
            property.getImages().add(propertyNewDTO.getImage1());
        }
        if(propertyNewDTO.getImage2() != null){
            property.getImages().add(propertyNewDTO.getImage2());
        }
        if(propertyNewDTO.getImage3() != null){
            property.getImages().add(propertyNewDTO.getImage3());
        }
        if(propertyNewDTO.getImage4() != null){
            property.getImages().add(propertyNewDTO.getImage4());
        }
        if(propertyNewDTO.getImage5() != null){
            property.getImages().add(propertyNewDTO.getImage5());
        }
        if(propertyNewDTO.getImage6() != null){
            property.getImages().add(propertyNewDTO.getImage6());
        }

        return property;
    }

    //SERVIÇO PARA BUSCA PAGINADA DE IMÓVEIS
    public Page<Property> search(Long city,  Integer goal, Integer type, Integer page, Integer linesPerPage, String orderBy, String direction) {
            UserSS user = UserService.authenticated();
            if(user == null){
                throw new AuthorizationException("Acesso negado");
            }
            Tenant tenant= tenantRepository.findById(user.getId()).get();
          // Long tenant =tenantAux.getId();
        PageRequest pageRequest = PageRequest.of(page, linesPerPage, Sort.Direction.valueOf(direction), orderBy);
        return propertyRepository.findByAddressAndTenant(city, tenant, goal, type, pageRequest);
    }



}