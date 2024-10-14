package com.univesp.bibliotecaetecapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.univesp.bibliotecaetecapi.enums.Status;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "book_entity")
@Data
public class BookEntity implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(
            strategy = GenerationType.AUTO
    )
    private Long idLivro;
    @Column
    private String titulo;
    @Column
    private String autor;
    @Column
    private String assunto;
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
    @ManyToOne
    private CategoryEntity categoryEntity;
    @ManyToOne
    private StudentEntity studentEntity;
    @PrimaryKeyJoinColumn
    @OneToMany(
            mappedBy = "bookEntity",
            cascade = {CascadeType.ALL})
    @JsonIgnore
    List<LoanEntity> loan = new ArrayList<>();

}
