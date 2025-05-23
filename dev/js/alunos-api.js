// assets/js/alunos-api.js (Adaptado para Cadastro de Alunos)

export default function importCadastroAlunos() {
  // A Promise é mantida para consistência.
  return new Promise((resolve, reject) => { // Adicionado reject
    console.log("[AlunosAPI - Cadastro] Função importCadastroAlunos INICIADA!");

    const API_BASE_URL = 'https://biblioteca-etec-abh-2.onrender.com'; // URL da API no Render

    // --- Funções Auxiliares Específicas deste Módulo ---
    function _showMessageCadastroAlunos(mensagem, isError = false) {
      console.log(`[AlunosAPI - Cadastro] Mensagem: ${mensagem} (Erro: ${isError})`);
      alert((isError ? 'Erro: ' : '') + mensagem);
    }

    function _handleAuthErrorCadastroAlunos(msg = "Sessão expirada ou inválida. Faça login novamente.") {
      _showMessageCadastroAlunos(msg, true);
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 500);
    }

    function validarCamposCadastro() {
      console.log("[AlunosAPI - Cadastro] Validando campos do formulário...");
      const campos = ['nome', 'matricula', 'cpf', 'email', 'telefone', 'curso', 'turma'];
      for (const id of campos) {
          const elemento = document.getElementById(id);
          if (!elemento || !elemento.value.trim()) {
              _showMessageCadastroAlunos(`Por favor, preencha o campo: ${elemento?.labels?.[0]?.textContent || elemento?.placeholder || id}`, true);
              return false;
          }
      }

      const matriculaRaw = document.getElementById('matricula').value.trim();
      const matricula = Number(matriculaRaw);
      if (isNaN(matricula) || matricula <= 0) {
        _showMessageCadastroAlunos('Matrícula inválida. Deve ser um número positivo.', true);
        return false;
      }
      // Adicionar mais validações aqui se necessário (CPF, Email formato, etc.)
      console.log("[AlunosAPI - Cadastro] Validação de campos OK.");
      return true;
    }

    // --- Funções da API ---
    async function listarAlunos() {
        console.log("[AlunosAPI - Cadastro] Tentando listar alunos...");
        const token = localStorage.getItem('authToken');
        if (!token) return _handleAuthErrorCadastroAlunos();

        const listaDiv = document.getElementById('listaAlunos');
        const button = document.getElementById('btnListarAlunos');

        if (!listaDiv) {
            console.warn("[AlunosAPI - Cadastro] Div #listaAlunos não encontrada para listar.");
            return;
        }

        if (button) { button.textContent = 'Carregando...'; button.disabled = true; }
        listaDiv.innerHTML = 'Carregando alunos...';

        try {
            const response = await fetch(`${API_BASE_URL}/aluno`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.status === 401) return _handleAuthErrorCadastroAlunos("Não autorizado (401) ao listar alunos.");
            if (!response.ok) throw new Error(`Erro ${response.status} ao carregar alunos.`);

            const alunos = await response.json();
            console.log("[AlunosAPI - Cadastro] Alunos recebidos:", alunos);

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
                                <button class="btn-delete" onclick="window.deletarAlunoGlobalCadastro(${aluno.idAluno})">
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
            console.error('[AlunosAPI - Cadastro] Erro ao listar alunos:', error);
            listaDiv.innerHTML = '<p class="error">Erro ao carregar alunos. Tente novamente.</p>';
        } finally {
            if (button) { button.textContent = 'Listar Alunos'; button.disabled = false; }
        }
    }

    window.deletarAlunoGlobalCadastro = async function(id) { // Renomeado para evitar conflito
        console.log(`[AlunosAPI - Cadastro] Tentando deletar aluno ID: ${id}`);
        const token = localStorage.getItem('authToken');
        if (!token) return _handleAuthErrorCadastroAlunos();

        if (!confirm('Tem certeza que deseja deletar este aluno?')) return;

        try {
            const response = await fetch(`${API_BASE_URL}/aluno/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.status === 401) return _handleAuthErrorCadastroAlunos("Não autorizado (401) ao deletar aluno.");
            if (!response.ok) throw new Error(`Erro ${response.status} ao deletar aluno.`);

            _showMessageCadastroAlunos('Aluno deletado com sucesso!');
            await listarAlunos(); // Atualiza a lista

        } catch (error) {
            console.error('[AlunosAPI - Cadastro] Erro ao deletar aluno:', error);
            _showMessageCadastroAlunos('Erro ao deletar aluno. Tente novamente.', true);
        }
    };


    // Função de inicialização principal deste módulo
    function inicializarPaginaCadastroAlunos() {
        console.log("[AlunosAPI - Cadastro] Inicializando página de cadastro de alunos...");
        // **IMPORTANTE**: Bloco Antigo REMOVIDO!
        // const token = localStorage.getItem('authToken');
        // if (!token) {
        //   console.error("[CadastroAlunos] ERRO CRÍTICO: Token não encontrado na inicialização.");
        //   handleAuthError();
        //   return;
        // }
        // --- Fim Bloco Antigo REMOVIDO ---

        // Sanity Check - auth.js deveria ter prevenido esta situação.
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error("[AlunosAPI - Cadastro] ERRO CRÍTICO INICIAL: Token não encontrado. Isso não deveria acontecer se auth.js funcionou. Redirecionando...");
            _handleAuthErrorCadastroAlunos();
            return reject(new Error("Token ausente na inicialização de CadastroAlunos"));
        }

        const formCadastro = document.getElementById('formCadastroAluno');
        const btnListarAlunos = document.getElementById('btnListarAlunos');

        if (formCadastro) {
            console.log("[AlunosAPI - Cadastro] Adicionando listener ao #formCadastroAluno.");
            formCadastro.addEventListener('submit', async function (e) {
                e.preventDefault();
                console.log("[AlunosAPI - Cadastro] Formulário de cadastro submetido.");
                const currentToken = localStorage.getItem('authToken'); // Pega token atualizado
                if (!currentToken) return _handleAuthErrorCadastroAlunos();

                const submitButton = this.querySelector('button[type="submit"]');
                const buttonText = submitButton ? submitButton.textContent : "Cadastrar";
                if(submitButton) {submitButton.disabled = true; submitButton.textContent = 'Cadastrando...';}

                if (!validarCamposCadastro()) { // Usa a função de validação deste módulo
                    if(submitButton) {submitButton.disabled = false; submitButton.textContent = buttonText;}
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
                console.log("[AlunosAPI - Cadastro] Dados para cadastrar:", dadosAluno);

                try {
                    const response = await fetch(`${API_BASE_URL}/aluno`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${currentToken}`
                        },
                        body: JSON.stringify(dadosAluno),
                    });

                    if (response.status === 401) return _handleAuthErrorCadastroAlunos("Não autorizado (401) ao cadastrar aluno.");
                    
                    // Tenta pegar o corpo da resposta, mesmo se não for OK, para a mensagem de erro
                    const responseBodyText = await response.text();

                    if (!response.ok) {
                        let errorMessage = responseBodyText;
                        try {
                            const jsonError = JSON.parse(responseBodyText);
                            errorMessage = jsonError.message || jsonError.error || JSON.stringify(jsonError);
                        } catch (e_json) { /* Mantém responseBodyText se não for JSON */ }
                        throw new Error(`Erro ${response.status}: ${errorMessage}`);
                    }
                    
                    // Se chegou aqui, response.ok é true.
                    // Se o backend retorna o aluno cadastrado em JSON: await response.json();
                    _showMessageCadastroAlunos('Aluno cadastrado com sucesso!');
                    this.reset();
                    await listarAlunos();

                } catch (error) {
                    console.error('[AlunosAPI - Cadastro] Erro no submit do cadastro:', error);
                    _showMessageCadastroAlunos(`Erro ao cadastrar aluno: ${error.message}`, true);
                } finally {
                    if(submitButton) {submitButton.disabled = false; submitButton.textContent = buttonText;}
                }
            });
        } else {
            console.warn("[AlunosAPI - Cadastro] Formulário #formCadastroAluno não encontrado.");
        }

        if (btnListarAlunos) {
            console.log("[AlunosAPI - Cadastro] Adicionando listener ao #btnListarAlunos.");
            btnListarAlunos.addEventListener('click', listarAlunos);
            listarAlunos(); // Carrega a lista automaticamente ao iniciar
        } else {
            console.warn("[AlunosAPI - Cadastro] Botão #btnListarAlunos não encontrado.");
        }
        
        console.log("[AlunosAPI - Cadastro] Configuração da página de cadastro de alunos concluída.");
        resolve(); // Resolve a Promise principal
    }

    // Garante que a inicialização rode após o DOM carregar
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', inicializarPaginaCadastroAlunos);
    } else {
      inicializarPaginaCadastroAlunos();
    }
  });
}