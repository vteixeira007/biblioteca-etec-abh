package com.univesp.bibliotecaetecapi.exception_handler.exceptions;

import lombok.Getter;

@Getter
public class ValidationBadRequest extends RuntimeException {



	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	private String campo;

    public ValidationBadRequest(String campo, String message) {
        super(message);
        this.campo = campo;
    }

	
    
 
}
