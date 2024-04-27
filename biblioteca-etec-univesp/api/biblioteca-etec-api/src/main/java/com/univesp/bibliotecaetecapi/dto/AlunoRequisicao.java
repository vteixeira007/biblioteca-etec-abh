package com.univesp.bibliotecaetecapi.dto;

import jakarta.persistence.Column;
import lombok.Data;

import java.time.LocalDateTime;
@Data
public class AlunoRequisicao {

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
