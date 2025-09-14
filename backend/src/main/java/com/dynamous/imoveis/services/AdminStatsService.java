package com.dynamous.imoveis.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.dynamous.imoveis.dto.AdminStatsDTO;
import com.dynamous.imoveis.dto.UserStatsDTO;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.repositories.LeadRepository;
import com.dynamous.imoveis.repositories.PropertyRepository;
import com.dynamous.imoveis.repositories.TenantRepository;
import com.dynamous.imoveis.services.exceptions.ObjectNotFoundException;

@Service
public class AdminStatsService {
    
    @Autowired
    private TenantRepository tenantRepository;
    
    @Autowired
    private PropertyRepository propertyRepository;
    
    @Autowired
    private LeadRepository leadRepository;
    
    public AdminStatsDTO getSystemOverview() {
        AdminStatsDTO stats = new AdminStatsDTO();
        
        // Total de usuários
        Long totalUsers = tenantRepository.count();
        stats.setTotalUsers(totalUsers);
        
        // Total de propriedades
        Long totalProperties = propertyRepository.count();
        stats.setTotalProperties(totalProperties);
        
        // Total de leads
        Long totalLeads = leadRepository.count();
        stats.setTotalLeads(totalLeads);
        
        // Propriedades publicadas
        Long publishedProperties = propertyRepository.countByPublishedTrue();
        stats.setPublishedProperties(publishedProperties);
        
        // Usuários ativos (com pelo menos 1 propriedade)
        Long activeUsers = propertyRepository.countDistinctAccountIds();
        stats.setActiveUsers(activeUsers);
        
        return stats;
    }
    
    public Page<UserStatsDTO> getUsersStats(Integer page, Integer linesPerPage, String orderBy, String direction) {
        PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
        Page<Tenant> users = tenantRepository.findAll(pageRequest);
        
        return users.map(user -> {
            UserStatsDTO userStats = new UserStatsDTO();
            userStats.setId(user.getId());
            userStats.setSlug(user.getSlug());
            userStats.setLastName(user.getLastName());
            userStats.setEmail(user.getEmail());
            userStats.setPhone(user.getPhone() != null ? user.getPhone() : "N/A");
            userStats.setCpf(user.getCreci()); // Using CRECI as identifier
            userStats.setCreatedAt(null); // Tenant doesn't have createdAt field
            
            // Contar propriedades do usuário
            Long propertiesCount = propertyRepository.countByAccount(user.getAccount());
            userStats.setPropertiesCount(propertiesCount);
            
            // Contar leads do usuário
            Long leadsCount = leadRepository.countByAccount(user.getAccount());
            userStats.setLeadsCount(leadsCount);
            
            // Propriedades publicadas
            Long publishedCount = propertyRepository.countByAccountAndStatusProperty(user.getAccount(), 1);
            userStats.setPublishedPropertiesCount(publishedCount);
            
            return userStats;
        });
    }
    
    public UserStatsDTO getUserDetailedStats(Long userId) {
        Tenant user = tenantRepository.findById(userId)
            .orElseThrow(() -> new ObjectNotFoundException("Usuário não encontrado! Id: " + userId));
        
        UserStatsDTO userStats = new UserStatsDTO();
        userStats.setId(user.getId());
        userStats.setSlug(user.getSlug());
        userStats.setLastName(user.getLastName());
        userStats.setEmail(user.getEmail());
        userStats.setPhone(user.getPhone() != null ? user.getPhone() : "N/A");
        userStats.setCpf(user.getCreci()); // Using CRECI as identifier
        userStats.setCreatedAt(null); // Tenant doesn't have createdAt field
        
        // Estatísticas detalhadas
        Long propertiesCount = propertyRepository.countByAccount(user.getAccount());
        userStats.setPropertiesCount(propertiesCount);
        
        Long leadsCount = leadRepository.countByAccount(user.getAccount());
        userStats.setLeadsCount(leadsCount);
        
        Long publishedCount = propertyRepository.countByAccountAndStatusProperty(user.getAccount(), 1);
        userStats.setPublishedPropertiesCount(publishedCount);
        
        return userStats;
    }
}