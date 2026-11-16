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

  const projects = [
    {
      id: 'intelippec',
      title: 'InteliPec',
      category: 'Antharys Tecnologia',
      icon: 'beef',
      description: 'Sistema de gestão pecuária para centralizar informações do rebanho, acompanhar indicadores e apoiar a tomada de decisões na operação.',
      features: [
        'Refatoração da arquitetura multi-tenant.',
        'Automatização da troca de schemas.',
        'CRUD de animais, lotes e documentos.',
        'Upload de arquivos.',
        'Cálculo automático da composição racial dos animais.'
      ],
      technologies: [
        { name: 'Java 17', icon: './assets/icons/java.svg' },
        { name: 'Spring Boot 3', icon: './assets/icons/springboot.svg' },
        { name: 'Angular 19', icon: './assets/icons/angular.svg' },
        { name: 'Tailwind CSS', icon: './assets/icons/tailwindcss.svg' }
      ],
      githubUrl: null,
      demoUrl: null
    },
    {
      id: 'nfse',
      title: 'Módulo Emissor de NFS-e',
      category: 'Antharys Tecnologia',
      icon: 'receipt-text',
      description: 'Módulo para emissão e gerenciamento de notas fiscais de serviço eletrônicas, integrado ao fluxo operacional do sistema empresarial.',
      features: [
        'Emissão e cancelamento de NFS-e.',
        'Processamento médio de 1.500 notas por dia.',
        'Integração com eNotas.',
        'Envio em lote e processamento em filas.',
        'Webhooks, auditoria, logs e filtros.'
      ],
      technologies: [
        { name: 'Java 17', icon: './assets/icons/java.svg' },
        { name: 'Spring Boot 3', icon: './assets/icons/springboot.svg' },
        { name: 'Angular 19', icon: './assets/icons/angular.svg' },
        { name: 'Bootstrap 5', icon: null }
      ],
      githubUrl: null,
      demoUrl: null
    },
    {
      id: 'orcamento',
      title: 'Módulo de Orçamento',
      category: 'Antharys Tecnologia',
      icon: 'calculator',
      description: 'Módulo para elaboração, acompanhamento e controle de orçamentos, apoiando a organização comercial e financeira das empresas.',
      features: [
        'Substituição de 10 planilhas Excel por duas telas.',
        'API REST para gestão de orçamentos.',
        'Relacionamentos Many-to-Many.',
        'Cadastro, edição e geração de PDFs.'
      ],
      technologies: [
        { name: 'Java 8', icon: './assets/icons/java.svg' },
        { name: 'Spring Boot 1', icon: './assets/icons/springboot.svg' },
        { name: 'AngularJS', icon: './assets/icons/angular.svg' }
      ],
      githubUrl: null,
      demoUrl: null
    },
    {
      id: 'erp-mineradora',
      title: 'ERP para Mineradora',
      category: 'Antharys Tecnologia',
      icon: 'hard-hat',
      description: 'Sistema integrado de gestão empresarial para uma mineradora, reunindo processos operacionais, administrativos e financeiros em uma única solução.',
      features: [
        'Gestão financeira e vendas.',
        'Cadastro de múltiplos caixas.',
        'Filtros de receitas e despesas por caixa.',
        'Dashboards com segmentação de produtos.',
        'Relatórios de retiradas.',
        'Controle de pagamentos parciais e totais em vendas a prazo.'
      ],
      technologies: [
        { name: 'Java 17', icon: './assets/icons/java.svg' },
        { name: 'Spring Boot 3', icon: './assets/icons/springboot.svg' },
        { name: 'Angular 19', icon: './assets/icons/angular.svg' }
      ],
      githubUrl: null,
      demoUrl: null
    },
    {
      id: 'gestao-direta',
      title: 'Gestão Direta',
      category: 'TCC',
      icon: 'sprout',
      description: 'Plataforma de gestão financeira para pequenos produtores rurais, com controle de receitas, despesas, safras, fluxo de caixa, relatórios e integração com inteligência artificial e Telegram.',
      features: [
        'Gestão de receitas, despesas e safras.',
        'Fluxo de caixa e relatórios.',
        'Integração com Telegram e inteligência artificial.',
        'Conversão de textos e áudios em transações financeiras, com 95% de eficácia e confirmação do usuário.'
      ],
      technologies: [
        { name: 'Angular', icon: './assets/icons/angular.svg' },
        { name: 'Java', icon: './assets/icons/java.svg' },
        { name: 'Spring Boot', icon: './assets/icons/springboot.svg' }
      ],
      githubUrl: null,
      demoUrl: null
    },
    {
      id: 'notificacoes',
      title: 'Sistema de Notificações',
      category: 'Hackathon',
      icon: 'clipboard-check',
      description: 'API RESTful para envio automatizado de notificações pelo WhatsApp, utilizando Spring Security e integração com Twilio.',
      features: [
        'Desenvolvimento de API RESTful.',
        'Segurança com Spring Security.',
        'Integração com WhatsApp via Twilio.',
        'Envio automatizado de alertas.'
      ],
      technologies: [
        { name: 'Java', icon: './assets/icons/java.svg' },
        { name: 'Spring Boot', icon: './assets/icons/springboot.svg' },
        { name: 'Spring Security', icon: null },
        { name: 'Twilio', icon: null }
      ],
      githubUrl: null,
      demoUrl: null
    }
  ];

  const createLucideIcon = (name) => {
    const icon = document.createElement('i');
    icon.dataset.lucide = name;
    icon.setAttribute('aria-hidden', 'true');
    return icon;
  };

  const createTechnologyElement = (technology, className = 'project-dialog-tech') => {
    const element = document.createElement('div');
    element.className = className;
    if (technology.icon) {
      const image = document.createElement('img');
      image.src = technology.icon;
      image.alt = '';
      image.width = 28;
      image.height = 28;
      element.append(image);
    } else {
      const fallback = document.createElement('span');
      fallback.className = 'project-dialog-tech-fallback';
      fallback.textContent = technology.name.slice(0, 2).toUpperCase();
      fallback.setAttribute('aria-hidden', 'true');
      element.append(fallback);
    }
    const name = document.createElement('span');
    name.textContent = technology.name;
    element.append(name);
    return element;
  };

  const renderProjectCards = () => {
    const grid = document.querySelector('[data-project-grid]');
    if (!grid) return;

    const fragment = document.createDocumentFragment();
    projects.forEach((project, index) => {
      const card = document.createElement('article');
      card.className = `project-card reveal${index % 3 ? ` reveal-delay-${index % 3}` : ''}`;
      card.dataset.projectId = project.id;
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-haspopup', 'dialog');
      card.setAttribute('aria-label', `Ver detalhes do projeto ${project.title}`);

      const icon = document.createElement('div');
      icon.className = 'project-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.append(createLucideIcon(project.icon));

      const title = document.createElement('h3');
      title.className = 'mt-5 text-lg font-bold';
      title.textContent = project.title;

      const category = document.createElement('p');
      category.className = 'project-category';
      category.textContent = project.category;

      const description = document.createElement('p');
      description.className = 'mt-2 text-sm leading-6 text-secondary';
      description.textContent = project.description;

      const stack = document.createElement('div');
      stack.className = 'project-stack';
      stack.setAttribute('aria-label', 'Tecnologias utilizadas');
      project.technologies.forEach((technology) => {
        const technologyName = document.createElement('span');
        technologyName.textContent = technology.name;
        stack.append(technologyName);
      });

      card.append(icon, title, category, description, stack);
      fragment.append(card);
    });
    grid.replaceChildren(fragment);
    window.lucide?.createIcons();
  };

  const setupProjectDetails = () => {
    const grid = document.querySelector('[data-project-grid]');
    const dialog = document.querySelector('[data-project-dialog]');
    if (!grid || !dialog) return;

    const dialogIcon = dialog.querySelector('[data-project-dialog-icon]');
    const dialogTitle = dialog.querySelector('[data-project-dialog-title]');
    const dialogCategory = dialog.querySelector('[data-project-dialog-category]');
    const dialogDescription = dialog.querySelector('[data-project-dialog-description]');
    const dialogFeatures = dialog.querySelector('[data-project-dialog-features]');
    const dialogTechnologies = dialog.querySelector('[data-project-dialog-technologies]');
    const dialogLinks = dialog.querySelector('[data-project-dialog-links]');
    const closeButtons = [...dialog.querySelectorAll('[data-project-dialog-close]')];
    const focusableSelector = 'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    let activeCard = null;
    let closeTimer = null;
    let isClosing = false;

    const clearDialogState = () => {
      document.body.classList.remove('modal-open');
      dialog.classList.remove('is-visible', 'is-closing', 'is-open');
      isClosing = false;
      if (activeCard) activeCard.focus();
      activeCard = null;
    };

    const closeDialog = () => {
      if (!activeCard || isClosing) return;
      isClosing = true;
      dialog.classList.remove('is-visible');
      dialog.classList.add('is-closing');
      closeTimer = window.setTimeout(() => {
        if (dialog.open && typeof dialog.close === 'function') dialog.close();
        else {
          dialog.removeAttribute('open');
          clearDialogState();
        }
      }, 180);
    };

    const openDialog = (card) => {
      const project = projects.find((item) => item.id === card.dataset.projectId);
      if (!project) return;
      if (closeTimer) window.clearTimeout(closeTimer);
      activeCard = card;
      dialogIcon.replaceChildren(createLucideIcon(project.icon));
      dialogTitle.textContent = project.title;
      dialogCategory.textContent = project.category;
      dialogDescription.textContent = project.description;
      dialogFeatures.replaceChildren(...project.features.map((feature) => {
        const item = document.createElement('li');
        item.textContent = feature;
        return item;
      }));
      dialogTechnologies.replaceChildren(...project.technologies.map((technology) => createTechnologyElement(technology)));
      dialogLinks.replaceChildren();

      const links = [
        { url: project.githubUrl, label: 'GitHub', icon: 'github' },
        { url: project.demoUrl, label: 'Demonstração', icon: 'external-link' }
      ].filter((link) => link.url);
      links.forEach((link) => {
        const anchor = document.createElement('a');
        anchor.href = link.url;
        anchor.target = '_blank';
        anchor.rel = 'noreferrer';
        anchor.append(createLucideIcon(link.icon));
        const label = document.createElement('span');
        label.textContent = link.label;
        anchor.append(label);
        dialogLinks.append(anchor);
      });
      dialogLinks.hidden = links.length === 0;

      document.body.classList.add('modal-open');
      dialog.classList.remove('is-closing');
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else {
        dialog.setAttribute('open', '');
        dialog.classList.add('is-open');
      }
      window.lucide?.createIcons();
      window.requestAnimationFrame(() => {
        dialog.classList.add('is-visible');
        closeButtons[0]?.focus();
      });
    };

    renderProjectCards();
    grid.addEventListener('click', (event) => {
      const card = event.target.closest('[data-project-id]');
      if (card) openDialog(card);
    });
    grid.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const card = event.target.closest('[data-project-id]');
      if (!card) return;
      event.preventDefault();
      openDialog(card);
    });
    closeButtons.forEach((button) => button.addEventListener('click', closeDialog));
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) closeDialog();
    });
    dialog.addEventListener('cancel', (event) => {
      event.preventDefault();
      closeDialog();
    });
    dialog.addEventListener('close', clearDialogState);
    dialog.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeDialog();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusableElements = [...dialog.querySelectorAll(focusableSelector)].filter((element) => !element.hasAttribute('disabled') && element.offsetParent !== null);
      if (!focusableElements.length) return;
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  };

  setupProjectDetails();

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

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const initialCards = [...grid.querySelectorAll('[data-tech-card]')];
    const records = initialCards.map((element) => ({ template: element.cloneNode(true) }));
    let activeRecords = [];
    let activeCards = [];
    let queuedRecords = [];
    let timerId = null;
    let sectionIsVisible = false;
    let isAnimating = false;
    let activeAnimations = [];
    let nextDirection = -1;

    const visibleCount = () => {
      const count = Number.parseInt(getComputedStyle(grid).getPropertyValue('--tech-visible-count'), 10);
      return Math.max(1, Math.min(count || records.length, records.length));
    };

    const cleanCard = (card) => {
      card.classList.remove('reveal', 'reveal-delay-1', 'reveal-delay-2', 'is-visible', 'is-tech-incoming', 'is-tech-impact', 'is-tech-exiting');
      card.removeAttribute('style');
      card.setAttribute('aria-hidden', 'false');
      return card;
    };

    const cardFromRecord = (record) => cleanCard(record.template.cloneNode(true));

    const syncSlotCount = () => {
      if (isAnimating) return;
      const count = visibleCount();
      while (activeRecords.length < count && queuedRecords.length) {
        const record = queuedRecords.shift();
        activeRecords.push(record);
        activeCards.push(cardFromRecord(record));
      }
      while (activeRecords.length > count) {
        queuedRecords.unshift(activeRecords.pop());
        activeCards.pop();
      }
      grid.replaceChildren(...activeCards);
      activeCards.forEach((card) => card.setAttribute('aria-hidden', 'false'));
    };

    const clearTimer = () => {
      if (timerId) window.clearTimeout(timerId);
      timerId = null;
    };

    const pauseAnimations = () => {
      activeAnimations.forEach((animation) => {
        if (animation.playState === 'running') animation.pause();
      });
    };

    const resumeAnimations = () => {
      activeAnimations.forEach((animation) => {
        if (animation.playState === 'paused') animation.play();
      });
    };

    const scheduleNext = () => {
      clearTimer();
      if (!sectionIsVisible || document.hidden || isAnimating) return;
      const delay = 2500 + Math.random() * 1500;
      timerId = window.setTimeout(() => {
        timerId = null;
        swapCards();
      }, delay);
    };

    const replaceWithoutAnimation = () => {
      if (activeCards.length < 1 || queuedRecords.length < 1) return;
      const targetIndex = Math.floor(Math.random() * activeCards.length);
      const oldRecord = activeRecords[targetIndex];
      const incomingRecord = queuedRecords.shift();
      const incomingCard = cardFromRecord(incomingRecord);
      queuedRecords.push(oldRecord);
      activeRecords[targetIndex] = incomingRecord;
      activeCards[targetIndex].replaceWith(incomingCard);
      activeCards[targetIndex] = incomingCard;
    };

    const swapCards = async () => {
      if (isAnimating || document.hidden || !sectionIsVisible) return;
      syncSlotCount();
      if (activeCards.length < 1 || queuedRecords.length < 1) {
        scheduleNext();
        return;
      }
      if (reducedMotion.matches) {
        replaceWithoutAnimation();
        scheduleNext();
        return;
      }

      const targetIndex = Math.floor(Math.random() * activeCards.length);
      const oldCard = activeCards[targetIndex];
      const oldRecord = activeRecords[targetIndex];
      const incomingRecord = queuedRecords.shift();
      const incomingCard = cardFromRecord(incomingRecord);
      const gridRect = grid.getBoundingClientRect();
      const targetRect = oldCard.getBoundingClientRect();
      const targetLeft = targetRect.left - gridRect.left;
      const targetTop = targetRect.top - gridRect.top;
      const cardHeight = targetRect.height;
      const entryDirection = nextDirection;
      nextDirection *= -1;
      const entryOffset = entryDirection * (cardHeight + 18);
      const pushDirection = -entryDirection;
      const impactDistance = Math.min(16, Math.max(8, cardHeight * 0.05));
      const exitDistance = cardHeight + 24;
      const totalDuration = 1120;
      const approachEnd = 450 / totalDuration;
      const impactMidpoint = 510 / totalDuration;
      const impactEnd = 570 / totalDuration;
      const transferEnd = 970 / totalDuration;

      incomingCard.classList.add('is-tech-incoming');
      incomingCard.style.left = `${targetLeft}px`;
      incomingCard.style.top = `${targetTop}px`;
      incomingCard.style.width = `${targetRect.width}px`;
      incomingCard.style.height = `${targetRect.height}px`;
      grid.append(incomingCard);

      oldCard.classList.add('is-tech-impact', 'is-tech-exiting');
      isAnimating = true;
      const incomingAnimation = incomingCard.animate([
        { transform: `translate3d(0, ${entryOffset}px, 0) scale(1)`, offset: 0 },
        { transform: 'translate3d(0, 0, 0) scale(1)', offset: approachEnd, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
        { transform: 'translate3d(0, 0, 0) scale(0.96)', offset: impactMidpoint, easing: 'ease-out' },
        { transform: 'translate3d(0, 0, 0) scale(1)', offset: impactEnd, easing: 'ease-out' },
        { transform: 'translate3d(0, 0, 0) scale(1)', offset: 1 }
      ], { duration: totalDuration, fill: 'forwards', easing: 'linear' });
      const oldAnimation = oldCard.animate([
        { transform: 'translate3d(0, 0, 0) scale(1)', opacity: 1, offset: 0 },
        { transform: 'translate3d(0, 0, 0) scale(1)', opacity: 1, offset: approachEnd },
        { transform: `translate3d(0, ${pushDirection * impactDistance}px, 0) scale(0.995)`, opacity: 1, offset: impactMidpoint, easing: 'ease-out' },
        { transform: `translate3d(0, ${pushDirection * impactDistance}px, 0) scale(1)`, opacity: 1, offset: impactEnd },
        { transform: `translate3d(0, ${pushDirection * exitDistance}px, 0) scale(1)`, opacity: 0, offset: transferEnd, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' },
        { transform: `translate3d(0, ${pushDirection * exitDistance}px, 0) scale(1)`, opacity: 0, offset: 1 }
      ], { duration: totalDuration, fill: 'forwards', easing: 'linear' });
      activeAnimations = [incomingAnimation, oldAnimation];

      try {
        await Promise.all([incomingAnimation.finished, oldAnimation.finished]);
        queuedRecords.push(oldRecord);
        activeRecords[targetIndex] = incomingRecord;
        oldCard.replaceWith(incomingCard);
        activeCards[targetIndex] = cleanCard(incomingCard);
      } catch (error) {
        queuedRecords.unshift(incomingRecord);
        if (incomingCard.isConnected) incomingCard.remove();
      } finally {
        oldCard.classList.remove('is-tech-impact', 'is-tech-exiting');
        activeAnimations = [];
        isAnimating = false;
        scheduleNext();
      }
    };

    activeRecords = records.slice(0, visibleCount());
    activeCards = initialCards.slice(0, activeRecords.length);
    queuedRecords = records.slice(activeRecords.length);
    grid.replaceChildren(...activeCards);
    activeCards.forEach((card) => card.setAttribute('aria-hidden', 'false'));
    window.addEventListener('resize', syncSlotCount, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearTimer();
        pauseAnimations();
      } else {
        if (sectionIsVisible) resumeAnimations();
        if (sectionIsVisible && !isAnimating) scheduleNext();
      }
    });
    reducedMotion.addEventListener?.('change', () => {
      if (!isAnimating) scheduleNext();
    });

    if ('IntersectionObserver' in window) {
      const technologyObserver = new IntersectionObserver(([entry]) => {
        sectionIsVisible = entry.isIntersecting;
        if (sectionIsVisible) {
          resumeAnimations();
          scheduleNext();
        } else {
          clearTimer();
          pauseAnimations();
        }
      }, { threshold: 0.2 });
      technologyObserver.observe(grid.closest('section') || grid);
    } else {
      sectionIsVisible = true;
      scheduleNext();
    }
  };

  setupTechnologyShuffle();

  document.querySelector('[data-current-year]')?.replaceChildren(String(new Date().getFullYear()));
})();
