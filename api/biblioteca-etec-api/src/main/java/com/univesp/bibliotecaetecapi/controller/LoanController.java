package com.univesp.bibliotecaetecapi.controller;
import com.univesp.bibliotecaetecapi.dto.LoanRequest;
import com.univesp.bibliotecaetecapi.dto.LoanResponse;
import com.univesp.bibliotecaetecapi.model.LoanEntity;
import com.univesp.bibliotecaetecapi.service.LoanService;
import java.net.URI;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping({"/loan"})
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
    public ResponseEntity<LoanEntity> insertLoan(@RequestBody LoanRequest loanRequest) {
        this.loanService.Loan(loanRequest);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(new Object[]{loanRequest.getIdEmprestimo()}).toUri();
        return ResponseEntity.created(uri).build();
    }
}
