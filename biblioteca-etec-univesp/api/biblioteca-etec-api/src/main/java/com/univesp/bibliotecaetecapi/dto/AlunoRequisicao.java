package com.univesp.bibliotecaetecapi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.hibernate.validator.constraints.br.CPF;

import java.time.LocalDateTime;

@Data
public class AlunoRequisicao {

    private Long idAluno;
    @NotNull
    private String nome;
    @NotNull
    private Integer matricula;
    @NotNull
    @NotBlank
    @CPF(message = "CPF inválido ")
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
}
