package com.univesp.bibliotecaetecapi.service;


import com.univesp.bibliotecaetecapi.dto.AlunoRequisicao;
import com.univesp.bibliotecaetecapi.dto.AlunoResposta;
import com.univesp.bibliotecaetecapi.exception_handler.exceptions.CpfAlreadyExistsException;
import com.univesp.bibliotecaetecapi.exception_handler.exceptions.StudentNotFound;
import com.univesp.bibliotecaetecapi.mapper.Mapeador;
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

    @Autowired
    private Mapeador mapper;

    public List<AlunoResposta> buscaTodos() {
        List<AlunoEntity> listaAlunos = alunoRepository.findAll();
        List<AlunoResposta> listaAlunoResposta = listaAlunos.stream()
                .map(aluno -> mapper.entityToDto(aluno)).toList();

        return listaAlunoResposta;
    }


    public AlunoEntity cadastraAluno(AlunoRequisicao requisicao) {
        Optional<AlunoEntity> aluno = alunoRepository.findByCpf(requisicao.getCpf());
        if (aluno.isPresent()) {
            throw new CpfAlreadyExistsException();
        } else {
            requisicao.setDataCriacao(LocalDateTime.now());
            AlunoEntity alunoEntity = mapper.dtoToEntity(requisicao);
            return alunoRepository.save(alunoEntity);
        }
    }


    public AlunoResposta buscaAluno(Long idAluno) {
        Optional<AlunoEntity> alunoEntity = alunoRepository.findById(idAluno);
        if (alunoEntity.isEmpty()) {
            throw new StudentNotFound();
        }
        AlunoResposta resposta = mapper.entityToDto(alunoEntity.get());
        return resposta;
    }

    public void deleteAluno(Long idAluno) {
        Optional<AlunoEntity> alunoOptional = alunoRepository.findById(idAluno);
        if (alunoOptional.isEmpty()) {
            throw new StudentNotFound();
        }
        AlunoEntity aluno = alunoOptional.get();
        alunoRepository.delete(aluno);

    }

    public void update(AlunoEntity alunoAtualizado, Long idAluno) {
        Optional<AlunoEntity> alunoOptional = alunoRepository.findById(idAluno);
        if (alunoOptional.isEmpty()) {
            throw new StudentNotFound();
        }
        AlunoEntity alunoExistente = alunoOptional.get();
        alunoExistente.setNome(alunoAtualizado.getNome());
        alunoExistente.setMatricula(alunoAtualizado.getMatricula());
        alunoRepository.save(alunoExistente);

    }
}
