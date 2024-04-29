package com.univesp.bibliotecaetecapi.service;


import com.univesp.bibliotecaetecapi.dto.StudentRequest;
import com.univesp.bibliotecaetecapi.dto.StudentResponse;
import com.univesp.bibliotecaetecapi.exception_handler.exceptions.CpfAlreadyExistsException;
import com.univesp.bibliotecaetecapi.exception_handler.exceptions.StudentNotFound;
import com.univesp.bibliotecaetecapi.mapper.Mapper;
import com.univesp.bibliotecaetecapi.model.StudentEntity;
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

    public List<StudentResponse> getAllStudents() {
        List<StudentEntity> listStudents = studentRepository.findAll();
        List<StudentResponse> listStudentResponse = listStudents.stream()
                .map(student -> mapper.entityToDto(student)).toList();

        return listStudentResponse;
    }


    public StudentEntity insertStudent(StudentRequest request) {
        Optional<StudentEntity> studentEntityOptional = studentRepository.findByCpf(request.getCpf());
        if (studentEntityOptional.isPresent()) {
            throw new CpfAlreadyExistsException();
        } else {
            request.setDataCriacao(LocalDateTime.now());
            StudentEntity studentEntity = mapper.dtoToEntity(request);
            return studentRepository.save(studentEntity);
        }
    }


    public StudentResponse getStudentById(Long idAluno) {
        Optional<StudentEntity> studentEntityOptional = studentRepository.findById(idAluno);
        if (studentEntityOptional.isEmpty()) {
            throw new StudentNotFound();
        }
        StudentResponse studentResponse = mapper.entityToDto(studentEntityOptional.get());
        return studentResponse;
    }

    public void deleteStudent(Long idAluno) {
        Optional<StudentEntity> studentEntityOptional = studentRepository.findById(idAluno);
        if (studentEntityOptional.isEmpty()) {
            throw new StudentNotFound();
        }
        StudentEntity student = studentEntityOptional.get();
        studentRepository.delete(student);

    }

    public void updateStudent(StudentEntity currentStudent, Long idAluno) {
        Optional<StudentEntity> studentEntityOptional = studentRepository.findById(idAluno);
        if (studentEntityOptional.isEmpty()) {
            throw new StudentNotFound();
        }
        StudentEntity studentInDb = studentEntityOptional.get();
        studentInDb.setNome(currentStudent.getNome());
        studentInDb.setMatricula(currentStudent.getMatricula());
        studentRepository.save(studentInDb);
    }
}
