package com.univesp.bibliotecaetecapi.repository;


import com.univesp.bibliotecaetecapi.model.LoanEntity;
import com.univesp.bibliotecaetecapi.model.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LoanRepository extends JpaRepository<LoanEntity,Long> {

}
