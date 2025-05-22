
const API_BASE_URL = 'http://localhost:8090';

function showMessageAtt(message) {
  alert(message);
}

function getToken() {
  const token = localStorage.getItem('authToken');
  if (!token) {
    showMessageAtt("Você precisa estar logado para acessar esta funcionalidade.");
    window.location.href = "login.html";
  }
  return token;
}

function popularDropdownCategorias(categorias, selectElement, defaultOptionText) {
  selectElement.innerHTML = `<option class="option" value="">${defaultOptionText}</option>`;

  if (categorias && categorias.length > 0) {
    categorias.forEach(categoria => {
      const option = document.createElement('option');
      option.value = categoria.idCategoria;
      option.textContent = categoria.nome;
      option.setAttribute('data-nome', categoria.nome); 
      option.className = 'option';
      selectElement.appendChild(option);
    });
  }
}

async function carregarCategoriasParaPagina() {
  const token = getToken();
  if (!token) return;

  const selectAtualizar = document.getElementById('selectCategoriaAtualizar');
  const selectExcluir = document.getElementById('selectCategoriaExcluir');

  if(selectAtualizar) selectAtualizar.disabled = true;
  if(selectExcluir) selectExcluir.disabled = true;

  try {
    const response = await fetch(`${API_BASE_URL}/categoria`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar categorias: ${response.status} - ${await response.text()}`);
    }

    const categorias = await response.json();
    
    if (selectAtualizar) {
        popularDropdownCategorias(categorias, selectAtualizar, "-- Selecione para Atualizar --");
    }
    if (selectExcluir) {
        popularDropdownCategorias(categorias, selectExcluir, "-- Selecione para Excluir --");
    }

  } catch (error) {
    console.error('Erro ao carregar categorias:', error);
    showMessageAtt(`Erro ao carregar categorias: ${error.message}`);
  } finally {
    if(selectAtualizar) selectAtualizar.disabled = false;
    if(selectExcluir) selectExcluir.disabled = false;
  }
}

function handleSelecaoCategoriaParaAtualizar() {
  const selectAtualizar = document.getElementById('selectCategoriaAtualizar');
  const idCategoriaSelecionada = selectAtualizar.value;
  
  const divCamposNovoNome = document.getElementById('divCamposNovoNome');
  const btnSubmitAtualizar = document.getElementById('btnSubmitAtualizarCategoria');
  const inputNomeAtual = document.getElementById('nomeAtualCategoriaDisplayAtt');
  const inputNovoNome = document.getElementById('novoNomeCategoriaInputAtt');
  const inputHiddenIdCategoria = document.getElementById('categoriaIdAtt');

  if (idCategoriaSelecionada) {
    const nomeCategoriaSelecionada = selectAtualizar.options[selectAtualizar.selectedIndex].getAttribute('data-nome');
    
    inputHiddenIdCategoria.value = idCategoriaSelecionada;
    inputNomeAtual.value = nomeCategoriaSelecionada;
    inputNovoNome.value = nomeCategoriaSelecionada;
    
    divCamposNovoNome.style.display = 'block';
    btnSubmitAtualizar.style.display = 'block';
    inputNovoNome.focus();
  } else {
    divCamposNovoNome.style.display = 'none';
    btnSubmitAtualizar.style.display = 'none';
    inputHiddenIdCategoria.value = '';
    inputNomeAtual.value = '';
    inputNovoNome.value = '';
  }
}

async function handleAtualizarCategoriaSubmit(event) {
  event.preventDefault();
  const token = getToken();
  if (!token) return;

  const idCategoria = document.getElementById('categoriaIdAtt').value;
  const novoNome = document.getElementById('novoNomeCategoriaInputAtt').value.trim();

  if (!idCategoria) {
    showMessageAtt('Por favor, selecione uma categoria da lista para editar.');
    return;
  }
  if (!novoNome) {
    showMessageAtt('Por favor, preencha o novo nome da categoria.');
    return;
  }
  if (novoNome.length > 40) {
    showMessageAtt('O nome da categoria deve ter no máximo 40 caracteres.');
    return;
  }

  const submitButton = document.getElementById('btnSubmitAtualizarCategoria');
  const originalButtonText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = 'Atualizando...';

  try {
    const response = await fetch(`${API_BASE_URL}/categoria/${idCategoria}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ nome: novoNome })
    });

    const responseText = await response.text();
    if (!response.ok) {
        let errorMessage = responseText;
        try { const errorJson = JSON.parse(responseText); errorMessage = errorJson.message || JSON.stringify(errorJson); } catch (e) {}
        throw new Error(`Erro ao atualizar categoria: ${response.status} - ${errorMessage}`);
    }
    
    showMessageAtt('Categoria atualizada com sucesso!');
    
    document.getElementById('formAtualizarCategoria').reset();
    document.getElementById('categoriaIdAtt').value = ''; 
    document.getElementById('selectCategoriaAtualizar').value = '';
    document.getElementById('divCamposNovoNome').style.display = 'none';
    submitButton.style.display = 'none';
    
    await carregarCategoriasParaPagina();

  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    showMessageAtt(`Erro ao atualizar categoria. ${error.message}`);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
}


async function handleExcluirCategoriaSubmit(event) {
  event.preventDefault();
  const token = getToken();
  if (!token) return;

  const selectExcluir = document.getElementById('selectCategoriaExcluir');
  const idCategoriaParaExcluir = selectExcluir.value;

  if (!idCategoriaParaExcluir) {
    showMessageAtt('Por favor, selecione uma categoria para excluir.');
    return;
  }
  if (!confirm(`Tem certeza que deseja excluir a categoria selecionada (Nome: ${selectExcluir.options[selectExcluir.selectedIndex].text})? Esta ação não pode ser desfeita e removerá os livros associados.`)) {
    return;
  }

  if (typeof window.deletarCategoria === 'function') {
    try {
      await window.deletarCategoria(idCategoriaParaExcluir);
      await carregarCategoriasParaPagina();
      selectExcluir.value = ""; 
    } catch (error) {
      console.error('Erro ao tentar excluir categoria:', error);
      showMessageAtt('Ocorreu um problema durante a exclusão. Verifique o console.');
    }
  } else {
    showMessageAtt('Erro: Função de exclusão (deletarCategoria) não encontrada.');
    console.error('window.deletarCategoria não está definida.');
  }
}

export function initAtualizarCategoriasPage() {
  const token = localStorage.getItem('authToken');
  if (!token) {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "login.html";
    return;
  }

  const selectCategoriaAtualizar = document.getElementById('selectCategoriaAtualizar');
  const formAtualizarCategoria = document.getElementById('formAtualizarCategoria');
  const formExcluirCategoriaAtt = document.getElementById('formExcluirCategoriaAtt');

  if (selectCategoriaAtualizar) {
    selectCategoriaAtualizar.addEventListener('change', handleSelecaoCategoriaParaAtualizar);
  }
  if (formAtualizarCategoria) {
    formAtualizarCategoria.addEventListener('submit', handleAtualizarCategoriaSubmit);
  }
  if (formExcluirCategoriaAtt) {
    formExcluirCategoriaAtt.addEventListener('submit', handleExcluirCategoriaSubmit);
  }

  carregarCategoriasParaPagina();
}