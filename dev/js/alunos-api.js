function showMessage(mensagem, isError = false) {
  if (isError) {
    alert('Erro: ' + mensagem);
  } else {
    alert(mensagem);
  }
}

function validarCampos() {
  const nome = document.getElementById('nome').value.trim();
  const matriculaRaw = document.getElementById('matricula').value.trim();
  const cpf = document.getElementById('cpf').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const curso = document.getElementById('curso').value.trim();
  const turma = document.getElementById('turma').value.trim();

  if (!nome || !matriculaRaw || !cpf || !email || !telefone || !curso || !turma) {
    alert('Por favor, preencha todos os campos!');
    return false;
  }

  const matricula = Number(matriculaRaw);
  if (isNaN(matricula) || matricula <= 0) {
    alert('Matrícula inválida. Deve ser um número positivo.');
    return false;
  }

  return true;
}

export default function importCadastroAlunos() {
  return new Promise((resolve) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      window.location.href = 'login.html';
      return;
    }

    const formCadastro = document.getElementById('formCadastroAluno');
    const btnListarAlunos = document.getElementById('btnListarAlunos');

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
          matricula: Number(document.getElementById('matricula').value.trim()),
          cpf: document.getElementById('cpf').value.replace(/\D/g, ''),
          email: document.getElementById('email').value.trim(),
          telefone: document.getElementById('telefone').value.replace(/\D/g, ''),
          curso: document.getElementById('curso').value.trim(),
          turma: document.getElementById('turma').value.trim(),
        };

        try {
          const response = await fetch('http://localhost:8090/aluno', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dadosAluno),
          });

          if (!response.ok) {
            const erroTexto = await response.text();
            throw new Error(`Erro ao cadastrar: ${response.status} - ${erroTexto}`);
          }

          await response.json();
          showMessage('Aluno cadastrado com sucesso! O formulário foi limpo para um novo cadastro.');
          this.reset();
        } catch (error) {
          console.error('Erro:', error);
          showMessage('Erro ao cadastrar aluno. Por favor, verifique os dados e tente novamente.', true);
        } finally {
          submitButton.disabled = false;
          submitButton.textContent = buttonText;
        }
      });
    }

    window.deletarAluno = async function(id) {
      if (!confirm('Tem certeza que deseja deletar este aluno?')) {
        return;
      }

      try {
        const response = await fetch(`http://localhost:8090/aluno/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Erro ao deletar aluno: ${response.status}`);
        }

        alert('Aluno deletado com sucesso!');
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
          const response = await fetch('http://localhost:8090/aluno', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            throw new Error('Erro ao carregar alunos');
          }

          const alunos = await response.json();

          if (listaDiv) {
            listaDiv.innerHTML = '';
            const table = document.createElement('table');
            table.className = 'tabela-alunos';

            const thead = document.createElement('thead');
            thead.innerHTML = `
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Matrícula</th>
                <th>CPF</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Curso</th>
                <th>Turma</th>
                <th>Ações</th>
              </tr>
            `;
            table.appendChild(thead);

            const tbody = document.createElement('tbody');
            alunos.forEach(aluno => {
              const tr = document.createElement('tr');
              tr.innerHTML = `
                <td>${aluno.idAluno}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.matricula}</td>
                <td>${aluno.cpf}</td>
                <td>${aluno.email}</td>
                <td>${aluno.telefone}</td>
                <td>${aluno.curso}</td>
                <td>${aluno.turma}</td>
                <td>
                  <button class="button-delete" onclick="deletarAluno(${aluno.idAluno})">
                    Deletar
                  </button>
                </td>
              `;
              tbody.appendChild(tr);
            });
            table.appendChild(tbody);
            listaDiv.appendChild(table);
          }
        } catch (error) {
          console.error('Erro:', error);
          if (listaDiv) {
            listaDiv.innerHTML = '<p>Erro ao carregar alunos. Por favor, tente novamente.</p>';
          }
        } finally {
          button.textContent = 'Listar Alunos';
          button.disabled = false;
        }
      });
    }

    resolve();
  });
}
