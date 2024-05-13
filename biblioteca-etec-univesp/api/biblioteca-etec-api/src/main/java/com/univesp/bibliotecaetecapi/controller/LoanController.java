package com.univesp.bibliotecaetecapi.controller;

import com.univesp.bibliotecaetecapi.dto.BookResponse;
import com.univesp.bibliotecaetecapi.dto.LoanRequest;
import com.univesp.bibliotecaetecapi.dto.LoanResponse;
import com.univesp.bibliotecaetecapi.dto.StudentRequest;
import com.univesp.bibliotecaetecapi.model.LoanEntity;
import com.univesp.bibliotecaetecapi.model.StudentEntity;
import com.univesp.bibliotecaetecapi.service.LoanService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/loan")
public class LoanController {
    @Autowired
    LoanService loanService;
    @GetMapping
    public ResponseEntity<List<LoanResponse>> getAllResponses() {
        return ResponseEntity.ok(loanService.getAllLoans());
    }

    @PostMapping
    public ResponseEntity<LoanEntity> insertLoan(@RequestBody LoanRequest loanRequest) {
        LoanEntity loanEntity = loanService.Loan(loanRequest);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(loanRequest.getIdEmprestimo()).toUri();

        return ResponseEntity.created(uri).build();
    }



}
