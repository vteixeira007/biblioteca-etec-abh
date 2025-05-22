export default function importDescricaoLivros() {
  async function carregarLivros() {
    const container = document.getElementById('livrosContainer');
    container.innerHTML = '<p>Carregando livro...</p>';

    const urlParams = new URLSearchParams(window.location.search);
    const idLivroParam = urlParams.get('idLivro');

    if (!idLivroParam) {
      container.innerHTML = '<p>Livro não especificado.</p>';
      return;
    }

    try {
      const response = await fetch('http://localhost:8090/categoria');
      if (!response.ok) throw new Error('Erro ao buscar livros');
      const categorias = await response.json();

      container.innerHTML = '';

      let livroEncontrado = null;

      categorias.forEach(categoria => {
        if (categoria.bookResponses && Array.isArray(categoria.bookResponses)) {
          categoria.bookResponses.forEach(livro => {
            if (livro.idLivro.toString() === idLivroParam) {
              livroEncontrado = livro;
            }
          });
        }
      });

      if (!livroEncontrado) {
        container.innerHTML = '<p>Livro não encontrado.</p>';
        return;
      }

      container.innerHTML = `
        <div class="livro-content">
          <div class="livro-content_banner">
            <div class="livro-content_image">
              <img src="./assets/images/capa.jpg" alt="Capa do livro ${livroEncontrado.titulo}" />
            </div>
            <div class="livro-content_tag">
              <span>${livroEncontrado.status === 'DISPONIVEL' ? 'Disponível' : livroEncontrado.status}</span>
            </div>
          </div>
          <div class="livro-content_text">
            <div class="livro-content_text-categoria">
              <h3>${livroEncontrado.nomeCategoria}</h3>
              <span>${livroEncontrado.assunto || 'Sem assunto'}</span>
            </div>
            <h1>${livroEncontrado.titulo}</h1>
            <h2>${livroEncontrado.autor}</h2>
            <div class="livro-content_submenu">
              <div class="livro-content_submenu-numbers">
                <span class="livro-content_submenu_subtitulo_number_ano">${new Date(livroEncontrado.dataCriacao).getFullYear() || '-'}</span>
                <span class="livro-content_submenu-numbers-pages"><span>--</span> páginas</span> 
                <span class="livro-content_submenu-numbers-editora">(Editora)</span>
              </div>
              <div class="livro-content_submenu-codes">
                <span class="livro-content_submenu-codes-isbn13"><span>EAN / ISBN13:</span> ${livroEncontrado.codigo}</span>
              </div>
              <div class="livro-content_submenu-data">
                <span class="livro-content_submenu-data-add">Adicionado em: ${new Date(livroEncontrado.dataCriacao).toLocaleDateString() || '-'}</span>
                <span class="livro-content_submenu-data-att">Atualizado em: ${livroEncontrado.dataAtuallizacao ? new Date(livroEncontrado.dataAtuallizacao).toLocaleDateString() : '-'}</span>
              </div>
              <span class="livro-content_submenu-copias">Cópias: <span>${livroEncontrado.quantidade}</span></span>
            </div>
            <div class="subtitulo page-livro">
              <span class="subtitulo-text">Descrição</span>
              <div class="line subtitulo"></div>
            </div>
            <div class="livro-content_text-description">
              <p>${livroEncontrado.descricao || 'Sem descrição'}</p>
            </div>
          </div>
        </div>
      `;
    } catch (error) {
      console.error(error);
      container.innerHTML = '<p>Erro ao carregar o livro. Tente novamente.</p>';
    }
  }

  document.addEventListener('DOMContentLoaded', carregarLivros);
}