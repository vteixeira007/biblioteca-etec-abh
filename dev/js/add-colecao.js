export default function addCategoria() {
  return new Promise((resolve) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert("Você precisa estar logado para acessar esta página.");
      window.location.href = "login.html";
      return;
    }

    function validarCampos() {
      const nomeCategoria = document
        .getElementById('nomeCategoria')
        .value.trim();

      if (!nomeCategoria) {
        showMessage('Por favor, preencha o nome da categoria.');
        return false;
      }

      if (nomeCategoria.length > 40) {
        showMessage('O nome da categoria deve ter no máximo 40 caracteres.');
        return false;
      }

      return true;
    }

    function showMessage(message) {
      alert(message);
    }

    const formCadastroCategorias = document.getElementById('formCadastroCategorias');

    if (formCadastroCategorias) {
      formCadastroCategorias.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitButton = this.querySelector('button[type="submit"]');
        const buttonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Cadastrando...';

        if (!validarCampos()) {
          submitButton.disabled = false;
          submitButton.textContent = buttonText;
          return;
        }

        const dadosCategoria = {
          nome: document.getElementById('nomeCategoria').value.trim(),
        };

        try {
          const response = await fetch('http://localhost:8090/categoria', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(dadosCategoria),
          });

          const responseData = await response.text();

          if (!response.ok) {
            throw new Error(`Erro ao cadastrar: ${response.status} - ${responseData}`);
          }

          if (responseData) {
            try {
              JSON.parse(responseData);
            } catch (e) {
              console.log('Resposta não é JSON, mas requisição foi bem-sucedida');
            }
          }

          showMessage('Categoria cadastrada com sucesso!');
          this.reset();
          await listarCategorias();
        } catch (error) {
          console.error('Erro:', error);
          showMessage(`Erro ao cadastrar categoria. ${error.message}`);
        } finally {
          submitButton.disabled = false;
          submitButton.textContent = buttonText;
        }
      });
    }

    window.deletarCategoria = async function (idCategoria) {
      if (!confirm('Tem certeza que deseja deletar esta categoria?')) {
        return;
      }

      try {
        const response = await fetch(`http://localhost:8090/categoria/${idCategoria}`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });

        if (!response.ok) {
          throw new Error(`Erro ao deletar categoria: ${response.status}`);
        }

        alert('Categoria deletada com sucesso!');
        if (typeof listarCategorias === 'function') {
          await listarCategorias();
        }
      } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao deletar categoria. Por favor, tente novamente.');
      }
    };

    async function listarCategorias() {
      const listaDiv = document.getElementById('listaCategorias');
      const button = document.getElementById('btnListarCategorias');

      if (button) {
        button.textContent = 'Carregando...';
        button.disabled = true;
      }

      try {
        const response = await fetch('http://localhost:8090/categoria', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });

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
              <th>Ações</th>
            </tr>
          `;
          table.appendChild(thead);

          const tbody = document.createElement('tbody');
          categorias.forEach((categoria) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
              <td>${categoria.idCategoria}</td>
              <td>${categoria.nome}</td>
              <td>
                <button onclick="deletarCategoria(${categoria.idCategoria})" class="btn-delete">
                  Deletar
                </button>
              </td>
            `;
            tbody.appendChild(tr);
          });
          table.appendChild(tbody);

          listaDiv.innerHTML = '';
          listaDiv.appendChild(table);
        }
      } catch (error) {
        console.error('Erro:', error);
        if (listaDiv) {
          listaDiv.innerHTML = '<p class="error">Erro ao carregar a lista de categorias. Por favor, tente novamente.</p>';
        }
      } finally {
        if (button) {
          button.textContent = 'Listar Categorias';
          button.disabled = false;
        }
      }
    }

    const btnListarCategorias = document.getElementById('btnListarCategorias');
    if (btnListarCategorias) {
      btnListarCategorias.addEventListener('click', listarCategorias);
    }

    resolve();
  });
}
