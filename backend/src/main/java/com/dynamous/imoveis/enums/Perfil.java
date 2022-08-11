package com.dynamous.imoveis.enums;

public enum Perfil {

    ADMIN(1,"ROLE_ADMIN"),
    TENANT(2,"ROLE_TENANT"),
    TENANT_CUSTOMER(3,"ROLE_CUSTOMER_TENANT");

    private int cod;
    private String description;

    private Perfil(int cod, String description){
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

    public static Perfil toEnum(Integer cod){

        if(cod==null){
            return null;
        }
        for(Perfil x :Perfil.values()){
            if(cod.equals(x.getCod())){
                return x;
            }
        }
        throw  new IllegalArgumentException("id inválido: "+ cod);
    }
}
