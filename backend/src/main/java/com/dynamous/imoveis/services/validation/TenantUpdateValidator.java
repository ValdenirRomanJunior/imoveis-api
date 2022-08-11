package com.dynamous.imoveis.services.validation;

import com.dynamous.imoveis.controllers.exceptions.FieldMessage;
import com.dynamous.imoveis.dto.TenantDTO;

import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.repositories.TenantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerMapping;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class TenantUpdateValidator implements ConstraintValidator<TenantUpdate, TenantDTO> {

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private TenantRepository tenantRepository;
    @Override
    public void initialize(TenantUpdate ann) {
    }
    @Override
    public boolean isValid(TenantDTO tenantDTO, ConstraintValidatorContext context) {

        Map<String, String> map = (Map<String,String>) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        Long uriId= Long.parseLong(map.get("id"));


        List<FieldMessage> list = new ArrayList<>();

        Tenant aux =tenantRepository.findByEmail(tenantDTO.getEmail());

        if(aux != null && !aux.getId().equals(uriId)){
            list.add(new FieldMessage("email", "Email já existente"));
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
