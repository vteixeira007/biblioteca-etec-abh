export default function login() {

  (function verificarTokenExpirado() {
    const token = localStorage.getItem('authToken');
    const currentPage = window.location.pathname.split('/').pop();

    if (!token) {
      if (currentPage !== 'login.html') {
        window.location.href = 'login.html';
      }
      return;
    }

    try {
      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));
      const exp = payload.exp * 1000;

      if (Date.now() >= exp) {
        alert('Sua sessão expirou. Faça login novamente.');
        localStorage.removeItem('authToken');
        if (currentPage !== 'login.html') {
          window.location.href = 'login.html';
        }
      }
    } catch (e) {
      console.error('Erro ao verificar token:', e);
      localStorage.removeItem('authToken');
      if (currentPage !== 'login.html') {
        window.location.href = 'login.html';
      }
    }
  })();

  const currentPage = window.location.pathname.split('/').pop();

  const existingToken = localStorage.getItem("authToken");
  if (existingToken && currentPage === 'login.html') {
    window.location.href = "index.html";
  }

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const login = document.getElementById("login-login").value;
      const password = document.getElementById("login-password").value;

      try {
        const response = await fetch("http://localhost:8090/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ login, password })
        });

        const data = await response.json();

        if (response.ok && (data.token || data.access_token)) {
          const token = data.token || data.access_token;
          localStorage.setItem("authToken", token);
          window.location.href = "index.html";
        } else {
          alert("Login inválido! Verifique suas credenciais.");
        }

      } catch (error) {
        console.error("Erro no login:", error);
        alert("Erro ao conectar com o servidor.");
      }
    });
  }
}