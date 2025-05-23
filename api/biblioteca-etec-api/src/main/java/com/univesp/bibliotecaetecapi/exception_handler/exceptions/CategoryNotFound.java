package com.univesp.bibliotecaetecapi.exception_handler.exceptions;

public class CategoryNotFound extends RuntimeException{
    public CategoryNotFound(){
        super("Category Not Found");
    }
}
