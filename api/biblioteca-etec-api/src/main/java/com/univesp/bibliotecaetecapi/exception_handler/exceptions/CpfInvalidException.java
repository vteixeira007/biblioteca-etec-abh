package com.univesp.bibliotecaetecapi.exception_handler.exceptions;

public class CpfInvalidException extends RuntimeException{
    public CpfInvalidException(){
        super("Cpf is invalid");
    }
}
