package com.univesp.bibliotecaetecapi.dto;

import com.univesp.bibliotecaetecapi.enums.Status;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BookResponse {

    private Long idLivro;
    private String titulo;
    private String autor;
    private String descricao;
    private String codigo;
    private Integer quantidade;
    private Status status;
    private LocalDateTime DataCriacao;
    private LocalDateTime DataAtuallizacao;
}
