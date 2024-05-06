package com.univesp.bibliotecaetecapi.mapper;


import com.univesp.bibliotecaetecapi.dto.*;
import com.univesp.bibliotecaetecapi.model.BookEntity;
import com.univesp.bibliotecaetecapi.model.CategoryEntity;
import com.univesp.bibliotecaetecapi.model.LoanEntity;
import com.univesp.bibliotecaetecapi.model.StudentEntity;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapping;

@org.mapstruct.Mapper(componentModel = "spring")
public interface Mapper{


    StudentEntity dtoToEntity(StudentRequest studentRequest);
    StudentResponse entityToDto(StudentEntity studentEntity);

    CategoryEntity dtoToEntityCategory(CategoryRequest categoryRequest);
    @Mapping(target = "bookResponses",source = "bookEntities")
    CategoryResponse entityToDtoCategory(CategoryEntity categoryEntity);
    @Mapping(target = "idCategoria",source = "categoryEntity.idCategoria")
    BookResponse entityToDtoBook(BookEntity book);
    @Mapping(target = "categoryEntity.idCategoria", source = "idCategoria")
    BookEntity dtoToEntityBook(BookRequest request);
    @Mapping(target = "studentEntity.idAluno", source = "idAluno")
    @Mapping(target = "bookEntity.idLivro", source = "idLivro")
    LoanEntity dtoToEntityLoan(LoanRequest loanRequest);

    LoanResponse entityToDtoLoan(LoanEntity loanEntity);
}
