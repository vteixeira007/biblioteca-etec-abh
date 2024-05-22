package com.univesp.bibliotecaetecapi.exception_handler;

import com.univesp.bibliotecaetecapi.exception_handler.exceptions.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;

@RestControllerAdvice
@Slf4j
public class ExceptionHandler {
    @org.springframework.web.bind.annotation.ExceptionHandler(StudentNotFound.class)
    public ResponseEntity<StandardError> resourceNotFound(StudentNotFound studentNotFound) {
        HttpStatus httpStatus = HttpStatus.NOT_FOUND;
        StandardError standardError = new StandardError(Instant.now(), httpStatus.value(), studentNotFound.getMessage());
        log.error("Exception resourceNotFoundException message {}", studentNotFound.getMessage());
        return ResponseEntity.status(httpStatus).body(standardError);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(CpfAlreadyExistsException.class)
    public ResponseEntity<StandardError> CpfAlreadyExistsException(CpfAlreadyExistsException cpfAlreadyExistsException) {
        HttpStatus httpStatus = HttpStatus.CONFLICT;
        StandardError standardError = new StandardError(Instant.now(), httpStatus.value(), cpfAlreadyExistsException.getMessage());
        log.error("Exception CpfAlreadyExistsException message {}", cpfAlreadyExistsException.getMessage());
        return ResponseEntity.status(httpStatus).body(standardError);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(CpfInvalidException.class)
    public ResponseEntity<StandardError> CpfInvalid(CpfInvalidException cpfInvalid) {
        HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
        StandardError standardError = new StandardError(Instant.now(), httpStatus.value(), cpfInvalid.getMessage());
        log.error("Exception CpfInvalidException message {}", cpfInvalid.getMessage());
        return ResponseEntity.status(httpStatus).body(standardError);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(EmailInvalidException.class)
    public ResponseEntity<StandardError> EmailInvalid(EmailInvalidException emailInvalid) {
        HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
        StandardError standardError = new StandardError(Instant.now(), httpStatus.value(), emailInvalid.getMessage());
        log.error("Exception EmailInvalidException message {}", emailInvalid.getMessage());
        return ResponseEntity.status(httpStatus).body(standardError);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(CategoryNotFound.class)
    public ResponseEntity<StandardError> resourceNotFoundCategory(CategoryNotFound categoryNotFound) {
        HttpStatus httpStatus = HttpStatus.NOT_FOUND;
        StandardError standardError = new StandardError(Instant.now(), httpStatus.value(), categoryNotFound.getMessage());
        log.error("Exception resourceNotFoundException message {}", categoryNotFound.getMessage());
        return ResponseEntity.status(httpStatus).body(standardError);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(CategoryAlreadyExistsException.class)
    public ResponseEntity<StandardError> categoryAlreadyExistsException(CategoryAlreadyExistsException catetoryAlreadyExistsException) {
        HttpStatus httpStatus = HttpStatus.CONFLICT;
        StandardError standardError = new StandardError(Instant.now(), httpStatus.value(), catetoryAlreadyExistsException.getMessage());
        log.error("Exception CategoryAlreadyExistsException message {}", catetoryAlreadyExistsException.getMessage());
        return ResponseEntity.status(httpStatus).body(standardError);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(BookNotFound.class)
    public ResponseEntity<StandardError> resourceNotFoundBook(BookNotFound bookNotFound) {
        HttpStatus httpStatus = HttpStatus.NOT_FOUND;
        StandardError standardError = new StandardError(Instant.now(), httpStatus.value(), bookNotFound.getMessage());
        log.error("Exception resourceNotFoundException message {}", bookNotFound.getMessage());
        return ResponseEntity.status(httpStatus).body(standardError);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(BookAlreadyExistsException.class)
    public ResponseEntity<StandardError> bookAlreadyExistsException(BookAlreadyExistsException bookAlreadyExistsException) {
        HttpStatus httpStatus = HttpStatus.CONFLICT;
        StandardError standardError = new StandardError(Instant.now(), httpStatus.value(), bookAlreadyExistsException.getMessage());
        log.error("Exception BookAlreadyExistsException message {}", bookAlreadyExistsException.getMessage());
        return ResponseEntity.status(httpStatus).body(standardError);
    }




    @org.springframework.web.bind.annotation.ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity FixError400(MethodArgumentNotValidException e) {
        var err = e.getFieldErrors();
        return ResponseEntity.badRequest().body(err.stream().map(DataErrorValidation::new).toList());
    }


    private record DataErrorValidation(String campo, String mensagem) {
        public DataErrorValidation(FieldError err) {
            this(err.getField(), err.getDefaultMessage());
        }
    }
    @org.springframework.web.bind.annotation.ExceptionHandler(ValidationBadRequest.class)
    public ResponseEntity<StandardError> resourceWithWrongData(ValidationBadRequest e) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        StandardError err = new StandardError(Instant.now(), status.value(),e.getMessage());
        return ResponseEntity.status(status).body(err);

    }


}

