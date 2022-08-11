package com.dynamous.imoveis.security;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

    private JWTUtil jwtUtil;
    private  UserDetailsService userDetailsService;

    public JWTAuthorizationFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil, UserDetailsService userDetailsService) {
        super(authenticationManager);
        this.jwtUtil=jwtUtil;
        this.userDetailsService=userDetailsService;
    }

    //intercept a requisição e vê se o usuario está autorizado

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

        //pegar o token Bearer
        String header =request.getHeader("Authorization");
        //libera o usuario que esta tentando acessar o endpoint
        if (header != null && header.startsWith("Bearer ")){
            UsernamePasswordAuthenticationToken auth= getAuthentication(header.substring(7));
            if( auth != null){
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }
        chain.doFilter(request,response);
    }

    private UsernamePasswordAuthenticationToken getAuthentication( String token) {
        //testa se token é valido
        if(jwtUtil.tokenValido(token)){
            //pega username dentro do token
            String email = jwtUtil.getUsername(token);
            //busca no banco usuario
            UserDetails user = userDetailsService.loadUserByUsername(email);
            return new UsernamePasswordAuthenticationToken(user,null,user.getAuthorities());

        }
        return null;
    }
}
