package com.univesp.bibliotecaetecapi.exception_handler.exceptions;

public class CpfAlreadyExistsException extends RuntimeException{
    public CpfAlreadyExistsException(){
        super("This cpf already exist");
    }
}
