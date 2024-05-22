package com.univesp.bibliotecaetecapi.service;


import com.univesp.bibliotecaetecapi.dto.CategoryRequest;
import com.univesp.bibliotecaetecapi.dto.CategoryResponse;
import com.univesp.bibliotecaetecapi.dto.StudentRequest;
import com.univesp.bibliotecaetecapi.dto.StudentResponse;
import com.univesp.bibliotecaetecapi.exception_handler.exceptions.CategoryAlreadyExistsException;
import com.univesp.bibliotecaetecapi.exception_handler.exceptions.CategoryNotFound;
import com.univesp.bibliotecaetecapi.exception_handler.exceptions.CpfAlreadyExistsException;
import com.univesp.bibliotecaetecapi.exception_handler.exceptions.StudentNotFound;
import com.univesp.bibliotecaetecapi.mapper.Mapper;
import com.univesp.bibliotecaetecapi.model.CategoryEntity;
import com.univesp.bibliotecaetecapi.model.StudentEntity;
import com.univesp.bibliotecaetecapi.repository.CategoryRepository;
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
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private Mapper mapper;

    public List<CategoryResponse> getAllCategories() {
        List<CategoryEntity> listCategory =categoryRepository.findAll();
        List<CategoryResponse> listCategoryResponse = listCategory.stream()
                .map(category -> mapper.entityToDtoCategory(category)).toList();

        return listCategoryResponse;
    }


    public CategoryEntity insertCategory(CategoryRequest request) {
        Optional<CategoryEntity> categoryEntityOptional = categoryRepository.findByNome(request.getNome());
        if (categoryEntityOptional.isPresent()) {
            throw new CategoryAlreadyExistsException();
        } else {
            request.setDataCriacao(LocalDateTime.now());
            CategoryEntity categoryEntity = mapper.dtoToEntityCategory(request);
            return categoryRepository.save(categoryEntity);
        }
    }


    public CategoryResponse getCategoryById(Long idAluno) {
        Optional<CategoryEntity> categoryEntityOptional = categoryRepository.findById(idAluno);
        if (categoryEntityOptional.isEmpty()) {
            throw new CategoryNotFound();
        }
        CategoryResponse categoryResponse = mapper.entityToDtoCategory(categoryEntityOptional.get());
        return categoryResponse;
    }

    public void deleteCategory(Long idCategory) {
        Optional<CategoryEntity> categoryEntityOptional = categoryRepository.findById(idCategory);
        if (categoryEntityOptional.isEmpty()) {
            throw new CategoryNotFound();
        }
        CategoryEntity category = categoryEntityOptional.get();
        categoryRepository.delete(category);

    }

    public void updateCategory(CategoryEntity currentCategory, Long idCategory) {
        Optional<CategoryEntity> categoryEntityOptional = categoryRepository.findById(idCategory);
        if (categoryEntityOptional.isEmpty()) {
            throw new CategoryNotFound();
        }
        CategoryEntity categoryInDb = categoryEntityOptional.get();
        categoryInDb.setNome(currentCategory.getNome());
        categoryRepository.save(categoryInDb);
    }
}
