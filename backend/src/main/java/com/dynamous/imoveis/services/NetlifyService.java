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
     * Cria um novo site na Netlify
     */
    public Map<String, Object> createSite(String siteName) {
        try {
            String url = netlifyConfig.getApi().getBaseUrl() + "/sites";
            
            HttpHeaders headers = createHeaders();
            
            Map<String, Object> siteData = new HashMap<>();
            siteData.put("name", siteName);
            
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