package com.univesp.bibliotecaetecapi.service;


import com.univesp.bibliotecaetecapi.dto.CategoryRequest;
import com.univesp.bibliotecaetecapi.dto.CategoryResponse;
import com.univesp.bibliotecaetecapi.exception_handler.exceptions.CategoryAlreadyExistsException;
import com.univesp.bibliotecaetecapi.exception_handler.exceptions.CategoryNotFound;
import com.univesp.bibliotecaetecapi.mapper.Mapper;
import com.univesp.bibliotecaetecapi.model.Category;
import com.univesp.bibliotecaetecapi.repository.CategoryRepository;
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

    public CategoryService() {
    }

    public List<CategoryResponse> getAllCategories() {
        List<Category> listCategory = this.categoryRepository.findAll();
        List<CategoryResponse> listCategoryResponse = listCategory.stream().map((category) -> {
            return this.mapper.entityToDtoCategory(category);
        }).toList();
        log.debug("Categorias mapeadass: {}", listCategory);
        return listCategoryResponse;
    }

    public Category insertCategory(CategoryRequest request) {
        Optional<Category> categoryEntityOptional = this.categoryRepository.findByNome(request.getNome());
        if (categoryEntityOptional.isPresent()) {
            throw new CategoryAlreadyExistsException();
        } else {
            request.setDataCriacao(LocalDateTime.now());
            Category category = this.mapper.dtoToEntityCategory(request);
            return (Category)this.categoryRepository.save(category);
        }
    }

    public CategoryResponse getCategoryById(Long idAluno) {
        Optional<Category> categoryEntityOptional = this.categoryRepository.findById(idAluno);
        if (categoryEntityOptional.isEmpty()) {
            throw new CategoryNotFound();
        } else {
            CategoryResponse categoryResponse = this.mapper.entityToDtoCategory((Category)categoryEntityOptional.get());
            return categoryResponse;
        }
    }

    public void deleteCategory(Long idCategory) {
        Optional<Category> categoryEntityOptional = this.categoryRepository.findById(idCategory);
        if (categoryEntityOptional.isEmpty()) {
            throw new CategoryNotFound();
        } else {
            Category category = (Category)categoryEntityOptional.get();
            this.categoryRepository.delete(category);
        }
    }

    public void updateCategory(Category currentCategory, Long idCategory) {
        Optional<Category> categoryEntityOptional = this.categoryRepository.findById(idCategory);
        if (categoryEntityOptional.isEmpty()) {
            throw new CategoryNotFound();
        } else {
            Category categoryInDb = (Category)categoryEntityOptional.get();
            categoryInDb.setNome(currentCategory.getNome());
            this.categoryRepository.save(categoryInDb);
        }
    }
}