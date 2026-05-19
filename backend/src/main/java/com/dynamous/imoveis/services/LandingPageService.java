package com.dynamous.imoveis.services;

import com.dynamous.imoveis.dto.LandingPageDTO;
import com.dynamous.imoveis.entities.Empreendimento;
import com.dynamous.imoveis.entities.LandingPage;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.repositories.EmpreendimentoRepository;
import com.dynamous.imoveis.repositories.LandingPageRepository;
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
public class LandingPageService {

    @Autowired
    private LandingPageRepository repository;

    @Autowired
    private EmpreendimentoRepository empreendimentoRepository;

    @Autowired
    private TenantRepository tenantRepository;

    @Transactional(readOnly = true)
    public List<LandingPageDTO> findByEmpreendimento(Long empreendimentoId) {
        UserSS user = UserService.authenticated();
        if (user == null) {
            throw new AuthorizationException("Acesso negado");
        }
        Tenant tenant = tenantRepository.findById(user.getId())
                .orElseThrow(() -> new ObjectNotFoundException("Tenant não encontrado"));

        Empreendimento emp = empreendimentoRepository.findByIdAndTenant(empreendimentoId, tenant)
                .orElseThrow(() -> new ObjectNotFoundException("Empreendimento não encontrado ou acesso negado"));

        List<LandingPage> list = repository.findByEmpreendimento(emp);
        return list.stream().map(LandingPageDTO::new).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public LandingPageDTO findById(Long id) {
        UserSS user = UserService.authenticated();
        if (user == null) {
            throw new AuthorizationException("Acesso negado");
        }
        Tenant tenant = tenantRepository.findById(user.getId())
                .orElseThrow(() -> new ObjectNotFoundException("Tenant não encontrado"));

        Optional<LandingPage> obj = repository.findByIdAndTenant(id, tenant);
        LandingPage entity = obj.orElseThrow(() -> new ObjectNotFoundException("Landing Page não encontrada ou acesso negado"));
        return new LandingPageDTO(entity);
    }

    @Transactional(readOnly = true)
    public LandingPageDTO findBySlug(String slug) {
        // Rota pública, não exige tenant logado, porém retorna apenas os dados da LP
        Optional<LandingPage> obj = repository.findBySlug(slug);
        LandingPage entity = obj.orElseThrow(() -> new ObjectNotFoundException("Landing Page não encontrada"));
        return new LandingPageDTO(entity);
    }

    @Transactional
    public LandingPageDTO insert(Long empreendimentoId, LandingPageDTO dto) {
        UserSS user = UserService.authenticated();
        if (user == null) {
            throw new AuthorizationException("Acesso negado");
        }
        Tenant tenant = tenantRepository.findById(user.getId())
                .orElseThrow(() -> new ObjectNotFoundException("Tenant não encontrado"));

        Empreendimento emp = empreendimentoRepository.findByIdAndTenant(empreendimentoId, tenant)
                .orElseThrow(() -> new ObjectNotFoundException("Empreendimento não encontrado ou acesso negado"));

        LandingPage entity = new LandingPage();
        entity.setEmpreendimento(emp);
        entity.setTenant(tenant);
        entity.setNome(dto.getNome());
        entity.setSlug(dto.getSlug());
        entity.setStatus(dto.getStatus());
        entity.setTemplateId(dto.getTemplateId());
        entity.setBriefing(dto.getBriefing());
        entity.setConteudoGerado(dto.getConteudoGerado());
        entity.setLpConfig(dto.getLpConfig());
        
        entity = repository.save(entity);
        return new LandingPageDTO(entity);
    }

    @Transactional
    public LandingPageDTO update(Long id, LandingPageDTO dto) {
        UserSS user = UserService.authenticated();
        if (user == null) {
            throw new AuthorizationException("Acesso negado");
        }
        Tenant tenant = tenantRepository.findById(user.getId())
                .orElseThrow(() -> new ObjectNotFoundException("Tenant não encontrado"));

        Optional<LandingPage> obj = repository.findByIdAndTenant(id, tenant);
        LandingPage entity = obj.orElseThrow(() -> new ObjectNotFoundException("Landing Page não encontrada ou acesso negado"));

        entity.setNome(dto.getNome());
        if (dto.getSlug() != null) entity.setSlug(dto.getSlug());
        if (dto.getStatus() != null) entity.setStatus(dto.getStatus());
        if (dto.getTemplateId() != null) entity.setTemplateId(dto.getTemplateId());
        if (dto.getBriefing() != null) entity.setBriefing(dto.getBriefing());
        if (dto.getConteudoGerado() != null) entity.setConteudoGerado(dto.getConteudoGerado());
        if (dto.getLpConfig() != null) entity.setLpConfig(dto.getLpConfig());

        entity = repository.save(entity);
        return new LandingPageDTO(entity);
    }

    public void delete(Long id) {
        UserSS user = UserService.authenticated();
        if (user == null) {
            throw new AuthorizationException("Acesso negado");
        }
        Tenant tenant = tenantRepository.findById(user.getId())
                .orElseThrow(() -> new ObjectNotFoundException("Tenant não encontrado"));

        Optional<LandingPage> obj = repository.findByIdAndTenant(id, tenant);
        LandingPage entity = obj.orElseThrow(() -> new ObjectNotFoundException("Landing Page não encontrada ou acesso negado"));

        repository.delete(entity);
    }
}
