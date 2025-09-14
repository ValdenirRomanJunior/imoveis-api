package com.dynamous.imoveis.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:netlify.properties")
@ConfigurationProperties(prefix = "netlify")
public class NetlifyConfig {
    
    private Api api = new Api();
    private Oauth oauth = new Oauth();
    private Site site = new Site();
    
    public Api getApi() {
        return api;
    }
    
    public void setApi(Api api) {
        this.api = api;
    }
    
    public Site getSite() {
        return site;
    }
    
    public void setSite(Site site) {
        this.site = site;
    }
    
    public Oauth getOauth() {
        return oauth;
    }
    
    public void setOauth(Oauth oauth) {
        this.oauth = oauth;
    }
    
    public static class Api {
        private String baseUrl;
        private String token;
        private int timeout;
        
        public String getBaseUrl() {
            return baseUrl;
        }
        
        public void setBaseUrl(String baseUrl) {
            this.baseUrl = baseUrl;
        }
        
        public String getToken() {
            return token;
        }
        
        public void setToken(String token) {
            this.token = token;
        }
        
        public int getTimeout() {
            return timeout;
        }
        
        public void setTimeout(int timeout) {
            this.timeout = timeout;
        }
    }
    
    public static class Site {
        private String defaultBranch;
        private String buildCommand;
        private String publishDirectory;
        
        public String getDefaultBranch() {
            return defaultBranch;
        }
        
        public void setDefaultBranch(String defaultBranch) {
            this.defaultBranch = defaultBranch;
        }
        
        public String getBuildCommand() {
            return buildCommand;
        }
        
        public void setBuildCommand(String buildCommand) {
            this.buildCommand = buildCommand;
        }
        
        public String getPublishDirectory() {
            return publishDirectory;
        }
        
        public void setPublishDirectory(String publishDirectory) {
            this.publishDirectory = publishDirectory;
        }
    }
    
    public static class Oauth {
        private String clientId;
        private String clientSecret;
        private String redirectUri;
        private String scope;
        
        public String getClientId() {
            return clientId;
        }
        
        public void setClientId(String clientId) {
            this.clientId = clientId;
        }
        
        public String getClientSecret() {
            return clientSecret;
        }
        
        public void setClientSecret(String clientSecret) {
            this.clientSecret = clientSecret;
        }
        
        public String getRedirectUri() {
            return redirectUri;
        }
        
        public void setRedirectUri(String redirectUri) {
            this.redirectUri = redirectUri;
        }
        
        public String getScope() {
            return scope;
        }
        
        public void setScope(String scope) {
            this.scope = scope;
        }
    }
}