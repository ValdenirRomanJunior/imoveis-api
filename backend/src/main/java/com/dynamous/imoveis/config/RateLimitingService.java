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
        return buckets.computeIfAbsent(key, k -> createBucket(bucketType));
    }

    /**
     * Cria um bucket baseado no tipo especificado
     */
    private Bucket createBucket(BucketType bucketType) {
        Bandwidth limit;
        
        switch (bucketType) {
            case AUTH:
                // 10 tentativas por minuto para endpoints de autenticação
                limit = Bandwidth.classic(400, Refill.intervally(400, Duration.ofMinutes(1)));
                break;
            case STRICT:
                // 20 requisições por minuto para endpoints críticos
                limit = Bandwidth.classic(400, Refill.intervally(400, Duration.ofMinutes(1)));
                break;
            case GENERAL:
            default:
                // 100 requisições por minuto para endpoints gerais
                limit = Bandwidth.classic(400, Refill.intervally(400, Duration.ofMinutes(1)));
                break;
        }
        
        return Bucket.builder()
                .addLimit(limit)
                .build();
    }

    /**
     * Enum para definir os tipos de bucket
     */
    public enum BucketType {
        GENERAL, STRICT, AUTH
    }
}