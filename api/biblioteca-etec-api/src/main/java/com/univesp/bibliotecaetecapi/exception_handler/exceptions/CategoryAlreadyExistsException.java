package com.univesp.bibliotecaetecapi.exception_handler.exceptions;

public class CategoryAlreadyExistsException extends RuntimeException{
    public CategoryAlreadyExistsException(){
        super("This category already exist");
    }
}
