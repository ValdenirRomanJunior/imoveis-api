package com.dynamous.imoveis.services;

import com.dynamous.imoveis.entities.AccessMetrics;
import com.dynamous.imoveis.repositories.AccessMetricsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class AccessMetricsService {

    @Autowired
    private AccessMetricsRepository accessMetricsRepository;

    public void trackAccess(String eventType, String ipAddress, String userAgent, String sessionId) {
        AccessMetrics metrics = new AccessMetrics(eventType, ipAddress, userAgent, sessionId);
        accessMetricsRepository.save(metrics);
    }

    public Map<String, Object> getAccessMetrics() {
        Map<String, Object> metrics = new HashMap<>();
        
        // Métricas totais
        Long totalHomeAccesses = accessMetricsRepository.countByEventType("HOME_ACCESS");
        Long totalTestButtonClicks = accessMetricsRepository.countByEventType("TEST_BUTTON_CLICK");
        Long uniqueHomeAccesses = accessMetricsRepository.countUniqueHomeAccesses();
        
        // Métricas das últimas 24 horas
        LocalDateTime last24Hours = LocalDateTime.now().minusHours(24);
        Long homeAccessesLast24h = accessMetricsRepository.countByEventTypeAndCreatedAtAfter("HOME_ACCESS", last24Hours);
        Long testButtonClicksLast24h = accessMetricsRepository.countByEventTypeAndCreatedAtAfter("TEST_BUTTON_CLICK", last24Hours);
        Long uniqueHomeAccessesLast24h = accessMetricsRepository.countUniqueHomeAccessesAfter(last24Hours);
        
        // Métricas da última semana
        LocalDateTime lastWeek = LocalDateTime.now().minusWeeks(1);
        Long homeAccessesLastWeek = accessMetricsRepository.countByEventTypeAndCreatedAtAfter("HOME_ACCESS", lastWeek);
        Long testButtonClicksLastWeek = accessMetricsRepository.countByEventTypeAndCreatedAtAfter("TEST_BUTTON_CLICK", lastWeek);
        
        // Métricas do último mês
        LocalDateTime lastMonth = LocalDateTime.now().minusMonths(1);
        Long homeAccessesLastMonth = accessMetricsRepository.countByEventTypeAndCreatedAtAfter("HOME_ACCESS", lastMonth);
        Long testButtonClicksLastMonth = accessMetricsRepository.countByEventTypeAndCreatedAtAfter("TEST_BUTTON_CLICK", lastMonth);
        
        // Montando o resultado
        metrics.put("total", Map.of(
            "homeAccesses", totalHomeAccesses,
            "testButtonClicks", totalTestButtonClicks,
            "uniqueHomeAccesses", uniqueHomeAccesses
        ));
        
        metrics.put("last24Hours", Map.of(
            "homeAccesses", homeAccessesLast24h,
            "testButtonClicks", testButtonClicksLast24h,
            "uniqueHomeAccesses", uniqueHomeAccessesLast24h
        ));
        
        metrics.put("lastWeek", Map.of(
            "homeAccesses", homeAccessesLastWeek,
            "testButtonClicks", testButtonClicksLastWeek
        ));
        
        metrics.put("lastMonth", Map.of(
            "homeAccesses", homeAccessesLastMonth,
            "testButtonClicks", testButtonClicksLastMonth
        ));
        
        // Taxa de conversão (cliques no botão / acessos à home)
        double conversionRate = totalHomeAccesses > 0 ? 
            (double) totalTestButtonClicks / totalHomeAccesses * 100 : 0;
        metrics.put("conversionRate", Math.round(conversionRate * 100.0) / 100.0);
        
        return metrics;
    }

    public Long getTotalHomeAccesses() {
        return accessMetricsRepository.countByEventType("HOME_ACCESS");
    }

    public Long getTotalTestButtonClicks() {
        return accessMetricsRepository.countByEventType("TEST_BUTTON_CLICK");
    }

    public Long getHomeAccessesInPeriod(LocalDateTime startDate) {
        return accessMetricsRepository.countByEventTypeAndCreatedAtAfter("HOME_ACCESS", startDate);
    }

    public Long getTestButtonClicksInPeriod(LocalDateTime startDate) {
        return accessMetricsRepository.countByEventTypeAndCreatedAtAfter("TEST_BUTTON_CLICK", startDate);
    }
}