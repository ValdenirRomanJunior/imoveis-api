package com.dynamous.imoveis.config;

import io.github.bucket4j.Bucket;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Refill;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RateLimitingService {

    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

    /**
     * Obtém ou cria um bucket para o IP especificado
     */
    public Bucket getBucket(String key, BucketType bucketType) {
        try {
            System.out.println("=== RateLimitingService getBucket START ===");
            System.out.println("Key: " + key);
            System.out.println("BucketType: " + bucketType);
            
            Bucket bucket = buckets.computeIfAbsent(key, k -> {
                System.out.println("Creating new bucket for key: " + k);
                return createBucket(bucketType);
            });
            
            System.out.println("Bucket obtained successfully");
            System.out.println("=== RateLimitingService getBucket END ===");
            return bucket;
        } catch (Exception e) {
            System.err.println("=== ERROR in RateLimitingService getBucket ===");
            System.err.println("Error message: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    /**
     * Cria um bucket baseado no tipo especificado
     */
    private Bucket createBucket(BucketType bucketType) {
        try {
            System.out.println("=== RateLimitingService createBucket START ===");
            System.out.println("Creating bucket for type: " + bucketType);
            
            Bandwidth limit;
            
            switch (bucketType) {
                case AUTH:
                    // 10 tentativas por minuto para endpoints de autenticação
                    System.out.println("Creating AUTH bucket with 400 requests per minute");
                    limit = Bandwidth.classic(400, Refill.intervally(400, Duration.ofMinutes(1)));
                    break;
                case STRICT:
                    // 20 requisições por minuto para endpoints críticos
                    System.out.println("Creating STRICT bucket with 400 requests per minute");
                    limit = Bandwidth.classic(400, Refill.intervally(400, Duration.ofMinutes(1)));
                    break;
                case GENERAL:
                default:
                    // 100 requisições por minuto para endpoints gerais
                    System.out.println("Creating GENERAL bucket with 400 requests per minute");
                    limit = Bandwidth.classic(400, Refill.intervally(400, Duration.ofMinutes(1)));
                    break;
            }
            
            System.out.println("Building bucket...");
            Bucket bucket = Bucket.builder()
                    .addLimit(limit)
                    .build();
            
            System.out.println("Bucket created successfully");
            System.out.println("=== RateLimitingService createBucket END ===");
            return bucket;
        } catch (Exception e) {
            System.err.println("=== ERROR in RateLimitingService createBucket ===");
            System.err.println("Error message: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    /**
     * Enum para definir os tipos de bucket
     */
    public enum BucketType {
        GENERAL, STRICT, AUTH
    }
}