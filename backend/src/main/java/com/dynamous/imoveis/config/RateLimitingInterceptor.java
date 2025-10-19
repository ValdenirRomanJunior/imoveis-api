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
        try {
            System.out.println("=== RateLimitingInterceptor preHandle START ===");
            System.out.println("Request URI: " + request.getRequestURI());
            System.out.println("Request Method: " + request.getMethod());
            
            String clientIp = getClientIpAddress(request);
            System.out.println("Client IP: " + clientIp);
            
            RateLimitingService.BucketType bucketType = getBucketType(request.getRequestURI());
            System.out.println("Bucket Type: " + bucketType);
            
            String key = clientIp + ":" + bucketType.name();
            System.out.println("Bucket Key: " + key);
            
            System.out.println("Getting bucket from service...");
            Bucket bucket = rateLimitingService.getBucket(key, bucketType);
            System.out.println("Bucket obtained successfully");
            
            System.out.println("Checking if request can be consumed...");
            if (bucket.tryConsume(1)) {
                System.out.println("Request allowed - consuming token");
                System.out.println("=== RateLimitingInterceptor preHandle END - SUCCESS ===");
                return true;
            } else {
                System.out.println("Rate limit exceeded for IP: " + clientIp);
                
                response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
                response.setContentType("application/json");
                response.getWriter().write("{\"error\":\"Rate limit exceeded. Please try again later.\"}");
                
                System.out.println("=== RateLimitingInterceptor preHandle END - RATE LIMITED ===");
                return false;
            }
        } catch (Exception e) {
            System.err.println("=== ERROR in RateLimitingInterceptor preHandle ===");
            System.err.println("Error message: " + e.getMessage());
            System.err.println("Error class: " + e.getClass().getName());
            e.printStackTrace();
            
            // Em caso de erro, permitir a requisição para não bloquear o sistema
            System.err.println("Allowing request due to error in rate limiting");
            return true;
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