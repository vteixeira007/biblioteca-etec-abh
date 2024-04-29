package com.univesp.bibliotecaetecapi.controller;

import com.univesp.bibliotecaetecapi.dto.CategoryRequest;
import com.univesp.bibliotecaetecapi.dto.CategoryResponse;
import com.univesp.bibliotecaetecapi.dto.StudentRequest;
import com.univesp.bibliotecaetecapi.dto.StudentResponse;
import com.univesp.bibliotecaetecapi.model.CategoryEntity;
import com.univesp.bibliotecaetecapi.model.StudentEntity;
import com.univesp.bibliotecaetecapi.service.CategoryService;
import com.univesp.bibliotecaetecapi.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/categoria")
public class CategoryController {

    @Autowired
    public CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllStudents() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponse> getStudentById(@PathVariable("id") Long idCategory) {
        CategoryResponse category = categoryService.getCategoryById(idCategory);
        return ResponseEntity.ok().body(category);
    }

    @PostMapping
    public ResponseEntity<CategoryEntity> insertCategory(@RequestBody @Valid CategoryRequest category) {
        CategoryEntity categoryEntity = categoryService.insertCategory(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable("id") Long idCategory) {
        categoryService.deleteCategory(idCategory);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateCategory(@RequestBody CategoryEntity category, @PathVariable("id") Long idCategory) {
        category.setIdCategoria(idCategory);
        categoryService.updateCategory(category, idCategory);
        String mensagem = "Categoria com o ID " + idCategory + " foi atualizado com sucesso.";
        return ResponseEntity.ok(mensagem);
    }

}
