(() => {
  'use strict';
  // ===== CARROSSEL PRINCIPAL — SWIPER =====
  const heroSwiperEl = document.querySelector('.heroSwiper');

  if (heroSwiperEl && window.Swiper) {
    new Swiper(heroSwiperEl, {
      loop: true,
      speed: 650,
      effect: 'slide',
      grabCursor: true,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
      roundLengths: true,
      centeredSlides: false,
      autoplay: {
        delay: 5200,
        disableOnInteraction: false
      },
      pagination: {
        el: '.hero-pagination',
        clickable: true,
        bulletClass: 'hero-bullet',
        bulletActiveClass: 'hero-bullet-active',
        renderBullet: function (index, className) {
          return `<button class="${className}" type="button" aria-label="Ir para slide ${index + 1}"></button>`;
        }
      }
    });
  }

  // ===== MENU MOBILE =====

  const nav = document.querySelector('#mainNav');
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const backdrop = document.querySelector('#menuBackdrop');

  function openMenu() {
    if (!nav) return;
    nav.classList.add('open');
    backdrop?.classList.add('open');
    document.body.classList.add('menu-open');
    menuBtn?.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    if (!nav) return;
    nav.classList.remove('open');
    backdrop?.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuBtn?.setAttribute('aria-expanded', 'false');
  }

  menuBtn?.addEventListener('click', () => {
    nav?.classList.contains('open') ? closeMenu() : openMenu();
  });
  backdrop?.addEventListener('click', closeMenu);

  nav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ===== BUSCA =====
  const searchPanel = document.querySelector('#searchPanel');
  const searchOpen = document.querySelector('#searchOpen');
  const searchClose = document.querySelector('#searchClose');
  const searchInput = document.querySelector('#productSearch');
  const productCards = [...document.querySelectorAll('.product-card')];
  const noResults = document.querySelector('#noResults');

  function filterProducts(query) {
    const q = (query || '').trim().toLowerCase();
    let visible = 0;

    productCards.forEach(card => {
      const name = (card.dataset.name || '').toLowerCase();
      const show = !q || name.includes(q);
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    noResults?.classList.toggle('visible', visible === 0);
  }

  searchOpen?.addEventListener('click', () => {
    searchPanel?.classList.add('open');
    setTimeout(() => searchInput?.focus(), 120);
  });

  searchClose?.addEventListener('click', () => {
    searchPanel?.classList.remove('open');
  });

  searchInput?.addEventListener('input', e => {
    document.querySelectorAll('.filter').forEach(btn => btn.classList.remove('active'));
    filterProducts(e.target.value);
  });

  // ===== FILTROS =====
  document.querySelectorAll('.filter').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.filter').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      if (searchInput) searchInput.value = '';

      const filter = button.dataset.filter || 'all';
      let visible = 0;

      productCards.forEach(card => {
        const name = (card.dataset.name || '').toLowerCase();
        const show = filter === 'all' || name.includes(filter.toLowerCase());
        card.style.display = show ? '' : 'none';
        if (show) visible++;
      });

      noResults?.classList.toggle('visible', visible === 0);
    });
  });

  // ===== ESCAPE =====
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMenu();
      searchPanel?.classList.remove('open');
    }
  });

  // ===== ITEM ATIVO DO MENU =====
  const navLinks = [...document.querySelectorAll('#mainNav a')];
  const sections = ['inicio', 'produtos', 'sobre', 'beneficios', 'duvidas']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  window.addEventListener('scroll', () => {
    let activeId = 'inicio';

    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 190) {
        activeId = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
    });
  }, { passive: true });
})();
