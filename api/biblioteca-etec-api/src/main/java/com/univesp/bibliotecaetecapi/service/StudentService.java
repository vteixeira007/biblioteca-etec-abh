package com.univesp.bibliotecaetecapi.service;


import com.univesp.bibliotecaetecapi.dto.StudentRequest;
import com.univesp.bibliotecaetecapi.dto.StudentResponse;
import com.univesp.bibliotecaetecapi.exception_handler.exceptions.CpfAlreadyExistsException;
import com.univesp.bibliotecaetecapi.exception_handler.exceptions.StudentNotFound;
import com.univesp.bibliotecaetecapi.mapper.Mapper;
import com.univesp.bibliotecaetecapi.model.Student;
import com.univesp.bibliotecaetecapi.repository.StudentRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@Transactional
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private Mapper mapper;

    public StudentService() {
    }

    public List<StudentResponse> getAllStudents() {
        List<Student> listStudents = this.studentRepository.findAll();
        List<StudentResponse> listStudentResponse = listStudents.stream().map((student) -> {
            return this.mapper.entityToDto(student);
        }).toList();
        return listStudentResponse;
    }

    public Student insertStudent(StudentRequest request) {
        Optional<Student> studentEntityOptional = this.studentRepository.findByCpf(request.getCpf());
        if (studentEntityOptional.isPresent()) {
            throw new CpfAlreadyExistsException();
        } else {
            request.setDataCriacao(LocalDateTime.now());
            Student student = this.mapper.dtoToEntity(request);
            return (Student)this.studentRepository.save(student);
        }
    }

    public StudentResponse getStudentById(Long idAluno) {
        Optional<Student> studentEntityOptional = this.studentRepository.findById(idAluno);
        if (studentEntityOptional.isEmpty()) {
            throw new StudentNotFound();
        } else {
            StudentResponse studentResponse = this.mapper.entityToDto((Student)studentEntityOptional.get());
            return studentResponse;
        }
    }

    public void deleteStudent(Long idAluno) {
        Optional<Student> studentEntityOptional = this.studentRepository.findById(idAluno);
        if (studentEntityOptional.isEmpty()) {
            throw new StudentNotFound();
        } else {
            Student student = (Student)studentEntityOptional.get();
            this.studentRepository.delete(student);
        }
    }

    public void updateStudent(Student currentStudent, Long idAluno) {
        Optional<Student> studentEntityOptional = this.studentRepository.findById(idAluno);
        if (studentEntityOptional.isEmpty()) {
            throw new StudentNotFound();
        } else {
            Student studentInDb = (Student)studentEntityOptional.get();
            studentInDb.setNome(currentStudent.getNome());
            studentInDb.setMatricula(currentStudent.getMatricula());
            this.studentRepository.save(studentInDb);
        }
    }
}
