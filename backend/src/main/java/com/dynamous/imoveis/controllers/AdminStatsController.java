package com.dynamous.imoveis.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dynamous.imoveis.dto.AdminStatsDTO;
import com.dynamous.imoveis.dto.UserStatsDTO;
import com.dynamous.imoveis.services.AdminStatsService;

@RestController
@RequestMapping(value = "/admin/stats")
public class AdminStatsController {
    
    @Autowired
    private AdminStatsService adminStatsService;
    
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
    
    @GetMapping("/users/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<UserStatsDTO> getUserDetailedStats(@PathVariable Long userId) {
        UserStatsDTO userStats = adminStatsService.getUserDetailedStats(userId);
        return ResponseEntity.ok().body(userStats);
    }
    
    @GetMapping("/login-metrics")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<?> getLoginMetrics() {
        // Implementar métricas de login futuramente
        return ResponseEntity.ok().body("{\"message\": \"Login metrics endpoint ready\"}");
    }
}