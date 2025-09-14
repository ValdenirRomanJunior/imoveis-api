package com.dynamous.imoveis.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.http.*;
import com.dynamous.imoveis.services.exceptions.ServiceException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.dynamous.imoveis.config.NetlifyConfig;
import com.dynamous.imoveis.services.exceptions.ServiceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

@Service
public class NetlifyService {
    
    private static final Logger logger = LoggerFactory.getLogger(NetlifyService.class);
    
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final NetlifyConfig netlifyConfig;
    
    @Autowired
    public NetlifyService(NetlifyConfig netlifyConfig) {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
        this.netlifyConfig = netlifyConfig;
    }

    /**
     * Cria um novo site na Netlify com token OAuth2 personalizado
     */
    public Map<String, Object> createSiteWithToken(String siteName, String customDomain, String oauthToken) {
        try {
            String url = netlifyConfig.getApi().getBaseUrl() + "/sites";
            
            HttpHeaders headers = createHeaders(oauthToken);
            
            Map<String, Object> siteData = new HashMap<>();
            siteData.put("name", siteName);
            
            if (customDomain != null && !customDomain.isEmpty()) {
                siteData.put("custom_domain", customDomain);
            }
            
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(siteData, headers);
            
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
            return response.getBody();
            
        } catch (RestClientException e) {
            logger.error("Failed to create Netlify site with OAuth token: {}", e.getMessage());
            throw new ServiceException("Erro ao criar site na Netlify: " + e.getMessage(), e);
        } catch (Exception e) {
            logger.error("Unexpected error creating Netlify site with OAuth token: {}", e.getMessage());
            throw new ServiceException("Erro inesperado ao criar site na Netlify", e);
        }
    }

    /**
     * Cria um novo site na Netlify
     */
    public Map<String, Object> createSite(String siteName, String customDomain) {
        try {
            String url = netlifyConfig.getApi().getBaseUrl() + "/sites";
            
            HttpHeaders headers = createHeaders();
            
            Map<String, Object> siteData = new HashMap<>();
            siteData.put("name", siteName);
            
            if (customDomain != null && !customDomain.isEmpty()) {
                siteData.put("custom_domain", customDomain);
            }
            
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(siteData, headers);
            
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
            return response.getBody();
            
        } catch (RestClientException e) {
            logger.error("Failed to create Netlify site: {}", e.getMessage());
            throw new ServiceException("Erro ao criar site na Netlify: " + e.getMessage(), e);
        } catch (Exception e) {
            logger.error("Unexpected error creating Netlify site: {}", e.getMessage());
            throw new ServiceException("Erro inesperado ao criar site na Netlify", e);
        }
    }

    /**
     * Adiciona um domínio customizado a um site existente com token OAuth2 personalizado
     */
    public Map<String, Object> addCustomDomainWithToken(String siteId, String customDomain, String oauthToken) {
        try {
            String url = netlifyConfig.getApi().getBaseUrl() + "/sites/" + siteId + "/domains";
            
            HttpHeaders headers = createHeaders(oauthToken);
            
            Map<String, Object> domainData = new HashMap<>();
            domainData.put("domain", customDomain);
            
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(domainData, headers);
            
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
            return response.getBody();
            
        } catch (RestClientException e) {
            logger.error("Failed to add custom domain to site {} with OAuth token: {}", siteId, e.getMessage());
            throw new ServiceException("Erro ao adicionar domínio customizado na Netlify: " + e.getMessage(), e);
        } catch (Exception e) {
            logger.error("Unexpected error adding custom domain to site {} with OAuth token: {}", siteId, e.getMessage());
            throw new ServiceException("Erro inesperado ao adicionar domínio customizado na Netlify", e);
        }
    }

    /**
     * Adiciona um domínio customizado a um site existente
     */
    public Map<String, Object> addCustomDomain(String siteId, String customDomain) {
        try {
            String url = netlifyConfig.getApi().getBaseUrl() + "/sites/" + siteId + "/domains";
            
            HttpHeaders headers = createHeaders();
            
            Map<String, Object> domainData = new HashMap<>();
            domainData.put("domain", customDomain);
            
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(domainData, headers);
            
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
            return response.getBody();
            
        } catch (RestClientException e) {
            logger.error("Failed to add custom domain to site {}: {}", siteId, e.getMessage());
            throw new ServiceException("Erro ao adicionar domínio customizado na Netlify: " + e.getMessage(), e);
        } catch (Exception e) {
            logger.error("Unexpected error adding custom domain to site {}: {}", siteId, e.getMessage());
            throw new ServiceException("Erro inesperado ao adicionar domínio customizado na Netlify", e);
        }
    }

    /**
     * Remove um domínio customizado de um site
     */
    public void removeCustomDomain(String siteId, String customDomain) {
        try {
            String url = netlifyConfig.getApi().getBaseUrl() + "/sites/" + siteId + "/domains/" + customDomain;
            
            HttpHeaders headers = createHeaders();
            HttpEntity<String> request = new HttpEntity<>(headers);
            
            restTemplate.exchange(url, HttpMethod.DELETE, request, String.class);
            
        } catch (RestClientException e) {
            logger.error("Failed to remove custom domain from site {}: {}", siteId, e.getMessage());
            throw new ServiceException("Erro ao remover domínio customizado na Netlify: " + e.getMessage(), e);
        } catch (Exception e) {
            logger.error("Unexpected error removing custom domain from site {}: {}", siteId, e.getMessage());
            throw new ServiceException("Erro inesperado ao remover domínio customizado na Netlify", e);
        }
    }

    /**
     * Remove um domínio customizado de um site com token OAuth2 personalizado
     */
    public void removeDomain(String siteId, String domain, String token) {
        try {
            String url = netlifyConfig.getApi().getBaseUrl() + "/sites/" + siteId + "/domains/" + domain;
            
            HttpHeaders headers = createHeaders(token);
            HttpEntity<String> request = new HttpEntity<>(headers);
            
            restTemplate.exchange(url, HttpMethod.DELETE, request, String.class);
            
        } catch (RestClientException e) {
            logger.error("Failed to remove custom domain from site {} with token: {}", siteId, e.getMessage());
            throw new ServiceException("Erro ao remover domínio customizado na Netlify: " + e.getMessage(), e);
        } catch (Exception e) {
            logger.error("Unexpected error removing custom domain from site {} with token: {}", siteId, e.getMessage());
            throw new ServiceException("Erro inesperado ao remover domínio customizado na Netlify", e);
        }
    }

    /**
     * Remove um domínio customizado de um site
     */
    public void removeDomain(String siteId, String domain) {
        try {
            String url = netlifyConfig.getApi().getBaseUrl() + "/sites/" + siteId + "/domains/" + domain;
            
            HttpHeaders headers = createHeaders();
            HttpEntity<String> request = new HttpEntity<>(headers);
            
            restTemplate.exchange(url, HttpMethod.DELETE, request, String.class);
            
        } catch (RestClientException e) {
            logger.error("Failed to remove custom domain from site {}: {}", siteId, e.getMessage());
            throw new ServiceException("Erro ao remover domínio customizado na Netlify: " + e.getMessage(), e);
        } catch (Exception e) {
            logger.error("Unexpected error removing custom domain from site {}: {}", siteId, e.getMessage());
            throw new ServiceException("Erro inesperado ao remover domínio customizado na Netlify", e);
        }
    }

    /**
     * Ativa SSL para um site
     */
    public String activateSSL(String siteId) {
        try {
            String url = netlifyConfig.getApi().getBaseUrl() + "/sites/" + siteId + "/ssl";
            
            HttpHeaders headers = createHeaders();
            HttpEntity<String> request = new HttpEntity<>(headers);
            
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);
            return response.getBody();
            
        } catch (RestClientException e) {
            logger.error("Failed to activate SSL for site {}: {}", siteId, e.getMessage());
            throw new ServiceException("Erro ao ativar SSL na Netlify: " + e.getMessage(), e);
        } catch (Exception e) {
            logger.error("Unexpected error activating SSL for site {}: {}", siteId, e.getMessage());
            throw new ServiceException("Erro inesperado ao ativar SSL na Netlify", e);
        }
    }

    /**
     * Ativa SSL para um site com token OAuth2 personalizado
     */
    public String activateSSL(String siteId, String token) {
        try {
            String url = netlifyConfig.getApi().getBaseUrl() + "/sites/" + siteId + "/ssl";
            
            HttpHeaders headers = createHeaders(token);
            HttpEntity<String> request = new HttpEntity<>(headers);
            
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);
            return response.getBody();
            
        } catch (RestClientException e) {
            logger.error("Failed to activate SSL for site {} with token: {}", siteId, e.getMessage());
            throw new ServiceException("Erro ao ativar SSL na Netlify: " + e.getMessage(), e);
        } catch (Exception e) {
            logger.error("Unexpected error activating SSL for site {} with token: {}", siteId, e.getMessage());
            throw new ServiceException("Erro inesperado ao ativar SSL na Netlify", e);
        }
    }

    /**
     * Obtém informações de um site
     */
    public Map<String, Object> getSiteInfo(String siteId) {
        try {
            String url = netlifyConfig.getApi().getBaseUrl() + "/sites/" + siteId;
            
            HttpHeaders headers = createHeaders();
            HttpEntity<String> request = new HttpEntity<>(headers);
            
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, request, Map.class);
            return response.getBody();
            
        } catch (RestClientException e) {
            logger.error("Failed to get site info for site {}: {}", siteId, e.getMessage());
            throw new ServiceException("Erro ao obter informações do site na Netlify: " + e.getMessage(), e);
        } catch (Exception e) {
            logger.error("Unexpected error getting site info for site {}: {}", siteId, e.getMessage());
            throw new ServiceException("Erro inesperado ao obter informações do site na Netlify", e);
        }
    }

    /**
     * Lista todos os sites da conta
     */
    public List<Map<String, Object>> listSites() {
        try {
            String url = netlifyConfig.getApi().getBaseUrl() + "/sites";
            
            HttpHeaders headers = createHeaders();
            HttpEntity<String> request = new HttpEntity<>(headers);
            
            ResponseEntity<List> response = restTemplate.exchange(url, HttpMethod.GET, request, List.class);
            return response.getBody();
            
        } catch (RestClientException e) {
            logger.error("Failed to list sites: {}", e.getMessage());
            throw new ServiceException("Erro ao listar sites na Netlify: " + e.getMessage(), e);
        } catch (Exception e) {
            logger.error("Unexpected error listing sites: {}", e.getMessage());
            throw new ServiceException("Erro inesperado ao listar sites na Netlify", e);
        }
    }

    /**
     * Verifica o status de DNS de um domínio
     */
    public Map<String, Object> checkDNSStatus(String siteId, String domain) {
        try {
            String url = netlifyConfig.getApi().getBaseUrl() + "/sites/" + siteId + "/domains/" + domain + "/dns";
            
            HttpHeaders headers = createHeaders();
            HttpEntity<String> request = new HttpEntity<>(headers);
            
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, request, Map.class);
            return response.getBody();
            
        } catch (RestClientException e) {
            logger.error("Failed to check DNS status for domain {} on site {}: {}", domain, siteId, e.getMessage());
            throw new ServiceException("Erro ao verificar status DNS na Netlify: " + e.getMessage(), e);
        } catch (Exception e) {
            logger.error("Unexpected error checking DNS status for domain {} on site {}: {}", domain, siteId, e.getMessage());
            throw new ServiceException("Erro inesperado ao verificar status DNS na Netlify", e);
        }
    }

    /**
     * Cria os headers necessários para autenticação na API da Netlify
     */
    private HttpHeaders createHeaders(String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(token != null ? token : netlifyConfig.getApi().getToken());
        headers.set("User-Agent", "Standi-SaaS/1.0");
        return headers;
    }

    private HttpHeaders createHeaders() {
        return createHeaders(null);
    }

    /**
     * Valida se o token da API está configurado
     */
    public boolean isConfigured() {
        return netlifyConfig.getApi().getToken() != null && !netlifyConfig.getApi().getToken().isEmpty();
    }
}