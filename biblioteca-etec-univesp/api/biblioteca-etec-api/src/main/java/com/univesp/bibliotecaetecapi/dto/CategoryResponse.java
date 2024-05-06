package com.univesp.bibliotecaetecapi.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class CategoryResponse {

    private Long idCategoria;
    private String nome;
    private LocalDateTime DataCriacao;
    private LocalDateTime DataAtuallizacao;
    List<BookResponse> bookResponses = new ArrayList<>();
}
