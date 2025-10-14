package com.dynamous.imoveis.config;

import io.github.bucket4j.Bucket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class RateLimitingInterceptor implements HandlerInterceptor {

    @Autowired
    private RateLimitingService rateLimitingService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String clientIp = getClientIpAddress(request);
        String requestURI = request.getRequestURI();
        
        // Determina qual tipo de bucket usar baseado na URI
        RateLimitingService.BucketType bucketType = getBucketType(requestURI);
        
        // Cria uma chave única para o IP + tipo de endpoint
        String bucketKey = clientIp + ":" + bucketType.name();
        
        // Obtém o bucket para este IP/endpoint
        Bucket bucket = rateLimitingService.getBucket(bucketKey, bucketType);

        // Tenta consumir 1 token
        if (bucket.tryConsume(1)) {
            // Adiciona headers informativos sobre o rate limiting
            long availableTokens = bucket.getAvailableTokens();
            response.setHeader("X-Rate-Limit-Remaining", String.valueOf(availableTokens));
            response.setHeader("X-Rate-Limit-Retry-After-Seconds", "60");
            
            return true; // Permite a requisição
        } else {
            // Rate limit excedido
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.setContentType("application/json");
            response.getWriter().write("{\"error\":\"Rate limit exceeded. Too many requests.\",\"message\":\"Muitas requisições. Tente novamente em alguns minutos.\"}");
            
            // Headers informativos
            response.setHeader("X-Rate-Limit-Remaining", "0");
            response.setHeader("X-Rate-Limit-Retry-After-Seconds", "60");
            
            return false; // Bloqueia a requisição
        }
    }

    /**
     * Determina qual tipo de bucket usar baseado na URI da requisição
     */
    private RateLimitingService.BucketType getBucketType(String requestURI) {
        if (requestURI.contains("/auth/") || requestURI.contains("/login") || requestURI.contains("/register")) {
            return RateLimitingService.BucketType.AUTH;
        } else if (requestURI.contains("/admin/") || requestURI.contains("/stripe/") || requestURI.contains("/tenant/")) {
            return RateLimitingService.BucketType.STRICT;
        } else {
            return RateLimitingService.BucketType.GENERAL;
        }
    }

    /**
     * Obtém o endereço IP real do cliente, considerando proxies e load balancers
     */
    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty() && !"unknown".equalsIgnoreCase(xForwardedFor)) {
            return xForwardedFor.split(",")[0].trim();
        }

        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty() && !"unknown".equalsIgnoreCase(xRealIp)) {
            return xRealIp;
        }

        String xForwardedProto = request.getHeader("X-Forwarded-Proto");
        if (xForwardedProto != null) {
            String remoteAddr = request.getRemoteAddr();
            if (remoteAddr != null && !remoteAddr.isEmpty()) {
                return remoteAddr;
            }
        }

        return request.getRemoteAddr();
    }
}