package com.univesp.bibliotecaetecapi.controller;
import com.univesp.bibliotecaetecapi.dto.LoanRequest;
import com.univesp.bibliotecaetecapi.dto.LoanResponse;
import com.univesp.bibliotecaetecapi.model.Loan;
import com.univesp.bibliotecaetecapi.service.LoanService;
import java.net.URI;
import java.util.List;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping({"/loan"})
@SecurityRequirement(name = "bearerAuth")
public class LoanController {
    @Autowired
    LoanService loanService;

    public LoanController() {
    }

    @GetMapping
    public ResponseEntity<List<LoanResponse>> getAllResponses() {
        return ResponseEntity.ok(this.loanService.getAllLoans());
    }

    @PostMapping
    public ResponseEntity<Loan> insertLoan(@RequestBody LoanRequest loanRequest) {
        Loan loan =this.loanService.Loan(loanRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(loan);
    }
}
