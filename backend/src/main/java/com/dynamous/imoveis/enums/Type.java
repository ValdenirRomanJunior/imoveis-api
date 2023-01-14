package com.dynamous.imoveis.enums;

public enum Type {

        Casa(1,"Casa"),
        Apartamento(2,"Apartamento"),
        Terreno(3,"Terreno"),
        Comercial(4,"Comercial");

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
