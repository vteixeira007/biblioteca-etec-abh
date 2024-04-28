package com.univesp.bibliotecaetecapi.model;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "aluno_entity")
@Data
public class AlunoEntity implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idAluno;
    @Column
    private String nome;
    @Column
    private Integer matricula;
    @Column
    private String cpf;
    @Column
    private String email;
    @Column
    private String telefone;
    @Column
    private String curso;
    @Column
    private String turma;
    @Column
    private LocalDateTime DataCriacao;
    @Column
    private LocalDateTime DataAtuallizacao;

}
