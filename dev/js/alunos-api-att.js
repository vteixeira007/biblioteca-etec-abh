export default function importAttAlunos() {
  return new Promise((resolve) => {
    let alunoIdSelecionado = null;

    document
      .getElementById('pesquisaAluno')
      .addEventListener('input', function () {
        const nomeAluno = this.value;
        if (nomeAluno.length >= 3) {
          fetch(
            `https://biblioteca-etec-abh-2.onrender.com/aluno?nome=${nomeAluno}`
          )
            .then((response) => response.json())
            .then((alunos) => {
              const suggestions = document.getElementById(
                'student-suggestions'
              );
              suggestions.innerHTML = '';
              alunos.forEach((aluno) => {
                const item = document.createElement('div');
                item.textContent = aluno.nome;
                item.className = 'suggestion-item';
                item.onclick = () => carregarDadosAluno(aluno.idAluno);
                suggestions.appendChild(item);
              });
            })
            .catch((error) => console.error('Erro ao buscar alunos:', error));
        }
      });

    function carregarDadosAluno(idAluno) {
      fetch(`https://biblioteca-etec-abh-2.onrender.com/aluno/${idAluno}`)
        .then((response) => response.json())
        .then((aluno) => {
          if (!aluno) {
            console.error('Nenhum dado recebido');
            return;
          }
          alunoIdSelecionado = idAluno;
          document.getElementById('nome').value = aluno.nome || '';
          document.getElementById('cpf').value = aluno.cpf || '';
          document.getElementById('email').value = aluno.email || '';
          document.getElementById('telefone').value = aluno.telefone || '';
          document.getElementById('matricula').value = aluno.matricula || '';
          document.getElementById('curso').value = aluno.curso || '';
          document.getElementById('turma').value = aluno.turma || '';
        })
        .catch((error) => {
          console.error('Erro ao carregar dados do aluno:', error);
          alert('Erro ao carregar dados do aluno');
        });
    }

    function atualizarAluno() {
      if (!alunoIdSelecionado) {
        showMessage('Selecione um aluno para atualizar.', true);
        return;
      }

      const submitButton = document.querySelector('button[type="submit"]');
      const buttonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Atualizando...';

      if (!validarCampos()) {
        submitButton.disabled = false;
        submitButton.textContent = buttonText;
        return;
      }

      const dadosAtualizados = {
        nome: document.getElementById('nome').value.trim(),
        cpf: document.getElementById('cpf').value.replace(/\D/g, ''),
        email: document.getElementById('email').value.trim(),
        telefone: document.getElementById('telefone').value.replace(/\D/g, ''),
        matricula: document.getElementById('matricula').value.trim(),
        curso: document.getElementById('curso').value.trim(),
        turma: document.getElementById('turma').value.trim(),
        dataAtuallizacao: '2024-11-07T00:22:08.493106',
      };

      console.log('Dados enviados para atualização:', dadosAtualizados);

      fetch(
        `https://biblioteca-etec-abh-2.onrender.com/aluno/${alunoIdSelecionado}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dadosAtualizados),
        }
      )
        .then((response) => {
          console.log('Status da resposta da API:', response.status);
          if (!response.ok) {
            throw new Error(
              `Erro ao atualizar aluno (status ${response.status})`
            );
          }
          // Verifica se a resposta é JSON
          return response.text().then((text) => {
            try {
              return JSON.parse(text);
            } catch {
              return text; // Retorna o texto bruto se não for JSON
            }
          });
        })
        .then((data) => {
          console.log('Dados atualizados com sucesso:', data);
          if (typeof data === 'string') {
            showMessage(`Resposta da API: ${data}`);
          } else {
            showMessage('Dados atualizados com sucesso!');
          }
        })
        .catch((error) => {
          console.error('Erro ao atualizar aluno:', error);
          showMessage(
            'Erro ao atualizar aluno. Por favor, tente novamente.',
            true
          );
        })
        .finally(() => {
          submitButton.disabled = false;
          submitButton.textContent = buttonText;
        });
    }

    function validarCampos() {
      const camposObrigatorios = [
        'nome',
        'cpf',
        'email',
        'telefone',
        'matricula',
        'curso',
        'turma',
      ];
      let isValid = true;
      let campoInvalido = '';

      camposObrigatorios.forEach((campo) => {
        const elemento = document.getElementById(campo);
        const valor = elemento.value.trim();

        elemento.classList.remove('input-error');
        if (!valor) {
          elemento.classList.add('input-error');
          isValid = false;
          if (!campoInvalido)
            campoInvalido = elemento.previousElementSibling.textContent;
        }
      });

      if (!isValid) {
        showMessage(
          `Por favor, preencha corretamente o campo ${campoInvalido}`,
          true
        );
      }

      return isValid;
    }

    function showMessage(message, isError = false) {
      const existingMessage = document.querySelector('.message-feedback');
      if (existingMessage) {
        existingMessage.remove();
      }
      const messageDiv = document.createElement('div');
      messageDiv.className = `message-feedback ${
        isError ? 'error' : 'success'
      }`;
      messageDiv.textContent = message;
      const submitButton = document.querySelector('.addLivro_form-button');
      submitButton.parentNode.insertBefore(messageDiv, submitButton);

      setTimeout(() => messageDiv.remove(), 5000);
    }

    document
      .getElementById('btnAtualizar')
      .addEventListener('click', atualizarAluno);

    resolve();
  });
}
