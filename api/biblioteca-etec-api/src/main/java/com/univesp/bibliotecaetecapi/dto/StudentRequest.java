package com.univesp.bibliotecaetecapi.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    private Long idAluno;
    @NotNull
    @Size(max = 100, min = 2)
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
    @JsonIgnore
    private LocalDateTime DataCriacao;
    @JsonIgnore
    private LocalDateTime DataAtuallizacao;
    @JsonIgnore
    List<LoanRequest> loan = new ArrayList<>();

}
