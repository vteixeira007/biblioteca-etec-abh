export default function importAttAlunos() {
  return new Promise((resolve) => {
    // Verificar se estamos na página de atualização
    const pesquisaInput = document.getElementById('pesquisaAluno');
    const btnAtualizar = document.getElementById('btnAtualizar');

    // Continua apenas se estivermos na página correta
    if (pesquisaInput) {
      let alunoIdSelecionado = null;

      pesquisaInput.addEventListener('input', function() {
        const nomeAluno = this.value;
        if (nomeAluno.length >= 3) {
          buscarAlunos(nomeAluno);
        }
      });

      async function buscarAlunos(nomeAluno) {
        try {
          const response = await fetch(
            `https://biblioteca-etec-abh-2.onrender.com/aluno?nome=${nomeAluno}`
          );
          const alunos = await response.json();
          
          const suggestions = document.getElementById('student-suggestions');
          if (!suggestions) return;

          suggestions.innerHTML = '';
          alunos.forEach((aluno) => {
            const item = document.createElement('div');
            item.textContent = aluno.nome;
            item.className = 'suggestion-item';
            item.onclick = () => carregarDadosAluno(aluno.idAluno);
            suggestions.appendChild(item);
          });
        } catch (error) {
          console.error('Erro ao buscar alunos:', error);
          showMessage('Erro ao buscar alunos. Tente novamente.', true);
        }
      }

      async function carregarDadosAluno(idAluno) {
        try {
          const response = await fetch(`https://biblioteca-etec-abh-2.onrender.com/aluno/${idAluno}`);
          const aluno = await response.json();
          
          if (!aluno) {
            throw new Error('Nenhum dado recebido');
          }

          alunoIdSelecionado = idAluno;
          const campos = ['nome', 'cpf', 'email', 'telefone', 'matricula', 'curso', 'turma'];
          
          campos.forEach(campo => {
            const elemento = document.getElementById(campo);
            if (elemento) {
              elemento.value = aluno[campo] || '';
            }
          });

        } catch (error) {
          console.error('Erro ao carregar dados do aluno:', error);
          showMessage('Erro ao carregar dados do aluno', true);
        }
      }

      // Configurar botão de atualização se existir
      if (btnAtualizar) {
        btnAtualizar.addEventListener('click', atualizarAluno);
      }

      async function atualizarAluno() {
        if (!alunoIdSelecionado) {
          showMessage('Selecione um aluno para atualizar.', true);
          return;
        }

        const submitButton = document.querySelector('button[type="submit"]');
        if (!submitButton) return;

        const buttonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Atualizando...';

        if (!validarCampos()) {
          submitButton.disabled = false;
          submitButton.textContent = buttonText;
          return;
        }

        try {
          const dadosAtualizados = {
            nome: document.getElementById('nome')?.value.trim(),
            matricula: parseInt(document.getElementById('matricula')?.value),
            cpf: document.getElementById('cpf')?.value.replace(/\D/g, ''),
            email: document.getElementById('email')?.value.trim(),
            telefone: document.getElementById('telefone')?.value.replace(/\D/g, ''),
            curso: document.getElementById('curso')?.value.trim(),
            turma: document.getElementById('turma')?.value.trim(),
            dataAtuallizacao: new Date().toISOString()
          };

          const response = await fetch(
            `https://biblioteca-etec-abh-2.onrender.com/aluno/${alunoIdSelecionado}`,
            {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(dadosAtualizados)
            }
          );

          if (!response.ok) {
            throw new Error(`Erro ao atualizar aluno (status ${response.status})`);
          }

          const data = await response.text();
          showMessage(data || 'Dados atualizados com sucesso!');

        } catch (error) {
          console.error('Erro ao atualizar aluno:', error);
          showMessage('Erro ao atualizar aluno. Por favor, tente novamente.', true);
        } finally {
          submitButton.disabled = false;
          submitButton.textContent = buttonText;
        }
      }

      // Adicionar máscaras e validações para os campos existentes
      const cpfInput = document.getElementById('cpf');
      const telefoneInput = document.getElementById('telefone');
      const matriculaInput = document.getElementById('matricula');

      if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
          let value = e.target.value.replace(/\D/g, '');
          if (value.length > 11) value = value.slice(0, 11);

          if (value.length > 3) value = value.replace(/^(\d{3})/, '$1.');
          if (value.length > 6) value = value.replace(/^(\d{3})\.(\d{3})/, '$1.$2.');
          if (value.length > 9) value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})/, '$1.$2.$3-');

          e.target.value = value;
          this.classList.remove('input-error');
        });
      }

      if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
          let value = e.target.value.replace(/\D/g, '');
          if (value.length > 11) value = value.slice(0, 11);

          if (value.length > 2) value = `(${value.slice(0, 2)})${value.slice(2)}`;
          if (value.length > 9) value = `${value.slice(0, 9)}-${value.slice(9)}`;

          e.target.value = value;
          this.classList.remove('input-error');
        });
      }

      if (matriculaInput) {
        matriculaInput.addEventListener('input', function(e) {
          e.target.value = e.target.value.replace(/\D/g, '');
          this.classList.remove('input-error');
        });
      }
    }

    function validarCampos() {
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
        }
      });

      if (!isValid) {
        showMessage(`Por favor, preencha corretamente o campo ${campoInvalido}`, true);
      }

      return isValid;
    }

    function showMessage(message, isError = false) {
      const submitButton = document.querySelector('.addLivro_form-button');
      if (!submitButton) return;

      const existingMessage = document.querySelector('.message-feedback');
      if (existingMessage) {
        existingMessage.remove();
      }

      const messageDiv = document.createElement('div');
      messageDiv.className = `message-feedback ${isError ? 'error' : 'success'}`;
      messageDiv.textContent = message;
      submitButton.parentNode.insertBefore(messageDiv, submitButton);

      setTimeout(() => messageDiv.remove(), 5000);
    }

    resolve();
  });
}