package com.univesp.bibliotecaetecapi.dto;

import com.univesp.bibliotecaetecapi.enums.UserRole;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class RegisterDto {
    private String login;
    private String password;
    private UserRole userRole;
}
