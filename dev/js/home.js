export default function pageLivros() {
  let todosLivros = [];

  const container = document.getElementById('homeLivrosContainer');
  const inputPesquisa = document.querySelector('.home-pesquisa_input');
  const listaLetras = document.querySelectorAll('.home-pesquisa_alfabeto ul li a');
  const letraAll = document.querySelector('.home-pesquisa_alfabeto--all');

  async function carregarTodosLivros() {
    container.innerHTML = '<p>Carregando livros...</p>';
    try {
      const response = await fetch('http://localhost:8090/categoria');
      if (!response.ok) throw new Error('Erro ao buscar livros');
      const categorias = await response.json();

      todosLivros = [];
      categorias.forEach(categoria => {
        if (categoria.bookResponses && Array.isArray(categoria.bookResponses)) {
          categoria.bookResponses.forEach(livro => {
            livro.nomeCategoria = categoria.nomeCategoria; 
            todosLivros.push(livro);
          });
        }
      });

      if (todosLivros.length === 0) {
        container.innerHTML = '<p>Nenhum livro disponível.</p>';
      } else {
        mostrarLivros(todosLivros);
      }      
    } catch (error) {
      console.error(error);
      container.innerHTML = '<p>Erro ao carregar os livros. Tente novamente.</p>';
    }
  }

function mostrarLivros(livros) {
  container.innerHTML = '';

  if (livros.length === 0) {
    container.innerHTML = '<p>Nenhum livro encontrado.</p>';
    return;
  }

  const livrosPorLetra = {};

  livros.forEach(livro => {
    let primeiraLetra = livro.titulo.charAt(0).toUpperCase();

    if (!primeiraLetra.match(/[A-Z]/)) primeiraLetra = '#';

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

    letraDiv.innerHTML = `
      <span>${letra}</span>
      <div class="line"></div>
    `;
    

    container.appendChild(letraDiv);

    const livrosDiv = document.createElement('div');
    livrosDiv.classList.add('home-content_livros');

    livrosPorLetra[letra].forEach(livro => {
      const livroDiv = document.createElement('div');
      livroDiv.classList.add('home-content_livro');

      livroDiv.innerHTML = `
        <a class="home-content_capa-link" href="descricao-livro.html?idLivro=${livro.idLivro}">
          <div class="home-content_capa">
            <img src="./assets/images/capa.jpg" alt="Capa do livro ${livro.titulo}">
            <div class="overlay">
              <img src="./assets/images/icons/info.svg" alt="Informações do livro">
            </div>
          </div>
        </a>
        <span class="home-content_livro-titulo">${livro.titulo}</span>
        <span class="home-content_livro-descricao">${livro.autor}</span>
      `;

      livrosDiv.appendChild(livroDiv);
    });

    container.appendChild(livrosDiv);
  });
}

  function filtrarLivros() {
    const textoPesquisa = inputPesquisa.value.trim().toLowerCase();
    const letraSelecionada = document.querySelector('.home-pesquisa_alfabeto ul li a.ativo')?.textContent.toLowerCase();

    let filtrados = todosLivros;

    if (textoPesquisa) {
      filtrados = filtrados.filter(livro => 
        livro.titulo.toLowerCase().includes(textoPesquisa) ||
        livro.autor.toLowerCase().includes(textoPesquisa)
      );
    }

    if (letraSelecionada && letraSelecionada !== 'todos') {
      if (letraSelecionada === '#') {
        filtrados = filtrados.filter(livro => {
          const primeiraLetra = livro.titulo.charAt(0).toLowerCase();
          return !(/[a-z]/).test(primeiraLetra);
        });
      } else {
        filtrados = filtrados.filter(livro => livro.titulo.toLowerCase().startsWith(letraSelecionada));
      }
    }

    mostrarLivros(filtrados);
  }


  inputPesquisa.addEventListener('input', filtrarLivros);

  listaLetras.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      listaLetras.forEach(l => l.classList.remove('ativo'));

      link.classList.add('ativo');


      filtrarLivros();
    });
  });

  document.addEventListener('DOMContentLoaded', carregarTodosLivros);
}