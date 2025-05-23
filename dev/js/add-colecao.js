
export default function addCategoria() {
  return new Promise((resolve) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error("[AddCategoria] ERRO CRÍTICO: Token não encontrado. Isso não deveria acontecer. Redirecionando...");
      alert("Ocorreu um erro de autenticação. Tente fazer login novamente.");
      window.location.href = "login.html";
      return;
    }

    function showMessage(message) {
      alert(message);
    }

    function validarCampos() {
      const nomeCategoria = document.getElementById('nomeCategoria').value.trim();
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

    const formCadastroCategorias = document.getElementById('formCadastroCategorias');

    async function listarCategorias() {
      const currentToken = localStorage.getItem('authToken');
      if (!currentToken) {
        showMessage("Sessão perdida. Redirecionando para login.");
        window.location.href = "login.html";
        return;
      }

      const listaDiv = document.getElementById('listaCategorias');
      const button = document.getElementById('btnListarCategorias');

      if (button) { button.textContent = 'Carregando...'; button.disabled = true; }

      try {
        const response = await fetch('http://localhost:8090/categoria', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${currentToken}` }
        });

        if (!response.ok) throw new Error(`Erro ${response.status} ao buscar categorias.`);

        const categorias = await response.json();

        if (listaDiv) {
          const table = document.createElement('table');
          table.className = 'tabela-categoria';
          table.innerHTML = `
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              ${categorias.map(categoria => `
                <tr>
                  <td>${categoria.idCategoria}</td>
                  <td>${categoria.nome}</td>
                  <td>
                    <button onclick="window.deletarCategoriaGlobais(${categoria.idCategoria})" class="btn-delete">
                      Deletar
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          `;
          listaDiv.innerHTML = '';
          listaDiv.appendChild(table);
        }
      } catch (error) {
        console.error('Erro ao listar:', error);
        if (listaDiv) listaDiv.innerHTML = '<p class="error">Erro ao carregar a lista.</p>';
      } finally {
        if (button) { button.textContent = 'Listar Categorias'; button.disabled = false; }
      }
    }

    window.deletarCategoriaGlobais = async function (idCategoria) {
      const currentToken = localStorage.getItem('authToken');
      if (!currentToken) {
        showMessage("Sessão perdida. Redirecionando para login.");
        window.location.href = "login.html";
        return;
      }

      if (!confirm('Tem certeza que deseja deletar esta categoria?')) return;

      try {
        const response = await fetch(`http://localhost:8090/categoria/${idCategoria}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${currentToken}` }
        });

        if (!response.ok) throw new Error(`Erro ${response.status} ao deletar.`);

        alert('Categoria deletada com sucesso!');
        await listarCategorias();
      } catch (error) {
        console.error('Erro ao deletar:', error);
        alert('Erro ao deletar categoria.');
      }
    };

    if (formCadastroCategorias) {
      formCadastroCategorias.addEventListener('submit', async function (e) {
        e.preventDefault();
        const currentToken = localStorage.getItem('authToken');
        if (!currentToken) {
          showMessage("Sessão perdida. Redirecionando para login.");
          window.location.href = "login.html";
          return;
        }

        const submitButton = this.querySelector('button[type="submit"]');
        const buttonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Cadastrando...';

        if (!validarCampos()) {
          submitButton.disabled = false;
          submitButton.textContent = buttonText;
          return;
        }

        const dadosCategoria = { nome: document.getElementById('nomeCategoria').value.trim() };

        try {
          const response = await fetch('http://localhost:8090/categoria', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${currentToken}`
            },
            body: JSON.stringify(dadosCategoria),
          });

          const responseData = await response.text();
          if (!response.ok) throw new Error(`Erro ao cadastrar: ${response.status} - ${responseData}`);

          showMessage('Categoria cadastrada com sucesso!');
          this.reset();
          await listarCategorias();
        } catch (error) {
          console.error('Erro no submit:', error);
          showMessage(`Erro ao cadastrar categoria. ${error.message}`);
        } finally {
          submitButton.disabled = false;
          submitButton.textContent = buttonText;
        }
      });
    }

    const btnListarCategorias = document.getElementById('btnListarCategorias');
    if (btnListarCategorias) {
      btnListarCategorias.addEventListener('click', listarCategorias);
      listarCategorias();
    }

    resolve();
  });
}