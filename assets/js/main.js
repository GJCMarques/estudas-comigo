/* ===================================
   ESTUDAS? COMIGO! - MAIN INTERACTIONS
   Luxury Boutique Study Center
   =================================== */

// ===================================
// SMOOTH SCROLL & NAVIGATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  initScrollHeader();
  initMobileMenu();
  initScrollReveal();
  initAnimatedCounters();
  initInfiniteMarquee();
  initSmoothScroll();
});

// ===================================
// GLASSMORPHISM HEADER ON SCROLL
// ===================================

function initScrollHeader() {
  const header = document.querySelector('.header');

  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ===================================
// MOBILE MENU TOGGLE
// ===================================

function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const menu = document.querySelector('.nav-menu');
  const menuLinks = document.querySelectorAll('.nav-menu a');

  if (!toggle || !menu) return;

  // Toggle menu
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when clicking a link
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ===================================
// SCROLL REVEAL ENGINE (Intersection Observer)
// ===================================

function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');

  if (!revealElements.length) return;

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: Unobserve after reveal for performance
        // revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}

// ===================================
// ANIMATED NUMBER COUNTERS
// ===================================

function initAnimatedCounters() {
  const counters = document.querySelectorAll('.stat-number');

  if (!counters.length) return;

  const observerOptions = {
    threshold: 0.5
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        animateCounter(entry.target);
        entry.target.classList.add('counted');
      }
    });
  }, observerOptions);

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

function animateCounter(element) {
  const target = element.getAttribute('data-target');

  if (!target) return;

  // Extract number and suffix (e.g., "500" and "+", or "98" and "%")
  const match = target.match(/^([+])?(\d+)([%+])?$/);

  if (!match) {
    element.textContent = target;
    return;
  }

  const prefix = match[1] || '';
  const number = parseInt(match[2]);
  const suffix = match[3] || '';

  const duration = 2000; // 2 seconds
  const frameDuration = 1000 / 60; // 60 FPS
  const totalFrames = Math.round(duration / frameDuration);
  let frame = 0;

  const counter = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    const current = Math.round(number * easeOutQuad(progress));

    element.textContent = prefix + current + suffix;

    if (frame === totalFrames) {
      clearInterval(counter);
      element.textContent = prefix + number + suffix;
    }
  }, frameDuration);
}

// Easing function for smooth animation
function easeOutQuad(t) {
  return t * (2 - t);
}

// ===================================
// INFINITE MARQUEE (Ticker)
// ===================================

function initInfiniteMarquee() {
  const ticker = document.querySelector('.ticker-track');

  if (!ticker) return;

  // Clone the content to create seamless loop
  const tickerContent = ticker.innerHTML;
  ticker.innerHTML = tickerContent + tickerContent;
}

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================

function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Skip if href is just "#"
      if (href === '#') {
        e.preventDefault();
        return;
      }

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===================================
// FORM VALIDATION & ENHANCEMENT
// ===================================

function initFormValidation() {
  const forms = document.querySelectorAll('.contact-form');

  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Basic validation
      if (!validateForm(data)) {
        return;
      }

      // Show loading state
      const submitBtn = form.querySelector('.form-submit');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'A enviar...';
      submitBtn.disabled = true;

      // Simulate form submission (replace with actual endpoint)
      try {
        // await submitForm(data);

        // Success message
        showFormMessage(form, 'Mensagem enviada com sucesso!', 'success');
        form.reset();
      } catch (error) {
        showFormMessage(form, 'Erro ao enviar mensagem. Tente novamente.', 'error');
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  });
}

function validateForm(data) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.nome || data.nome.trim().length < 2) {
    alert('Por favor, insira um nome válido.');
    return false;
  }

  if (!data.email || !emailRegex.test(data.email)) {
    alert('Por favor, insira um email válido.');
    return false;
  }

  if (!data.mensagem || data.mensagem.trim().length < 10) {
    alert('Por favor, insira uma mensagem com pelo menos 10 caracteres.');
    return false;
  }

  return true;
}

function showFormMessage(form, message, type) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `form-message form-message-${type}`;
  messageDiv.textContent = message;
  messageDiv.style.cssText = `
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 8px;
    text-align: center;
    font-weight: 600;
    background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
    color: ${type === 'success' ? '#155724' : '#721c24'};
  `;

  // Remove existing messages
  const existingMessage = form.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }

  form.appendChild(messageDiv);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    messageDiv.remove();
  }, 5000);
}

// Initialize form validation when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFormValidation);
} else {
  initFormValidation();
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function for scroll events
function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Lazy load images (if needed)
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');

  if (!images.length) return;

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================

// Add keyboard navigation for mobile menu
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const menu = document.querySelector('.nav-menu');
    const toggle = document.querySelector('.mobile-menu-toggle');

    if (menu && menu.classList.contains('active')) {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
});

// Focus management for better accessibility
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );

  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  });
}

// ===================================
// CONSOLE BRANDING (Optional Easter Egg)
// ===================================

console.log(
  '%c🎓 Estudas? Comigo! ',
  'background: #8A5A3C; color: #F2B734; font-size: 20px; padding: 10px; border-radius: 5px;'
);
console.log(
  '%cTransformamos desafios em sucesso escolar.',
  'color: #8A5A3C; font-size: 14px; font-weight: bold;'
);
console.log(
  '%c📞 938 656 121 | 📧 estudascomigo@hotmail.com',
  'color: #666; font-size: 12px;'
);
