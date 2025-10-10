package com.standi.imoveisapi.controller;

import com.dynamous.imoveis.config.NetlifyConfig;
import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.services.AccountService;
import com.dynamous.imoveis.services.NetlifyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth/netlify")
@CrossOrigin(origins = "*")
public class NetlifyOAuthController {

    private static final Logger logger = LoggerFactory.getLogger(NetlifyOAuthController.class);

    @Autowired
    private NetlifyConfig netlifyConfig;

    @Autowired
    private AccountService accountService;

    @Autowired
    private NetlifyService netlifyService;

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Inicia o fluxo OAuth2 redirecionando para a Netlify
     */
    @GetMapping("/authorize")
    public void authorize(@RequestParam Long accountId, HttpServletResponse response) throws IOException {
        logger.info("Iniciando autorização OAuth2 para account ID: {}", accountId);
        
        String authUrl = UriComponentsBuilder
                .fromHttpUrl("https://app.netlify.com/authorize")
                .queryParam("client_id", netlifyConfig.getOauth().getClientId())
                .queryParam("response_type", "code")
                .queryParam("redirect_uri", netlifyConfig.getOauth().getRedirectUri())
                .queryParam("scope", netlifyConfig.getOauth().getScope())
                .queryParam("state", accountId.toString())
                .build()
                .toUriString();

        response.sendRedirect(authUrl);
    }

    /**
     * Callback do OAuth2 - recebe o código de autorização
     */
    @GetMapping("/callback")
    public ResponseEntity<?> callback(
            @RequestParam String code,
            @RequestParam String state,
            @RequestParam(required = false) String error) {
        
        if (error != null) {
            logger.error("Erro na autorização OAuth2: {}", error);
            return ResponseEntity.badRequest().body(Map.of("error", "Autorização negada: " + error));
        }

        try {
            Long accountId = Long.parseLong(state);
            logger.info("Processando callback OAuth2 para account ID: {}", accountId);

            // Trocar código por token de acesso
            String accessToken = exchangeCodeForToken(code);
            
            // Salvar token na conta
            Account account = accountService.find(accountId);
            if (account == null) {
                logger.error("Conta não encontrada para account ID: {}", accountId);
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("success", false);
                errorResponse.put("error", "Conta não encontrada");
                errorResponse.put("message", "A conta especificada não existe no sistema");
                errorResponse.put("accountId", accountId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
            }
            
            account.setNetlifyToken(accessToken);
            accountService.update(account);
            
            logger.info("Token OAuth2 obtido com sucesso para account ID: {}", accountId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Autorização concluída com sucesso");
            response.put("accountId", accountId);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("Erro ao processar callback OAuth2: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Erro interno do servidor"));
        }
    }

    /**
     * Troca o código de autorização por um token de acesso
     */
    private String exchangeCodeForToken(String code) {
        logger.info("Trocando código por token de acesso");
        
        String tokenUrl = "https://api.netlify.com/oauth/token";
        
        Map<String, String> tokenRequest = new HashMap<>();
        tokenRequest.put("client_id", netlifyConfig.getOauth().getClientId());
        tokenRequest.put("client_secret", netlifyConfig.getOauth().getClientSecret());
        tokenRequest.put("code", code);
        tokenRequest.put("grant_type", "authorization_code");
        tokenRequest.put("redirect_uri", netlifyConfig.getOauth().getRedirectUri());
        
        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(tokenUrl, tokenRequest, Map.class);
            Map<String, Object> responseBody = response.getBody();
            
            if (responseBody != null && responseBody.containsKey("access_token")) {
                return (String) responseBody.get("access_token");
            } else {
                throw new RuntimeException("Token de acesso não encontrado na resposta");
            }
            
        } catch (Exception e) {
            logger.error("Erro ao trocar código por token: ", e);
            throw new RuntimeException("Falha ao obter token de acesso", e);
        }
    }

    /**
     * Verifica o status da autorização OAuth2
     */
    @GetMapping("/status/{accountId}")
    public ResponseEntity<?> getAuthStatus(@PathVariable Long accountId) {
        try {
            Account account = accountService.find(accountId);
            if (account == null) {
                logger.error("Conta não encontrada para verificação de status, account ID: {}", accountId);
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("success", false);
                errorResponse.put("error", "Conta não encontrada");
                errorResponse.put("message", "A conta especificada não existe no sistema");
                errorResponse.put("accountId", accountId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("accountId", accountId);
            response.put("authorized", account.getNetlifyToken() != null);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("Erro ao verificar status de autorização: ", e);
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", "Erro interno do servidor");
            errorResponse.put("message", "Ocorreu um erro interno ao verificar o status de autorização");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}