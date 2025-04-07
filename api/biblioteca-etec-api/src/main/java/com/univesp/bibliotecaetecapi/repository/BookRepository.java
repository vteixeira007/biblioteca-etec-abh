package com.univesp.bibliotecaetecapi.repository;


import com.univesp.bibliotecaetecapi.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book,Long> {
   Optional<Book> findByTitulo(String titulo);

   Optional<Book> findByCodigo(String codigo);

   List<Book> findAllByAssunto(String assunto);

   List<Optional<Book>> findByAutor(String autor);
}
