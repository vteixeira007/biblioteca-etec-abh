package com.univesp.bibliotecaetecapi.repository;


import com.univesp.bibliotecaetecapi.model.AlunoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AlunoRepository extends JpaRepository<AlunoEntity,Long> {
   Optional<AlunoEntity> findByCpf(String cpf);
}
