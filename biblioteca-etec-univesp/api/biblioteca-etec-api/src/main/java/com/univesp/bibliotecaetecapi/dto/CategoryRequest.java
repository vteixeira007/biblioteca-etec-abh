package com.univesp.bibliotecaetecapi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.br.CPF;

import java.time.LocalDateTime;

@Data
public class CategoryRequest {

    private Long idCategoria;
    @NotNull
    private String nome;
    private LocalDateTime DataCriacao;
    private LocalDateTime DataAtuallizacao;
}
