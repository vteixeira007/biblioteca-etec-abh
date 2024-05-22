package com.univesp.bibliotecaetecapi.repository;


import com.univesp.bibliotecaetecapi.model.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<StudentEntity,Long> {
   Optional<StudentEntity> findByCpf(String cpf);
}
