package com.univesp.bibliotecaetecapi.controller;

import com.univesp.bibliotecaetecapi.dto.BookRequest;
import com.univesp.bibliotecaetecapi.dto.BookResponse;
import com.univesp.bibliotecaetecapi.dto.CategoryRequest;
import com.univesp.bibliotecaetecapi.dto.CategoryResponse;
import com.univesp.bibliotecaetecapi.model.BookEntity;
import com.univesp.bibliotecaetecapi.model.CategoryEntity;
import com.univesp.bibliotecaetecapi.service.BookService;
import com.univesp.bibliotecaetecapi.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/livro")
public class BookController {

    @Autowired
    public BookService bookService;

    @GetMapping
    public ResponseEntity<List<BookResponse>> getAllBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookResponse> getStudentById(@PathVariable("id") Long idBook) {
        BookResponse book = bookService.getBookById(idBook);
        return ResponseEntity.ok().body(book);
    }

    @PostMapping
    public ResponseEntity<BookEntity> insertBook(@RequestBody @Valid BookRequest book) {
        BookEntity bookEntity = bookService.insertBook(book);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(book.getIdLivro()).toUri();

        return ResponseEntity.created(uri).body(bookEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable("id") Long idBook) {
        bookService.deleteBook(idBook);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateBook(@RequestBody BookEntity book, @PathVariable("id") Long idBook) {
        book.setIdLivro(idBook);
        bookService.updateBook(book, idBook);
        String mensagem = "Categoria com o ID " + idBook + " foi atualizado com sucesso.";
        return ResponseEntity.ok(mensagem);
    }

}
