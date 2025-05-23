
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
  console.log("[App.js] DOM Carregado.");
  Menu();

  let currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  console.log(`[App.js] Página atual: ${currentPage}. Resultado do auth.js: ${podeProsseguirNaPaginaAtual}`);

  if (podeProsseguirNaPaginaAtual) {

    if (!currentPage.includes('login.html')) {
        console.log(`[App.js] Autenticado e não na página de login. Carregando scripts de funcionalidade para ${currentPage}...`);
        ImportCadastroLivros();
        ImportAtualizacaoLivros();
        ImportCadastroAlunos();
        ImportAttAlunos();
        addCategoria();
        initAtualizarCategoriasPage();
        ImportDescricaoLivros();
        pageLivros();
    } else {
        console.warn("[App.js] Estado inesperado: podeProsseguirNaPaginaAtual é true, mas estamos em login.html.");
    }
  } else {
    if (currentPage.includes('login.html')) {
      console.log("[App.js] Na página de login (não autenticado, ou auth.js está redirecionando para index). Carregando script 'login.js' para o formulário.");
      login();
    } else {
      console.warn(`[App.js] 'podeProsseguirNaPaginaAtual' é false e não estamos em login.html. Provável redirecionamento por auth.js em curso para login.html.`);
    }
  }
  console.log("[App.js] Fim do processamento inicial.");
});

function realizarLoginFake() {
  const fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6InRlc3RlIiwiZXhwIjoxNzQ4MDIxNzI4fQ.G-snUsbBAoVUZrU__oBpIa3Kbk-KBYqkEbUHZl56L9I";
  const usuarioFake = "teste";

  if (!localStorage.getItem("authToken")) {
      console.log(`%c[LOGIN FAKE] Aplicando token para usuário: ${usuarioFake}`, "color: orange; font-weight: bold;");
      localStorage.setItem("authToken", fakeToken);
      console.log("[LOGIN FAKE] Token salvo no localStorage.");

      if ((window.location.pathname.split('/').pop() || 'index.html').toLowerCase() === 'login.html') {
          console.log("[LOGIN FAKE] Redirecionando da página de login para index.html...");
          window.location.href = "index.html";
      } else {
          console.log("[LOGIN FAKE] Recarregando a página atual para aplicar o estado de login...");
          window.location.reload();
      }
  } else {
      console.log("[LOGIN FAKE] Token já existe no localStorage. Login fake não aplicado novamente nesta sessão de página.");
  }
}