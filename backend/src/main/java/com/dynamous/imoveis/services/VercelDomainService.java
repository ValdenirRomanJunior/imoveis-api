package com.dynamous.imoveis.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

@Service
public class VercelDomainService {

    private static final Logger logger = LoggerFactory.getLogger(VercelDomainService.class);
    
    @Value("${vercel.token}")
    private String vercelToken;
    
    @Value("${vercel.project.id}")
    private String projectId;
    
    @Value("${vercel.team.id}")
    private String teamId;
    
    private final RestTemplate restTemplate = new RestTemplate();
    private static final String VERCEL_API_BASE = "https://api.vercel.com";
    
    /**
     * Adiciona um subdomínio automaticamente para uma nova conta
     * @param companyName Nome da empresa que será usado como subdomínio
     * @param accountId ID da conta
     * @return o subdomínio criado ou null se falhou
     */
    public String createSubdomain(String companyName, Long accountId) {
        try {
            String baseSubdomain = sanitizeCompanyName(companyName);
            String fullSubdomain = baseSubdomain + accountId + ".standi.com.br";
            
            boolean success = addDomainToProject(fullSubdomain);
            if (success) {
                return fullSubdomain;
            } else {
                return null;
            }
        } catch (Exception e) {
            logger.error("Erro ao criar subdomínio para empresa: " + companyName, e);
            return null;
        }
    }
    
    
    /**
     * Adiciona um domínio personalizado ao projeto Vercel
     * @param domain Domínio a ser adicionado
     * @return true se o domínio foi adicionado com sucesso
     */
    public boolean addCustomDomain(String domain) {
        try {
            return addDomainToProject(domain);
        } catch (Exception e) {
            logger.error("Erro ao adicionar domínio personalizado: " + domain, e);
            return false;
        }
    }
    
    /**
     * Verifica o status de verificação de um domínio
     * @param domain Domínio a ser verificado
     * @return Map com informações de verificação
     */
    public Map<String, Object> verifyDomain(String domain) {
        try {
            String url = String.format("%s/v9/projects/%s/domains/%s/verify", 
                VERCEL_API_BASE, projectId, domain);
            
            HttpHeaders headers = createHeaders();
            HttpEntity<String> entity = new HttpEntity<>(headers);
            
            ResponseEntity<Map> response = restTemplate.exchange(
                url, HttpMethod.POST, entity, Map.class);
            
            return response.getBody();
        } catch (HttpClientErrorException e) {
            logger.error("Erro ao verificar domínio: " + domain, e);
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            errorResponse.put("verified", false);
            return errorResponse;
        }
    }
    
    /**
     * Remove um domínio do projeto Vercel
     * @param domain Domínio a ser removido
     * @return true se o domínio foi removido com sucesso
     */
    public boolean removeDomain(String domain) {
        try {
            String url = String.format("%s/v9/projects/%s/domains/%s", 
                VERCEL_API_BASE, projectId, domain);
            
            HttpHeaders headers = createHeaders();
            HttpEntity<String> entity = new HttpEntity<>(headers);
            
            restTemplate.exchange(url, HttpMethod.DELETE, entity, String.class);
            
            logger.info("Domínio removido com sucesso: " + domain);
            return true;
        } catch (HttpClientErrorException e) {
            logger.error("Erro ao remover domínio: " + domain, e);
            return false;
        }
    }
    
    /**
     * Lista todos os domínios do projeto
     * @return Map com a lista de domínios
     */
    public Map<String, Object> listDomains() {
        try {
            String url = String.format("%s/v9/projects/%s/domains", 
                VERCEL_API_BASE, projectId);
            
            HttpHeaders headers = createHeaders();
            HttpEntity<String> entity = new HttpEntity<>(headers);
            
            ResponseEntity<Map> response = restTemplate.exchange(
                url, HttpMethod.GET, entity, Map.class);
            
            return response.getBody();
        } catch (HttpClientErrorException e) {
            logger.error("Erro ao listar domínios", e);
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return errorResponse;
        }
    }
    
    /**
     * Método privado para adicionar domínio ao projeto
     */
    private boolean addDomainToProject(String domain) {
        try {
            String url = String.format("%s/v9/projects/%s/domains", 
                VERCEL_API_BASE, projectId);
            
            HttpHeaders headers = createHeaders();
            
            Map<String, String> requestBody = new HashMap<>();
            requestBody.put("name", domain);
            
            HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);
            
            ResponseEntity<Map> response = restTemplate.exchange(
                url, HttpMethod.POST, entity, Map.class);
            
            logger.info("Domínio adicionado com sucesso: " + domain);
            return response.getStatusCode() == HttpStatus.OK || 
                   response.getStatusCode() == HttpStatus.CREATED;
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.CONFLICT) {
                logger.warn("Domínio já existe: " + domain);
                return true; // Considera sucesso se já existe
            }
            logger.error("Erro ao adicionar domínio: " + domain, e);
            return false;
        }
    }
    
    /**
     * Cria os headers necessários para as requisições à API da Vercel
     */
    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(vercelToken);
        
        if (teamId != null && !teamId.isEmpty()) {
            headers.set("X-Vercel-Team-Id", teamId);
        }
        
        return headers;
    }
    
    /**
     * Sanitiza o nome da empresa para usar como subdomínio
     */
    private String sanitizeCompanyName(String companyName) {
        if (companyName == null) {
            return "empresa";
        }
        
        // Normaliza explicitamente espaços em hífens e aplica regras de domínio
        String sanitized = companyName
            .toLowerCase()
            .replaceAll("\\s+", "-")              // espaços -> hífen
            .replaceAll("[^a-z0-9-]", "-")        // caracteres inválidos -> hífen
            .replaceAll("-+", "-")                // colapsa hífens
            .replaceAll("^-|-$", "");             // remove hífens das pontas
        
        return sanitized.substring(0, Math.min(sanitized.length(), 63)); // Limite DNS
    }
}