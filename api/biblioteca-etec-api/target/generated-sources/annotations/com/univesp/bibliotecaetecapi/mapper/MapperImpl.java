package com.univesp.bibliotecaetecapi.mapper;

import com.univesp.bibliotecaetecapi.dto.BookRequest;
import com.univesp.bibliotecaetecapi.dto.BookResponse;
import com.univesp.bibliotecaetecapi.dto.CategoryRequest;
import com.univesp.bibliotecaetecapi.dto.CategoryResponse;
import com.univesp.bibliotecaetecapi.dto.LoanRequest;
import com.univesp.bibliotecaetecapi.dto.LoanResponse;
import com.univesp.bibliotecaetecapi.dto.StudentRequest;
import com.univesp.bibliotecaetecapi.dto.StudentResponse;
import com.univesp.bibliotecaetecapi.model.BookEntity;
import com.univesp.bibliotecaetecapi.model.CategoryEntity;
import com.univesp.bibliotecaetecapi.model.LoanEntity;
import com.univesp.bibliotecaetecapi.model.StudentEntity;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-10-19T16:40:53-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.12 (Oracle Corporation)"
)
@Component
public class MapperImpl implements Mapper {

    @Override
    public StudentEntity dtoToEntity(StudentRequest studentRequest) {
        if ( studentRequest == null ) {
            return null;
        }

        StudentEntity studentEntity = new StudentEntity();

        studentEntity.setIdAluno( studentRequest.getIdAluno() );
        studentEntity.setNome( studentRequest.getNome() );
        studentEntity.setMatricula( studentRequest.getMatricula() );
        studentEntity.setCpf( studentRequest.getCpf() );
        studentEntity.setEmail( studentRequest.getEmail() );
        studentEntity.setTelefone( studentRequest.getTelefone() );
        studentEntity.setCurso( studentRequest.getCurso() );
        studentEntity.setTurma( studentRequest.getTurma() );
        studentEntity.setDataCriacao( studentRequest.getDataCriacao() );
        studentEntity.setDataAtuallizacao( studentRequest.getDataAtuallizacao() );
        studentEntity.setLoan( loanRequestListToLoanEntityList( studentRequest.getLoan() ) );

        return studentEntity;
    }

    @Override
    public StudentResponse entityToDto(StudentEntity studentEntity) {
        if ( studentEntity == null ) {
            return null;
        }

        StudentResponse studentResponse = new StudentResponse();

        studentResponse.setIdAluno( studentEntity.getIdAluno() );
        studentResponse.setNome( studentEntity.getNome() );
        studentResponse.setMatricula( studentEntity.getMatricula() );
        studentResponse.setCpf( studentEntity.getCpf() );
        studentResponse.setEmail( studentEntity.getEmail() );
        studentResponse.setTelefone( studentEntity.getTelefone() );
        studentResponse.setCurso( studentEntity.getCurso() );
        studentResponse.setTurma( studentEntity.getTurma() );
        studentResponse.setDataCriacao( studentEntity.getDataCriacao() );
        studentResponse.setDataAtuallizacao( studentEntity.getDataAtuallizacao() );
        studentResponse.setLoan( loanEntityListToLoanResponseList( studentEntity.getLoan() ) );

        return studentResponse;
    }

    @Override
    public CategoryEntity dtoToEntityCategory(CategoryRequest categoryRequest) {
        if ( categoryRequest == null ) {
            return null;
        }

        CategoryEntity categoryEntity = new CategoryEntity();

        categoryEntity.setIdCategoria( categoryRequest.getIdCategoria() );
        categoryEntity.setNome( categoryRequest.getNome() );
        categoryEntity.setDataCriacao( categoryRequest.getDataCriacao() );

        return categoryEntity;
    }

    @Override
    public CategoryResponse entityToDtoCategory(CategoryEntity categoryEntity) {
        if ( categoryEntity == null ) {
            return null;
        }

        CategoryResponse categoryResponse = new CategoryResponse();

        categoryResponse.setBookResponses( bookEntityListToBookResponseList( categoryEntity.getBookEntities() ) );
        categoryResponse.setIdCategoria( categoryEntity.getIdCategoria() );
        categoryResponse.setNome( categoryEntity.getNome() );
        categoryResponse.setDataCriacao( categoryEntity.getDataCriacao() );

        return categoryResponse;
    }

    @Override
    public BookResponse entityToDtoBook(BookEntity book) {
        if ( book == null ) {
            return null;
        }

        BookResponse bookResponse = new BookResponse();

        bookResponse.setNomeCategoria( bookCategoryEntityNome( book ) );
        bookResponse.setIdLivro( book.getIdLivro() );
        bookResponse.setTitulo( book.getTitulo() );
        bookResponse.setAutor( book.getAutor() );
        bookResponse.setAssunto( book.getAssunto() );
        bookResponse.setDescricao( book.getDescricao() );
        bookResponse.setCodigo( book.getCodigo() );
        bookResponse.setQuantidade( book.getQuantidade() );
        bookResponse.setStatus( book.getStatus() );
        bookResponse.setDataCriacao( book.getDataCriacao() );
        bookResponse.setDataAtuallizacao( book.getDataAtuallizacao() );

        return bookResponse;
    }

    @Override
    public BookEntity dtoToEntityBook(BookRequest request) {
        if ( request == null ) {
            return null;
        }

        BookEntity bookEntity = new BookEntity();

        bookEntity.setCategoryEntity( bookRequestToCategoryEntity( request ) );
        bookEntity.setIdLivro( request.getIdLivro() );
        bookEntity.setTitulo( request.getTitulo() );
        bookEntity.setAutor( request.getAutor() );
        bookEntity.setAssunto( request.getAssunto() );
        bookEntity.setDescricao( request.getDescricao() );
        bookEntity.setCodigo( request.getCodigo() );
        bookEntity.setQuantidade( request.getQuantidade() );
        bookEntity.setStatus( request.getStatus() );
        bookEntity.setDataCriacao( request.getDataCriacao() );
        bookEntity.setDataAtuallizacao( request.getDataAtuallizacao() );

        return bookEntity;
    }

    @Override
    public LoanEntity dtoToEntityLoan(LoanRequest loanRequest) {
        if ( loanRequest == null ) {
            return null;
        }

        LoanEntity loanEntity = new LoanEntity();

        loanEntity.setStudentEntity( loanRequestToStudentEntity( loanRequest ) );
        loanEntity.setBookEntity( loanRequestToBookEntity( loanRequest ) );
        loanEntity.setIdEmprestimo( loanRequest.getIdEmprestimo() );
        loanEntity.setDataEmprestimo( loanRequest.getDataEmprestimo() );
        loanEntity.setDataDevolucao( loanRequest.getDataDevolucao() );

        return loanEntity;
    }

    @Override
    public LoanResponse entityToDtoLoan(LoanEntity loanEntity) {
        if ( loanEntity == null ) {
            return null;
        }

        LoanResponse loanResponse = new LoanResponse();

        loanResponse.setNomeLivro( loanEntityBookEntityTitulo( loanEntity ) );
        loanResponse.setCodigoLivro( loanEntityBookEntityCodigo( loanEntity ) );
        loanResponse.setNomeAluno( loanEntityStudentEntityNome( loanEntity ) );
        Integer matricula = loanEntityStudentEntityMatricula( loanEntity );
        if ( matricula != null ) {
            loanResponse.setMatricula( String.valueOf( matricula ) );
        }
        loanResponse.setIdEmprestimo( loanEntity.getIdEmprestimo() );
        loanResponse.setDataEmprestimo( loanEntity.getDataEmprestimo() );
        loanResponse.setDataDevolucao( loanEntity.getDataDevolucao() );

        return loanResponse;
    }

    protected List<LoanEntity> loanRequestListToLoanEntityList(List<LoanRequest> list) {
        if ( list == null ) {
            return null;
        }

        List<LoanEntity> list1 = new ArrayList<LoanEntity>( list.size() );
        for ( LoanRequest loanRequest : list ) {
            list1.add( dtoToEntityLoan( loanRequest ) );
        }

        return list1;
    }

    protected List<LoanResponse> loanEntityListToLoanResponseList(List<LoanEntity> list) {
        if ( list == null ) {
            return null;
        }

        List<LoanResponse> list1 = new ArrayList<LoanResponse>( list.size() );
        for ( LoanEntity loanEntity : list ) {
            list1.add( entityToDtoLoan( loanEntity ) );
        }

        return list1;
    }

    protected List<BookResponse> bookEntityListToBookResponseList(List<BookEntity> list) {
        if ( list == null ) {
            return null;
        }

        List<BookResponse> list1 = new ArrayList<BookResponse>( list.size() );
        for ( BookEntity bookEntity : list ) {
            list1.add( entityToDtoBook( bookEntity ) );
        }

        return list1;
    }

    private String bookCategoryEntityNome(BookEntity bookEntity) {
        if ( bookEntity == null ) {
            return null;
        }
        CategoryEntity categoryEntity = bookEntity.getCategoryEntity();
        if ( categoryEntity == null ) {
            return null;
        }
        String nome = categoryEntity.getNome();
        if ( nome == null ) {
            return null;
        }
        return nome;
    }

    protected CategoryEntity bookRequestToCategoryEntity(BookRequest bookRequest) {
        if ( bookRequest == null ) {
            return null;
        }

        CategoryEntity categoryEntity = new CategoryEntity();

        categoryEntity.setIdCategoria( bookRequest.getIdCategoria() );
        categoryEntity.setNome( bookRequest.getNome() );

        return categoryEntity;
    }

    protected StudentEntity loanRequestToStudentEntity(LoanRequest loanRequest) {
        if ( loanRequest == null ) {
            return null;
        }

        StudentEntity studentEntity = new StudentEntity();

        studentEntity.setIdAluno( loanRequest.getIdAluno() );

        return studentEntity;
    }

    protected BookEntity loanRequestToBookEntity(LoanRequest loanRequest) {
        if ( loanRequest == null ) {
            return null;
        }

        BookEntity bookEntity = new BookEntity();

        bookEntity.setIdLivro( loanRequest.getIdLivro() );
        bookEntity.setStatus( loanRequest.getStatus() );

        return bookEntity;
    }

    private String loanEntityBookEntityTitulo(LoanEntity loanEntity) {
        if ( loanEntity == null ) {
            return null;
        }
        BookEntity bookEntity = loanEntity.getBookEntity();
        if ( bookEntity == null ) {
            return null;
        }
        String titulo = bookEntity.getTitulo();
        if ( titulo == null ) {
            return null;
        }
        return titulo;
    }

    private String loanEntityBookEntityCodigo(LoanEntity loanEntity) {
        if ( loanEntity == null ) {
            return null;
        }
        BookEntity bookEntity = loanEntity.getBookEntity();
        if ( bookEntity == null ) {
            return null;
        }
        String codigo = bookEntity.getCodigo();
        if ( codigo == null ) {
            return null;
        }
        return codigo;
    }

    private String loanEntityStudentEntityNome(LoanEntity loanEntity) {
        if ( loanEntity == null ) {
            return null;
        }
        StudentEntity studentEntity = loanEntity.getStudentEntity();
        if ( studentEntity == null ) {
            return null;
        }
        String nome = studentEntity.getNome();
        if ( nome == null ) {
            return null;
        }
        return nome;
    }

    private Integer loanEntityStudentEntityMatricula(LoanEntity loanEntity) {
        if ( loanEntity == null ) {
            return null;
        }
        StudentEntity studentEntity = loanEntity.getStudentEntity();
        if ( studentEntity == null ) {
            return null;
        }
        Integer matricula = studentEntity.getMatricula();
        if ( matricula == null ) {
            return null;
        }
        return matricula;
    }
}
