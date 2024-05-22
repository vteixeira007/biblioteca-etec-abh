package com.univesp.bibliotecaetecapi.exception_handler.exceptions;

public class StudentNotFound extends RuntimeException{
    public StudentNotFound(){
        super("Student Not Found");
    }
}
