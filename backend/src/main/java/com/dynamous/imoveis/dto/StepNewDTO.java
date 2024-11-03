package com.dynamous.imoveis.dto;

import com.dynamous.imoveis.entities.Lead;
import com.dynamous.imoveis.entities.Step;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.enums.Status;
import com.dynamous.imoveis.services.validation.StepInsert;
import com.dynamous.imoveis.services.validation.TenantUpdate;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.util.Date;

@StepInsert
public class StepNewDTO implements Serializable {
    private static final long serialVersionUID = 1L;


    private Long id;
    @NotEmpty(message = "Preenchimento obrigatório")
    @Length(min=1, max=15, message = "O tamanho deve ter entre 1 e 15 caracteres")
    private String name;
    

    public StepNewDTO(){

    }

    public StepNewDTO(Step step){
    	id=step.getId();
        name= step.getName();
 
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}