package com.univesp.bibliotecaetecapi.mapper;

import com.univesp.bibliotecaetecapi.dto.BookRequest;
import com.univesp.bibliotecaetecapi.dto.BookResponse;
import com.univesp.bibliotecaetecapi.dto.CategoryRequest;
import com.univesp.bibliotecaetecapi.dto.CategoryResponse;
import com.univesp.bibliotecaetecapi.dto.LoanRequest;
import com.univesp.bibliotecaetecapi.dto.LoanResponse;
import com.univesp.bibliotecaetecapi.dto.StudentRequest;
import com.univesp.bibliotecaetecapi.dto.StudentResponse;
import com.univesp.bibliotecaetecapi.model.Book;
import com.univesp.bibliotecaetecapi.model.Category;
import com.univesp.bibliotecaetecapi.model.Loan;
import com.univesp.bibliotecaetecapi.model.Student;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-04-06T22:53:17-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.5 (Azul Systems, Inc.)"
)
@Component
public class MapperImpl implements Mapper {

    @Override
    public Student dtoToEntity(StudentRequest studentRequest) {
        if ( studentRequest == null ) {
            return null;
        }

        Student student = new Student();

        student.setIdAluno( studentRequest.getIdAluno() );
        student.setNome( studentRequest.getNome() );
        student.setMatricula( studentRequest.getMatricula() );
        student.setCpf( studentRequest.getCpf() );
        student.setEmail( studentRequest.getEmail() );
        student.setTelefone( studentRequest.getTelefone() );
        student.setCurso( studentRequest.getCurso() );
        student.setTurma( studentRequest.getTurma() );
        student.setDataCriacao( studentRequest.getDataCriacao() );
        student.setDataAtuallizacao( studentRequest.getDataAtuallizacao() );
        student.setLoan( loanRequestListToLoanList( studentRequest.getLoan() ) );

        return student;
    }

    @Override
    public StudentResponse entityToDto(Student student) {
        if ( student == null ) {
            return null;
        }

        StudentResponse studentResponse = new StudentResponse();

        studentResponse.setIdAluno( student.getIdAluno() );
        studentResponse.setNome( student.getNome() );
        studentResponse.setMatricula( student.getMatricula() );
        studentResponse.setCpf( student.getCpf() );
        studentResponse.setEmail( student.getEmail() );
        studentResponse.setTelefone( student.getTelefone() );
        studentResponse.setCurso( student.getCurso() );
        studentResponse.setTurma( student.getTurma() );
        studentResponse.setDataCriacao( student.getDataCriacao() );
        studentResponse.setDataAtuallizacao( student.getDataAtuallizacao() );
        studentResponse.setLoan( loanListToLoanResponseList( student.getLoan() ) );

        return studentResponse;
    }

    @Override
    public Category dtoToEntityCategory(CategoryRequest categoryRequest) {
        if ( categoryRequest == null ) {
            return null;
        }

        Category category = new Category();

        category.setIdCategoria( categoryRequest.getIdCategoria() );
        category.setNome( categoryRequest.getNome() );
        category.setDataCriacao( categoryRequest.getDataCriacao() );

        return category;
    }

    @Override
    public CategoryResponse entityToDtoCategory(Category category) {
        if ( category == null ) {
            return null;
        }

        CategoryResponse categoryResponse = new CategoryResponse();

        categoryResponse.setBookResponses( bookListToBookResponseList( category.getBookEntities() ) );
        categoryResponse.setIdCategoria( category.getIdCategoria() );
        categoryResponse.setNome( category.getNome() );
        categoryResponse.setDataCriacao( category.getDataCriacao() );

        return categoryResponse;
    }

    @Override
    public BookResponse entityToDtoBook(Book book) {
        if ( book == null ) {
            return null;
        }

        BookResponse bookResponse = new BookResponse();

        bookResponse.setNomeCategoria( bookCategoryNome( book ) );
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
    public Book dtoToEntityBook(BookRequest request) {
        if ( request == null ) {
            return null;
        }

        Book book = new Book();

        book.setCategory( bookRequestToCategory( request ) );
        book.setIdLivro( request.getIdLivro() );
        book.setTitulo( request.getTitulo() );
        book.setAutor( request.getAutor() );
        book.setAssunto( request.getAssunto() );
        book.setDescricao( request.getDescricao() );
        book.setCodigo( request.getCodigo() );
        book.setQuantidade( request.getQuantidade() );
        book.setStatus( request.getStatus() );
        book.setDataCriacao( request.getDataCriacao() );
        book.setDataAtuallizacao( request.getDataAtuallizacao() );

        return book;
    }

    @Override
    public Loan dtoToEntityLoan(LoanRequest loanRequest) {
        if ( loanRequest == null ) {
            return null;
        }

        Loan loan = new Loan();

        loan.setStudent( loanRequestToStudent( loanRequest ) );
        loan.setBook( loanRequestToBook( loanRequest ) );
        loan.setIdEmprestimo( loanRequest.getIdEmprestimo() );
        loan.setDataEmprestimo( loanRequest.getDataEmprestimo() );
        loan.setDataDevolucao( loanRequest.getDataDevolucao() );

        return loan;
    }

    @Override
    public LoanResponse entityToDtoLoan(Loan loan) {
        if ( loan == null ) {
            return null;
        }

        LoanResponse loanResponse = new LoanResponse();

        loanResponse.setNomeLivro( loanBookTitulo( loan ) );
        loanResponse.setCodigoLivro( loanBookCodigo( loan ) );
        loanResponse.setNomeAluno( loanStudentNome( loan ) );
        Integer matricula = loanStudentMatricula( loan );
        if ( matricula != null ) {
            loanResponse.setMatricula( String.valueOf( matricula ) );
        }
        loanResponse.setIdEmprestimo( loan.getIdEmprestimo() );
        loanResponse.setDataEmprestimo( loan.getDataEmprestimo() );
        loanResponse.setDataDevolucao( loan.getDataDevolucao() );

        return loanResponse;
    }

    protected List<Loan> loanRequestListToLoanList(List<LoanRequest> list) {
        if ( list == null ) {
            return null;
        }

        List<Loan> list1 = new ArrayList<Loan>( list.size() );
        for ( LoanRequest loanRequest : list ) {
            list1.add( dtoToEntityLoan( loanRequest ) );
        }

        return list1;
    }

    protected List<LoanResponse> loanListToLoanResponseList(List<Loan> list) {
        if ( list == null ) {
            return null;
        }

        List<LoanResponse> list1 = new ArrayList<LoanResponse>( list.size() );
        for ( Loan loan : list ) {
            list1.add( entityToDtoLoan( loan ) );
        }

        return list1;
    }

    protected List<BookResponse> bookListToBookResponseList(List<Book> list) {
        if ( list == null ) {
            return null;
        }

        List<BookResponse> list1 = new ArrayList<BookResponse>( list.size() );
        for ( Book book : list ) {
            list1.add( entityToDtoBook( book ) );
        }

        return list1;
    }

    private String bookCategoryNome(Book book) {
        if ( book == null ) {
            return null;
        }
        Category category = book.getCategory();
        if ( category == null ) {
            return null;
        }
        String nome = category.getNome();
        if ( nome == null ) {
            return null;
        }
        return nome;
    }

    protected Category bookRequestToCategory(BookRequest bookRequest) {
        if ( bookRequest == null ) {
            return null;
        }

        Category category = new Category();

        category.setIdCategoria( bookRequest.getIdCategoria() );
        category.setNome( bookRequest.getNome() );

        return category;
    }

    protected Student loanRequestToStudent(LoanRequest loanRequest) {
        if ( loanRequest == null ) {
            return null;
        }

        Student student = new Student();

        student.setIdAluno( loanRequest.getIdAluno() );

        return student;
    }

    protected Book loanRequestToBook(LoanRequest loanRequest) {
        if ( loanRequest == null ) {
            return null;
        }

        Book book = new Book();

        book.setIdLivro( loanRequest.getIdLivro() );
        book.setStatus( loanRequest.getStatus() );

        return book;
    }

    private String loanBookTitulo(Loan loan) {
        if ( loan == null ) {
            return null;
        }
        Book book = loan.getBook();
        if ( book == null ) {
            return null;
        }
        String titulo = book.getTitulo();
        if ( titulo == null ) {
            return null;
        }
        return titulo;
    }

    private String loanBookCodigo(Loan loan) {
        if ( loan == null ) {
            return null;
        }
        Book book = loan.getBook();
        if ( book == null ) {
            return null;
        }
        String codigo = book.getCodigo();
        if ( codigo == null ) {
            return null;
        }
        return codigo;
    }

    private String loanStudentNome(Loan loan) {
        if ( loan == null ) {
            return null;
        }
        Student student = loan.getStudent();
        if ( student == null ) {
            return null;
        }
        String nome = student.getNome();
        if ( nome == null ) {
            return null;
        }
        return nome;
    }

    private Integer loanStudentMatricula(Loan loan) {
        if ( loan == null ) {
            return null;
        }
        Student student = loan.getStudent();
        if ( student == null ) {
            return null;
        }
        Integer matricula = student.getMatricula();
        if ( matricula == null ) {
            return null;
        }
        return matricula;
    }
}
