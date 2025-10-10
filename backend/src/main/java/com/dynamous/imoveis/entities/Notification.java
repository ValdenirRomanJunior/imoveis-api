package com.dynamous.imoveis.entities;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notification implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type", nullable = false)
    private String type; // "NEW_USER", "NEW_PROPERTY", etc.

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "message", nullable = false)
    private String message;

    @Column(name = "is_read", nullable = false)
    private Boolean isRead = false;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "read_at")
    private LocalDateTime readAt;

    // Referência ao usuário que gerou a notificação (opcional)
    @Column(name = "reference_user_id")
    private Long referenceUserId;

    @Column(name = "reference_user_name")
    private String referenceUserName;

    @Column(name = "reference_user_email")
    private String referenceUserEmail;

    public Notification() {
        this.createdAt = LocalDateTime.now();
    }

    public Notification(String type, String title, String message) {
        this();
        this.type = type;
        this.title = title;
        this.message = message;
    }

    public Notification(String type, String title, String message, Long referenceUserId, String referenceUserName, String referenceUserEmail) {
        this(type, title, message);
        this.referenceUserId = referenceUserId;
        this.referenceUserName = referenceUserName;
        this.referenceUserEmail = referenceUserEmail;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Boolean getIsRead() {
        return isRead;
    }

    public void setIsRead(Boolean isRead) {
        this.isRead = isRead;
        if (isRead && this.readAt == null) {
            this.readAt = LocalDateTime.now();
        }
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getReadAt() {
        return readAt;
    }

    public void setReadAt(LocalDateTime readAt) {
        this.readAt = readAt;
    }

    public Long getReferenceUserId() {
        return referenceUserId;
    }

    public void setReferenceUserId(Long referenceUserId) {
        this.referenceUserId = referenceUserId;
    }

    public String getReferenceUserName() {
        return referenceUserName;
    }

    public void setReferenceUserName(String referenceUserName) {
        this.referenceUserName = referenceUserName;
    }

    public String getReferenceUserEmail() {
        return referenceUserEmail;
    }

    public void setReferenceUserEmail(String referenceUserEmail) {
        this.referenceUserEmail = referenceUserEmail;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Notification that = (Notification) o;
        return id != null ? id.equals(that.id) : that.id == null;
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "Notification{" +
                "id=" + id +
                ", type='" + type + '\'' +
                ", title='" + title + '\'' +
                ", isRead=" + isRead +
                ", createdAt=" + createdAt +
                '}';
    }
}