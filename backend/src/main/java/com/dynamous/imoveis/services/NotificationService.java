package com.dynamous.imoveis.services;

import com.dynamous.imoveis.entities.Notification;
import com.dynamous.imoveis.repositories.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public Notification createNotification(String type, String title, String message) {
        Notification notification = new Notification(type, title, message);
        return notificationRepository.save(notification);
    }

    public Notification createNotification(String type, String title, String message, 
                                         Long referenceUserId, String referenceUserName, String referenceUserEmail) {
        Notification notification = new Notification(type, title, message, referenceUserId, referenceUserName, referenceUserEmail);
        return notificationRepository.save(notification);
    }

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAllOrderByCreatedAtDesc();
    }

    public List<Notification> getUnreadNotifications() {
        return notificationRepository.findUnreadNotificationsOrderByCreatedAtDesc();
    }

    public Long getUnreadNotificationCount() {
        return notificationRepository.countUnreadNotifications();
    }

    public List<Notification> getNotificationsByType(String type) {
        return notificationRepository.findByTypeOrderByCreatedAtDesc(type);
    }

    public List<Notification> getRecentNotifications(LocalDateTime since) {
        return notificationRepository.findByCreatedAtAfterOrderByCreatedAtDesc(since);
    }

    public void markAsRead(Long notificationId) {
        Optional<Notification> notificationOpt = notificationRepository.findById(notificationId);
        if (notificationOpt.isPresent()) {
            Notification notification = notificationOpt.get();
            notification.setIsRead(true);
            notificationRepository.save(notification);
        }
    }

    public void markAllAsRead() {
        List<Notification> unreadNotifications = notificationRepository.findUnreadNotificationsOrderByCreatedAtDesc();
        for (Notification notification : unreadNotifications) {
            notification.setIsRead(true);
        }
        notificationRepository.saveAll(unreadNotifications);
    }

    public void deleteNotification(Long notificationId) {
        notificationRepository.deleteById(notificationId);
    }

    public void deleteOldNotifications(LocalDateTime before) {
        // Implementar lógica para deletar notificações antigas se necessário
        // Por exemplo, notificações mais antigas que 30 dias
    }

    // Método específico para criar notificação de novo usuário
    public Notification createNewUserNotification(Long userId, String userName, String userEmail) {
        String title = "Novo usuário cadastrado!";
        String message = String.format("O usuário %s (%s) acabou de se cadastrar na plataforma.", userName, userEmail);
        return createNotification("NEW_USER", title, message, userId, userName, userEmail);
    }
}