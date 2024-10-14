package com.univesp.bibliotecaetecapi.model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@Table(name = "loan_entity")
@Entity
public class LoanEntity implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(
            strategy = GenerationType.AUTO
    )
    private Long idEmprestimo;
    @Column
    private LocalDate dataEmprestimo;
    @Column
    private LocalDate dataDevolucao;
    @ManyToOne
    private BookEntity bookEntity;
    @ManyToOne
    private StudentEntity studentEntity;

}
