package com.dynamous.imoveis.services;

import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.entities.TenantCustomer;
import com.dynamous.imoveis.entities.UserAdmin;
import com.dynamous.imoveis.enums.Perfil;
import com.dynamous.imoveis.repositories.TenantCustomerRepository;
import com.dynamous.imoveis.repositories.TenantRepository;
import com.dynamous.imoveis.repositories.UserAdminRepository;
import com.dynamous.imoveis.security.UserSS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private TenantRepository tenantRepository;

    @Autowired
    private TenantCustomerRepository tenantCustomerRepository;

    @Autowired
    private UserAdminRepository userAdminRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        TenantCustomer tenantCustomer = tenantCustomerRepository.findByemail(email);
        Tenant tenant = tenantRepository.findByEmail(email);
        UserAdmin userAdmin = userAdminRepository.findByEmail(email);


        if (tenant == null && tenantCustomer == null && userAdmin == null) {
            throw new UsernameNotFoundException(email);

            //exception security context
        } else if (tenant != null && tenant.getPerfis().contains(Perfil.TENANT)) {
            return new UserSS(tenant.getId(), tenant.getEmail(), tenant.getPassword(), tenant.getPerfis());


        } else if (tenantCustomer != null && tenantCustomer.getPerfis().contains(Perfil.TENANT_CUSTOMER)) {
            return new UserSS(tenantCustomer.getId(), tenantCustomer.getEmail(), tenantCustomer.getPassword(), tenantCustomer.getPerfis());

        } else {
            return new UserSS(userAdmin.getId(), userAdmin.getEmail(), userAdmin.getPassword(), userAdmin.getPerfis());

        }

    }
}




