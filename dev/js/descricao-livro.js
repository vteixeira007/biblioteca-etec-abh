
export default function importDescricaoLivros() {
  const API_BASE_URL = 'https://biblioteca-etec-abh-2.onrender.com';

  function showMessageDescricao(message, containerElement) {
    if (containerElement) {
      containerElement.innerHTML = `<p class="error">${message}</p>`;
    } else {
      alert(message);
    }
  }
  
  function handleAuthErrorDescricao(container) {
      showMessageDescricao("Sessão expirada ou inválida. Faça login novamente.", container);
      setTimeout(() => {
          window.location.href = 'login.html';
      }, 1500);
  }


  async function carregarLivroDetalhes() {
    const container = document.getElementById('livrosContainer');
    if (!container) {
        return;
    }
    container.innerHTML = '<p>Carregando detalhes do livro...</p>';

    const token = localStorage.getItem('authToken');
    if (!token) {
      return handleAuthErrorDescricao(container);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const idLivroParam = urlParams.get('idLivro');

    if (!idLivroParam) {
      showMessageDescricao('ID do Livro não especificado na URL.', container);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/categoria`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.status === 401) return handleAuthErrorDescricao(container);
      if (!response.ok) throw new Error(`Erro ${response.status} ao buscar dados dos livros.`);
      
      const categorias = await response.json();

      let livroEncontrado = null;
      let nomeCategoriaDoLivro = "Categoria não encontrada";

      for (const categoria of categorias) {
        if (categoria.bookResponses && Array.isArray(categoria.bookResponses)) {
          const livro = categoria.bookResponses.find(l => l.idLivro.toString() === idLivroParam);
          if (livro) {
            livroEncontrado = livro;
            nomeCategoriaDoLivro = categoria.nome || nomeCategoriaDoLivro;
            break; 
          }
        }
      }

      if (!livroEncontrado) {
        showMessageDescricao('Livro não encontrado.', container);
        return;
      }
      
      if (!livroEncontrado.nomeCategoria) {
          livroEncontrado.nomeCategoria = nomeCategoriaDoLivro;
      }

      container.innerHTML = `
        <div class="livro-content">
          <div class="livro-content_banner">
            <div class="livro-content_image">
              <img src="./assets/images/capa.jpg" alt="Capa do livro ${livroEncontrado.titulo}" />
            </div>
            <div class="livro-content_tag">
              <span>${livroEncontrado.status === 'DISPONIVEL' ? 'Disponível' : (livroEncontrado.status || 'N/A')}</span>
            </div>
          </div>
          <div class="livro-content_text">
            <div class="livro-content_text-categoria">
              <h3>${livroEncontrado.nomeCategoria || 'Sem Categoria'}</h3>
              <span>${livroEncontrado.assunto || 'Sem assunto específico'}</span>
            </div>
            <h1>${livroEncontrado.titulo || 'Título Indisponível'}</h1>
            <h2>Por: ${livroEncontrado.autor || 'Autor Desconhecido'}</h2>
            <div class="livro-content_submenu">
              <div class="livro-content_submenu-numbers">
                <span class="livro-content_submenu_subtitulo_number_ano">Ano: ${livroEncontrado.dataCriacao ? new Date(livroEncontrado.dataCriacao).getFullYear() : '-'}</span>
                </div>
              <div class="livro-content_submenu-codes">
                <span class="livro-content_submenu-codes-isbn13"><span>EAN / ISBN13:</span> ${livroEncontrado.codigo || '-'}</span>
              </div>
              <div class="livro-content_submenu-data">
                <span class="livro-content_submenu-data-add">Adicionado em: ${livroEncontrado.dataCriacao ? new Date(livroEncontrado.dataCriacao).toLocaleDateString() : '-'}</span>
                <span class="livro-content_submenu-data-att">Atualizado em: ${livroEncontrado.dataAtuallizacao ? new Date(livroEncontrado.dataAtuallizacao).toLocaleDateString() : '-'}</span>
              </div>
              <span class="livro-content_submenu-copias">Cópias disponíveis: <span>${livroEncontrado.quantidade !== undefined ? livroEncontrado.quantidade : '-'}</span></span>
            </div>
            <div class="subtitulo page-livro">
              <span class="subtitulo-text">Descrição</span>
              <div class="line subtitulo"></div>
            </div>
            <div class="livro-content_text-description">
              <p>${livroEncontrado.descricao || 'Nenhuma descrição disponível.'}</p>
            </div>
          </div>
        </div>
      `;
    } catch (error) {
      showMessageDescricao('Erro ao carregar os detalhes do livro. Tente novamente.', container);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', carregarLivroDetalhes);
  } else {
    carregarLivroDetalhes();
  }

}