package com.univesp.bibliotecaetecapi.mapper;


import com.univesp.bibliotecaetecapi.dto.*;
import com.univesp.bibliotecaetecapi.model.BookEntity;
import com.univesp.bibliotecaetecapi.model.CategoryEntity;
import com.univesp.bibliotecaetecapi.model.LoanEntity;
import com.univesp.bibliotecaetecapi.model.StudentEntity;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@org.mapstruct.Mapper(componentModel = "spring")
public interface Mapper {


    StudentEntity dtoToEntity(StudentRequest studentRequest);

    StudentResponse entityToDto(StudentEntity studentEntity);

    CategoryEntity dtoToEntityCategory(CategoryRequest categoryRequest);

    @Mapping(
            target = "bookResponses",
            source = "bookEntities"
    )
    CategoryResponse entityToDtoCategory(CategoryEntity categoryEntity);

    @Mapping(
            target = "nomeCategoria",
            source = "categoryEntity.nome"
    )
    BookResponse entityToDtoBook(BookEntity book);

    @Mappings({@Mapping(
            target = "categoryEntity.idCategoria",
            source = "idCategoria"
    ), @Mapping(
            target = "categoryEntity.nome",
            source = "nome"
    ), @Mapping(
            target = "categoryEntity.dataCriacao",
            ignore = true
    ), @Mapping(
            target = "categoryEntity.dataAtualizacao",
            ignore = true
    )})
    BookEntity dtoToEntityBook(BookRequest request);

    @Mappings({@Mapping(
            target = "studentEntity.idAluno",
            source = "idAluno"
    ), @Mapping(
            target = "bookEntity.idLivro",
            source = "idLivro"
    ), @Mapping(
            target = "bookEntity.status",
            source = "status"
    )})
    LoanEntity dtoToEntityLoan(LoanRequest loanRequest);

    @Mappings({@Mapping(
            source = "bookEntity.titulo",
            target = "nomeLivro"
    ), @Mapping(
            source = "bookEntity.codigo",
            target = "codigoLivro"
    ), @Mapping(
            source = "studentEntity.nome",
            target = "nomeAluno"
    ), @Mapping(
            source = "studentEntity.matricula",
            target = "matricula"
    )})
    LoanResponse entityToDtoLoan(LoanEntity loanEntity);
}
