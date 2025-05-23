
export default function login() {
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    console.log("[Login.js] Formulário #login-form encontrado. Adicionando listener de submit.");
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("[Login.js] Formulário de login submetido.");

      const loginInputEl = document.getElementById("login-login");
      const passwordInputEl = document.getElementById("login-password");
      const submitButton = loginForm.querySelector('button[type="submit"]');

      if (!loginInputEl || !passwordInputEl) {
          alert("Erro interno: Campos de login não encontrados.");
          return;
      }

      const username = loginInputEl.value.trim();
      const password = passwordInputEl.value.trim();

      if (!username || !password) {
          alert("Por favor, preencha o usuário e a senha.");
          return;
      }

      const originalButtonText = submitButton ? submitButton.textContent : "Entrar";
      if (submitButton) { 
          submitButton.disabled = true; 
          submitButton.textContent = "Entrando...";
      }

      try {
        console.log(`[Login.js] Enviando requisição para https://biblioteca-etec-abh-2.onrender.com/auth/login com usuário: ${username}`);
        const response = await fetch("https://biblioteca-etec-abh-2.onrender.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ login: username, password: password })
        });

        console.log(`[Login.js] Resposta da API de login: Status ${response.status}, OK: ${response.ok}`);

        if (response.ok) {
          const data = await response.json();
          console.log("[Login.js] Resposta JSON da API (sucesso):", data);

          if (data.token || data.access_token) {
            const token = data.token || data.access_token;
            console.log("%c[Login.js] Token recebido da API:", "color: green; font-weight: bold;", token);
            localStorage.setItem("authToken", token);
            console.log("[Login.js] Token salvo. Redirecionando para index.html...");
            window.location.href = "index.html";
          } else {
            console.error("[Login.js] Resposta OK da API, mas sem token no corpo:", data);
            alert("Login falhou: Resposta inesperada do servidor.");
            if (submitButton) { submitButton.disabled = false; submitButton.textContent = originalButtonText; }
          }
        } else {
          let errorMessage = `Erro ${response.status}: ${response.statusText || 'Falha no login'}`;
          try {
            const errorBodyText = await response.text();
            if (errorBodyText) {
                try {
                    const jsonError = JSON.parse(errorBodyText);
                    errorMessage = jsonError.message || jsonError.error || JSON.stringify(jsonError);
                } catch (e_json) {
                    errorMessage = errorBodyText;
                }
            }
          } catch (e_read_body) {
            console.error("[Login.js] Erro ao ler corpo da resposta de erro:", e_read_body);
          }
          console.error("[Login.js] Falha no login. Servidor respondeu com erro.", errorMessage);
          alert(`Login inválido! ${errorMessage}`);
          if (submitButton) { submitButton.disabled = false; submitButton.textContent = originalButtonText; }
        }
      } catch (error) {
        console.error("[Login.js] Erro crítico na requisição de login (ex: rede):", error);
        alert("Erro ao conectar com o servidor. Verifique sua conexão e tente novamente.");
        if (submitButton) { submitButton.disabled = false; submitButton.textContent = originalButtonText; }
      }
    });
  } else {
      console.warn("[Login.js] Formulário #login-form não encontrado nesta página.");
  }
}