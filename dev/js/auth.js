
function parseJwt(token) {
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) {
      console.error("[Auth] Token JWT inválido: Sem payload.");
      return null;
    }
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("[Auth] Erro ao decodificar/parsear o token JWT:", e);
    return null;
  }
}


export function checkAuthAndRedirect() {
  const token = localStorage.getItem('authToken');
  let currentPage = window.location.pathname.split('/').pop();
  if (currentPage === '') {
    currentPage = 'index.html';
  }

  const payload = parseJwt(token);
  const isTokenValid = payload && payload.exp && (payload.exp * 1000 > Date.now());

  if (isTokenValid) {
    if (currentPage === 'login.html') {
      console.error("[Auth] Logado, mas na página de login. REDIRECIONANDO para index.html.");
      window.location.href = "index.html";
      return false;
    }
    return true;
  } else {
    console.warn("[Auth] Token INVÁLIDO ou INEXISTENTE.");
    if (token) {
      localStorage.removeItem('authToken');
      console.warn("[Auth] Token inválido/expirado removido.");
      if (payload && payload.exp && payload.exp * 1000 <= Date.now()) {
        alert('Sua sessão expirou. Faça login novamente.');
      }
    }
    if (currentPage !== 'login.html') {
      console.error("[Auth] Não logado e fora da página de login. REDIRECIONANDO para login.html.");
      window.location.href = "login.html";
      return false;
    }
    return false;
  }
}