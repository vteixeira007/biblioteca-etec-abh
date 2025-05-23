package com.univesp.bibliotecaetecapi.controller;


import com.univesp.bibliotecaetecapi.dto.AuthenticationDto;
import com.univesp.bibliotecaetecapi.dto.LoginResponseDto;
import com.univesp.bibliotecaetecapi.dto.RegisterDto;
import com.univesp.bibliotecaetecapi.model.User;
import com.univesp.bibliotecaetecapi.repository.UserRepository;
import com.univesp.bibliotecaetecapi.service.TokenService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
@SecurityRequirement(name = "bearerAuth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDto authDto){
        var userNamePassword = new UsernamePasswordAuthenticationToken(authDto.getLogin(),authDto.getPassword());
        var auth = this.authenticationManager.authenticate(userNamePassword);
        var token = tokenService.generateToken((User) auth.getPrincipal());
        return ResponseEntity.ok(new LoginResponseDto(token));

    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDto registerDto){

        if(userRepository.findByLogin(registerDto.getLogin()) != null){
            return ResponseEntity.badRequest().build();
        }

        String encriptedPassword = new BCryptPasswordEncoder().encode(registerDto.getPassword());
        User newUser = new User(registerDto.getLogin(),encriptedPassword,registerDto.getUserRole());
        userRepository.save(newUser);
        return ResponseEntity.ok().build();

    }


}
