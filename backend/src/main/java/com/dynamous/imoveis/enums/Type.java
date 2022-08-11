package com.dynamous.imoveis.enums;

public enum Type {

        HOUSE(1,"HOUSE"),
        APARTMENT(2,"APARTMENT"),
        LAND(3,"LAND"),
        COMERCIAL(4,"COMERCIAL");

        private int cod;
        private String description;

    Type(int cod, String description) {
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

    public static Type toEnum(Integer cod) {
        if (cod == null) {
            return null;
        }
        for (Type x : Type.values()) {
            if (cod.equals(x.getCod())) {
                return x;
            }
        }
            throw new IllegalArgumentException("id invalido" + cod);
        }

}
