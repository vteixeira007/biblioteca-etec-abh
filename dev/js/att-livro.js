
export default function importAtualizacaoLivros() {
  return new Promise((resolve) => {
    const API_BASE_URL = 'https://biblioteca-etec-abh-2.onrender.com';

    let todosLivros = [];

    const categoriaSelect = document.getElementById('categoria-select');
    const atualizarLivroForm = document.getElementById('atualizarLivroForm');
    const pesquisarLivroInput = document.getElementById('pesquisarLivro');
    const sugestoesContainer = document.getElementById('sugestoes-livros');
    const listaLivrosDiv = document.getElementById('listaLivros');
    const btnListarLivros = document.getElementById('btnListarLivros');

    function showMessageAttLivro(message, isError = false) {
      alert(message);
    }

    function handleAuthErrorAttLivro() {
        showMessageAttLivro("Sessão expirada ou inválida. Faça login novamente.", true);
        window.location.href = 'login.html';
    }


    async function carregarTodosLivros() {
      const token = localStorage.getItem('authToken');
      if (!token) return handleAuthErrorAttLivro();

      try {
        const response = await fetch(`${API_BASE_URL}/categoria`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.status === 401) return handleAuthErrorAttLivro();
        if (!response.ok) throw new Error(`Erro ${response.status} ao buscar.`);
        
        const categorias = await response.json();
        todosLivros = [];

        categorias.forEach(categoria => {
          if (categoria.bookResponses && Array.isArray(categoria.bookResponses)) {
            categoria.bookResponses.forEach(livro => {
              livro.nomeCategoria = categoria.nome;
              livro.idCategoria = categoria.idCategoria;
              todosLivros.push(livro);
            });
          }
        });
        if(categoriaSelect) carregarCategoriasSelect(categorias, token);

      } catch (error) {
        console.error('Erro ao carregar todos os livros:', error);
      }
    }
    
    async function carregarCategoriasSelect(categorias, token) {
        if (categorias && categorias.length > 0) {
            popularDropdownCategoriasLivro(categorias, categoriaSelect);
        } else {
             if (!token) token = localStorage.getItem('authToken');
             if (!token) return handleAuthErrorAttLivro();
             try {
                const response = await fetch(`${API_BASE_URL}/categoria`, {
                  headers: { Authorization: `Bearer ${token}` }
                });
                if (response.status === 401) return handleAuthErrorAttLivro();
                if (!response.ok) throw new Error(`Erro ${response.status} ao buscar categorias.`);
                const cats = await response.json();
                popularDropdownCategoriasLivro(cats, categoriaSelect);
             } catch(error) {
             }
        }
    }
    
    function popularDropdownCategoriasLivro(categorias, selectElement) {
        selectElement.innerHTML = '<option value="">Selecione uma categoria</option>';
        categorias.forEach(categoria => {
          const option = document.createElement('option');
          option.value = categoria.idCategoria;
          option.textContent = categoria.nome;
          selectElement.appendChild(option);
        });
    }


    function preencherFormulario(livro) {
        if (!atualizarLivroForm) return;

        document.getElementById('livroId').value = livro.idLivro;
        document.getElementById('tituloLivro').value = livro.titulo || '';
        document.getElementById('autoresLivro').value = livro.autor || '';
        document.getElementById('assuntoLivro').value = livro.assunto || '';
        document.getElementById('descricaoLivro').value = livro.descricao || '';
        document.getElementById('codigoLivro').value = livro.codigo || '';
        document.getElementById('quantidadeLivro').value = livro.quantidade || 1;

        if (categoriaSelect && livro.idCategoria) {
            categoriaSelect.value = livro.idCategoria;
        }

        const statusSelect = document.getElementById('statusLivro');
        if (statusSelect && livro.status) {
            statusSelect.value = livro.status;
        }
        
        atualizarLivroForm.style.display = 'block';
    }

    async function handleAtualizarSubmit(e) {
      e.preventDefault();
      const token = localStorage.getItem('authToken');
      if (!token) return handleAuthErrorAttLivro();

      const livroId = document.getElementById('livroId').value;
      if (!livroId) {
          showMessageAttLivro("Nenhum livro selecionado para atualizar.", true);
          return;
      }
      
      if (!document.getElementById('tituloLivro').value.trim()) {
          showMessageAttLivro("O título é obrigatório.", true);
          return;
      }

      const livroData = {
        idLivro: parseInt(livroId, 10),
        titulo: document.getElementById('tituloLivro').value.trim(),
        autor: document.getElementById('autoresLivro').value.trim(),
        assunto: document.getElementById('assuntoLivro').value.trim(),
        descricao: document.getElementById('descricaoLivro').value.trim() || 'Sem descrição',
        codigo: document.getElementById('codigoLivro').value.trim(),
        quantidade: parseInt(document.getElementById('quantidadeLivro').value, 10),
        status: document.getElementById('statusLivro').value,
        idCategoria: parseInt(categoriaSelect.value, 10)
      };

      const submitButton = atualizarLivroForm.querySelector('button[type="submit"]');
      const buttonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Atualizando...';

      try {
        const response = await fetch(`${API_BASE_URL}/livro/${livroId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(livroData)
        });

        if (response.status === 401) return handleAuthErrorAttLivro();
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || `Erro ${response.status} ao atualizar.`);
        }

        showMessageAttLivro('Livro atualizado com sucesso!');
        atualizarLivroForm.reset();
        atualizarLivroForm.style.display = 'none';
        if(pesquisarLivroInput) pesquisarLivroInput.value = '';

        await carregarTodosLivros();
        await listarLivrosGlobaisAtt();

      } catch (error) {
        console.error('Erro ao atualizar livro:', error);
        showMessageAttLivro(`Erro ao atualizar: ${error.message}`, true);
      } finally {
          submitButton.disabled = false;
          submitButton.textContent = buttonText;
      }
    }
    
    
    window.listarLivrosGlobaisAtt = async function () { 
      const token = localStorage.getItem('authToken');
      if (!token) return handleAuthErrorAttLivro();

      if (!listaLivrosDiv) return;

      if (btnListarLivros) { btnListarLivros.textContent = 'Carregando...'; btnListarLivros.disabled = true; }
      listaLivrosDiv.innerHTML = 'Carregando livros...';

      try {
        if (todosLivros.length === 0) {
            await carregarTodosLivros(); 
        }

        const table = document.createElement('table');
        table.className = 'tabela-categoria'; 
        table.innerHTML = `
          <thead>
            <tr>
              <th>ID</th> <th>Título</th> <th>Autor</th> <th>Código</th>
              <th>Qtd</th> <th>Status</th> <th>Categoria</th> <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${todosLivros.map(livro => `
              <tr>
                <td>${livro.idLivro || 'N/A'}</td>
                <td>${livro.titulo || 'N/A'}</td>
                <td>${livro.autor || 'N/A'}</td>
                <td>${livro.codigo || 'N/A'}</td>
                <td>${livro.quantidade || 'N/A'}</td>
                <td>${livro.status || 'N/A'}</td>
                <td>${livro.nomeCategoria || 'N/A'}</td>
                <td>
                  <button class="btn-edit" onclick="window.selecionarLivroParaAtualizarGlobal(${livro.idLivro})"> 
                    Editar
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        `;
        
        listaLivrosDiv.innerHTML = '';
        if (todosLivros.length > 0) {
            listaLivrosDiv.appendChild(table);
        } else {
            listaLivrosDiv.innerHTML = '<p>Nenhum livro encontrado.</p>';
        }

      } catch (error) {
        console.error('Erro ao listar livros:', error);
        listaLivrosDiv.innerHTML = '<p class="error">Erro ao carregar a lista. Tente novamente.</p>';
      } finally {
        if (btnListarLivros) { btnListarLivros.textContent = 'Listar Todos'; btnListarLivros.disabled = false; }
      }
    }

    window.selecionarLivroParaAtualizarGlobal = function(idLivro) {
        const livro = todosLivros.find(l => l.idLivro === idLivro);
        
        if (livro) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            preencherFormulario(livro);
        } else {
            showMessageAttLivro(`Livro com ID ${idLivro} não encontrado na lista local. Tente recarregar.`, true);
        }
    }


    function inicializar() {        
        const token = localStorage.getItem('authToken');
        if (!token) return handleAuthErrorAttLivro();

        carregarTodosLivros().then(() => {
             listarLivrosGlobaisAtt();
        });

        if (pesquisarLivroInput && sugestoesContainer) {
            pesquisarLivroInput.addEventListener('input', () => {
                const termo = pesquisarLivroInput.value.trim().toLowerCase();
                sugestoesContainer.innerHTML = '';
                if (termo.length < 2) {
                    sugestoesContainer.style.display = 'none';
                    return;
                }
                const filtrados = todosLivros.filter(l => l.titulo.toLowerCase().includes(termo) || l.codigo.toLowerCase().includes(termo));
                if (filtrados.length > 0) {
                    sugestoesContainer.style.display = 'block';
                    filtrados.slice(0, 6).forEach(livro => {
                        const item = document.createElement('div');
                        item.className = 'sugestao-item';
                        item.textContent = `${livro.titulo} (${livro.codigo})`;
                        item.onclick = () => {
                            pesquisarLivroInput.value = livro.titulo;
                            sugestoesContainer.style.display = 'none';
                            preencherFormulario(livro);
                        };
                        sugestoesContainer.appendChild(item);
                    });
                } else {
                    sugestoesContainer.style.display = 'none';
                }
            });
        }

        if (atualizarLivroForm) {
            atualizarLivroForm.addEventListener('submit', handleAtualizarSubmit);
        }
        
        if (btnListarLivros) {
            btnListarLivros.addEventListener('click', listarLivrosGlobaisAtt);
        }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', inicializar);
    } else {
      inicializar();
    }

    resolve();
  });
}

