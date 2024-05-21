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

    // MÉTODO EMPRESTAR LIVRO
    public LoanEntity Loan(LoanRequest loanRequest) {
        loanRequest.setDataEmprestimo(LocalDate.now());
        loanRequest.setDataDevolucao(LocalDate.now().plusDays(7) );
        loanRequest.setStatus(Status.EMPRESTADO);
        LoanEntity loanEntity = mapper.dtoToEntityLoan(loanRequest);
        Optional<BookEntity> bookEntityOptional = bookRepository.findById(loanRequest.getIdLivro());
        bookEntityOptional.ifPresent(bookEntity -> {
            if (bookEntity.getQuantidade() <= 0) {
                throw new RuntimeException("NÃO PODE PEGAR EMPRESTADO: Não há cópias disponíveis.");
            }
            bookEntity.setStatus(Status.EMPRESTADO);
            bookRepository.save(bookEntity);
        });

        return loanRepository.save(loanEntity);

    }
    public List<LoanResponse> getAllLoans() {
        List<LoanEntity> loanEntities  =loanRepository.findAll();
        List<LoanResponse> listLoanResponses = loanEntities.stream()
                .map(loan -> mapper.entityToDtoLoan(loan)).toList();

        return listLoanResponses;
    }


}
