package com.dynamous.imoveis.services;

import com.dynamous.imoveis.security.UserSS;
import org.springframework.security.core.context.SecurityContextHolder;



public class UserService {

    public static UserSS authenticated() {
        try {
            return (UserSS) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        }
        catch (Exception e) {
        	System.out.println(e.getMessage() +"usuario nao autorizado");
            return null;
        }
    }
}