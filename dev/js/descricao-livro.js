
export default function importDescricaoLivros() {
async function carregarLivros() {
  const container = document.getElementById('livrosContainer');
  container.innerHTML = '<p>Carregando livros...</p>';
  try {
    // Buscar os livros na API, aqui você pode usar o endpoint correto
    // Pelo seu código, os livros estão dentro das categorias em /categoria
    const response = await fetch('https://biblioteca-etec-abh-2.onrender.com/categoria');
    if (!response.ok) throw new Error('Erro ao buscar livros');
    const categorias = await response.json();

    // Limpa container antes de preencher
    container.innerHTML = '';

    // Percorrer todas as categorias e seus livros para montar os cards
    categorias.forEach(categoria => {
      if (categoria.bookResponses && Array.isArray(categoria.bookResponses)) {
        categoria.bookResponses.forEach(livro => {
          // Criar um elemento div para o livro
          const livroDiv = document.createElement('div');
          livroDiv.classList.add('livro-content');

          // Montar o HTML do livro (exemplo simples, adapte conforme seu layout)
          livroDiv.innerHTML = `
              <div class="livro-content_banner">
                <div class="livro-content_image">
                  <img src="./assets/images/capa.jpg" alt="Capa do livro ${livro.titulo}" />
                </div>
                <div class="livro-content_tag">
                  <span>${livro.status === 'DISPONIVEL' ? 'Disponível' : livro.status}</span>
                </div>
              </div>
              <div class="livro-content_text">
                <div class="livro-content_text-categoria">
                  <h3>${livro.nomeCategoria}</h3>
                  <span>${livro.assunto || 'Sem assunto'}</span>
                </div>
                <h1>${livro.titulo}</h1>
                <h2>${livro.autor}</h2>
                <div class="livro-content_submenu">
                  <div class="livro-content_submenu-numbers">
                    <span class="livro-content_submenu_subtitulo_number_ano">${new Date(livro.dataCriacao).getFullYear() || '-'}</span>
                    <span class="livro-content_submenu-numbers-pages"><span>--</span> páginas</span> <!-- Se tiver página, adicione -->
                    <span class="livro-content_submenu-numbers-editora">(Editora)</span>
                  </div>
                  <div class="livro-content_submenu-codes">
                    <span class="livro-content_submenu-codes-isbn13"><span>EAN / ISBN13:</span>${livro.codigo}</span>
                    <span class="livro-content_submenu-codes-isbn10"><span>UPC / ISBN10:</span> -- </span>
                  </div>
                  <div class="livro-content_submenu-data">
                    <span class="livro-content_submenu-data-add">Adicionado em: ${new Date(livro.dataCriacao).toLocaleDateString() || '-'}</span>
                    <span class="livro-content_submenu-data-att">Atualizado em: ${livro.dataAtuallizacao ? new Date(livro.dataAtuallizacao).toLocaleDateString() : '-'}</span>
                  </div>
                  <span class="livro-content_submenu-copias">Cópias: <span>${livro.quantidade}</span></span>
                </div>
                <div class="subtitulo page-livro">
                  <span class="subtitulo-text">Descrição</span>
                  <div class="line subtitulo"></div>
                </div>
                <div class="livro-content_text-description">
                  <p>${livro.descricao || 'Sem descrição'}</p>
                </div>
              </div>
            `;

          container.appendChild(livroDiv);
        });
      }
    });

    if (!container.hasChildNodes()) {
      container.innerHTML = '<p>Nenhum livro encontrado.</p>';
    }
  } catch (error) {
    console.error(error);
    container.innerHTML = '<p>Erro ao carregar os livros. Tente novamente.</p>';
  }
}

  document.addEventListener('DOMContentLoaded', carregarLivros);
}