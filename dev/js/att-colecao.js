
const API_BASE_URL = 'https://biblioteca-etec-abh-2.onrender.com/';

function showMessageAtt(message, isError = false) {
  alert(message);
}

function handleAuthErrorAtt() {
    showMessageAtt("Sessão expirada ou inválida. Faça login novamente.", true);
    window.location.href = 'login.html';
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
  const token = localStorage.getItem('authToken');
  if (!token) return handleAuthErrorAtt();

  const selectAtualizar = document.getElementById('selectCategoriaAtualizar');
  const selectExcluir = document.getElementById('selectCategoriaExcluir');

  if(selectAtualizar) selectAtualizar.disabled = true;
  if(selectExcluir) selectExcluir.disabled = true;

  try {
    const response = await fetch(`${API_BASE_URL}/categoria`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.status === 401) return handleAuthErrorAtt();
    if (!response.ok) throw new Error(`Erro ${response.status} ao buscar.`);

    const categorias = await response.json();
    
    if (selectAtualizar) popularDropdownCategorias(categorias, selectAtualizar, "-- Selecione para Atualizar --");
    if (selectExcluir) popularDropdownCategorias(categorias, selectExcluir, "-- Selecione para Excluir --");

  } catch (error) {
    console.error('Erro ao carregar categorias:', error);
    showMessageAtt(`Erro ao carregar categorias: ${error.message}`, true);
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

  if (idCategoriaSelecionada && divCamposNovoNome && btnSubmitAtualizar && inputNomeAtual && inputNovoNome && inputHiddenIdCategoria) {
    const nomeCategoriaSelecionada = selectAtualizar.options[selectAtualizar.selectedIndex].getAttribute('data-nome');
    
    inputHiddenIdCategoria.value = idCategoriaSelecionada;
    inputNomeAtual.value = nomeCategoriaSelecionada;
    inputNovoNome.value = nomeCategoriaSelecionada; 
    
    divCamposNovoNome.style.display = 'block';
    btnSubmitAtualizar.style.display = 'block';
    inputNovoNome.focus();
  } else if (divCamposNovoNome) {
    divCamposNovoNome.style.display = 'none';
    if(btnSubmitAtualizar) btnSubmitAtualizar.style.display = 'none';
    if(inputHiddenIdCategoria) inputHiddenIdCategoria.value = '';
    if(inputNomeAtual) inputNomeAtual.value = '';
    if(inputNovoNome) inputNovoNome.value = '';
  }
}

async function handleAtualizarCategoriaSubmit(event) {
  event.preventDefault();
  const token = localStorage.getItem('authToken');
  if (!token) return handleAuthErrorAtt();

  const idCategoria = document.getElementById('categoriaIdAtt').value;
  const novoNome = document.getElementById('novoNomeCategoriaInputAtt').value.trim();

  if (!idCategoria || !novoNome) {
    showMessageAtt('Por favor, selecione uma categoria e preencha o novo nome.', true);
    return;
  }
   if (novoNome.length > 40) {
    showMessageAtt('O nome da categoria deve ter no máximo 40 caracteres.', true);
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

    if (response.status === 401) return handleAuthErrorAtt();
    const responseText = await response.text();
    if (!response.ok) {
        let errorMessage = responseText;
        try { const errorJson = JSON.parse(responseText); errorMessage = errorJson.message || JSON.stringify(errorJson); } catch (e) {}
        throw new Error(`Erro ${response.status}: ${errorMessage}`);
    }
    
    showMessageAtt('Categoria atualizada com sucesso!');
    
    document.getElementById('formAtualizarCategoria').reset();
    document.getElementById('categoriaIdAtt').value = ''; 
    document.getElementById('selectCategoriaAtualizar').value = '';
    handleSelecaoCategoriaParaAtualizar();
    
    await carregarCategoriasParaPagina();

  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    showMessageAtt(`Erro ao atualizar categoria: ${error.message}`, true);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
}


async function handleExcluirCategoriaSubmit(event) {
  event.preventDefault();
  const token = localStorage.getItem('authToken');
  if (!token) return handleAuthErrorAtt();

  const selectExcluir = document.getElementById('selectCategoriaExcluir');
  const idCategoriaParaExcluir = selectExcluir.value;

  if (!idCategoriaParaExcluir) {
    showMessageAtt('Por favor, selecione uma categoria para excluir.', true);
    return;
  }
  if (!confirm(`Tem certeza que deseja excluir a categoria selecionada (Nome: ${selectExcluir.options[selectExcluir.selectedIndex].text})? Esta ação não pode ser desfeita e removerá os livros associados.`)) {
    return;
  }

  try {
      const response = await fetch(`${API_BASE_URL}/categoria/${idCategoriaParaExcluir}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.status === 401) return handleAuthErrorAtt();
      if (!response.ok) throw new Error(`Erro ${response.status} ao deletar.`);

      showMessageAtt('Categoria deletada com sucesso!');
      await carregarCategoriasParaPagina(); 
      selectExcluir.value = ""; 

  } catch (error) {
      console.error('Erro ao deletar categoria:', error);
      showMessageAtt(`Erro ao deletar categoria. ${error.message}`, true);
  }
}

/**
 * Função de inicialização para a página de atualização de categorias.
 */
export function initAtualizarCategoriasPage() {

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