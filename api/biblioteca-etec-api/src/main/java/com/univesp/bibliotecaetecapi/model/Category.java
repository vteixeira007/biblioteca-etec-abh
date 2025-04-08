package com.univesp.bibliotecaetecapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "category_entity")
@Data
public class Category implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(
            strategy = GenerationType.AUTO
    )
    private Long idCategoria;
    @Column
    private String nome;
    @Column
    private LocalDateTime DataCriacao;
    @Column
    private LocalDateTime dataAtualizacao;
    @PrimaryKeyJoinColumn
    @OneToMany(
            mappedBy = "category",
            cascade = {CascadeType.PERSIST}
    )
    @JsonIgnore
    List<Book> bookEntities = new ArrayList();

}
