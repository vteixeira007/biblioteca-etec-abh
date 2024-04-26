package com.univesp.bibliotecaetecapi.controller;

import com.univesp.bibliotecaetecapi.model.AlunoEntity;
import com.univesp.bibliotecaetecapi.service.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/aluno")
public class AlunoController {

    @Autowired
    public AlunoService alunoService;

    @GetMapping
    public ResponseEntity<List<AlunoEntity>> buscaTodosAlunos() {
        return ResponseEntity.ok(alunoService.buscaTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<AlunoEntity>> buscaAluno(@PathVariable("id") Long idAluno) {
        Optional<AlunoEntity> aluno = alunoService.buscaAluno(idAluno);
        return ResponseEntity.ok().body(aluno);
    }


    @PostMapping
    public ResponseEntity<AlunoEntity> cadastraAluno(@RequestBody AlunoEntity aluno) {
        AlunoEntity alunoEntity = alunoService.cadastraAluno(aluno);
        return ResponseEntity.status(HttpStatus.CREATED).body(alunoEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long idAluno) {
        alunoService.deleteAluno(idAluno);
        return ResponseEntity.noContent().build();    }

    @PutMapping("/{id}")
    public ResponseEntity<String> update(@RequestBody AlunoEntity aluno, @PathVariable("id") Long idAluno)  {
        aluno.setIdAluno(idAluno);
        alunoService.update(aluno, idAluno);
        String mensagem = "Aluno com o ID " + idAluno + " foi atualizado com sucesso.";
        return ResponseEntity.ok(mensagem);
    }

}
