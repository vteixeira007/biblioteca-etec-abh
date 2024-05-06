package com.univesp.bibliotecaetecapi.dto;

import com.univesp.bibliotecaetecapi.enums.Status;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    private Long idCategoria;
    List<LoanResponse> loan = new ArrayList<>();

}
