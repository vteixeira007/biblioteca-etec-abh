package com.univesp.bibliotecaetecapi.repository;


import com.univesp.bibliotecaetecapi.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student,Long> {
   Optional<Student> findByCpf(String cpf);
}
