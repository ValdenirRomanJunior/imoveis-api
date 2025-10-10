package com.dynamous.imoveis.repositories;

import com.dynamous.imoveis.entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query("SELECT n FROM Notification n WHERE n.isRead = false ORDER BY n.createdAt DESC")
    List<Notification> findUnreadNotificationsOrderByCreatedAtDesc();

    @Query("SELECT n FROM Notification n ORDER BY n.createdAt DESC")
    List<Notification> findAllOrderByCreatedAtDesc();

    @Query("SELECT COUNT(n) FROM Notification n WHERE n.isRead = false")
    Long countUnreadNotifications();

    @Query("SELECT n FROM Notification n WHERE n.type = :type ORDER BY n.createdAt DESC")
    List<Notification> findByTypeOrderByCreatedAtDesc(@Param("type") String type);

    @Query("SELECT n FROM Notification n WHERE n.createdAt >= :startDate ORDER BY n.createdAt DESC")
    List<Notification> findByCreatedAtAfterOrderByCreatedAtDesc(@Param("startDate") LocalDateTime startDate);

    @Query("SELECT n FROM Notification n WHERE n.type = :type AND n.createdAt >= :startDate ORDER BY n.createdAt DESC")
    List<Notification> findByTypeAndCreatedAtAfterOrderByCreatedAtDesc(@Param("type") String type, @Param("startDate") LocalDateTime startDate);
}