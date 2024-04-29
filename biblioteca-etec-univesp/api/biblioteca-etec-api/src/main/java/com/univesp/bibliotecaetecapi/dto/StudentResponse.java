package com.univesp.bibliotecaetecapi.dto;

import lombok.Data;
import org.hibernate.validator.constraints.br.CPF;

import java.time.LocalDateTime;

@Data
public class StudentResponse {

    private Long idAluno;
    private String nome;
    private Integer matricula;
    private String cpf;
    private String email;
    private String telefone;
    private String curso;
    private String turma;
    private LocalDateTime DataCriacao;
    private LocalDateTime DataAtuallizacao;
}
