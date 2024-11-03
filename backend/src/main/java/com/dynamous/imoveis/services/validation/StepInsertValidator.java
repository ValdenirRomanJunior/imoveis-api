package com.dynamous.imoveis.services.validation;

import com.dynamous.imoveis.controllers.exceptions.FieldMessage;
import com.dynamous.imoveis.dto.StepNewDTO;
import com.dynamous.imoveis.dto.TenantNewDTO;
import com.dynamous.imoveis.entities.Step;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.repositories.StepRepository;
import com.dynamous.imoveis.repositories.TenantRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class StepInsertValidator implements ConstraintValidator<StepInsert, StepNewDTO> {

    @Autowired
    private StepRepository stepRepository;

    @Override
    public void initialize(StepInsert ann) {
    }
    @Override
    public boolean isValid(StepNewDTO step, ConstraintValidatorContext context) {
        List<FieldMessage> list = new ArrayList<>();

        Step aux =stepRepository.findByName(step.getName());

        if(aux != null ){
            list.add(new FieldMessage("name", "Etapa já existente"));
        }
        // inclua os testes aqui, inserindo erros na lista

        for (FieldMessage e : list) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(e.getMessage())
                    .addPropertyNode(e.getFieldName()).addConstraintViolation();
        }
        return list.isEmpty();
    }
}
