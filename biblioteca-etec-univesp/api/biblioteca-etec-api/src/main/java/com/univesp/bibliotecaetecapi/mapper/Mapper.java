package com.univesp.bibliotecaetecapi.mapper;


import com.univesp.bibliotecaetecapi.dto.*;
import com.univesp.bibliotecaetecapi.model.BookEntity;
import com.univesp.bibliotecaetecapi.model.CategoryEntity;
import com.univesp.bibliotecaetecapi.model.StudentEntity;

@org.mapstruct.Mapper(componentModel = "spring")
public interface Mapper {


    StudentEntity dtoToEntity(StudentRequest studentRequest);
    StudentResponse entityToDto(StudentEntity studentEntity);

    CategoryEntity dtoToEntityCategory(CategoryRequest categoryRequest);
    CategoryResponse entityToDtoCategory(CategoryEntity categoryEntity);

    BookResponse entityToDtoBook(BookEntity book);

    BookEntity dtoToEntityBook(BookRequest request);
}
