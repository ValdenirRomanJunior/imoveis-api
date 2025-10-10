package com.dynamous.imoveis.enums;

public enum SubscriptionStatus {

    ACTIVE(1, "ACTIVE"),
    CANCELED(2, "CANCELED"),
    INCOMPLETE(3, "INCOMPLETE"),
    INCOMPLETE_EXPIRED(4, "INCOMPLETE_EXPIRED"),
    PAST_DUE(5, "PAST_DUE"),
    TRIALING(6, "TRIALING"),
    UNPAID(7, "UNPAID");

    private int cod;
    private String description;

    private SubscriptionStatus(int cod, String description) {
        this.cod = cod;
        this.description = description;
    }

    public int getCod() {
        return cod;
    }

    public void setCod(int cod) {
        this.cod = cod;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public static SubscriptionStatus toEnum(Integer cod) {
        if (cod == null) {
            return null;
        }
        for (SubscriptionStatus x : SubscriptionStatus.values()) {
            if (cod.equals(x.getCod())) {
                return x;
            }
        }
        throw new com.dynamous.imoveis.services.exceptions.IllegalArgumentException("id inválido status subscription: " + cod);
    }
}