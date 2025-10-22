package com.dynamous.imoveis.config;

import io.github.bucket4j.Bucket;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Refill;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RateLimitingService {

    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

    // Valores configuráveis via propriedades com defaults seguros
    @Value("${ratelimit.general.perMinute:400}")
    private int generalPerMinute;

    @Value("${ratelimit.strict.perMinute:400}")
    private int strictPerMinute;

    @Value("${ratelimit.auth.perMinute:400}")
    private int authPerMinute;

    /**
     * Obtém ou cria um bucket para o IP especificado
     */
    public Bucket getBucket(String key, BucketType bucketType) {
        try {
            System.out.println("=== RateLimitingService getBucket START ===");
            System.out.println("Key: " + key);
            System.out.println("BucketType: " + bucketType);
            System.out.println("Configured rates -> GENERAL:" + generalPerMinute + ", STRICT:" + strictPerMinute + ", AUTH:" + authPerMinute);
            
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
                    // Limite específico para endpoints de autenticação
                    System.out.println("Creating AUTH bucket with " + authPerMinute + " requests per minute");
                    limit = Bandwidth.classic(authPerMinute, Refill.intervally(authPerMinute, Duration.ofMinutes(1)));
                    break;
                case STRICT:
                    // Limite específico para endpoints críticos
                    System.out.println("Creating STRICT bucket with " + strictPerMinute + " requests per minute");
                    limit = Bandwidth.classic(strictPerMinute, Refill.intervally(strictPerMinute, Duration.ofMinutes(1)));
                    break;
                case GENERAL:
                default:
                    // Limite para endpoints gerais
                    System.out.println("Creating GENERAL bucket with " + generalPerMinute + " requests per minute");
                    limit = Bandwidth.classic(generalPerMinute, Refill.intervally(generalPerMinute, Duration.ofMinutes(1)));
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