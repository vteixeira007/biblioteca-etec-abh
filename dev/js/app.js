
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

document.addEventListener('DOMContentLoaded', () => {
  console.log("[App.js] DOM Carregado. Iniciando aplicação...");
  Menu();

  console.log("[App.js] Executando checkAuthAndRedirect() do auth.js...");
  const podeProsseguirNaPaginaAtual = checkAuthAndRedirect();

  let currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  console.log(`[App.js] Página atual: ${currentPage}. Resultado do auth check: podeProsseguirNaPaginaAtual = ${podeProsseguirNaPaginaAtual}`);

  if (podeProsseguirNaPaginaAtual) {
    console.log(`[App.js] Autenticado. Carregando script para página: ${currentPage}`);

    if (currentPage.includes('index.html')) {
      console.log("[App.js] Chamando pageLivros()...");
      pageLivros();
    } else if (currentPage.includes('add-colecao.html')) {
      console.log("[App.js] Chamando addCategoria()...");
      addCategoria();
    } else if (currentPage.includes('att-colecao.html')) {
      console.log("[App.js] Chamando initAtualizarCategoriasPage()...");
      initAtualizarCategoriasPage();
    } else if (currentPage.includes('add-livros.html')) {
      console.log("[App.js] Chamando ImportCadastroLivros()...");
      ImportCadastroLivros();
    } else if (currentPage.includes('att-livro.html')) {
      console.log("[App.js] Chamando ImportAtualizacaoLivros()...");
      ImportAtualizacaoLivros();
    } else if (currentPage.includes('descricao-livro.html')) {
      console.log("[App.js] Chamando ImportDescricaoLivros()...");
      ImportDescricaoLivros();
    } else if (currentPage.includes('cadastro-alunos.html')) {
      console.log("[App.js] Chamando ImportCadastroAlunos()...");
      ImportCadastroAlunos();
    } else if (currentPage.includes('atualizacao-alunos.html')) {
      console.log("[App.js] Chamando ImportAttAlunos()...");
      ImportAttAlunos();
    } else {
      console.warn(`[App.js] Página autenticada ${currentPage} não possui script específico mapeado.`);
    }
  } else {
    if (currentPage.includes('login.html')) {
      console.log("[App.js] Na página de login (não autenticado ou esperando redirect de auth.js). Carregando script 'login.js'.");
      login();
    } else {
      console.warn(`[App.js] Nenhum script de página carregado. 'podeProsseguirNaPaginaAtual' é false e não estamos em login.html (página: ${currentPage}). Provável redirecionamento em curso.`);
    }
  }
  console.log("[App.js] Fim do processamento inicial.");
});