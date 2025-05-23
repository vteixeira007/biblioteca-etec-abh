package com.univesp.bibliotecaetecapi.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.univesp.bibliotecaetecapi.enums.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class BookRequest {

    @JsonIgnore
    private Long idLivro;
    private String titulo;
    private String autor;
    private String assunto;
    private String descricao;
    private String codigo;
    private Integer quantidade;
    private Status status;
    @JsonIgnore
    private LocalDateTime DataCriacao;
    @JsonIgnore
    private LocalDateTime DataAtuallizacao;
    private Long idCategoria;
    private String nome;
}
