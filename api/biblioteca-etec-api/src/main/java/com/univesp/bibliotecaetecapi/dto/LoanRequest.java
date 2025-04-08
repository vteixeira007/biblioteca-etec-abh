package com.univesp.bibliotecaetecapi.dto;

import com.univesp.bibliotecaetecapi.enums.Status;
import lombok.Data;

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
