package com.dynamous.imoveis.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AsaasConfig {
    
    @Value("${asaas.api.base-url}")
    private String baseUrl;
    
    @Value("${asaas.api.token}")
    private String apiToken;
    
    @Value("${asaas.api.timeout:30000}")
    private int timeout;
    
    @Value("${asaas.api.user-agent}")
    private String userAgent;
    
    @Value("${asaas.webhook.token:}")
    private String webhookToken;
    
    @Value("${asaas.environment:sandbox}")
    private String environment;
    
    @Value("${asaas.checkout.success-url:http://localhost:3000/payment/success}")
    private String successUrl;
    
    @Value("${asaas.checkout.cancel-url:http://localhost:3000/payment/cancel}")
    private String cancelUrl;
    
    @Value("${asaas.checkout.expired-url:http://localhost:3000/payment/cancel}")
    private String expiredUrl;
    
    public String getBaseUrl() {
        return baseUrl;
    }
    
    public String getApiToken() {
        return apiToken;
    }
    
    public int getTimeout() {
        return timeout;
    }
    
    public String getUserAgent() {
        return userAgent;
    }
    
    public String getWebhookToken() {
        return webhookToken;
    }
    
    public String getEnvironment() {
        return environment;
    }
    
    public boolean isSandbox() {
        return "sandbox".equalsIgnoreCase(environment);
    }
    
    public boolean isProduction() {
        return "production".equalsIgnoreCase(environment);
    }
    
    public String getSuccessUrl() {
        return successUrl;
    }
    
    public String getCancelUrl() {
        return cancelUrl;
    }
    
    public String getExpiredUrl() {
        return expiredUrl;
    }
    
    public String getApiUrl() {
        return baseUrl;
    }
}