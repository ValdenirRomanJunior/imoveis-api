package com.dynamous.imoveis.security;

import com.dynamous.imoveis.entities.Tenant;
import com.dynamous.imoveis.entities.UserAdmin;
import com.dynamous.imoveis.enums.Perfil;
import com.dynamous.imoveis.enums.Verification;
import com.dynamous.imoveis.repositories.TenantRepository;
import com.dynamous.imoveis.repositories.UserAdminRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

public class UserSS implements UserDetails {
	private static final long serialVersionUID= 1L;

	 @Autowired
	 private TenantRepository tenantRepository;
	 
	 @Autowired
	 private UserAdminRepository userAdminRepository;

    private Long id;
    private String email;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;
    private Verification verification;

    public UserSS(){

    }

    public UserSS(Long id, String email, String password, Set<Perfil> perfis, Verification verification) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.authorities = perfis.stream().map(x -> new SimpleGrantedAuthority(x.getDescription())).collect(Collectors.toList());
        this.verification= verification;
    }

    public Long getId(){
        return id;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    
    public Verification getVerification() {    	
		return verification;
	}

	public void setVerification(Verification verification) {
		
		//logica para buscar os useradmin com
		
		UserAdmin userAdmin = userAdminRepository.findByEmail(email);
		if(userAdmin == null) {
			throw new UsernameNotFoundException(email);
			
		}
		
		if(userAdmin !=null) {
			this.verification = (verification == null) ? null : userAdmin.getVerification(); 
		}
	Tenant tenant = tenantRepository.findByEmail(email);
		if(tenant == null) {
		throw new UsernameNotFoundException(email);
	}
		if(tenant !=null) {
			this.verification = (verification == null) ? null : tenant.getVerification(); 
		}
		
	}

	@Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public boolean hasRole(Perfil perfil){
        return getAuthorities().contains(new SimpleGrantedAuthority(perfil.getDescription()));
    }
}
