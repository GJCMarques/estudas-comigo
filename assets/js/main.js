/* ===================================
   ESTUDAS? COMIGO! - LUXURY INTERACTIONS
   High-End Study Center Interface
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
  initSmartHeader();
  initActiveNavigation();
  initMobileMenu();
  initScrollReveal();
  initParallax();
});

/* ===================================
   SMART HEADER (Scroll Direction Detection with Threshold)
   Hide on scroll down, show only after significant scroll up
   =================================== */

function initSmartHeader() {
  const header = document.querySelector('.smart-header');

  if (!header) return;

  // Variáveis de controlo
  let lastScrollY = window.scrollY;
  let scrollDelta = 0;
  let isHeaderHidden = false;
  let ticking = false;

  // Configurações
  const SCROLL_UP_THRESHOLD = 150; // Quantos pixels subir para o menu aparecer
  const HIDE_AFTER = 150; // Só começa a esconder depois de descer 150px

  // Ajusta o padding do body para o conteúdo não ficar escondido
  const setHeaderHeight = () => {
    const headerHeight = header.offsetHeight;
    document.body.style.paddingTop = `${headerHeight}px`;
  };
  
  // Inicializa a altura e atualiza se a janela mudar de tamanho
  setHeaderHeight();
  window.addEventListener('resize', setHeaderHeight);

  // A Lógica principal da animação
  const updateHeader = () => {
    const scrollY = window.scrollY;
    const scrollDifference = scrollY - lastScrollY;

    // Adiciona efeito de vidro/sombra se não estiver no topo
    if (scrollY > 50) { 
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Lógica de Scroll (Aparecer/Desaparecer)
    
    // 1. Se rolar para BAIXO e já passou do topo
    if (scrollDifference > 0 && scrollY > HIDE_AFTER) {
      if (!isHeaderHidden) {
        header.classList.add('header-hidden'); // O CSS faz a animação suave
        isHeaderHidden = true;
      }
      scrollDelta = 0;
    }
    // 2. Se rolar para CIMA
    else if (scrollDifference < 0) {
      scrollDelta += Math.abs(scrollDifference);

      if (scrollDelta >= SCROLL_UP_THRESHOLD || scrollY <= HIDE_AFTER) {
        if (isHeaderHidden) {
          header.classList.remove('header-hidden'); // O CSS faz a animação suave
          isHeaderHidden = false;
        }
        scrollDelta = 0;
      }
    }

    lastScrollY = scrollY;
    ticking = false;
  };

  // O "Ouvinte" que deteta o scroll e chama a função acima
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });
}

/* ===================================
   ACTIVE NAVIGATION (Auto-detect current page)
   =================================== */

function initActiveNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname;

  navLinks.forEach(link => {
    const href = link.getAttribute('href');

    // Check if this link matches the current path
    if (currentPath === href ||
        currentPath.includes(href) && href !== '/') {
      link.classList.add('active');
    }

    // Special case: highlight "Contactos" when on /contactos
    if (currentPath.includes('/contactos') && href.includes('/contactos')) {
      link.classList.add('active');
    }

    // Special case: highlight "Início" when on root
    if (currentPath === '/' && href === '/') {
      link.classList.add('active');
    }
  });
}

/* ===================================
   MOBILE MENU
   =================================== */

function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const menu = document.querySelector('.mobile-nav');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
  });

  // Close on link click
  const menuLinks = menu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('active')) {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* ===================================
   SCROLL REVEAL (Intersection Observer)
   =================================== */

function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ===================================
   PARALLAX EFFECT
   =================================== */

function initParallax() {
  const parallaxElements = document.querySelectorAll('.parallax-bg');

  if (!parallaxElements.length) return;

  let ticking = false;

  const updateParallax = () => {
    const scrollY = window.scrollY;

    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.5;
      const yPos = -(scrollY * speed);
      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });
}

/* ===================================
   SMOOTH SCROLL
   =================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    if (href === '#') {
      e.preventDefault();
      return;
    }

    const target = document.querySelector(href);

    if (target) {
      e.preventDefault();
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

/* ===================================
   CONSOLE BRANDING
   =================================== */

console.log(
  '%c✨ Estudas? Comigo! ',
  'background: #8A5A3C; color: #F2B734; font-size: 20px; padding: 10px 20px; border-radius: 8px; font-weight: bold;'
);
console.log(
  '%cTransformamos desafios em sucesso escolar.',
  'color: #8A5A3C; font-size: 14px; font-weight: 600; margin-top: 5px;'
);
console.log(
  '%c📞 938 656 121 | ✉️ estudascomigo@hotmail.com',
  'color: #666; font-size: 12px; margin-top: 5px;'
);
