package com.dynamous.imoveis.services.validation;

import com.dynamous.imoveis.controllers.exceptions.FieldMessage;

import com.dynamous.imoveis.dto.TenantNewDTO;
import com.dynamous.imoveis.dto.UserTenantNewDTO;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.repositories.TenantRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UserTenantInsertValidator implements ConstraintValidator<UserTenantInsert, UserTenantNewDTO> {

    @Autowired
    private TenantRepository tenantRepository;

    @Override
    public void initialize(UserTenantInsert ann) {
    }
    @Override
    public boolean isValid(UserTenantNewDTO objDto, ConstraintValidatorContext context) {
        List<FieldMessage> list = new ArrayList<>();

        Tenant aux =tenantRepository.findByEmail(objDto.getEmail());

        if(aux != null ){
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
