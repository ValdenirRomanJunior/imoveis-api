package com.dynamous.imoveis.enums;

import java.io.Serializable;

public enum Status {

    ATIVO(1,"ACTIVE"),
    DESATIVADO(2,"DISABLED");
    


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
        throw  new com.dynamous.imoveis.services.exceptions.IllegalArgumentException("id inválido status Tenant: "+ cod);
    }
}
