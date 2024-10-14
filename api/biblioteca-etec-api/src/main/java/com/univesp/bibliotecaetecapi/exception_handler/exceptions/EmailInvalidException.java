package com.univesp.bibliotecaetecapi.exception_handler.exceptions;

public class EmailInvalidException extends RuntimeException{
    public EmailInvalidException(){
        super("Email is invalid");
    }
}
