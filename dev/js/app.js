// import ImportPageHTML from './import-page-html.js';
import Menu from './menu.js';
import login from './login.js';
import ImportCadastroAlunos from './alunos-api.js';
import ImportAttAlunos from './alunos-api-att.js';
import addCategoria from './add-colecao.js';
import { initAtualizarCategoriasPage } from './att-colecao.js';
import ImportCadastroLivros from './add-livros.js';
import ImportAtualizacaoLivros from './att-livro.js';
import ImportDescricaoLivros from './descricao-livro.js';
import pageLivros from './home.js';


// ImportPageHTML();
login();
Menu();
ImportCadastroLivros();
ImportAtualizacaoLivros();
ImportCadastroAlunos();
ImportAttAlunos();
addCategoria();
initAtualizarCategoriasPage();
ImportDescricaoLivros();
pageLivros();


