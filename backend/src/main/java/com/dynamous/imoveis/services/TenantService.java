package com.dynamous.imoveis.services;

import com.dynamous.imoveis.dto.TenantDTO;
import com.dynamous.imoveis.dto.TenantNewDTO;

import com.dynamous.imoveis.entities.Property;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Perfil;
import com.dynamous.imoveis.enums.Status;
import com.dynamous.imoveis.repositories.PropertyRepository;
import com.dynamous.imoveis.repositories.TenantRepository;
import com.dynamous.imoveis.security.UserSS;
import com.dynamous.imoveis.services.exceptions.AuthorizationException;
import com.dynamous.imoveis.services.exceptions.DataIntegrityException;
import com.dynamous.imoveis.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TenantService {

    @Autowired
    private TenantRepository tenantRepository;

    @Autowired
    private BCryptPasswordEncoder pe;

    @Autowired
    private EmailService emailService;

    public Tenant find(Long id) {
        UserSS user = UserService.authenticated();
        if(user==null || !user.hasRole(Perfil.TENANT) && !id.equals(user.getId())){
            throw new AuthorizationException("Acesso negado");
        }
        Optional<Tenant> property = tenantRepository.findById(id);
        return property.orElseThrow(() -> new ObjectNotFoundException(
                "Página não encontrada! Id:" + ", Type" + Tenant.class.getName()));
    }
    @Transactional
    public Tenant insert(Tenant obj) {
        obj.setId(null);
        tenantRepository.save(obj);
        System.out.println(obj);
        emailService.sendRegistrationHtmlEmail(obj);
        return obj;
    }


    public Tenant update(Tenant tenant) {
        Tenant newObj= find(tenant.getId());
        updateData(newObj,tenant);
        return tenantRepository.save(newObj);
    }

    private void updateData(Tenant newObj, Tenant tenant) {
        newObj.setSlug(tenant.getSlug());
        newObj.setEmail(tenant.getEmail());

    }

    public void delete(Long id) {
        find(id);
       try {
            tenantRepository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
          throw new DataIntegrityException("Não é possivel deletar porque tem objetos anexados: ");
        }
    }

    public List<Tenant> findAll() {
        return tenantRepository.findAll();
    }

    public Page<Tenant> findPage(Integer page, Integer linesPerPage, String orderBy, String direction){
        PageRequest pageRequest = PageRequest.of(page,linesPerPage, Sort.Direction.valueOf(direction),orderBy);
        return tenantRepository.findAll(pageRequest);
    }

    public Tenant fromDTO(TenantNewDTO objDto){
        Tenant tenant = new Tenant(null, objDto.getSlug(), objDto.getEmail(), pe.encode(objDto.getPassword()), Status.ACTIVE);
        tenant.addPerfil(Perfil.TENANT);
        return tenant;

    }


    public Tenant fromDTO(TenantDTO objDto) {
        Tenant tenant = new Tenant(objDto.getId(), objDto.getSlug(), objDto.getEmail(),null,null);
        return tenant;
    }
}