package com.dynamous.imoveis.services.exceptions;

public class FileMaxSizeException extends RuntimeException{
    private static final long serialVersionUID = 1L;

    public FileMaxSizeException(String msg){
        super(msg);
    }
    public FileMaxSizeException(String msg, Throwable cause){
        super(msg,cause);
    }
}
