package com.univesp.bibliotecaetecapi.mapper;


import com.univesp.bibliotecaetecapi.dto.CategoryRequest;
import com.univesp.bibliotecaetecapi.dto.CategoryResponse;
import com.univesp.bibliotecaetecapi.dto.StudentRequest;
import com.univesp.bibliotecaetecapi.dto.StudentResponse;
import com.univesp.bibliotecaetecapi.model.CategoryEntity;
import com.univesp.bibliotecaetecapi.model.StudentEntity;

@org.mapstruct.Mapper(componentModel = "spring")
public interface Mapper {


    StudentEntity dtoToEntity(StudentRequest studentRequest);
    StudentResponse entityToDto(StudentEntity studentEntity);

    CategoryEntity dtoToEntityCategory(CategoryRequest categoryRequest);
    CategoryResponse entityToDtoCategory(CategoryEntity categoryEntity);

}
