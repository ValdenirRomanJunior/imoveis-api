package com.dynamous.imoveis.enums;

import java.io.Serializable;

public enum StatusFeatured {

    DESTACADO(1,"DESCATADO"),
    NAO_DESTACADO(2,"NÃO DESTACADO");
    


    private int cod;
    private String description;

    private StatusFeatured(int cod, String description){
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

    public static StatusFeatured toEnum(Integer cod){

        if(cod==null){
            return null;
        }
        for(StatusFeatured x : StatusFeatured.values()){
            if(cod.equals(x.getCod())){
                return x;
            }
        }
        throw  new com.dynamous.imoveis.services.exceptions.IllegalArgumentException("id inválido status: "+ cod);
    }
}
