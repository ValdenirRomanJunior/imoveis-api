package com.dynamous.imoveis.services.validation;

import com.dynamous.imoveis.controllers.exceptions.FieldMessage;
import com.dynamous.imoveis.dto.StepUpdateDTO;
import com.dynamous.imoveis.dto.TenantDTO;
import com.dynamous.imoveis.dto.TenantUpdateDTO;
import com.dynamous.imoveis.entities.Step;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.repositories.StepRepository;
import com.dynamous.imoveis.repositories.TenantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerMapping;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class StepUpdateValidator implements ConstraintValidator<StepUpdate, StepUpdateDTO> {

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private StepRepository stepRepository;
    @Override
    public void initialize(StepUpdate ann) {
    }
    @Override
    public boolean isValid(StepUpdateDTO stepUpdateDTO, ConstraintValidatorContext context) {

        Map<String, String> map = (Map<String,String>) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        Long uriId= Long.parseLong(map.get("id"));


        List<FieldMessage> list = new ArrayList<>();

        Step aux =stepRepository.findByName(stepUpdateDTO.getName());

        if(aux != null && !aux.getId().equals(uriId)){
            list.add(new FieldMessage("name", "etapa já existente"));
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
