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
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private CategoryRepository categoryRepository;
    @Autowired
    private Mapper mapper;

    public BookService() {
    }

    public List<BookResponse> getAllBooks() {
        List<BookEntity> listBook = this.bookRepository.findAll();
        List<BookResponse> listBookResponse = listBook.stream().map((book) -> {
            return this.mapper.entityToDtoBook(book);
        }).toList();
        log.debug("Livrosss mapeadass: {}", listBook);
        return listBookResponse;
    }

    public BookResponse getBookById(Long idAluno) {
        Optional<BookEntity> bookEntityOptional = this.bookRepository.findById(idAluno);
        if (bookEntityOptional.isEmpty()) {
            throw new BookNotFound();
        } else {
            BookResponse bookResponse = this.mapper.entityToDtoBook((BookEntity)bookEntityOptional.get());
            return bookResponse;
        }
    }

    public BookResponse findBookByTitulo(String titulo) {
        Optional<BookEntity> bookEntityOptional = this.bookRepository.findByTitulo(titulo);
        if (bookEntityOptional.isEmpty()) {
            throw new BookNotFound();
        } else {
            BookResponse bookResponse = this.mapper.entityToDtoBook((BookEntity)bookEntityOptional.get());
            return bookResponse;
        }
    }

    public List<BookResponse> findBookByAssunto(String assunto) {
        List<BookEntity> listBook = this.bookRepository.findAllByAssunto(assunto);
        List<BookResponse> listBookResponse = listBook.stream().map((book) -> {
            return this.mapper.entityToDtoBook(book);
        }).toList();
        if (listBook.isEmpty()) {
            throw new BookNotFound();
        } else {
            return listBookResponse;
        }
    }

    public BookEntity insertBook(BookRequest request) {
        CategoryEntity categoryEntity = (CategoryEntity)this.categoryRepository.findById(request.getIdCategoria()).orElseThrow(() -> {
            return new EntityNotFoundException("Categoria não encontrada com ID: " + request.getIdCategoria());
        });
        Optional<BookEntity> bookEntityOptional = this.bookRepository.findByCodigo(request.getCodigo());
        request.setDataCriacao(LocalDateTime.now());
        request.setDataAtuallizacao(LocalDateTime.now());
        if (request.getQuantidade() < 1) {
            request.setStatus(Status.INDISPONIVEL);
        } else {
            request.setStatus(Status.DISPONIVEL);
        }

        BookEntity bookEntity = this.mapper.dtoToEntityBook(request);
        bookEntity.setCategoryEntity(categoryEntity);
        log.debug("BookEntity MAPEADO : {}", bookEntity);
        return (BookEntity)this.bookRepository.save(bookEntity);
    }

    public void deleteBook(Long idBook) {
        Optional<BookEntity> bookEntityOptional = this.bookRepository.findById(idBook);
        if (bookEntityOptional.isEmpty()) {
            throw new BookNotFound();
        } else {
            BookEntity book = (BookEntity)bookEntityOptional.get();
            this.bookRepository.delete(book);
        }
    }

    public void updateBook(BookEntity currentBook, Long idBook) {
        Optional<BookEntity> bookEntityOptional = this.bookRepository.findById(idBook);
        if (bookEntityOptional.isEmpty()) {
            throw new BookNotFound();
        } else {
            BookEntity bookInDb = (BookEntity)bookEntityOptional.get();
            bookInDb.setTitulo(currentBook.getTitulo());
            this.bookRepository.save(bookInDb);
        }
    }
}
