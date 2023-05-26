package com.dynamous.imoveis.enums;

import java.io.Serializable;

public enum Verification {

    VERIFICADO(1,"Verificado"),
    NAO_VERIFICADO(2,"Não Verificado");
    


    private int cod;
    private String description;

    private Verification(int cod, String description){
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

    public static Verification toEnum(Integer cod){

        if(cod==null){
            return null;
        }
        for(Verification x : Verification.values()){
            if(cod.equals(x.getCod())){
                return x;
            }
        }
        throw  new IllegalArgumentException("id inválido Verific: "+ cod);
    }
}
