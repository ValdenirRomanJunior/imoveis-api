package com.dynamous.imoveis.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dynamous.imoveis.dto.AdminStatsDTO;
import com.dynamous.imoveis.dto.UserStatsDTO;
import com.dynamous.imoveis.entities.AccessMetrics;
import com.dynamous.imoveis.entities.Notification;
import com.dynamous.imoveis.services.AdminStatsService;
import com.dynamous.imoveis.services.AccessMetricsService;
import com.dynamous.imoveis.services.NotificationService;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/admin/stats")
public class AdminStatsController {
    
    @Autowired
    private AdminStatsService adminStatsService;
    
    @Autowired
    private AccessMetricsService accessMetricsService;
    
    @Autowired
    private NotificationService notificationService;
    
    @GetMapping("/overview")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<AdminStatsDTO> getSystemOverview() {
        AdminStatsDTO stats = adminStatsService.getSystemOverview();
        return ResponseEntity.ok().body(stats);
    }
    
    @GetMapping("/users")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Page<UserStatsDTO>> getUsersStats(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "linesPerPage", defaultValue = "24") Integer linesPerPage,
            @RequestParam(value = "orderBy", defaultValue = "slug") String orderBy,
            @RequestParam(value = "direction", defaultValue = "ASC") String direction) {
        
        Page<UserStatsDTO> users = adminStatsService.getUsersStats(page, linesPerPage, orderBy, direction);
        return ResponseEntity.ok().body(users);
    }
    
    @GetMapping("/users/recent")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Page<UserStatsDTO>> getRecentUsersStats(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "linesPerPage", defaultValue = "5") Integer linesPerPage) {
        
        Page<UserStatsDTO> recentUsers = adminStatsService.getRecentUsersStats(page, linesPerPage);
        return ResponseEntity.ok().body(recentUsers);
    }
    
    @GetMapping("/users/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<UserStatsDTO> getUserDetailedStats(@PathVariable Long userId) {
        UserStatsDTO userStats = adminStatsService.getUserDetailedStats(userId);
        return ResponseEntity.ok().body(userStats);
    }
    
    @GetMapping("/users/{userId}/details")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getUserFullDetails(@PathVariable Long userId) {
        Map<String, Object> userDetails = adminStatsService.getUserFullDetails(userId);
        return ResponseEntity.ok().body(userDetails);
    }
    
    @GetMapping("/login-metrics")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getLoginMetrics() {
        Map<String, Object> metrics = accessMetricsService.getAccessMetrics();
        return ResponseEntity.ok().body(metrics);
    }
    
    // Endpoints para métricas de acesso
    @PostMapping("/track-access")
    public ResponseEntity<Void> trackAccess(@RequestBody Map<String, String> trackingData, HttpServletRequest request) {
        String eventType = trackingData.get("eventType");
        // Compatibilidade: aceitar 'page' como alias de eventType
        if (eventType == null || eventType.isBlank()) {
            String page = trackingData.get("page");
            if (page != null && !page.isBlank()) {
                eventType = page;
            } else {
                // Default sensato para evitar NULL no banco
                eventType = "HOME_ACCESS";
            }
        }
        String sessionId = trackingData.get("sessionId");
        String ipAddress = request.getRemoteAddr();
        String userAgent = request.getHeader("User-Agent");
        
        accessMetricsService.trackAccess(eventType, ipAddress, userAgent, sessionId);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/access-metrics")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getAccessMetrics() {
        Map<String, Object> metrics = accessMetricsService.getAccessMetrics();
        return ResponseEntity.ok().body(metrics);
    }
    
    // Endpoints para notificações
    @GetMapping("/notifications")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<List<Notification>> getNotifications(@RequestParam(value = "unreadOnly", defaultValue = "false") Boolean unreadOnly) {
        List<Notification> notifications = unreadOnly ? 
            notificationService.getUnreadNotifications() : 
            notificationService.getAllNotifications();
        return ResponseEntity.ok().body(notifications);
    }
    
    @GetMapping("/notifications/count")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Map<String, Long>> getNotificationCount() {
        Long unreadCount = notificationService.getUnreadNotificationCount();
        return ResponseEntity.ok().body(Map.of("unreadCount", unreadCount));
    }
    
    @PutMapping("/notifications/{notificationId}/read")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Void> markNotificationAsRead(@PathVariable Long notificationId) {
        notificationService.markAsRead(notificationId);
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/notifications/mark-all-read")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Void> markAllNotificationsAsRead() {
        notificationService.markAllAsRead();
        return ResponseEntity.ok().build();
    }
    
    // Endpoints para gerenciamento de planos de usuários
    @PostMapping("/users/{userId}/renew-plan")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> renewUserPlan(
            @PathVariable Long userId, 
            @RequestBody Map<String, Object> request) {
        try {
            String planType = (String) request.get("planType");
            Object durationObj = request.get("durationDays");
            Integer durationDays = null;
            
            if (durationObj instanceof Integer) {
                durationDays = (Integer) durationObj;
            } else if (durationObj instanceof String) {
                durationDays = Integer.parseInt((String) durationObj);
            } else if (durationObj instanceof Number) {
                durationDays = ((Number) durationObj).intValue();
            }
            
            if (durationDays == null) {
                Map<String, Object> errorResult = new HashMap<>();
                errorResult.put("success", false);
                errorResult.put("message", "Duração inválida");
                return ResponseEntity.badRequest().body(errorResult);
            }
            
            Map<String, Object> result = adminStatsService.renewUserPlan(userId, planType, durationDays);
            return ResponseEntity.ok().body(result);
        } catch (Exception e) {
            Map<String, Object> errorResult = new HashMap<>();
            errorResult.put("success", false);
            errorResult.put("message", "Erro ao processar solicitação: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResult);
        }
    }
    
    @PostMapping("/users/{userId}/change-plan")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> changeUserPlan(
            @PathVariable Long userId, 
            @RequestBody Map<String, Object> request) {
        try {
            String planType = (String) request.get("planType");
            Object durationObj = request.get("durationDays");
            Integer durationDays = null;
            
            if (durationObj instanceof Integer) {
                durationDays = (Integer) durationObj;
            } else if (durationObj instanceof String) {
                durationDays = Integer.parseInt((String) durationObj);
            } else if (durationObj instanceof Number) {
                durationDays = ((Number) durationObj).intValue();
            }
            
            if (durationDays == null) {
                Map<String, Object> errorResult = new HashMap<>();
                errorResult.put("success", false);
                errorResult.put("message", "Duração inválida");
                return ResponseEntity.badRequest().body(errorResult);
            }
            
            Map<String, Object> result = adminStatsService.changeUserPlan(userId, planType, durationDays);
            return ResponseEntity.ok().body(result);
        } catch (Exception e) {
            Map<String, Object> errorResult = new HashMap<>();
            errorResult.put("success", false);
            errorResult.put("message", "Erro ao processar solicitação: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResult);
        }
    }
    
    @PostMapping("/users/{userId}/extend-trial")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> extendUserTrial(
            @PathVariable Long userId, 
            @RequestBody Map<String, Object> request) {
        try {
            Object durationObj = request.get("durationDays");
            Integer durationDays = null;
            
            if (durationObj instanceof Integer) {
                durationDays = (Integer) durationObj;
            } else if (durationObj instanceof String) {
                durationDays = Integer.parseInt((String) durationObj);
            } else if (durationObj instanceof Number) {
                durationDays = ((Number) durationObj).intValue();
            }
            
            if (durationDays == null) {
                Map<String, Object> errorResult = new HashMap<>();
                errorResult.put("success", false);
                errorResult.put("message", "Duração inválida");
                return ResponseEntity.badRequest().body(errorResult);
            }
            
            Map<String, Object> result = adminStatsService.extendUserTrial(userId, durationDays);
            return ResponseEntity.ok().body(result);
        } catch (Exception e) {
            Map<String, Object> errorResult = new HashMap<>();
            errorResult.put("success", false);
            errorResult.put("message", "Erro ao processar solicitação: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResult);
        }
    }
    
    @DeleteMapping("/users/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> deleteUser(@PathVariable Long userId) {
        try {
            Map<String, Object> result = adminStatsService.deleteUser(userId);
            return ResponseEntity.ok().body(result);
        } catch (Exception e) {
            Map<String, Object> errorResult = new HashMap<>();
            errorResult.put("success", false);
            errorResult.put("message", "Erro ao excluir usuário: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResult);
        }
    }
}