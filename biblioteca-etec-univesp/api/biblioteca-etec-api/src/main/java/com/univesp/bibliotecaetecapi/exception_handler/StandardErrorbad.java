package com.univesp.bibliotecaetecapi.exception_handler;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class StandardErrorbad {
    private Instant timestamp;
    private Integer status;
    private String error;
    private String message;
}
