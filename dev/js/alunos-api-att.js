
export default function importAttAlunos() {
  return new Promise((resolve) => {
    const API_BASE_URL = 'https://biblioteca-etec-abh-2.onrender.com';

    const pesquisaInput = document.getElementById('pesquisaAluno');
    const btnAtualizar = document.getElementById('btnAtualizar');
    const suggestionsDiv = document.getElementById('student-suggestions');
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');
    const matriculaInput = document.getElementById('matricula');

    let alunoIdSelecionado = null;

    function showMessage(message, isError = false) {
      alert(message);
    }

    function handleAuthError(msg = "Sessão expirada ou inválida. Faça login novamente.") {
        showMessage(msg, true);
        window.location.href = 'login.html';
    }

    function validarCamposFormulario() {
      const camposObrigatorios = ['nome', 'cpf', 'email', 'telefone', 'matricula', 'curso', 'turma'];
      let isValid = true;
      let campoInvalido = '';

      camposObrigatorios.forEach((campo) => {
        const elemento = document.getElementById(campo);
        if (elemento) {
          const valor = elemento.value.trim();
          elemento.classList.remove('input-error');

          if (!valor) {
            elemento.classList.add('input-error');
            isValid = false;
            if (!campoInvalido)
              campoInvalido = elemento.previousElementSibling?.textContent || campo;
          }
        } else {
            console.warn(`[AttAlunos] Validação: Campo ${campo} não encontrado.`);
            isValid = false;
        }
      });

      if (!isValid) {
        showMessage(`Por favor, preencha corretamente o campo ${campoInvalido}`, true);
      }
      return isValid;
    }


    async function buscarAlunos(nomeAluno) {
      const token = localStorage.getItem('authToken');
      if (!token) return handleAuthError();

      try {
        const response = await fetch(`${API_BASE_URL}/aluno?nome=${encodeURIComponent(nomeAluno)}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.status === 401) return handleAuthError();
        if (!response.ok) throw new Error(`Erro ${response.status} ao buscar.`);

        const alunos = await response.json();

        if (suggestionsDiv) {
            suggestionsDiv.innerHTML = '';
            if (alunos.length === 0) {
                suggestionsDiv.innerHTML = '<div class="suggestion-item no-results">Nenhum aluno encontrado.</div>';
            } else {
                alunos.forEach((aluno) => {
                    const item = document.createElement('div');
                    item.textContent = `${aluno.nome} (Mat: ${aluno.matricula})`;
                    item.className = 'suggestion-item';
                    item.onclick = () => carregarDadosAluno(aluno.idAluno);
                    suggestionsDiv.appendChild(item);
                });
            }
        }
      } catch (error) {
        console.error('Erro ao buscar alunos:', error);
        showMessage('Erro ao buscar alunos.', true);
      }
    }

    async function carregarDadosAluno(idAluno) {
      const token = localStorage.getItem('authToken');
      if (!token) return handleAuthError();

      alunoIdSelecionado = null;
      if (suggestionsDiv) suggestionsDiv.innerHTML = '';

      try {
        const response = await fetch(`${API_BASE_URL}/aluno/${idAluno}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.status === 401) return handleAuthError();
        if (!response.ok) throw new Error(`Erro ${response.status} ao carregar dados.`);

        const aluno = await response.json();
        if (!aluno) throw new Error('Nenhum dado recebido');

        alunoIdSelecionado = idAluno;
        const campos = ['nome', 'cpf', 'email', 'telefone', 'matricula', 'curso', 'turma'];

        campos.forEach(campo => {
          const elemento = document.getElementById(campo);
          if (elemento) {
            elemento.value = aluno[campo] || '';
          }
        });
        
        if(pesquisaInput) pesquisaInput.value = aluno.nome;

      } catch (error) {
        console.error('Erro ao carregar dados do aluno:', error);
        showMessage('Erro ao carregar dados do aluno.', true);
      }
    }

    async function atualizarAluno(event) {
        event.preventDefault();
        const token = localStorage.getItem('authToken');
        if (!token) return handleAuthError();

        if (!alunoIdSelecionado) {
            showMessage('Nenhum aluno selecionado para atualizar.', true);
            return;
        }

        if (!validarCamposFormulario()) {
            return;
        }

        const submitButton = btnAtualizar;
        const buttonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Atualizando...';

        try {
            const dadosAtualizados = {
                nome: document.getElementById('nome')?.value.trim(),
                matricula: document.getElementById('matricula')?.value.replace(/\D/g, ''),
                cpf: document.getElementById('cpf')?.value.replace(/\D/g, ''),
                email: document.getElementById('email')?.value.trim(),
                telefone: document.getElementById('telefone')?.value.replace(/\D/g, ''),
                curso: document.getElementById('curso')?.value.trim(),
                turma: document.getElementById('turma')?.value.trim(),
            };
            

            const response = await fetch(`${API_BASE_URL}/aluno/${alunoIdSelecionado}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(dadosAtualizados)
            });

            if (response.status === 401) return handleAuthError();
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro ${response.status}: ${errorText || 'Falha ao atualizar'}`);
            }

            const data = await response.text();
            showMessage(data || 'Dados atualizados com sucesso!');
            alunoIdSelecionado = null;
            if(pesquisaInput) pesquisaInput.value = '';

        } catch (error) {
            console.error('Erro ao atualizar aluno:', error);
            showMessage(`Erro ao atualizar aluno: ${error.message}`, true);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = buttonText;
        }
    }

    function aplicarMascaraCPF(e) {
        let value = e.target.value.replace(/\D/g, '').slice(0, 11);
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
        e.target.classList.remove('input-error');
    }

    function aplicarMascaraTelefone(e) {
        let value = e.target.value.replace(/\D/g, '').slice(0, 11);
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        e.target.value = value;
        e.target.classList.remove('input-error');
    }
    
    function apenasNumeros(e) {
        e.target.value = e.target.value.replace(/\D/g, '');
        e.target.classList.remove('input-error');
    }

    if (pesquisaInput) {
      pesquisaInput.addEventListener('input', function() {
        const nomeAluno = this.value;
        if (nomeAluno.length >= 3) {
          buscarAlunos(nomeAluno);
        } else if (suggestionsDiv) {
            suggestionsDiv.innerHTML = '';
        }
      });
    }

    if (btnAtualizar) {
      btnAtualizar.addEventListener('click', atualizarAluno);
    }
    
    if (cpfInput) cpfInput.addEventListener('input', aplicarMascaraCPF);
    if (telefoneInput) telefoneInput.addEventListener('input', aplicarMascaraTelefone);
    if (matriculaInput) matriculaInput.addEventListener('input', apenasNumeros);

    resolve();
  });
}