package com.univesp.bibliotecaetecapi.dto;

import com.univesp.bibliotecaetecapi.enums.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class BookRequest {

    private Long idLivro;
    private String titulo;
    private String autor;
    private String assunto;
    private String descricao;
    private String codigo;
    private Integer quantidade;
    private Status status;
    private LocalDateTime DataCriacao;
    private LocalDateTime DataAtuallizacao;
    private Long idCategoria;
    private String nome;
}
