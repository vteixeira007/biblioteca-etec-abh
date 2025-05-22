export default function importCadastroLivros() {
  return new Promise((resolve) => {
    function inicializarFormulario() {
      const token = localStorage.getItem('authToken');
      if (!token) {
        window.location.href = 'login.html';
        return;
      }

      const categoriaSelect = document.getElementById('categoria-select');
      const livroForm = document.getElementById('livroForm');

      if (categoriaSelect) {
        fetch('http://localhost:8090/categoria', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(response => response.json())
          .then(categorias => {
            categorias.forEach(categoria => {
              const option = document.createElement('option');
              option.value = categoria.idCategoria;
              option.textContent = categoria.nome;
              categoriaSelect.appendChild(option);
            });
          })
          .catch(error => {
            console.error('Erro ao carregar categorias:', error);
            if (livroForm) {
              alert('Erro ao carregar categorias. Por favor, tente novamente.');
            }
          });
      }

      if (livroForm) {
        livroForm.addEventListener('submit', async (e) => {
          e.preventDefault();

          try {
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
              titulo: document.getElementById('tituloLivro').value.trim(),
              autor: document.getElementById('autoresLivro').value.trim(),
              assunto: document.getElementById('assuntoLivro').value.trim(),
              descricao: document.getElementById('descricaoLivro').value.trim() || 'Sem descrição',
              codigo: document.getElementById('codigoLivro').value.trim(),
              quantidade: parseInt(document.getElementById('quantidadeLivro').value, 10),
              status: 'DISPONIVEL',
              idCategoria: parseInt(categoriaSelect.value, 10)
            };

            if (livroData.codigo.length > 13) {
              throw new Error('O código do livro não pode ter mais que 13 caracteres');
            }

            if (isNaN(livroData.quantidade) || livroData.quantidade < 1) {
              throw new Error('A quantidade deve ser um número maior que zero');
            }

            const token = localStorage.getItem('authToken');

            const response = await fetch('http://localhost:8090/livro', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(livroData)
            });

            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(errorText || 'Erro ao cadastrar livro');
            }

            alert('Livro cadastrado com sucesso!');
            livroForm.reset();

            if (typeof listarLivros === 'function') {
              listarLivros();
            }

          } catch (error) {
            console.error('Erro:', error);
            alert(error.message || 'Erro ao cadastrar livro. Por favor, tente novamente.');
          }
        });
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', inicializarFormulario);
    } else {
      inicializarFormulario();
    }

    window.deletarLivro = async function (id) {
      const token = localStorage.getItem('authToken');
      if (!token) {
        window.location.href = 'login.html';
        return;
      }

      if (!confirm('Tem certeza que deseja deletar este livro?')) return;

      try {
        const response = await fetch(`http://localhost:8090/livro/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Erro ao deletar livro: ${response.status}`);
        }

        alert('Livro deletado com sucesso!');
        if (typeof listarLivros === 'function') {
          listarLivros();
        }
      } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao deletar livro. Por favor, tente novamente.');
      }
    };

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
              <th>Nome</th>
              <th>Autor</th>
              <th>Assunto</th>
              <th>Descrição</th>
              <th>Código</th>
              <th>quantidade</th>
              <th>status</th>
              <th>nomeCategoria</th>
              <th>dataCriacao</th>
              <th>Data de Atualização</th>
              <th>Ações</th>
            </tr>
          `;
          table.appendChild(thead);

          const tbody = document.createElement('tbody');
          categorias.forEach((categoria) => {
            if (categoria.bookResponses && Array.isArray(categoria.bookResponses)) {
              categoria.bookResponses.forEach((livro) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                  <td>${livro.idLivro}</td>
                  <td>${livro.titulo}</td>
                  <td>${livro.autor}</td>
                  <td>${livro.assunto}</td>
                  <td>${livro.descricao}</td>
                  <td>${livro.codigo}</td>
                  <td>${livro.quantidade}</td>
                  <td>${livro.status}</td>
                  <td>${livro.nomeCategoria}</td>
                  <td>${livro.dataCriacao}</td>
                  <td>${livro.dataAtuallizacao || 'N/A'}</td>
                  <td>
                    <button class="button-delete" onclick="deletarLivro(${livro.idLivro})">
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
          listaDiv.appendChild(table);
        }
      } catch (error) {
        console.error('Erro:', error);
        if (listaDiv) {
          listaDiv.innerHTML =
            '<p>Erro ao carregar a lista de categorias. Por favor, tente novamente.</p>';
        }
      } finally {
        if (button) {
          button.textContent = 'Listar Livros';
          button.disabled = false;
        }
      }
    }

    const btnListarCategorias = document.getElementById('btnListarLivros');
    if (btnListarCategorias) {
      btnListarCategorias.addEventListener('click', listarLivros);
    }

    resolve();
  });
}
