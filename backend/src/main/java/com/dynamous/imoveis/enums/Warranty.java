package com.dynamous.imoveis.enums;

import java.io.Serializable;





public enum Warranty implements Serializable {

	
	DEPOSITOSEGURANCA(1,"DEPÓSITO DE SEGURANÇA"),
    FIADOR(2,"FIADOR"),
    GARANTIADESEGURO(3,"GARANTIA DE SEGURO"),
    CARTADEGARANTIA(4,"CARTA DE GARANTIA"),
    TITULOSDECAPITALIZACAO(5,"TÍTULOS DE CAPITALIZAÇÃO");

    private int cod;
    private String description;


    Warranty(int cod, String description) {
        this.cod = cod;
        this.description = description;
    }

    public int getCod() {
        return cod;
    }
    
    public void setCod(int cod) {
    	this.cod=cod;
    }
 
    public String getDescription() {
        return description;
    }



    public static Warranty toEnum(Integer cod){

        if(cod == null){
            return null;
        }
        for(Warranty x : Warranty.values()){
            if(cod.equals(x.getCod())){
                return x;
            }
        }
            throw new com.dynamous.imoveis.services.exceptions.IllegalArgumentException("Codigo invalido goal"+ cod);

    }
}
