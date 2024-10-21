package com.univesp.bibliotecaetecapi.exception_handler.exceptions;

public class BookNotFound extends RuntimeException{
    public BookNotFound(){
        super("Book Not Found");
    }
}
