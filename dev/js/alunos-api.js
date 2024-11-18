export default function importCadastroAlunos() {
  return new Promise((resolve) => {
    // Verificar se estamos na página de cadastro
    const formCadastro = document.getElementById('formCadastroAluno');
    const btnListarAlunos = document.getElementById('btnListarAlunos');

    //Cadastro
    if (formCadastro) {
      formCadastro.addEventListener('submit', async function (e) {
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

        const dadosAluno = {
          nome: document.getElementById('nome').value.trim(),
          matricula: parseInt(document.getElementById('matricula').value),
          cpf: document.getElementById('cpf').value.replace(/\D/g, ''),
          email: document.getElementById('email').value.trim(),
          telefone: document.getElementById('telefone').value.replace(/\D/g, ''),
          curso: document.getElementById('curso').value.trim(),
          turma: document.getElementById('turma').value.trim(),
        };

        try {
          const response = await fetch(
            'https://biblioteca-etec-abh-2.onrender.com/aluno',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(dadosAluno),
            }
          );

          if (!response.ok) {
            throw new Error(`Erro ao cadastrar: ${response.status}`);
          }

          await response.json();
          showMessage(
            'Aluno cadastrado com sucesso! O formulário foi limpo para um novo cadastro.'
          );
          this.reset();
        } catch (error) {
          console.error('Erro:', error);
          showMessage(
            'Erro ao cadastrar aluno. Por favor, verifique os dados e tente novamente.',
            true
          );
        } finally {
          submitButton.disabled = false;
          submitButton.textContent = buttonText;
        }
      });
    }

    //Tabela Para testes

    window.deletarAluno = async function(id) {
      if (!confirm('Tem certeza que deseja deletar este aluno?')) {
        return;
      }
    
      try {
        const response = await fetch(`https://biblioteca-etec-abh-2.onrender.com/aluno/${id}`, {
          method: 'DELETE'
        });
    
        if (!response.ok) {
          throw new Error(`Erro ao deletar aluno: ${response.status}`);
        }
    
        alert('Aluno deletado com sucesso!');
        // Atualiza a lista de alunos apenas se a função existir
        if (typeof listarAlunos === 'function') {
          listarAlunos();
        }
      } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao deletar aluno. Por favor, tente novamente.');
      }
    };

    if (btnListarAlunos) {
      btnListarAlunos.addEventListener('click', async function () {
        const button = this;
        const listaDiv = document.getElementById('listaAlunos');

        button.textContent = 'Carregando...';
        button.disabled = true;

        try {
          const response = await fetch(
            'https://biblioteca-etec-abh-2.onrender.com/aluno'
          );

          if (!response.ok) {
            throw new Error(`Erro ao buscar alunos: ${response.status}`);
          }

          const alunos = await response.json();

          const table = document.createElement('table');
          table.className = 'tabela-alunos';

          const thead = document.createElement('thead');
          thead.innerHTML = `
            <tr>
                <th>Nome</th>
                <th>Matrícula</th>
                <th>Curso</th>
                <th>Turma</th>
                <th>E-mail</th>
                <th>Telefone</th>
            </tr>
        `;
          table.appendChild(thead);

          const tbody = document.createElement('tbody');
          alunos.forEach((aluno) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
              <td>${aluno.nome}</td>
              <td>${aluno.matricula}</td>
              <td>${aluno.curso}</td>
              <td>${aluno.turma}</td>
              <td>${aluno.email}</td>
              <td>${aluno.telefone}</td>
              <td>
                <button onclick="deletarAluno(${aluno.idAluno})" class="btn-delete">
                  Deletar
                </button>
              </td>
            `;
            tbody.appendChild(tr);
          });
          table.appendChild(tbody);

          if (listaDiv) {
            listaDiv.innerHTML = '';
            listaDiv.appendChild(table);
          }
        } catch (error) {
          console.error('Erro:', error);
          if (listaDiv) {
            listaDiv.innerHTML =
              '<p class="error">Erro ao carregar a lista de alunos. Por favor, tente novamente.</p>';
          }
        } finally {
          button.textContent = 'Listar Alunos';
          button.disabled = false;
        }
      });
    }

    // Validações de campos e eventos apenas se os elementos existirem
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');
    const cepInput = document.getElementById('cep');
    const matriculaInput = document.getElementById('matricula');

    if (cpfInput) {
      cpfInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 3) {
          value = value.replace(/^(\d{3})/, '$1.');
        }
        if (value.length > 6) {
          value = value.replace(/^(\d{3})\.(\d{3})/, '$1.$2.');
        }
        if (value.length > 9) {
          value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})/, '$1.$2.$3-');
        }

        e.target.value = value;
        this.classList.remove('input-error');
      });
    }

    if (telefoneInput) {
      telefoneInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 2) {
          value = `(${value.slice(0, 2)})${value.slice(2)}`;
        }
        if (value.length > 9) {
          value = `${value.slice(0, 9)}-${value.slice(9)}`;
        }
        e.target.value = value;
        this.classList.remove('input-error');
      });
    }

    if (cepInput) {
      cepInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 8) value = value.slice(0, 8);

        if (value.length > 5) {
          value = value.replace(/^(\d{5})/, '$1-');
        }

        e.target.value = value;
      });
    }

    if (matriculaInput) {
      matriculaInput.addEventListener('input', function (e) {
        e.target.value = e.target.value.replace(/\D/g, '');
        this.classList.remove('input-error');
      });
    }

    // Remover classe de erro em todos os inputs
    document.querySelectorAll('.input').forEach((input) => {
      input.addEventListener('input', function () {
        this.classList.remove('input-error');
      });
    });

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
        showMessage(
          `Por favor, preencha corretamente o campo ${campoInvalido}`,
          true
        );
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

    // Inicializar listagem apenas se a função e o elemento existirem
    if (typeof listarAlunos === 'function' && document.getElementById('listaAlunos')) {
      document.addEventListener('DOMContentLoaded', listarAlunos);
    }

    resolve();
  });
}