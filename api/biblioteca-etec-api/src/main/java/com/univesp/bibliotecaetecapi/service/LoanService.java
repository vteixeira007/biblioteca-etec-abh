package com.univesp.bibliotecaetecapi.service;


import com.univesp.bibliotecaetecapi.dto.*;
import com.univesp.bibliotecaetecapi.enums.Status;
import com.univesp.bibliotecaetecapi.mapper.Mapper;
import com.univesp.bibliotecaetecapi.model.Book;
import com.univesp.bibliotecaetecapi.model.Loan;
import com.univesp.bibliotecaetecapi.repository.BookRepository;
import com.univesp.bibliotecaetecapi.repository.LoanRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@Transactional
public class LoanService {
    @Autowired
    private LoanRepository loanRepository;
    @Autowired
    private Mapper mapper;
    @Autowired
    private StudentService studentService;
    @Autowired
    private BookService bookService;
    @Autowired
    private BookRepository bookRepository;

    public LoanService() {
    }

    public Loan Loan(LoanRequest loanRequest) {
        loanRequest.setDataEmprestimo(LocalDate.now());
        loanRequest.setDataDevolucao(LocalDate.now().plusDays(7L));
        loanRequest.setStatus(Status.EMPRESTADO);
        Loan loan = this.mapper.dtoToEntityLoan(loanRequest);
        Optional<Book> bookEntityOptional = this.bookRepository.findById(loanRequest.getIdLivro());
        bookEntityOptional.ifPresent((bookEntity) -> {
            if (bookEntity.getQuantidade() <= 0) {
                throw new RuntimeException("NÃO PODE PEGAR EMPRESTADO: Não há cópias disponíveis.");
            } else {
                bookEntity.setStatus(Status.EMPRESTADO);
                this.bookRepository.save(bookEntity);
            }
        });
        return (Loan)this.loanRepository.save(loan);
    }

    public List<LoanResponse> getAllLoans() {
        List<Loan> loanEntities = this.loanRepository.findAll();
        List<LoanResponse> listLoanResponses = loanEntities.stream().map((loan) -> {
            return this.mapper.entityToDtoLoan(loan);
        }).toList();
        return listLoanResponses;
    }
}
