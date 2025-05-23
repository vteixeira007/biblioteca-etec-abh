
import { checkAuthAndRedirect } from './auth.js';
import login from './login.js';
import Menu from './menu.js';
import ImportCadastroAlunos from './alunos-api.js';
import ImportAttAlunos from './alunos-api-att.js';
import addCategoria from './add-colecao.js';
import { initAtualizarCategoriasPage } from './att-colecao.js';
import ImportCadastroLivros from './add-livros.js';
import ImportAtualizacaoLivros from './att-livro.js';
import ImportDescricaoLivros from './descricao-livro.js';
import pageLivros from './home.js';

const podeProsseguirNaPaginaAtual = checkAuthAndRedirect();

document.addEventListener('DOMContentLoaded', () => {

  Menu();

  let currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();


  if (podeProsseguirNaPaginaAtual) {
    if (currentPage.includes('login.html')) {
      login();
    } else {

      ImportCadastroLivros();
      ImportAtualizacaoLivros();
      ImportCadastroAlunos();
      ImportAttAlunos();
      addCategoria();
      initAtualizarCategoriasPage();
      ImportDescricaoLivros();
      pageLivros();
    }
  } else {
    console.warn(`[App.js] 'podeProsseguirNaPaginaAtual' é false. Um redirecionamento por auth.js provavelmente está em curso. Nenhum script de página será carregado por app.js.`);
  }
});