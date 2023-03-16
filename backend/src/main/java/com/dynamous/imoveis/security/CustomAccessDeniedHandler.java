package com.dynamous.imoveis.security;

import java.io.IOException;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

public class CustomAccessDeniedHandler implements AccessDeniedHandler {

	@Override
	public void handle(HttpServletRequest request, HttpServletResponse res,
			AccessDeniedException accessDeniedException) throws IOException, ServletException {
		
	        res.setContentType("application/json;charset=UTF-8");
	        res.setStatus(403);
	        res.setContentType("application/json");    
	        res.getWriter().append(json());		
	}
	  private String json() {
	        long date = new Date().getTime();
	        return "{\"timestamp\": " + date + ", "
	                + "\"status\": 403, "
	                + "\"error\": \"Não autorizado\", "
	                + "\"message\": \"Não autorizado\", "
	                + "\"path\": \"/acesso negado\"}";
	    }


}
