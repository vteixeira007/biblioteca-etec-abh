
export default function importCadastroLivros() {
  return new Promise((resolve) => {

    function showMessageLivro(message) {
      alert(message);
    }

    window.listarLivrosGlobais = async function () { 
      const token = localStorage.getItem('authToken');
      if (!token) {
        showMessageLivro("Sessão expirada ou inválida. Redirecionando para login.");
        window.location.href = 'login.html';
        return;
      }

      const listaDiv = document.getElementById('listaLivros');
      const button = document.getElementById('btnListarLivros');

      if (button) { button.textContent = 'Carregando...'; button.disabled = true; }
      if (listaDiv) listaDiv.innerHTML = 'Carregando livros...';

      try {
        const response = await fetch('https://biblioteca-etec-abh-2.onrender.com/categoria', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) throw new Error(`Erro ${response.status} ao buscar dados.`);
        
        const categorias = await response.json();

        if (listaDiv) {
          const table = document.createElement('table');
          table.className = 'tabela-categoria';

          const thead = document.createElement('thead');
          thead.innerHTML = `
            <tr>
              <th>ID</th> <th>Título</th> <th>Autor</th> <th>Assunto</th> <th>Código</th>
              <th>Qtd</th> <th>Status</th> <th>Categoria</th> <th>Ações</th>
            </tr>
          `;
          table.appendChild(thead);

          const tbody = document.createElement('tbody');
          let encontrouLivros = false;
          categorias.forEach((categoria) => {
            if (categoria.bookResponses && Array.isArray(categoria.bookResponses)) {
              categoria.bookResponses.forEach((livro) => {
                encontrouLivros = true;
                const tr = document.createElement('tr');
                tr.innerHTML = `
                  <td>${livro.idLivro || 'N/A'}</td>
                  <td>${livro.titulo || 'N/A'}</td>
                  <td>${livro.autor || 'N/A'}</td>
                  <td>${livro.assunto || 'N/A'}</td>
                  <td>${livro.codigo || 'N/A'}</td>
                  <td>${livro.quantidade || 'N/A'}</td>
                  <td>${livro.status || 'N/A'}</td>
                  <td>${livro.nomeCategoria || 'N/A'}</td>
                  <td>
                    <button class="btn-delete" onclick="window.deletarLivroGlobal(${livro.idLivro})"> 
                      Deletar
                    </button>
                  </td>
                `;
                tbody.appendChild(tr);
              });
            }
          });
          table.appendChild(tbody);

          listaDiv.innerHTML = '';
          if (encontrouLivros) {
              listaDiv.appendChild(table);
          } else {
              listaDiv.innerHTML = '<p>Nenhum livro encontrado.</p>';
          }
        }
      } catch (error) {
        console.error('Erro ao listar livros:', error);
        if (listaDiv) listaDiv.innerHTML = '<p class="error">Erro ao carregar a lista. Tente novamente.</p>';
      } finally {
        if (button) { button.textContent = 'Listar Livros'; button.disabled = false; }
      }
    }

    window.deletarLivroGlobal = async function (id) {
      const token = localStorage.getItem('authToken');
      if (!token) {
        showMessageLivro("Sessão expirada. Redirecionando para login.");
        window.location.href = 'login.html';
        return;
      }

      if (!confirm('Tem certeza que deseja deletar este livro?')) return;

      try {
        const response = await fetch(`https://biblioteca-etec-abh-2.onrender.com/livro/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) throw new Error(`Erro ${response.status} ao deletar livro.`);

        showMessageLivro('Livro deletado com sucesso!');
        await window.listarLivrosGlobais();

      } catch (error) {
        console.error('Erro ao deletar livro:', error);
        showMessageLivro('Erro ao deletar livro. Tente novamente.');
      }
    };

    function inicializarFormulario() {
      const token = localStorage.getItem('authToken');
      if (!token) {
          console.error("[CadastroLivros] ERRO CRÍTICO: Token não encontrado na inicialização.");
          showMessageLivro("Erro de autenticação. Tente fazer login novamente.");
          window.location.href = "login.html";
          return;
      }

      const categoriaSelect = document.getElementById('categoria-select');
      const livroForm = document.getElementById('livroForm');

      if (categoriaSelect) {
        fetch('https://biblioteca-etec-abh-2.onrender.com/categoria', {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(response => {
              if (!response.ok) throw new Error(`Erro ${response.status} ao carregar categorias.`);
              return response.json();
          })
          .then(categorias => {
            categoriaSelect.innerHTML = '<option value="">Selecione uma categoria</option>';
            categorias.forEach(categoria => {
              const option = document.createElement('option');
              option.value = categoria.idCategoria;
              option.textContent = categoria.nome;
              categoriaSelect.appendChild(option);
            });
          })
          .catch(error => {
            console.error('Erro ao carregar categorias:', error);
          });
      }

      if (livroForm) {
        livroForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const currentToken = localStorage.getItem('authToken');
          if (!currentToken) {
              showMessageLivro("Sessão expirada. Redirecionando para login.");
              window.location.href = "login.html";
              return;
          }

          const submitButton = livroForm.querySelector('button[type="submit"]');
          const originalButtonText = submitButton ? submitButton.textContent : 'Cadastrar';
          if(submitButton) { submitButton.disabled = true; submitButton.textContent = 'Enviando...'; }

          try {
            const campos = ['tituloLivro', 'autoresLivro', 'assuntoLivro', 'codigoLivro', 'quantidadeLivro'];
            let livroData = {};

            for (const campoId of campos) {
              const elemento = document.getElementById(campoId);
              if (!elemento || !elemento.value.trim()) {
                throw new Error(`Por favor, preencha o campo: ${elemento?.placeholder || campoId}`);
              }
            }
             if (!categoriaSelect || !categoriaSelect.value) {
                throw new Error('Por favor, selecione uma categoria');
             }

            livroData = {
              titulo: document.getElementById('tituloLivro').value.trim(),
              autor: document.getElementById('autoresLivro').value.trim(),
              assunto: document.getElementById('assuntoLivro').value.trim(),
              descricao: document.getElementById('descricaoLivro').value.trim() || 'Sem descrição',
              codigo: document.getElementById('codigoLivro').value.trim(),
              quantidade: parseInt(document.getElementById('quantidadeLivro').value, 10),
              status: 'DISPONIVEL',
              idCategoria: parseInt(categoriaSelect.value, 10)
            };

            if (livroData.codigo.length > 13) throw new Error('O código do livro não pode ter mais que 13 caracteres');
            if (isNaN(livroData.quantidade) || livroData.quantidade < 1) throw new Error('A quantidade deve ser um número maior que zero');

            const response = await fetch('https://biblioteca-etec-abh-2.onrender.com/livro', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentToken}`
              },
              body: JSON.stringify(livroData)
            });

            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(errorText || `Erro ${response.status} ao cadastrar livro`);
            }

            showMessageLivro('Livro cadastrado com sucesso!');
            livroForm.reset();
            await window.listarLivrosGlobais();

          } catch (error) {
            console.error('Erro ao cadastrar livro:', error);
            showMessageLivro(error.message || 'Erro ao cadastrar livro. Tente novamente.');
          } finally {
              if(submitButton) { submitButton.disabled = false; submitButton.textContent = originalButtonText; }
          }
        });
      }
    }


    const btnListarLivros = document.getElementById('btnListarLivros');
    if (btnListarLivros) {
      btnListarLivros.addEventListener('click', window.listarLivrosGlobais);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
          inicializarFormulario();
          window.listarLivrosGlobais();
      });
    } else {
      inicializarFormulario();
      window.listarLivrosGlobais();
    }

    resolve();
  });
}