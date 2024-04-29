package com.univesp.bibliotecaetecapi.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CategoryResponse {

    private Long idCategoria;
    private String nome;
    private LocalDateTime DataCriacao;
    private LocalDateTime DataAtuallizacao;
}
