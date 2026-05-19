package com.dynamous.imoveis.services;

import com.dynamous.imoveis.dto.EmpreendimentoDTO;
import com.dynamous.imoveis.entities.Empreendimento;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.repositories.EmpreendimentoRepository;
import com.dynamous.imoveis.repositories.TenantRepository;
import com.dynamous.imoveis.security.UserSS;
import com.dynamous.imoveis.services.exceptions.AuthorizationException;
import com.dynamous.imoveis.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmpreendimentoService {

    @Autowired
    private EmpreendimentoRepository repository;

    @Autowired
    private TenantRepository tenantRepository;

    @Transactional(readOnly = true)
    public List<EmpreendimentoDTO> findAll() {
        UserSS user = UserService.authenticated();
        if (user == null) {
            throw new AuthorizationException("Acesso negado");
        }
        Tenant tenant = tenantRepository.findById(user.getId())
                .orElseThrow(() -> new ObjectNotFoundException("Tenant não encontrado"));

        List<Empreendimento> list = repository.findByTenant(tenant);
        return list.stream().map(EmpreendimentoDTO::new).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public EmpreendimentoDTO findById(Long id) {
        UserSS user = UserService.authenticated();
        if (user == null) {
            throw new AuthorizationException("Acesso negado");
        }
        Tenant tenant = tenantRepository.findById(user.getId())
                .orElseThrow(() -> new ObjectNotFoundException("Tenant não encontrado"));

        Optional<Empreendimento> obj = repository.findByIdAndTenant(id, tenant);
        Empreendimento entity = obj.orElseThrow(() -> new ObjectNotFoundException("Empreendimento não encontrado ou acesso negado"));
        return new EmpreendimentoDTO(entity);
    }

    @Transactional
    public EmpreendimentoDTO insert(EmpreendimentoDTO dto) {
        UserSS user = UserService.authenticated();
        if (user == null) {
            throw new AuthorizationException("Acesso negado");
        }
        Tenant tenant = tenantRepository.findById(user.getId())
                .orElseThrow(() -> new ObjectNotFoundException("Tenant não encontrado"));

        Empreendimento entity = new Empreendimento();
        entity.setNome(dto.getNome());
        entity.setSlug(dto.getSlug());
        entity.setTenant(tenant);
        
        entity = repository.save(entity);
        return new EmpreendimentoDTO(entity);
    }

    @Transactional
    public EmpreendimentoDTO update(Long id, EmpreendimentoDTO dto) {
        UserSS user = UserService.authenticated();
        if (user == null) {
            throw new AuthorizationException("Acesso negado");
        }
        Tenant tenant = tenantRepository.findById(user.getId())
                .orElseThrow(() -> new ObjectNotFoundException("Tenant não encontrado"));

        Optional<Empreendimento> obj = repository.findByIdAndTenant(id, tenant);
        Empreendimento entity = obj.orElseThrow(() -> new ObjectNotFoundException("Empreendimento não encontrado ou acesso negado"));

        entity.setNome(dto.getNome());
        entity.setSlug(dto.getSlug());
        
        entity = repository.save(entity);
        return new EmpreendimentoDTO(entity);
    }

    public void delete(Long id) {
        UserSS user = UserService.authenticated();
        if (user == null) {
            throw new AuthorizationException("Acesso negado");
        }
        Tenant tenant = tenantRepository.findById(user.getId())
                .orElseThrow(() -> new ObjectNotFoundException("Tenant não encontrado"));

        Optional<Empreendimento> obj = repository.findByIdAndTenant(id, tenant);
        Empreendimento entity = obj.orElseThrow(() -> new ObjectNotFoundException("Empreendimento não encontrado ou acesso negado"));

        repository.delete(entity);
    }
}
