package com.univesp.bibliotecaetecapi.service;


import com.univesp.bibliotecaetecapi.dto.BookRequest;
import com.univesp.bibliotecaetecapi.dto.BookResponse;
import com.univesp.bibliotecaetecapi.dto.CategoryRequest;
import com.univesp.bibliotecaetecapi.dto.CategoryResponse;
import com.univesp.bibliotecaetecapi.enums.Status;
import com.univesp.bibliotecaetecapi.exception_handler.exceptions.BookAlreadyExistsException;
import com.univesp.bibliotecaetecapi.exception_handler.exceptions.BookNotFound;
import com.univesp.bibliotecaetecapi.exception_handler.exceptions.CategoryAlreadyExistsException;
import com.univesp.bibliotecaetecapi.exception_handler.exceptions.CategoryNotFound;
import com.univesp.bibliotecaetecapi.mapper.Mapper;
import com.univesp.bibliotecaetecapi.model.BookEntity;
import com.univesp.bibliotecaetecapi.model.CategoryEntity;
import com.univesp.bibliotecaetecapi.repository.BookRepository;
import com.univesp.bibliotecaetecapi.repository.CategoryRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@Transactional
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private Mapper mapper;

    public List<BookResponse> getAllBooks() {
        List<BookEntity> listBook =bookRepository.findAll();
        List<BookResponse> listBookResponse = listBook.stream()
                .map(book -> mapper.entityToDtoBook(book)).toList();

        return listBookResponse;
    }


    public BookEntity insertBook(BookRequest request) {
        Optional<BookEntity> bookEntityOptional = bookRepository.findByCodigo(request.getCodigo());
        if (bookEntityOptional.isPresent()) {
            throw new BookAlreadyExistsException();
        } else {
            request.setDataCriacao(LocalDateTime.now());
            request.setDataCriacao(LocalDateTime.now());
            if(request.getQuantidade() < 1) {
                request.setStatus(Status.INDISPONIVEL);
            } else {
                request.setStatus(Status.DISPONIVEL);
            }
            BookEntity bookEntity = mapper.dtoToEntityBook(request);
            return bookRepository.save(bookEntity);
        }
    }


    public BookResponse getBookById(Long idAluno) {
        Optional<BookEntity> bookEntityOptional = bookRepository.findById(idAluno);
        if (bookEntityOptional.isEmpty()) {
            throw new BookNotFound();
        }
        BookResponse bookResponse = mapper.entityToDtoBook(bookEntityOptional.get());
        return bookResponse;
    }

    public void deleteBook(Long idBook) {
        Optional<BookEntity> bookEntityOptional = bookRepository.findById(idBook);
        if (bookEntityOptional.isEmpty()) {
            throw new BookNotFound();
        }
        BookEntity book = bookEntityOptional.get();
        bookRepository.delete(book);

    }

    public void updateBook(BookEntity currentBook, Long idBook) {
        Optional<BookEntity> bookEntityOptional = bookRepository.findById(idBook);
        if (bookEntityOptional.isEmpty()) {
            throw new BookNotFound();
        }
        BookEntity bookInDb = bookEntityOptional.get();
        bookInDb.setTitulo(currentBook.getTitulo());
        bookRepository.save(bookInDb);
    }
}
