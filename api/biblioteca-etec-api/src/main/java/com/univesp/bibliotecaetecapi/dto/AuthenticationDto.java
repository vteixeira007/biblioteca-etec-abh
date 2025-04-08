package com.univesp.bibliotecaetecapi.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class AuthenticationDto {
    private String login;
    private String password;
}
