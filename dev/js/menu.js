
export default function Menu() {
  const btnMobile = document.getElementById('btn-mobile');

  if (btnMobile) {
    function toggleMenu(event) {
      if (event.type === 'touchstart') event.preventDefault();
      const nav = document.getElementById('nav');
      if (nav) {
        nav.classList.toggle('active');
        const active = nav.classList.contains('active');
        event.currentTarget.setAttribute('aria-expanded', active);
        if (active) {
          event.currentTarget.setAttribute('aria-label', 'Fechar Menu');
        } else {
          event.currentTarget.setAttribute('aria-label', 'Abrir Menu');
        }
      } else {
        console.warn("[Menu] Elemento #nav não encontrado.");
      }
    }

    btnMobile.addEventListener('click', toggleMenu);
    btnMobile.addEventListener('touchstart', toggleMenu);
  } else {
    console.warn("[Menu] Elemento #btn-mobile não encontrado nesta página. Menu mobile não inicializado.");
  }
}