package com.dynamous.imoveis.enums;

import java.io.Serializable;

public enum Goal implements Serializable {


	Aluguel(1,"Aluguel"),
    Venda(2,"Venda");

    private int cod;
    private String description;


    Goal(int cod, String description) {
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

    public static Goal toEnum(Integer cod){

        if(cod == null){
            return null;
        }
        for(Goal x : Goal.values()){
            if(cod.equals(x.getCod())){
                return x;
            }
        }
            throw new IllegalArgumentException("invalid id"+ cod);

    }
}
