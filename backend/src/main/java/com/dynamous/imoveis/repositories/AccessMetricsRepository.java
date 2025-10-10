package com.dynamous.imoveis.repositories;

import com.dynamous.imoveis.entities.AccessMetrics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AccessMetricsRepository extends JpaRepository<AccessMetrics, Long> {

    @Query("SELECT COUNT(a) FROM AccessMetrics a WHERE a.eventType = :eventType")
    Long countByEventType(@Param("eventType") String eventType);

    @Query("SELECT COUNT(a) FROM AccessMetrics a WHERE a.eventType = :eventType AND a.createdAt >= :startDate")
    Long countByEventTypeAndCreatedAtAfter(@Param("eventType") String eventType, @Param("startDate") LocalDateTime startDate);

    @Query("SELECT a FROM AccessMetrics a WHERE a.eventType = :eventType ORDER BY a.createdAt DESC")
    List<AccessMetrics> findByEventTypeOrderByCreatedAtDesc(@Param("eventType") String eventType);

    @Query("SELECT a FROM AccessMetrics a WHERE a.createdAt >= :startDate ORDER BY a.createdAt DESC")
    List<AccessMetrics> findByCreatedAtAfterOrderByCreatedAtDesc(@Param("startDate") LocalDateTime startDate);

    @Query("SELECT COUNT(DISTINCT a.sessionId) FROM AccessMetrics a WHERE a.eventType = 'HOME_ACCESS'")
    Long countUniqueHomeAccesses();

    @Query("SELECT COUNT(DISTINCT a.sessionId) FROM AccessMetrics a WHERE a.eventType = 'HOME_ACCESS' AND a.createdAt >= :startDate")
    Long countUniqueHomeAccessesAfter(@Param("startDate") LocalDateTime startDate);
}