export default function importAtualizacaoLivros() {
  return new Promise((resolve) => {
    let todosLivros = [];
    
    function inicializarFormulario() {
      const token = localStorage.getItem('authToken');
      if (!token) {
        window.location.href = 'login.html';
        return;
      }
      
      const categoriaSelect = document.getElementById('categoria-select');
      const atualizarLivroForm = document.getElementById('atualizarLivroForm');
      const pesquisarLivroInput = document.getElementById('pesquisarLivro');
      const sugestoesContainer = document.getElementById('sugestoes-livros');
      
                                                                                                                                   
      
      carregarTodosLivros();
      
      if (pesquisarLivroInput && sugestoesContainer) {
        pesquisarLivroInput.addEventListener('input', () => {
          const termoPesquisa = pesquisarLivroInput.value.trim().toLowerCase();
          
          sugestoesContainer.innerHTML = '';
          
          if (termoPesquisa.length < 2) {
            sugestoesContainer.style.display = 'none';
            return;
          }
          
          const livrosFiltrados = todosLivros.filter(livro => 
            livro.titulo.toLowerCase().includes(termoPesquisa) || 
            livro.codigo.toLowerCase().includes(termoPesquisa)
          );
          
          if (livrosFiltrados.length > 0) {
            sugestoesContainer.style.display = 'block';
            
            const resultadosLimitados = livrosFiltrados.slice(0, 6);
            
            resultadosLimitados.forEach(livro => {
              const sugestaoItem = document.createElement('div');
              sugestaoItem.className = 'sugestao-item';
              sugestaoItem.textContent = `${livro.titulo} (${livro.codigo})`;
              
              sugestaoItem.addEventListener('click', () => {
                pesquisarLivroInput.value = livro.titulo;
                sugestoesContainer.style.display = 'none';
                preencherFormulario(livro);
                atualizarLivroForm.style.display = 'block';
              });
              
              sugestoesContainer.appendChild(sugestaoItem);
            });
          } else {
            sugestoesContainer.style.display = 'none';
          }
        });
        
        document.addEventListener('click', (e) => {
          if (e.target !== pesquisarLivroInput && e.target !== sugestoesContainer) {
            sugestoesContainer.style.display = 'none';
          }
        });
        
        pesquisarLivroInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            const termoPesquisa = pesquisarLivroInput.value.trim().toLowerCase();
            
            if (termoPesquisa.length < 2) return;
            
            const livroEncontrado = todosLivros.find(livro => 
              livro.titulo.toLowerCase().includes(termoPesquisa) || 
              livro.codigo.toLowerCase() === termoPesquisa
            );
            
            if (livroEncontrado) {
              preencherFormulario(livroEncontrado);
              atualizarLivroForm.style.display = 'block';
              sugestoesContainer.style.display = 'none';
            } else {
              alert('Livro não encontrado. Verifique o título ou código digitado.');
            }
          }
        });
      }

      if (atualizarLivroForm) {
        atualizarLivroForm.addEventListener('submit', async (e) => {
          e.preventDefault();

          try {
            const livroId = document.getElementById('livroId').value;
            const campos = ['tituloLivro', 'autoresLivro', 'assuntoLivro', 'codigoLivro', 'quantidadeLivro'];
            
            for (const campo of campos) {
              const elemento = document.getElementById(campo);
              if (!elemento || !elemento.value.trim()) {
                throw new Error(`Por favor, preencha o campo ${campo.replace('Livro', '')}`);
              }
            }

            if (!categoriaSelect || !categoriaSelect.value) {
              throw new Error('Por favor, selecione uma categoria');
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

            if (livroData.codigo.length > 13) {
              throw new Error('O código do livro não pode ter mais que 13 caracteres');
            }

            if (isNaN(livroData.quantidade) || livroData.quantidade < 1) {
              throw new Error('A quantidade deve ser um número maior que zero');
            }

            const response = await fetch(`http://localhost:8090/livro/${livroId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(livroData)
            });

            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(errorText || 'Erro ao atualizar livro');
            }

            alert('Livro atualizado com sucesso!');
            atualizarLivroForm.reset();
            atualizarLivroForm.style.display = 'none';
            pesquisarLivroInput.value = '';

            carregarTodosLivros();
            
            if (typeof listarLivros === 'function') {
              listarLivros();
            }

          } catch (error) {
            console.error('Erro:', error);
            alert(error.message || 'Erro ao atualizar livro. Por favor, tente novamente.');
          }
        });
      }
    }
    
    async function carregarTodosLivros() {
      const token = localStorage.getItem('authToken');
      if (!token) return;
      
      try {
        const response = await fetch('http://localhost:8090/categoria', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`Erro ao buscar livros: ${response.status}`);
        }
        
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
        
      } catch (error) {
        console.error('Erro ao carregar livros:', error);
      }
    }

    function preencherFormulario(livro) {
      document.getElementById('livroId').value = livro.idLivro;
      document.getElementById('tituloLivro').value = livro.titulo || '';
      document.getElementById('autoresLivro').value = livro.autor || '';
      document.getElementById('assuntoLivro').value = livro.assunto || '';
      document.getElementById('descricaoLivro').value = livro.descricao || '';
      document.getElementById('codigoLivro').value = livro.codigo || '';
      document.getElementById('quantidadeLivro').value = livro.quantidade || 1;
      
      const categoriaSelect = document.getElementById('categoria-select');
      if (categoriaSelect) {
        if (livro.idCategoria) {
          for (let i = 0; i < categoriaSelect.options.length; i++) {
            if (categoriaSelect.options[i].value == livro.idCategoria) {
              categoriaSelect.selectedIndex = i;
              break;
            }
          }
        } 
        else if (livro.nomeCategoria) {
          for (let i = 0; i < categoriaSelect.options.length; i++) {
            if (categoriaSelect.options[i].textContent === livro.nomeCategoria) {
              categoriaSelect.selectedIndex = i;
              break;
            }
          }
        }
      }

      const statusSelect = document.getElementById('statusLivro');
      if (statusSelect && livro.status) {
        for (let i = 0; i < statusSelect.options.length; i++) {
          if (statusSelect.options[i].value === livro.status) {
            statusSelect.selectedIndex = i;
            break;
          }
        }
      }
    }

    async function listarLivros() {
      const token = localStorage.getItem('authToken');
      if (!token) {
        window.location.href = 'login.html';
        return;
      }

      const listaDiv = document.getElementById('listaLivros');
      const button = document.getElementById('btnListarLivros');

      if (button) {
        button.textContent = 'Carregando...';
        button.disabled = true;
      }

      try {
        const response = await fetch(
          'http://localhost:8090/categoria',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (!response.ok) {
          throw new Error(`Erro ao buscar categorias: ${response.status}`);
        }

        const categorias = await response.json();

        if (listaDiv) {
          const table = document.createElement('table');
          table.className = 'tabela-categoria';

          const thead = document.createElement('thead');
          thead.innerHTML = `
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Assunto</th>
              <th>Código</th>
              <th>Qtd</th>
              <th>Status</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          `;
          table.appendChild(thead);

          const tbody = document.createElement('tbody');
          let livrosEncontrados = false;

          categorias.forEach((categoria) => {
            if (categoria.bookResponses && Array.isArray(categoria.bookResponses)) {
              categoria.bookResponses.forEach((livro) => {
                livrosEncontrados = true;
                const tr = document.createElement('tr');
                tr.innerHTML = `
                  <td>${livro.idLivro}</td>
                  <td>${livro.titulo}</td>
                  <td>${livro.autor}</td>
                  <td>${livro.assunto}</td>
                  <td>${livro.codigo}</td>
                  <td>${livro.quantidade}</td>
                  <td>${livro.status}</td>
                  <td>${livro.nomeCategoria}</td>
                  <td>
                    <button class="button-update" onclick="selecionarLivroParaAtualizar(${livro.idLivro})">
                      Editar
                    </button>
                  </td>
                `;
                tbody.appendChild(tr);
              });
            }
          });
          
          table.appendChild(tbody);

          listaDiv.innerHTML = '';
          if (livrosEncontrados) {
            listaDiv.appendChild(table);
          } else {
            listaDiv.innerHTML = '<p>Nenhum livro encontrado.</p>';
          }
        }
      } catch (error) {
        console.error('Erro:', error);
        if (listaDiv) {
          listaDiv.innerHTML =
            '<p>Erro ao carregar a lista de livros. Por favor, tente novamente.</p>';
        }
      } finally {
        if (button) {
          button.textContent = 'Listar Todos os Livros';
          button.disabled = false;
        }
      }
    }

    window.selecionarLivroParaAtualizar = async function(idLivro) {
      const token = localStorage.getItem('authToken');
      if (!token) {
        window.location.href = 'login.html';
        return;
      }

      try {
        const response = await fetch('http://localhost:8090/categoria', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Erro ao buscar livros: ${response.status}`);
        }

        const categorias = await response.json();
        let livroEncontrado = null;

        categorias.forEach(categoria => {
          if (categoria.bookResponses && Array.isArray(categoria.bookResponses)) {
            categoria.bookResponses.forEach(livro => {
              if (livro.idLivro === idLivro) {
                livroEncontrado = livro;
              }
            });
          }
        });

        if (livroEncontrado) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          
          setTimeout(() => {
            preencherFormulario(livroEncontrado);
            document.getElementById('atualizarLivroForm').style.display = 'block';
          }, 500);
        } else {
          alert('Livro não encontrado.');
        }

      } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao selecionar livro para atualização. Por favor, tente novamente.');
      }
    };

    const btnListarLivros = document.getElementById('btnListarLivros');
    if (btnListarLivros) {
      btnListarLivros.addEventListener('click', listarLivros);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', inicializarFormulario);
    } else {
      inicializarFormulario();
    }

    resolve();
  });
}

if (typeof window !== 'undefined') {
  importAtualizacaoLivros();
}