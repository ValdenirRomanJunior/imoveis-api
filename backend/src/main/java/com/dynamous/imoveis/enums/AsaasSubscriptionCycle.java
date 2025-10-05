package com.dynamous.imoveis.enums;

public enum AsaasSubscriptionCycle {
    WEEKLY("WEEKLY", "Semanal"),
    BIWEEKLY("BIWEEKLY", "Quinzenal"),
    MONTHLY("MONTHLY", "Mensal"),
    BIMONTHLY("BIMONTHLY", "Bimestral"),
    QUARTERLY("QUARTERLY", "Trimestral"),
    SEMIANNUALLY("SEMIANNUALLY", "Semestral"),
    YEARLY("YEARLY", "Anual");
    
    private final String code;
    private final String description;
    
    AsaasSubscriptionCycle(String code, String description) {
        this.code = code;
        this.description = description;
    }
    
    public String getCode() {
        return code;
    }
    
    public String getDescription() {
        return description;
    }
    
    public static AsaasSubscriptionCycle fromCode(String code) {
        for (AsaasSubscriptionCycle cycle : AsaasSubscriptionCycle.values()) {
            if (cycle.getCode().equals(code)) {
                return cycle;
            }
        }
        throw new IllegalArgumentException("Ciclo de assinatura inválido: " + code);
    }
}