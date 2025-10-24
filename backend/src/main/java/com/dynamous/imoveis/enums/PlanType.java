package com.dynamous.imoveis.enums;

public enum PlanType {
    FREE(0, "Free", "Plano gratuito sem funcionalidades", 0.0, 0, false),
    TESTE(1, "Teste", "Plano de teste gratuito por 7 dias", 0.0, 7, true),
    LITE(2, "Lite", "Plano completo com funcionalidades essenciais", 99.00, 30, false),
    PRO(3, "Pro", "Plano completo com todas as funcionalidades", 239.00, 30, false);

    private int code;
    private String name;
    private String description;
    private Double price;
    private Integer durationDays;
    private Boolean isTrial;

    private PlanType(int code, String name, String description, Double price, Integer durationDays, Boolean isTrial) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.price = price;
        this.durationDays = durationDays;
        this.isTrial = isTrial;
    }

    public int getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Double getPrice() {
        return price;
    }

    public Integer getDurationDays() {
        return durationDays;
    }

    public Boolean getIsTrial() {
        return isTrial;
    }

    public static PlanType toEnum(Integer code) {
        if (code == null) {
            return null;
        }

        for (PlanType x : PlanType.values()) {
            if (code.equals(x.getCode())) {
                return x;
            }
        }

        throw new IllegalArgumentException("Invalid code: " + code);
    }
}