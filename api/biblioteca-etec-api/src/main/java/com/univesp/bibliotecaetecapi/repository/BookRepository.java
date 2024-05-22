package com.univesp.bibliotecaetecapi.repository;


import com.univesp.bibliotecaetecapi.model.BookEntity;
import com.univesp.bibliotecaetecapi.model.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<BookEntity,Long> {
   Optional<BookEntity> findByTitulo(String titulo);
   Optional<BookEntity> findByCodigo(String codigo);

   List<Optional<BookEntity>> findByAutor(String autor);
}
