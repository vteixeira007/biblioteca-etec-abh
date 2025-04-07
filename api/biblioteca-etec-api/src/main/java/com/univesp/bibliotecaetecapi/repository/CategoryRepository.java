package com.univesp.bibliotecaetecapi.repository;


import com.univesp.bibliotecaetecapi.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category,Long> {
   Optional<Category> findByNome(String nome);}
