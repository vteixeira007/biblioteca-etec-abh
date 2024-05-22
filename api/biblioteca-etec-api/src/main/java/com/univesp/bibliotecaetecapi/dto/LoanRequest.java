package com.univesp.bibliotecaetecapi.dto;

import com.univesp.bibliotecaetecapi.enums.Status;
import com.univesp.bibliotecaetecapi.model.BookEntity;
import com.univesp.bibliotecaetecapi.model.StudentEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
public class LoanRequest {

    private Long idEmprestimo;

    private LocalDate dataEmprestimo;

    private LocalDate dataDevolucao;

    private Status status;

    private Long idLivro;

    private Long idAluno;



}
