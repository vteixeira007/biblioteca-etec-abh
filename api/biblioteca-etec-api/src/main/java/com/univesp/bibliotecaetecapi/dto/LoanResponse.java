package com.univesp.bibliotecaetecapi.dto;

import lombok.Data;

import java.time.LocalDate;
@Data
public class LoanResponse {

    private Long idEmprestimo;
    private LocalDate dataEmprestimo;
    private LocalDate dataDevolucao;
    private String nomeAluno;
    private String matricula;
    private String nomeLivro;
    private String codigoLivro;
}
