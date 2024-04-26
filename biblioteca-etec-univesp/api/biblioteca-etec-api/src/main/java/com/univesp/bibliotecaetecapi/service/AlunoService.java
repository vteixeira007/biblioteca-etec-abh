package com.univesp.bibliotecaetecapi.service;


import com.univesp.bibliotecaetecapi.model.AlunoEntity;
import com.univesp.bibliotecaetecapi.repository.AlunoRepository;
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
public class AlunoService {
    @Autowired
    private AlunoRepository alunoRepository;

    public List<AlunoEntity> buscaTodos() {
        List<AlunoEntity> listaAlunos = alunoRepository.findAll();

        return listaAlunos;
    }


    public AlunoEntity cadastraAluno(AlunoEntity alunoEntity) {
        alunoEntity.setDataCriacao(LocalDateTime.now());
        return alunoRepository.save(alunoEntity);
    }


    public Optional<AlunoEntity> buscaAluno(Long idAluno) {
        Optional<AlunoEntity> alunoEntity = alunoRepository.findById(idAluno);
        return alunoEntity;
    }

    public void deleteAluno(Long idAluno) {
        Optional<AlunoEntity> alunoOptional = alunoRepository.findById(idAluno);
        AlunoEntity aluno = alunoOptional.get();
        alunoRepository.delete(aluno);

    }

    public void update(AlunoEntity alunoAtualizado, Long idAluno) {
        Optional<AlunoEntity> alunoOptional = alunoRepository.findById(idAluno);
        AlunoEntity alunoExistente = alunoOptional.get();
        alunoExistente.setNome(alunoAtualizado.getNome());
        alunoExistente.setMatricula(alunoAtualizado.getMatricula());
        alunoRepository.save(alunoExistente);

    }
}
