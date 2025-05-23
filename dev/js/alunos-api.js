
export default function importCadastroAlunos() {
  return new Promise((resolve) => {
    const API_BASE_URL = 'http://localhost:8090';

    function showMessage(mensagem, isError = false) {
      alert((isError ? 'Erro: ' : '') + mensagem);
    }

    function handleAuthError() {
        showMessage("Sessão expirada ou inválida. Faça login novamente.", true);
        window.location.href = 'login.html';
    }

    function validarCampos() {
      const campos = ['nome', 'matricula', 'cpf', 'email', 'telefone', 'curso', 'turma'];
      for (const id of campos) {
          const elemento = document.getElementById(id);
          if (!elemento || !elemento.value.trim()) {
              showMessage(`Por favor, preencha o campo: ${elemento?.previousElementSibling?.textContent || id}`, true);
              return false;
          }
      }

      const matriculaRaw = document.getElementById('matricula').value.trim();
      const matricula = Number(matriculaRaw);
      if (isNaN(matricula) || matricula <= 0) {
        showMessage('Matrícula inválida. Deve ser um número positivo.', true);
        return false;
      }
      return true;
    }


    async function listarAlunos() {
        const token = localStorage.getItem('authToken');
        if (!token) return handleAuthError();

        const listaDiv = document.getElementById('listaAlunos');
        const button = document.getElementById('btnListarAlunos');

        if (!listaDiv) {
            console.warn("[CadastroAlunos] Div #listaAlunos não encontrada para listar.");
            return;
        }

        if (button) { button.textContent = 'Carregando...'; button.disabled = true; }
        listaDiv.innerHTML = 'Carregando alunos...';

        try {
            const response = await fetch(`${API_BASE_URL}/aluno`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.status === 401) return handleAuthError();
            if (!response.ok) throw new Error(`Erro ${response.status} ao carregar alunos.`);

            const alunos = await response.json();

            listaDiv.innerHTML = '';
            const table = document.createElement('table');
            table.className = 'tabela-alunos';

            table.innerHTML = `
                <thead>
                    <tr>
                        <th>ID</th> <th>Nome</th> <th>Matrícula</th> <th>CPF</th>
                        <th>Email</th> <th>Telefone</th> <th>Curso</th> <th>Turma</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    ${alunos.map(aluno => `
                        <tr>
                            <td>${aluno.idAluno || 'N/A'}</td>
                            <td>${aluno.nome || 'N/A'}</td>
                            <td>${aluno.matricula || 'N/A'}</td>
                            <td>${aluno.cpf || 'N/A'}</td>
                            <td>${aluno.email || 'N/A'}</td>
                            <td>${aluno.telefone || 'N/A'}</td>
                            <td>${aluno.curso || 'N/A'}</td>
                            <td>${aluno.turma || 'N/A'}</td>
                            <td>
                                <button class="btn-delete" onclick="window.deletarAlunoGlobal(${aluno.idAluno})">
                                    Deletar
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            `;
            if (alunos.length === 0) {
                 listaDiv.innerHTML = '<p>Nenhum aluno cadastrado.</p>';
            } else {
                 listaDiv.appendChild(table);
            }

        } catch (error) {
            console.error('Erro ao listar alunos:', error);
            listaDiv.innerHTML = '<p class="error">Erro ao carregar alunos. Tente novamente.</p>';
        } finally {
            if (button) { button.textContent = 'Listar Alunos'; button.disabled = false; }
        }
    }

    window.deletarAlunoGlobal = async function(id) {
        const token = localStorage.getItem('authToken');
        if (!token) return handleAuthError();

        if (!confirm('Tem certeza que deseja deletar este aluno?')) return;

        try {
            const response = await fetch(`${API_BASE_URL}/aluno/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.status === 401) return handleAuthError();
            if (!response.ok) throw new Error(`Erro ${response.status} ao deletar aluno.`);

            showMessage('Aluno deletado com sucesso!');
            await listarAlunos();

        } catch (error) {
            console.error('Erro ao deletar aluno:', error);
            showMessage('Erro ao deletar aluno. Tente novamente.', true);
        }
    };


    function inicializarCadastroAlunos() {
        const token = localStorage.getItem('authToken');

        if (!token) {
            console.error("[CadastroAlunos] ERRO CRÍTICO: Token não encontrado na inicialização.");
            handleAuthError();
            return;
        }

        const formCadastro = document.getElementById('formCadastroAluno');
        const btnListarAlunos = document.getElementById('btnListarAlunos');

        if (formCadastro) {
            formCadastro.addEventListener('submit', async function (e) {
                e.preventDefault();
                const currentToken = localStorage.getItem('authToken');
                if (!currentToken) return handleAuthError();

                const submitButton = this.querySelector('button[type="submit"]');
                const buttonText = submitButton.textContent;
                submitButton.disabled = true;
                submitButton.textContent = 'Cadastrando...';

                if (!validarCampos()) {
                    submitButton.disabled = false;
                    submitButton.textContent = buttonText;
                    return;
                }

                const dadosAluno = {
                    nome: document.getElementById('nome').value.trim(),
                    matricula: Number(document.getElementById('matricula').value.trim()),
                    cpf: document.getElementById('cpf').value.replace(/\D/g, ''),
                    email: document.getElementById('email').value.trim(),
                    telefone: document.getElementById('telefone').value.replace(/\D/g, ''),
                    curso: document.getElementById('curso').value.trim(),
                    turma: document.getElementById('turma').value.trim(),
                };

                try {
                    const response = await fetch(`${API_BASE_URL}/aluno`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${currentToken}`
                        },
                        body: JSON.stringify(dadosAluno),
                    });

                    if (response.status === 401) return handleAuthError();
                    if (!response.ok) {
                        const erroTexto = await response.text();
                        throw new Error(`Erro ao cadastrar: ${response.status} - ${erroTexto}`);
                    }

                    await response.json();
                    showMessage('Aluno cadastrado com sucesso!');
                    this.reset();
                    await listarAlunos();

                } catch (error) {
                    console.error('Erro no submit:', error);
                    showMessage('Erro ao cadastrar aluno. Verifique os dados.', true);
                } finally {
                    submitButton.disabled = false;
                    submitButton.textContent = buttonText;
                }
            });
        }

        if (btnListarAlunos) {
            btnListarAlunos.addEventListener('click', listarAlunos);
            listarAlunos();
        }

    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', inicializarCadastroAlunos);
    } else {
      inicializarCadastroAlunos();
    }

    resolve();
  });
}