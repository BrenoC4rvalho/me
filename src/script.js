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
  window.lucide?.createIcons();

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

  const setupTechnologyShuffle = () => {
    const grid = document.querySelector('[data-tech-grid]');
    if (!grid) return;

    const cards = () => [...grid.querySelectorAll('[data-tech-card]')];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timerId = null;
    let sectionIsVisible = false;
    let isAnimating = false;
    let step = 0;
    let hiddenCursor = 0;

    const visibleCount = () => {
      const count = Number.parseInt(getComputedStyle(grid).getPropertyValue('--tech-visible-count'), 10);
      return Math.max(1, Math.min(count || cards().length, cards().length));
    };

    const updateVisibility = () => {
      const count = visibleCount();
      cards().forEach((card, index) => {
        const isOffscreen = index >= count;
        card.classList.toggle('is-tech-offscreen', isOffscreen);
        card.setAttribute('aria-hidden', String(isOffscreen));
      });
    };

    const swapNodes = (firstNode, secondNode) => {
      const firstMarker = document.createComment('tech-card-first-position');
      const secondMarker = document.createComment('tech-card-second-position');
      grid.replaceChild(firstMarker, firstNode);
      grid.replaceChild(secondMarker, secondNode);
      grid.replaceChild(secondNode, firstMarker);
      grid.replaceChild(firstNode, secondMarker);
    };

    const finishAnimation = (animatedCards) => {
      animatedCards.forEach((card) => {
        card.classList.remove('is-tech-animating');
        card.style.removeProperty('transform');
        card.style.removeProperty('transition');
      });
      isAnimating = false;
    };

    const swapCards = () => {
      if (isAnimating || reducedMotion.matches || document.hidden) return;

      const orderedCards = cards();
      const count = visibleCount();
      if (count < 2 || orderedCards.length < 2) return;

      updateVisibility();
      const firstIndex = step % count;
      const hasOffscreenCards = orderedCards.length > count;
      const shouldBringInCard = hasOffscreenCards && step % 3 === 2;
      const secondIndex = shouldBringInCard
        ? count + (hiddenCursor % (orderedCards.length - count))
        : (firstIndex + 1 + (Math.floor(step / count) % (count - 1))) % count;
      const firstCard = orderedCards[firstIndex];
      const secondCard = orderedCards[secondIndex];
      const firstPositions = new Map(orderedCards.map((card) => [card, card.getBoundingClientRect()]));

      isAnimating = true;
      firstCard.classList.add('is-tech-animating');
      secondCard.classList.add('is-tech-animating');
      swapNodes(firstCard, secondCard);
      updateVisibility();

      const animatedCards = [firstCard, secondCard];
      const lastPositions = new Map(orderedCards.map((card) => [card, card.getBoundingClientRect()]));

      orderedCards.forEach((card) => {
        const first = firstPositions.get(card);
        const last = lastPositions.get(card);
        const deltaX = first.left - last.left;
        const deltaY = first.top - last.top;
        if (deltaX || deltaY) {
          card.style.transition = 'none';
          card.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
        }
      });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          orderedCards.forEach((card) => {
            const first = firstPositions.get(card);
            const last = lastPositions.get(card);
            if (first.left !== last.left || first.top !== last.top) {
              card.style.transition = 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)';
              card.style.transform = 'translate3d(0, 0, 0)';
            }
          });
        });
      });

      window.setTimeout(() => finishAnimation(animatedCards), 650);
      if (shouldBringInCard) hiddenCursor += 1;
      step += 1;
    };

    const start = () => {
      if (!sectionIsVisible || timerId || reducedMotion.matches) return;
      timerId = window.setInterval(swapCards, 2800);
    };

    const stop = () => {
      if (timerId) window.clearInterval(timerId);
      timerId = null;
    };

    updateVisibility();
    window.addEventListener('resize', updateVisibility, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else start();
    });
    reducedMotion.addEventListener?.('change', () => {
      if (reducedMotion.matches) stop();
      else start();
    });

    if ('IntersectionObserver' in window) {
      const technologyObserver = new IntersectionObserver(([entry]) => {
        sectionIsVisible = entry.isIntersecting;
        if (sectionIsVisible) start();
        else stop();
      }, { threshold: 0.2 });
      technologyObserver.observe(grid.closest('section') || grid);
    } else {
      sectionIsVisible = true;
      start();
    }
  };

  setupTechnologyShuffle();

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
