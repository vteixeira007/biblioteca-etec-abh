export default function pageLivros() {
  const API_BASE_URL = 'https://biblioteca-etec-abh-2.onrender.com/';
  let todosOsLivrosDaPagina = [];
  const container = document.getElementById('homeLivrosContainer');
  const inputPesquisa = document.querySelector('.home-pesquisa_input');
  const listaLetrasLinks = document.querySelectorAll('.home-pesquisa_alfabeto ul li a');

  function _handleAuthErrorPageLivros(msg = "Sessão expirada ou inválida.") {
    console.error(`[pageLivros] Erro de Autenticação: ${msg}`);
    if (container) container.innerHTML = `<p class="error">${msg} Por favor, <a href="login.html">faça login</a> novamente.</p>`;
  }

  function _mostrarLivros(livrosParaMostrar) {
    if (!container) {
      console.error("[pageLivros] ERRO: Container #homeLivrosContainer NÃO ENCONTRADO para mostrar livros.");
      return;
    }
    container.innerHTML = '';

    if (livrosParaMostrar.length === 0) {
      container.innerHTML = '<p>Nenhum livro encontrado com os critérios selecionados.</p>';
      return;
    }

    const livrosPorLetra = {};
    livrosParaMostrar.forEach(livro => {
      let primeiraLetra = '#';
      if (livro && livro.titulo && typeof livro.titulo === 'string') {
        primeiraLetra = livro.titulo.charAt(0).toUpperCase();
        if (!primeiraLetra.match(/[A-Z]/i)) primeiraLetra = '#';
      } else {
        console.warn("[pageLivros] Livro sem título ou título inválido:", livro);
      }
      if (!livrosPorLetra[primeiraLetra]) {
        livrosPorLetra[primeiraLetra] = [];
      }
      livrosPorLetra[primeiraLetra].push(livro);
    });

    const letrasOrdenadas = Object.keys(livrosPorLetra).sort((a, b) => {
      if (a === '#') return 1;
      if (b === '#') return -1;
      return a.localeCompare(b);
    });

    letrasOrdenadas.forEach(letra => {
      const letraDiv = document.createElement('div');
      letraDiv.classList.add('home-content_letra');
      letraDiv.innerHTML = `<span>${letra}</span><div class="line"></div>`;
      container.appendChild(letraDiv);

      const livrosDiv = document.createElement('div');
      livrosDiv.classList.add('home-content_livros');

      livrosPorLetra[letra].sort((a, b) => (a.titulo || '').localeCompare(b.titulo || '')).forEach(livro => {
        const livroDiv = document.createElement('div');
        livroDiv.classList.add('home-content_livro');
        livroDiv.innerHTML = `
          <a class="home-content_capa-link" href="descricao-livro.html?idLivro=${livro.idLivro}">
            <div class="home-content_capa">
              <img src="./assets/images/capa.jpg" alt="Capa do livro ${livro.titulo || 'Sem título'}">
              <div class="overlay">
                <img src="./assets/images/icons/info.svg" alt="Informações do livro">
              </div>
            </div>
          </a>
          <span class="home-content_livro-titulo">${livro.titulo || 'Sem título'}</span>
          <span class="home-content_livro-descricao">${livro.autor || 'Autor desconhecido'}</span>
        `;
        livrosDiv.appendChild(livroDiv);
      });
      container.appendChild(livrosDiv);
    });
  }

  function _filtrarLivros() {
    if (!inputPesquisa) {
      console.warn("[pageLivros] Input de pesquisa não encontrado para filtro.");
      _mostrarLivros(todosOsLivrosDaPagina);
      return;
    }

    const textoPesquisa = inputPesquisa.value.trim().toLowerCase();
    const linkAtivo = document.querySelector('.home-pesquisa_alfabeto ul li a.ativo');
    const letraSelecionada = linkAtivo ? linkAtivo.textContent.toLowerCase() : 'todos';

    let filtrados = todosOsLivrosDaPagina;

    if (textoPesquisa) {
      filtrados = filtrados.filter(livro =>
        (livro.titulo && livro.titulo.toLowerCase().includes(textoPesquisa)) ||
        (livro.autor && livro.autor.toLowerCase().includes(textoPesquisa))
      );
    }

    if (letraSelecionada && letraSelecionada !== 'todos') {
      if (letraSelecionada === '#') {
        filtrados = filtrados.filter(livro => {
          if (!livro.titulo) return true;
          const primeiraLetra = livro.titulo.charAt(0).toLowerCase();
          return !(/[a-z]/i).test(primeiraLetra);
        });
      } else {
        filtrados = filtrados.filter(livro => livro.titulo && livro.titulo.toLowerCase().startsWith(letraSelecionada));
      }
    }
    _mostrarLivros(filtrados);
  }

  async function _carregarTodosLivros() {
    if (!container) {
      console.error("[pageLivros] ERRO CRÍTICO: Container #homeLivrosContainer NÃO ENCONTRADO no início de _carregarTodosLivros.");
      return;
    }
    container.innerHTML = '<p>Carregando livros...</p>';

    const token = localStorage.getItem('authToken');
    if (!token) {
      _handleAuthErrorPageLivros("Token não encontrado para carregar livros.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/categoria`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.status === 401) {
        _handleAuthErrorPageLivros("Não autorizado (401) ao buscar livros.");
        return;
      }
      if (!response.ok) {
        throw new Error(`Erro ${response.status} ao buscar dados dos livros.`);
      }

      const categorias = await response.json();

      todosOsLivrosDaPagina = [];
      categorias.forEach(categoria => {
        if (categoria.bookResponses && Array.isArray(categoria.bookResponses)) {
          categoria.bookResponses.forEach(livro => {
            livro.nomeCategoria = categoria.nome;
            todosOsLivrosDaPagina.push(livro);
          });
        }
      });


      if (todosOsLivrosDaPagina.length === 0) {
        container.innerHTML = '<p>Nenhum livro disponível no momento.</p>';
      } else {
        _mostrarLivros(todosOsLivrosDaPagina);
      }
    } catch (error) {
      console.error("[pageLivros] ERRO em _carregarTodosLivros:", error);
      container.innerHTML = `<p class="error">Erro ao carregar os livros: ${error.message}. Tente novamente.</p>`;
    }
  }

  if (inputPesquisa) {
    inputPesquisa.addEventListener('input', _filtrarLivros);
  } else {
    console.warn("[pageLivros] Elemento de input de pesquisa não encontrado.");
  }

  if (listaLetrasLinks.length > 0) {
    listaLetrasLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        listaLetrasLinks.forEach(l => l.classList.remove('ativo'));
        link.classList.add('ativo');
        _filtrarLivros();
      });
    });
  } else {
  }

  _carregarTodosLivros();
}