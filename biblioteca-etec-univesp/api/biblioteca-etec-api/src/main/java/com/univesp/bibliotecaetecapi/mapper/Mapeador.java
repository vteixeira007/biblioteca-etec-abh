package com.univesp.bibliotecaetecapi.mapper;


import com.univesp.bibliotecaetecapi.dto.AlunoRequisicao;
import com.univesp.bibliotecaetecapi.dto.AlunoResposta;
import com.univesp.bibliotecaetecapi.model.AlunoEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface Mapeador {


    AlunoEntity dtoToEntity(AlunoRequisicao alunoDto);
    AlunoResposta entityToDto(AlunoEntity alunoEntity);

}
