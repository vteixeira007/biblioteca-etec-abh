package com.univesp.bibliotecaetecapi.controller;

import com.univesp.bibliotecaetecapi.dto.CategoryRequest;
import com.univesp.bibliotecaetecapi.dto.CategoryResponse;
import com.univesp.bibliotecaetecapi.model.Category;
import com.univesp.bibliotecaetecapi.service.CategoryService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/categoria"})
@SecurityRequirement(name = "bearerAuth")
public class CategoryController {
    @Autowired
    public CategoryService categoryService;

    public CategoryController() {
    }

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllBooks() {
        return ResponseEntity.ok(this.categoryService.getAllCategories());
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<CategoryResponse> getStudentById(@PathVariable("id") Long idCategory) {
        CategoryResponse category = this.categoryService.getCategoryById(idCategory);
        return ResponseEntity.ok().body(category);
    }

    @PostMapping
    public ResponseEntity<Category> insertCategory(@RequestBody @Valid CategoryRequest category) {
        Category categoryEntity = this.categoryService.insertCategory(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryEntity);
    }

    @DeleteMapping({"/{id}"})
    public ResponseEntity<Void> deleteCategory(@PathVariable("id") Long idCategory) {
        this.categoryService.deleteCategory(idCategory);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping({"/{id}"})
    public ResponseEntity<String> updateCategory(@RequestBody Category category, @PathVariable("id") Long idCategory) {
        category.setIdCategoria(idCategory);
        this.categoryService.updateCategory(category, idCategory);
        String mensagem = "Categoria com o ID " + idCategory + " foi atualizado com sucesso.";
        return ResponseEntity.ok(mensagem);
    }
}
