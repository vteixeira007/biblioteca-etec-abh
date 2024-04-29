package com.univesp.bibliotecaetecapi.model;

import com.univesp.bibliotecaetecapi.enums.Status;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "book_entity")
@Data
public class BookEntity implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idLivro;
    @Column
    private String titulo;
    @Column
    private String autor;
    @Column
    private String descricao;
    @Column
    private String codigo;
    @Column
    private Integer quantidade;
    @Column
    @Enumerated(EnumType.STRING)
    private Status status;
    @Column
    private LocalDateTime DataCriacao;
    @Column
    private LocalDateTime DataAtuallizacao;

}
