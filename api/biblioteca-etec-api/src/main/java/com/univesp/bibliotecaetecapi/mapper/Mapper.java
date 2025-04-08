package com.univesp.bibliotecaetecapi.mapper;


import com.univesp.bibliotecaetecapi.dto.*;
import com.univesp.bibliotecaetecapi.model.Book;
import com.univesp.bibliotecaetecapi.model.Category;
import com.univesp.bibliotecaetecapi.model.Loan;
import com.univesp.bibliotecaetecapi.model.Student;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@org.mapstruct.Mapper(componentModel = "spring")
public interface Mapper {


    Student dtoToEntity(StudentRequest studentRequest);

    StudentResponse entityToDto(Student student);

    Category dtoToEntityCategory(CategoryRequest categoryRequest);

    @Mapping(
            target = "bookResponses",
            source = "bookEntities"
    )
    CategoryResponse entityToDtoCategory(Category category);

    @Mapping(
            target = "nomeCategoria",
            source = "category.nome"
    )
    BookResponse entityToDtoBook(Book book);

    @Mappings({@Mapping(
            target = "category.idCategoria",
            source = "idCategoria"
    ), @Mapping(
            target = "category.nome",
            source = "nome"
    ), @Mapping(
            target = "category.dataCriacao",
            ignore = true
    ), @Mapping(
            target = "category.dataAtualizacao",
            ignore = true
    )})
    Book dtoToEntityBook(BookRequest request);

    @Mappings({@Mapping(
            target = "student.idAluno",
            source = "idAluno"
    ), @Mapping(
            target = "book.idLivro",
            source = "idLivro"
    ), @Mapping(
            target = "book.status",
            source = "status"
    )})
    Loan dtoToEntityLoan(LoanRequest loanRequest);

    @Mappings({@Mapping(
            source = "book.titulo",
            target = "nomeLivro"
    ), @Mapping(
            source = "book.codigo",
            target = "codigoLivro"
    ), @Mapping(
            source = "student.nome",
            target = "nomeAluno"
    ), @Mapping(
            source = "student.matricula",
            target = "matricula"
    )})
    LoanResponse entityToDtoLoan(Loan loan);
}
