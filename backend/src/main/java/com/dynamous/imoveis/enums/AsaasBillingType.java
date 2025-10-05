package com.dynamous.imoveis.enums;

public enum AsaasBillingType {
    BOLETO("BOLETO", "Boleto Bancário"),
    CREDIT_CARD("CREDIT_CARD", "Cartão de Crédito"),
    PIX("PIX", "PIX"),
    DEBIT_CARD("DEBIT_CARD", "Cartão de Débito"),
    TRANSFER("TRANSFER", "Transferência Bancária"),
    DEPOSIT("DEPOSIT", "Depósito Bancário");
    
    private final String code;
    private final String description;
    
    AsaasBillingType(String code, String description) {
        this.code = code;
        this.description = description;
    }
    
    public String getCode() {
        return code;
    }
    
    public String getDescription() {
        return description;
    }
    
    public static AsaasBillingType fromCode(String code) {
        for (AsaasBillingType type : AsaasBillingType.values()) {
            if (type.getCode().equals(code)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Tipo de cobrança inválido: " + code);
    }
}