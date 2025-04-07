package com.univesp.bibliotecaetecapi.repository;


import com.univesp.bibliotecaetecapi.model.Loan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoanRepository extends JpaRepository<Loan,Long> {

}
