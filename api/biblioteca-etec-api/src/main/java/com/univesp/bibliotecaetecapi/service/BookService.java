package com.univesp.bibliotecaetecapi.service;


import com.univesp.bibliotecaetecapi.dto.BookRequest;
import com.univesp.bibliotecaetecapi.dto.BookResponse;
import com.univesp.bibliotecaetecapi.enums.Status;
import com.univesp.bibliotecaetecapi.exception_handler.exceptions.BookNotFound;
import com.univesp.bibliotecaetecapi.exception_handler.exceptions.CategoryNotFound;
import com.univesp.bibliotecaetecapi.mapper.Mapper;
import com.univesp.bibliotecaetecapi.model.Book;
import com.univesp.bibliotecaetecapi.model.Category;
import com.univesp.bibliotecaetecapi.repository.BookRepository;
import com.univesp.bibliotecaetecapi.repository.CategoryRepository;
import jakarta.persistence.EntityNotFoundException;
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
    private CategoryRepository categoryRepository;
    @Autowired
    private Mapper mapper;

    public BookService() {
    }

    public List<BookResponse> getAllBooks() {
        List<Book> listBook = this.bookRepository.findAll();
        List<BookResponse> listBookResponse = listBook.stream().map((book) -> {
            return this.mapper.entityToDtoBook(book);
        }).toList();
        log.debug("Livrosss mapeadass: {}", listBook);
        return listBookResponse;
    }

    public BookResponse getBookById(Long idAluno) {
        Optional<Book> bookEntityOptional = this.bookRepository.findById(idAluno);
        if (bookEntityOptional.isEmpty()) {
            throw new BookNotFound();
        } else {
            BookResponse bookResponse = this.mapper.entityToDtoBook((Book)bookEntityOptional.get());
            return bookResponse;
        }
    }

    public BookResponse findBookByTitulo(String titulo) {
        Optional<Book> bookEntityOptional = this.bookRepository.findByTitulo(titulo);
        if (bookEntityOptional.isEmpty()) {
            throw new BookNotFound();
        } else {
            BookResponse bookResponse = this.mapper.entityToDtoBook((Book)bookEntityOptional.get());
            return bookResponse;
        }
    }

    public List<BookResponse> findBookByAssunto(String assunto) {
        List<Book> listBook = this.bookRepository.findAllByAssunto(assunto);
        List<BookResponse> listBookResponse = listBook.stream().map((book) -> {
            return this.mapper.entityToDtoBook(book);
        }).toList();
        if (listBook.isEmpty()) {
            throw new BookNotFound();
        } else {
            return listBookResponse;
        }
    }

    public Book insertBook(BookRequest request) {
        Category category = categoryRepository.findById(request.getIdCategoria())
                .orElseThrow(() -> new CategoryNotFound());

        Optional<Book> bookEntityOptional = this.bookRepository.findByCodigo(request.getCodigo());
        request.setDataCriacao(LocalDateTime.now());
        request.setDataAtuallizacao(LocalDateTime.now());
        if (request.getQuantidade() < 1) {
            request.setStatus(Status.INDISPONIVEL);
        } else {
            request.setStatus(Status.DISPONIVEL);
        }

        Book book = this.mapper.dtoToEntityBook(request);
        book.setCategory(category);
        log.debug("BookEntity MAPEADO : {}", book);
        return (Book)this.bookRepository.save(book);
    }

    public void deleteBook(Long idBook) {
        Optional<Book> bookEntityOptional = this.bookRepository.findById(idBook);
        if (bookEntityOptional.isEmpty()) {
            throw new BookNotFound();
        } else {
            Book book = (Book)bookEntityOptional.get();
            this.bookRepository.delete(book);
        }
    }

    public void updateBook(Book currentBook, Long idBook) {
        Optional<Book> bookEntityOptional = this.bookRepository.findById(idBook);
        if (bookEntityOptional.isEmpty()) {
            throw new BookNotFound();
        } else {
            Book bookInDb = (Book)bookEntityOptional.get();
            bookInDb.setTitulo(currentBook.getTitulo());
            this.bookRepository.save(bookInDb);
        }
    }
}
