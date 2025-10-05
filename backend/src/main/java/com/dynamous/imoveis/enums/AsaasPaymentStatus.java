package com.dynamous.imoveis.enums;

public enum AsaasPaymentStatus {
    PENDING("PENDING", "Aguardando pagamento"),
    RECEIVED("RECEIVED", "Recebida"),
    CONFIRMED("CONFIRMED", "Pagamento confirmado"),
    OVERDUE("OVERDUE", "Vencida"),
    REFUNDED("REFUNDED", "Estornada"),
    RECEIVED_IN_CASH("RECEIVED_IN_CASH", "Recebida em dinheiro (não gera saldo na conta)"),
    REFUND_REQUESTED("REFUND_REQUESTED", "Estorno solicitado"),
    REFUND_IN_PROGRESS("REFUND_IN_PROGRESS", "Estorno em processamento (liquidação já está sendo feita, cobrança será estornada após executar a liquidação)"),
    CHARGEBACK_REQUESTED("CHARGEBACK_REQUESTED", "Recebido chargeback"),
    CHARGEBACK_DISPUTE("CHARGEBACK_DISPUTE", "Em disputa de chargeback (cobrança foi contestada pelo cliente)"),
    AWAITING_CHARGEBACK_REVERSAL("AWAITING_CHARGEBACK_REVERSAL", "Disputa vencida, aguardando repasse da adquirente"),
    DUNNING_REQUESTED("DUNNING_REQUESTED", "Em processo de negativação"),
    DUNNING_RECEIVED("DUNNING_RECEIVED", "Recuperada"),
    AWAITING_RISK_ANALYSIS("AWAITING_RISK_ANALYSIS", "Pagamento em análise");
    
    private final String code;
    private final String description;
    
    AsaasPaymentStatus(String code, String description) {
        this.code = code;
        this.description = description;
    }
    
    public String getCode() {
        return code;
    }
    
    public String getDescription() {
        return description;
    }
    
    public static AsaasPaymentStatus fromCode(String code) {
        for (AsaasPaymentStatus status : AsaasPaymentStatus.values()) {
            if (status.getCode().equals(code)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Status de pagamento inválido: " + code);
    }
}