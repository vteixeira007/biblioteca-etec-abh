
export default function login() {
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const loginInput = document.getElementById("login-login").value;
      const passwordInput = document.getElementById("login-password").value;
      const submitButton = loginForm.querySelector('button[type="submit"]');

      if (!loginInput || !passwordInput) {
          alert("Por favor, preencha o usuário e a senha.");
          return;
      }

      if (submitButton) submitButton.disabled = true;

      try {
        const response = await fetch("http://localhost:8090/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ login: loginInput, password: passwordInput })
        });

        const data = await response.json();

        if (response.ok && (data.token || data.access_token)) {
          const token = data.token || data.access_token;
          localStorage.setItem("authToken", token);
          window.location.href = "index.html";
        } else {
          console.error("[Login] Falha no login:", data);
          alert(`Login inválido! (${data.message || 'Verifique suas credenciais.'})`);
          if (submitButton) submitButton.disabled = false;
        }

      } catch (error) {
        console.error("[Login] Erro na requisição de login:", error);
        alert("Erro ao conectar com o servidor. Tente novamente mais tarde.");
        if (submitButton) submitButton.disabled = false;
      }
    });
  } else {
      console.warn("[Login] Formulário #login-form não encontrado.");
  }
}