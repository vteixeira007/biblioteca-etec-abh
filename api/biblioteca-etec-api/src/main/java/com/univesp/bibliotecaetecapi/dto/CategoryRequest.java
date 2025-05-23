package com.univesp.bibliotecaetecapi.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.br.CPF;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class CategoryRequest {

    @JsonIgnore
    private Long idCategoria;
    private @NotNull String nome;
    @JsonIgnore
    private LocalDateTime DataCriacao;
    @JsonIgnore
    private LocalDateTime DataAtuallizacao;
    @JsonIgnore
    List<BookRequest> bookRequests = new ArrayList();

}
