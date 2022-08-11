package com.dynamous.imoveis.services;

import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.entities.TenantCustomer;
import com.dynamous.imoveis.repositories.TenantCustomerRepository;
import com.dynamous.imoveis.repositories.TenantRepository;
import com.dynamous.imoveis.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TenantCustomerService {

    @Autowired
    private TenantCustomerRepository tenantCustomerRepository;

    public TenantCustomer find(Long id) {
        Optional<TenantCustomer> property = tenantCustomerRepository.findById(id);
        return property.orElseThrow(() -> new ObjectNotFoundException(
                "Object Not Found! Id:" + ", Type" + TenantCustomer.class.getName()));


    }
}
