package com.dynamous.imoveis.enums;

import java.io.Serializable;

public enum TypeProperty  implements Serializable {

        Casa(1,"Casa"),
        Apartamento(2,"Apartamento"),
        Terreno(3,"Terreno"),
        CasaComercial(4,"Casa Comercial"),
		CasaDeCondominio(5,"Casa de Condomínio"),
		Flat(6,"Flat"),
		Chacara(7,"Chácara"),
		Sitio(8,"Sítio"),
		Fazenda(9,"Fazenda"),
		GalpaoBarracao(10,"Galpão/Barracão"),
		Pousada(11,"Pousada"),
		Studio(12,"Studio"),
		SalaComercial(13,"Sala Comercial"),
		Sobrado(14,"Sobrado"),
		Lancamento(15,"Lançamento");
				
				
        private int cod;
        private String description;

    TypeProperty(int cod, String description) {
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

    public static TypeProperty toEnum(Integer cod) {
        if (cod == null) {
            return null;
        }
        for (TypeProperty x : TypeProperty.values()) {
            if (cod.equals(x.getCod())) {
                return x;
            }
        }
            throw new com.dynamous.imoveis.services.exceptions.IllegalArgumentException("Tipo invalido"+ cod);
        }

}
