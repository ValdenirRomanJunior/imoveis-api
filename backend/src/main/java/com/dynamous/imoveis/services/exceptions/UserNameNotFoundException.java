package com.dynamous.imoveis.services.exceptions;

public class UserNameNotFoundException extends RuntimeException{
    private static final long serialVersionUID = 1L;

    public UserNameNotFoundException(String msg){
        super(msg);
    }

    public UserNameNotFoundException(String msg, Throwable cause){
        super(msg, cause);
    }

}


