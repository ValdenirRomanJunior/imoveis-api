package com.dynamous.imoveis.enums;

import java.io.Serializable;

public enum StatusProperty {

    PUBLICADO(1,"PUBLICADO"),
    NAO_PUBLICADO(2,"NÃO PUBLICADO");
    


    private int cod;
    private String description;

    private StatusProperty(int cod, String description){
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

    public static StatusProperty toEnum(Integer cod){

        if(cod==null){
            return null;
        }
        for(StatusProperty x : StatusProperty.values()){
            if(cod.equals(x.getCod())){
                return x;
            }
        }
        throw  new com.dynamous.imoveis.services.exceptions.IllegalArgumentException("id inválido: "+ cod);
    }
}
