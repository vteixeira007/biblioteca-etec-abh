package com.univesp.bibliotecaetecapi.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.univesp.bibliotecaetecapi.enums.Status;
import lombok.Data;

import java.time.LocalDate;
@Data
public class LoanRequest {
    @JsonIgnore
    private Long idEmprestimo;
    @JsonIgnore
    private LocalDate dataEmprestimo;
    @JsonIgnore
    private LocalDate dataDevolucao;
    @JsonIgnore
    private Status status;

    private Long idLivro;

    private Long idAluno;



}
