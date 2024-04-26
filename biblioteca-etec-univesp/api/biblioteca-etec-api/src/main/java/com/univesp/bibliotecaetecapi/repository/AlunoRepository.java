package com.univesp.bibliotecaetecapi.repository;


import com.univesp.bibliotecaetecapi.model.AlunoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlunoRepository extends JpaRepository<AlunoEntity,Long> {

}
