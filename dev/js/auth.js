
/**
 * Decodifica um token JWT de forma segura (Base64Url para Base64).
 * @param {string} token - O token JWT.
 * @returns {object|null} O payload decodificado ou null em caso de erro.
 */
function parseJwt(token) {
  if (!token) {
    console.warn("[Auth - parseJwt] Tentativa de parsear token nulo ou indefinido.");
    return null;
  }
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) {
      console.error("[Auth - parseJwt] Token JWT inválido: Estrutura sem payload (parte [1]). Token:", token);
      return null;
    }
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("[Auth - parseJwt] Erro ao decodificar/parsear o token JWT. Token:", token, "Erro:", e);
    return null;
  }
}

/**
 * Verifica a autenticação e redireciona se necessário.
 * @returns {boolean} Retorna true se o usuário pode prosseguir na página atual,
 * false se um redirecionamento foi/deve ser iniciado ou se não está autenticado na página de login.
 */
export function checkAuthAndRedirect() {
  const token = localStorage.getItem('authToken');
  let currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();

  console.log(`%c[AUTH] Iniciando verificação. Página: ${currentPage}. Token no localStorage: ${token ? 'Existe' : 'NÃO Existe'}`, 'color: #007bff; font-weight: bold;');

  const payload = parseJwt(token);
  const isTokenValid = payload && payload.exp && typeof payload.exp === 'number' && (payload.exp * 1000 > Date.now());

  console.log("[AUTH] Payload do token decodificado:", payload);
  console.log(`[AUTH] O token é considerado válido? ${isTokenValid}`);

  if (isTokenValid) {
    console.log("[Auth] Token VÁLIDO.");
    if (currentPage === 'login.html') {
      console.error("[Auth] Usuário LOGADO, mas na página de login. REDIRECIONANDO para index.html.");
      window.location.href = "index.html";
      return false;
    }
    console.log("[Auth] Usuário LOGADO e na página correta (não login). Permitindo prosseguir.");
    return true;
  } else {
    if (token) {
      localStorage.removeItem('authToken');
      console.warn("[Auth] Token INVÁLIDO ou EXPIRADO. Token removido do localStorage.");
      if (payload && payload.exp && typeof payload.exp === 'number' && payload.exp * 1000 <= Date.now()) {
        alert('Sua sessão expirou. Por favor, faça login novamente.');
      } else if (payload === null && token) {
        alert('Houve um problema ao validar sua sessão (token malformado). Por favor, faça login novamente.');
      }
    } else {
      console.warn("[Auth] Nenhum token encontrado no localStorage.");
    }

    if (currentPage !== 'login.html') {
      console.error("[Auth] Usuário NÃO LOGADO e não está na página de login. REDIRECIONANDO para login.html.");
      window.location.href = "login.html";
      return false;
    }
    console.log("[Auth] Usuário NÃO LOGADO, mas já está na página de login. Permitindo prosseguir (exibir formulário de login).");
    return false;
  }
}