package com.univesp.bibliotecaetecapi.service;


import com.univesp.bibliotecaetecapi.dto.*;
import com.univesp.bibliotecaetecapi.enums.Status;
import com.univesp.bibliotecaetecapi.exception_handler.exceptions.CpfAlreadyExistsException;
import com.univesp.bibliotecaetecapi.exception_handler.exceptions.StudentNotFound;
import com.univesp.bibliotecaetecapi.mapper.Mapper;
import com.univesp.bibliotecaetecapi.model.BookEntity;
import com.univesp.bibliotecaetecapi.model.LoanEntity;
import com.univesp.bibliotecaetecapi.model.StudentEntity;
import com.univesp.bibliotecaetecapi.repository.BookRepository;
import com.univesp.bibliotecaetecapi.repository.LoanRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
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

    public LoanEntity Loan(LoanRequest loanRequest) {
        loanRequest.setDataEmprestimo(LocalDate.now());
        loanRequest.setDataDevolucao(LocalDate.now().plusDays(7L));
        loanRequest.setStatus(Status.EMPRESTADO);
        LoanEntity loanEntity = this.mapper.dtoToEntityLoan(loanRequest);
        Optional<BookEntity> bookEntityOptional = this.bookRepository.findById(loanRequest.getIdLivro());
        bookEntityOptional.ifPresent((bookEntity) -> {
            if (bookEntity.getQuantidade() <= 0) {
                throw new RuntimeException("NÃO PODE PEGAR EMPRESTADO: Não há cópias disponíveis.");
            } else {
                bookEntity.setStatus(Status.EMPRESTADO);
                this.bookRepository.save(bookEntity);
            }
        });
        return (LoanEntity)this.loanRepository.save(loanEntity);
    }

    public List<LoanResponse> getAllLoans() {
        List<LoanEntity> loanEntities = this.loanRepository.findAll();
        List<LoanResponse> listLoanResponses = loanEntities.stream().map((loan) -> {
            return this.mapper.entityToDtoLoan(loan);
        }).toList();
        return listLoanResponses;
    }
}
