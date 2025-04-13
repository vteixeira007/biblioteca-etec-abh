package com.univesp.bibliotecaetecapi.controller;

import com.univesp.bibliotecaetecapi.dto.BookRequest;
import com.univesp.bibliotecaetecapi.dto.BookResponse;
import com.univesp.bibliotecaetecapi.model.Book;
import com.univesp.bibliotecaetecapi.service.BookService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@Slf4j
@RequestMapping({"/livro"})
@SecurityRequirement(name = "bearerAuth")
public class BookController {
    @Autowired
    public BookService bookService;

    public BookController() {
    }

    @GetMapping
    public ResponseEntity<List<BookResponse>> getAllBooks() {
        return ResponseEntity.ok(this.bookService.getAllBooks());
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<BookResponse> getBookById(@PathVariable("id") Long idBook) {
        BookResponse book = this.bookService.getBookById(idBook);
        return ResponseEntity.ok().body(book);
    }

    @GetMapping({"/titulo"})
    public ResponseEntity<BookResponse> getBookByTitle(@RequestParam("titulo") String titulo) {
        BookResponse book = this.bookService.findBookByTitulo(titulo);
        return ResponseEntity.ok().body(book);
    }

    @GetMapping({"/assunto"})
    public ResponseEntity<List<BookResponse>> getSubject(@RequestParam("assunto") String assunto) {
        List<BookResponse> book = this.bookService.findBookByAssunto(assunto);
        return ResponseEntity.ok().body(book);
    }

    @PostMapping
    public ResponseEntity<Book> insertBook(@RequestBody @Valid BookRequest book) {
        log.debug("BookRequest: {}", book);
        Book bookEntity = this.bookService.insertBook(book);
        log.debug("BookEntity: {}", bookEntity);
        return ResponseEntity.status(HttpStatus.CREATED).body(bookEntity);
    }

    @DeleteMapping({"/{id}"})
    public ResponseEntity<Void> deleteBook(@PathVariable("id") Long idBook) {
        this.bookService.deleteBook(idBook);
        return ResponseEntity.noContent().build();
    }

    @PutMapping({"/{id}"})
    public ResponseEntity<String> updateBook(@RequestBody Book book, @PathVariable("id") Long idBook) {
        book.setIdLivro(idBook);
        this.bookService.updateBook(book, idBook);
        String mensagem = "Categoria com o ID " + idBook + " foi atualizado com sucesso.";
        return ResponseEntity.ok(mensagem);
    }
}
