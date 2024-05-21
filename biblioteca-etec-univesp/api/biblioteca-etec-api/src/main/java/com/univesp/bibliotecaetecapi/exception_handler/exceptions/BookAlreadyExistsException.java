package com.univesp.bibliotecaetecapi.exception_handler.exceptions;

public class BookAlreadyExistsException extends RuntimeException{
    public BookAlreadyExistsException(){
        super("This book already exist");
    }
}
