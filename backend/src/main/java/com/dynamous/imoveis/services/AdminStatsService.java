package com.dynamous.imoveis.services;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.dynamous.imoveis.dto.AdminStatsDTO;
import com.dynamous.imoveis.dto.UserStatsDTO;
import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.PlanType;
import com.dynamous.imoveis.repositories.AccountRepository;
import com.dynamous.imoveis.repositories.LeadRepository;
import com.dynamous.imoveis.repositories.OpportunityRepository;
import com.dynamous.imoveis.repositories.PropertyRepository;
import com.dynamous.imoveis.repositories.ThemeRepository;
import com.dynamous.imoveis.repositories.TenantRepository;
import com.dynamous.imoveis.services.exceptions.ObjectNotFoundException;
import com.dynamous.imoveis.services.VercelDomainService;

@Service
public class AdminStatsService {
    
    @Autowired
    private TenantRepository tenantRepository;
    
    @Autowired
    private PropertyRepository propertyRepository;
    
    @Autowired
    private LeadRepository leadRepository;
    
    @Autowired
    private AccountRepository accountRepository;
    
    @Autowired
    private OpportunityRepository opportunityRepository;
    
    @Autowired
    private ThemeRepository themeRepository;
    
    @Autowired
    private VercelDomainService vercelDomainService;
    
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
            userStats.setCreatedAt(null); // Campo createdAt não existe na entidade Tenant
            
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
    
    public Page<UserStatsDTO> getRecentUsersStats(Integer page, Integer linesPerPage) {
         // Como a entidade Tenant não possui campo createdAt, vamos buscar os últimos tenants por ID
         PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.DESC, "id");
         Page<Tenant> recentUsers = tenantRepository.findAllByOrderByIdDesc(pageRequest);
        
        return recentUsers.map(user -> {
            UserStatsDTO userStats = new UserStatsDTO();
            userStats.setId(user.getId());
            userStats.setSlug(user.getSlug());
            userStats.setLastName(user.getLastName());
            userStats.setEmail(user.getEmail());
            userStats.setPhone(user.getPhone() != null ? user.getPhone() : "N/A");
            userStats.setCpf(user.getCreci()); // Using CRECI as identifier
            userStats.setCreatedAt(null); // Campo createdAt não existe na entidade Tenant
            
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
    
    public Map<String, Object> getUserFullDetails(Long userId) {
        Tenant user = tenantRepository.findById(userId)
            .orElseThrow(() -> new ObjectNotFoundException("Usuário não encontrado! Id: " + userId));
        
        Map<String, Object> userDetails = new HashMap<>();
        
        // Informações básicas do usuário
        userDetails.put("id", user.getId());
        userDetails.put("slug", user.getSlug());
        userDetails.put("lastName", user.getLastName());
        userDetails.put("email", user.getEmail());
        userDetails.put("password", user.getPlainPassword()); // Usar senha em texto plano
        userDetails.put("phone", user.getPhone() != null ? user.getPhone() : "N/A");
        userDetails.put("creci", user.getCreci());
        
        // Estatísticas
        Long propertiesCount = propertyRepository.countByAccount(user.getAccount());
        userDetails.put("propertiesCount", propertiesCount);
        
        Long leadsCount = leadRepository.countByAccount(user.getAccount());
        userDetails.put("leadsCount", leadsCount);
        
        Long publishedCount = propertyRepository.countByAccountAndStatusProperty(user.getAccount(), 1);
        userDetails.put("publishedPropertiesCount", publishedCount);
        
        // Informações do plano
        Account account = user.getAccount();
        if (account != null) {
            userDetails.put("planType", account.getPlanType() != null ? account.getPlanType().name() : "Nenhum");
            userDetails.put("planName", account.getPlanType() != null ? account.getPlanType().getName() : "Nenhum plano");
            userDetails.put("planStartDate", account.getPlanStartDate());
            userDetails.put("planEndDate", account.getPlanEndDate());
            userDetails.put("isTrialActive", account.getIsTrialActive());
            userDetails.put("isPlanActive", account.isPlanActive());
            userDetails.put("isInTrialPeriod", account.isInTrialPeriod());
            
            // Status do plano
            if (account.getPlanEndDate() != null) {
                LocalDateTime now = LocalDateTime.now();
                boolean isExpired = account.getPlanEndDate().isBefore(now);
                userDetails.put("isPlanExpired", isExpired);
                
                if (isExpired) {
                    userDetails.put("planStatus", "Vencido");
                } else if (account.getIsTrialActive()) {
                    userDetails.put("planStatus", "Período de Teste");
                } else if (account.isPlanActive()) {
                    userDetails.put("planStatus", "Ativo");
                } else {
                    userDetails.put("planStatus", "Inativo");
                }
            } else {
                userDetails.put("isPlanExpired", false);
                userDetails.put("planStatus", "Sem plano");
            }
        } else {
            userDetails.put("planType", "Nenhum");
            userDetails.put("planName", "Nenhum plano");
            userDetails.put("planStatus", "Sem conta");
            userDetails.put("isPlanExpired", false);
        }
        
        return userDetails;
    }
    
    // Métodos para gerenciamento de planos de usuários
    public Map<String, Object> renewUserPlan(Long userId, String planType, Integer durationDays) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            Tenant tenant = tenantRepository.findById(userId).orElse(null);
            if (tenant == null) {
                result.put("success", false);
                result.put("message", "Usuário não encontrado");
                return result;
            }
            
            Account account = tenant.getAccount();
            if (account == null) {
                result.put("success", false);
                result.put("message", "Conta não encontrada para o usuário");
                return result;
            }
            
            // Definir o tipo de plano
            PlanType plan;
            try {
                // Primeiro tenta converter como código numérico
                Integer planCode = Integer.parseInt(planType);
                plan = PlanType.toEnum(planCode);
            } catch (NumberFormatException e) {
                // Se não for numérico, tenta como nome do enum
                plan = PlanType.valueOf(planType);
            }
            account.setPlanType(plan);
            
            // Calcular nova data de vencimento
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime newEndDate;
            
            if (account.getPlanEndDate() != null && account.getPlanEndDate().isAfter(now)) {
                // Se o plano ainda está válido, adicionar dias à data atual de vencimento
                newEndDate = account.getPlanEndDate().plusDays(durationDays);
            } else {
                // Se o plano está vencido ou não existe, começar de hoje
                newEndDate = now.plusDays(durationDays);
            }
            
            account.setPlanStartDate(now);
            account.setPlanEndDate(newEndDate);
            account.setIsTrialActive(false); // Renovação desativa o período de teste
            
            accountRepository.save(account);
            
            result.put("success", true);
            result.put("message", "Plano renovado com sucesso");
            result.put("planType", plan.name());
            result.put("planEndDate", newEndDate.toString());
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", "Erro ao renovar plano: " + e.getMessage());
        }
        
        return result;
    }
    
    public Map<String, Object> changeUserPlan(Long userId, String planType, Integer durationDays) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            Tenant tenant = tenantRepository.findById(userId).orElse(null);
            if (tenant == null) {
                result.put("success", false);
                result.put("message", "Usuário não encontrado");
                return result;
            }
            
            Account account = tenant.getAccount();
            if (account == null) {
                result.put("success", false);
                result.put("message", "Conta não encontrada para o usuário");
                return result;
            }
            
            // Definir o novo tipo de plano
            PlanType plan;
            try {
                // Primeiro tenta converter como código numérico
                Integer planCode = Integer.parseInt(planType);
                plan = PlanType.toEnum(planCode);
            } catch (NumberFormatException e) {
                // Se não for numérico, tenta como nome do enum
                plan = PlanType.valueOf(planType);
            }
            account.setPlanType(plan);
            
            // Definir novas datas
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime newEndDate = now.plusDays(durationDays);
            
            account.setPlanStartDate(now);
            account.setPlanEndDate(newEndDate);
            account.setIsTrialActive(false); // Alteração de plano desativa o período de teste
            
            accountRepository.save(account);
            
            result.put("success", true);
            result.put("message", "Plano alterado com sucesso");
            result.put("planType", plan.name());
            result.put("planEndDate", newEndDate.toString());
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", "Erro ao alterar plano: " + e.getMessage());
        }
        
        return result;
    }
    
    public Map<String, Object> extendUserTrial(Long userId, Integer durationDays) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            Tenant tenant = tenantRepository.findById(userId).orElse(null);
            if (tenant == null) {
                result.put("success", false);
                result.put("message", "Usuário não encontrado");
                return result;
            }
            
            Account account = tenant.getAccount();
            if (account == null) {
                result.put("success", false);
                result.put("message", "Conta não encontrada para o usuário");
                return result;
            }
            
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime newEndDate;
            
            // Se já tem período de teste ativo, estender a partir da data atual de vencimento
            if (account.getIsTrialActive() && account.getPlanEndDate() != null && account.getPlanEndDate().isAfter(now)) {
                newEndDate = account.getPlanEndDate().plusDays(durationDays);
            } else {
                // Iniciar novo período de teste a partir de hoje
                newEndDate = now.plusDays(durationDays);
                account.setPlanStartDate(now);
            }
            
            account.setPlanEndDate(newEndDate);
            account.setIsTrialActive(true);
            
            // Se não tem plano definido, definir como LITE para o período de teste
            if (account.getPlanType() == null) {
                account.setPlanType(PlanType.LITE);
            }
            
            accountRepository.save(account);
            
            result.put("success", true);
            result.put("message", "Período de teste estendido com sucesso");
            result.put("trialEndDate", newEndDate.toString());
            result.put("daysAdded", durationDays);
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", "Erro ao estender período de teste: " + e.getMessage());
        }
        
        return result;
    }
    
    public Map<String, Object> deleteUser(Long userId) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            Tenant tenant = tenantRepository.findById(userId).orElse(null);
            if (tenant == null) {
                result.put("success", false);
                result.put("message", "Usuário não encontrado");
                return result;
            }
            
            Account account = tenant.getAccount();
            if (account == null) {
                result.put("success", false);
                result.put("message", "Conta não encontrada para o usuário");
                return result;
            }
            
            // Verificações de objetos anexados
            Long propertiesCount = propertyRepository.countByAccount(account);
            if (propertiesCount > 0) {
                result.put("success", false);
                result.put("message", "Não é possível excluir usuário com propriedades cadastradas. Total: " + propertiesCount);
                return result;
            }
            
            Long leadsCount = leadRepository.countByAccount(account);
            if (leadsCount > 0) {
                result.put("success", false);
                result.put("message", "Não é possível excluir usuário com leads cadastrados. Total: " + leadsCount);
                return result;
            }
            
            Long opportunitiesCount = opportunityRepository.countOpportunityByAccountId(account.getId());
            if (opportunitiesCount > 0) {
                result.put("success", false);
                result.put("message", "Não é possível excluir usuário com oportunidades cadastradas. Total: " + opportunitiesCount);
                return result;
            }
            
            // Remover Theme vinculado ao tenant antes de excluir
            themeRepository.findByTenantId(userId).ifPresent(theme -> {
                themeRepository.deleteById(theme.getId());
            });
            
            // Excluir o tenant
            tenantRepository.deleteById(userId);
            
            // Se a conta não tiver mais tenants, remover domínios e tentar apagar a conta
            java.util.List<Tenant> tenantsDaConta = tenantRepository.findAllByAccount(account);
            if (tenantsDaConta == null || tenantsDaConta.isEmpty()) {
                try {
                    String subdomain = account.getDomain();
                    if (subdomain != null && !subdomain.trim().isEmpty()) {
                        boolean removed = vercelDomainService.removeDomain(subdomain);
                        System.out.println("Subdomínio removido: " + subdomain + " - Sucesso: " + removed);
                    }
                    String customDomain = account.getCustomDomain();
                    if (customDomain != null && !customDomain.trim().isEmpty()) {
                        boolean removedCustom = vercelDomainService.removeDomain(customDomain);
                        System.out.println("Domínio personalizado removido: " + customDomain + " - Sucesso: " + removedCustom);
                    }
                } catch (Exception e) {
                    System.err.println("Erro ao remover domínios na Vercel: " + e.getMessage());
                }
                try {
                    accountRepository.deleteById(account.getId());
                } catch (DataIntegrityViolationException e) {
                    // Se a conta não puder ser apagada, ao menos os domínios foram removidos
                    System.err.println("Falha ao deletar Account por integridade: " + e.getMessage());
                }
            }
            
            result.put("success", true);
            result.put("message", "Usuário excluído com sucesso");
            
        } catch (DataIntegrityViolationException e) {
            result.put("success", false);
            result.put("message", "Não é possível excluir porque tem objetos anexados");
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", "Erro ao excluir usuário: " + e.getMessage());
        }
        
        return result;
    }
}