package com.dynamous.imoveis.services.validation;

import com.dynamous.imoveis.controllers.exceptions.FieldMessage;
import com.dynamous.imoveis.dto.StepNewDTO;
import com.dynamous.imoveis.dto.TenantNewDTO;
import com.dynamous.imoveis.entities.Account;
import com.dynamous.imoveis.entities.Step;
import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.repositories.StepRepository;
import com.dynamous.imoveis.repositories.TenantRepository;
import com.dynamous.imoveis.security.UserSS;
import com.dynamous.imoveis.services.AccountService;
import com.dynamous.imoveis.services.TenantService;
import com.dynamous.imoveis.services.UserService;
import com.dynamous.imoveis.services.exceptions.AuthorizationException;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class StepInsertValidator implements ConstraintValidator<StepInsert, StepNewDTO> {

    @Autowired
    private StepRepository stepRepository;
    
    @Autowired
    private TenantService tenantService;
    
    @Autowired
    private AccountService accountService;

    @Override
    public void initialize(StepInsert ann) {
    }
    @Override
    public boolean isValid(StepNewDTO step, ConstraintValidatorContext context) {
        List<FieldMessage> list = new ArrayList<>();

   	 UserSS user = UserService.authenticated();
   	  if(user.getId() ==null){
             throw new AuthorizationException("Acesso negado");
         }
        Tenant tenant= tenantService.find(user.getId());
        Account account= accountService.find(tenant.getAccount().getId());
        Step aux =stepRepository.findByNameAndAccount(step.getName(),account);

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
