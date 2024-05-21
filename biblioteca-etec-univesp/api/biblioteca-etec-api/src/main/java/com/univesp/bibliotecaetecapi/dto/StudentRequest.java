package com.univesp.bibliotecaetecapi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.validator.constraints.br.CPF;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class StudentRequest {

    private Long idAluno;
    @NotNull
    @Size(max = 10, min = 2)
    private String nome;
    @NotNull
    private Integer matricula;
    @NotNull
    @NotBlank
    private String cpf;
    @NotNull
    @NotBlank
    private String email;
    @NotNull
    @NotBlank
    private String telefone;
    @NotNull
    @NotBlank
    private String curso;
    @NotNull
    @NotBlank
    private String turma;

    private LocalDateTime DataCriacao;
    private LocalDateTime DataAtuallizacao;
    List<LoanRequest> loan = new ArrayList<>();

}
