package com.univesp.bibliotecaetecapi.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AlunoResposta {

    private Long idAluno;
    private String nome;
    private Integer matricula;
    private Integer cpf;
    private Integer email;
    private Integer telefone;
    private Integer curso;
    private Integer turma;
    private LocalDateTime DataCriacao;
    private LocalDateTime DataAtuallizacao;
}
