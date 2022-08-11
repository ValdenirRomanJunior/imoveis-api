package com.dynamous.imoveis.enums;

import java.io.Serializable;

public enum Status implements Serializable {

    ACTIVE(1,"ACTIVE"),
    DISABLED(2,"DISABLED"),
    PENDING(3,"PENDING");


    private int cod;
    private String description;

    private Status(int cod, String description){
        this.cod=cod;
        this.description=description;
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

    public static Status toEnum(Integer cod){

        if(cod==null){
            return null;
        }
        for(Status x : Status.values()){
            if(cod.equals(x.getCod())){
                return x;
            }
        }
        throw  new IllegalArgumentException("id inválido: "+ cod);
    }
}
