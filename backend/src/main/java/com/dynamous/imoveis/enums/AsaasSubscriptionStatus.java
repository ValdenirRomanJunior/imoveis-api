package com.dynamous.imoveis.enums;

public enum AsaasSubscriptionStatus {
    ACTIVE("ACTIVE", "Ativa"),
    INACTIVE("INACTIVE", "Inativa"),
    EXPIRED("EXPIRED", "Expirada"),
    OVERDUE("OVERDUE", "Em atraso");
    
    private final String code;
    private final String description;
    
    AsaasSubscriptionStatus(String code, String description) {
        this.code = code;
        this.description = description;
    }
    
    public String getCode() {
        return code;
    }
    
    public String getDescription() {
        return description;
    }
    
    public static AsaasSubscriptionStatus fromCode(String code) {
        for (AsaasSubscriptionStatus status : AsaasSubscriptionStatus.values()) {
            if (status.getCode().equals(code)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Status de assinatura inválido: " + code);
    }
}