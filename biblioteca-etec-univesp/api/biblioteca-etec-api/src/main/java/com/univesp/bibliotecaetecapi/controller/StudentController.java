package com.univesp.bibliotecaetecapi.controller;

import com.univesp.bibliotecaetecapi.dto.StudentRequest;
import com.univesp.bibliotecaetecapi.dto.StudentResponse;
import com.univesp.bibliotecaetecapi.model.StudentEntity;
import com.univesp.bibliotecaetecapi.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/aluno")
public class StudentController {

    @Autowired
    public StudentService studentService;

    @GetMapping
    public ResponseEntity<List<StudentResponse>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentResponse> getStudentById(@PathVariable("id") Long idAluno) {
        StudentResponse aluno = studentService.getStudentById(idAluno);
        return ResponseEntity.ok().body(aluno);
    }

    @PostMapping
    public ResponseEntity<StudentEntity> insertStudent(@RequestBody @Valid StudentRequest aluno) {
        StudentEntity studentEntity = studentService.insertStudent(aluno);
        return ResponseEntity.status(HttpStatus.CREATED).body(studentEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable("id") Long idAluno) {
        studentService.deleteStudent(idAluno);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateStudent(@RequestBody StudentEntity student, @PathVariable("id") Long idAluno) {
        student.setIdAluno(idAluno);
        studentService.updateStudent(student, idAluno);
        String mensagem = "Aluno com o ID " + idAluno + " foi atualizado com sucesso.";
        return ResponseEntity.ok(mensagem);
    }

}
