(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const header = document.querySelector('[data-header]');
  const navLinks = [...document.querySelectorAll('[data-nav-link]')];

  const setTheme = (theme, persist = true) => {
    root.classList.toggle('dark', theme === 'dark');
    root.dataset.theme = theme;
    if (persist) localStorage.setItem('theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro');
    }
    if (themeMeta) themeMeta.setAttribute('content', theme === 'dark' ? '#0B0F19' : '#FFFFFF');
  };

  setTheme(root.dataset.theme || (root.classList.contains('dark') ? 'dark' : 'light'), false);

  themeToggle?.addEventListener('click', () => {
    setTheme(root.classList.contains('dark') ? 'light' : 'dark');
  });

  const closeMobileMenu = () => {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
    menuToggle.innerHTML = '<i data-lucide="menu" aria-hidden="true"></i>';
    window.lucide?.createIcons();
  };

  menuToggle?.addEventListener('click', () => {
    const shouldOpen = mobileMenu.hidden;
    mobileMenu.hidden = !shouldOpen;
    menuToggle.setAttribute('aria-expanded', String(shouldOpen));
    menuToggle.setAttribute('aria-label', shouldOpen ? 'Fechar menu' : 'Abrir menu');
    menuToggle.innerHTML = `<i data-lucide="${shouldOpen ? 'x' : 'menu'}" aria-hidden="true"></i>`;
    window.lucide?.createIcons();
  });

  navLinks.forEach((link) => link.addEventListener('click', closeMobileMenu));

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const sections = [...document.querySelectorAll('main section[id]')];
  const setActiveLink = (id) => {
    navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`));
  };

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveLink(entry.target.id);
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    sections.forEach((section) => sectionObserver.observe(section));

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
  }

  document.querySelector('[data-current-year]')?.replaceChildren(String(new Date().getFullYear()));

  const form = document.querySelector('[data-contact-form]');
  const status = document.querySelector('[data-form-status]');
  const submitButton = document.querySelector('[data-submit-button]');
  const submitLabel = document.querySelector('[data-submit-label]');
  const fields = {
    name: document.querySelector('#name'),
    email: document.querySelector('#email'),
    message: document.querySelector('#message')
  };

  const setFieldError = (field, message) => {
    const error = document.querySelector(`[data-error-for="${field.name}"]`);
    field.setAttribute('aria-invalid', String(Boolean(message)));
    if (error) error.textContent = message;
  };

  const validateForm = () => {
    let valid = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    Object.entries(fields).forEach(([key, field]) => {
      const value = field.value.trim();
      let message = '';
      if (!value) message = 'Este campo é obrigatório.';
      else if (key === 'email' && !emailPattern.test(value)) message = 'Informe um e-mail válido.';
      setFieldError(field, message);
      if (message && valid) field.focus();
      valid = valid && !message;
    });
    return valid;
  };

  Object.values(fields).forEach((field) => field?.addEventListener('input', () => setFieldError(field, '')));

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    status.className = 'form-status';
    status.textContent = '';
    if (!validateForm()) return;

    submitButton.disabled = true;
    submitButton.setAttribute('aria-disabled', 'true');
    submitLabel.textContent = 'Abrindo e-mail...';
    const subject = encodeURIComponent(`Contato pelo portfólio — ${fields.name.value.trim()}`);
    const body = encodeURIComponent(`Nome: ${fields.name.value.trim()}\nE-mail: ${fields.email.value.trim()}\n\n${fields.message.value.trim()}`);
    window.location.href = `mailto:contato.breno.car@gmail.com?subject=${subject}&body=${body}`;
    status.textContent = 'Seu aplicativo de e-mail deve abrir em instantes.';
    window.setTimeout(() => {
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-disabled');
      submitLabel.textContent = 'Enviar mensagem';
    }, 1200);
  });
})();
