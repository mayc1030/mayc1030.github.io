/* eslint-disable */
(function () {
  'use strict';

  // ── Page Loader ───────────────────────────────────────────────────────────

  window.addEventListener('load', function () {
    document.body.classList.add('is-loaded');
  });

  // ── i18n Translations ─────────────────────────────────────────────────────

  var i18n = {
    es: {
      'nav.about':        'Sobre mí',
      'nav.experience':   'Experiencia',
      'nav.projects':     'Proyectos',
      'nav.skills':       'Skills',
      'nav.contact':      'Contacto',
      'nav.blog':         'Blog',
      'hero.available':   'Disponible para proyectos',
      'hero.unavailable': 'No disponible actualmente',
      'hero.btn.projects':'Ver proyectos',
      'hero.btn.contact': 'Contactar',
      'exp.subtitle':     'Mi trayectoria profesional y los proyectos en los que he trabajado.',
      'proj.subtitle':    'Una selección de los proyectos que he construido o en los que he contribuido.',
      'skills.subtitle':  'Tecnologías y herramientas con las que trabajo en el día a día.',
      'contact.subtitle': 'Estoy abierto a nuevas oportunidades, colaboraciones o simplemente una buena conversación sobre tecnología.',
      'badge.current':    'Actual',
      'badge.featured':   '★ Destacado',
      'btn.code':         'Código',
      'section.empty':    'Próximamente.',
      'share.label':      'Compartir',
    },
    en: {
      'nav.about':        'About',
      'nav.experience':   'Experience',
      'nav.projects':     'Projects',
      'nav.skills':       'Skills',
      'nav.contact':      'Contact',
      'nav.blog':         'Blog',
      'hero.available':   'Available for projects',
      'hero.unavailable': 'Not currently available',
      'hero.btn.projects':'View projects',
      'hero.btn.contact': 'Contact me',
      'exp.subtitle':     'My professional background and the projects I\'ve worked on.',
      'proj.subtitle':    'A selection of projects I\'ve built or contributed to.',
      'skills.subtitle':  'Technologies and tools I work with on a daily basis.',
      'contact.subtitle': 'I\'m open to new opportunities, collaborations, or simply a good conversation about technology.',
      'badge.current':    'Current',
      'badge.featured':   '★ Featured',
      'btn.code':         'Code',
      'section.empty':    'Coming soon.',
      'share.label':      'Share',
    }
  };

  // ── Language Toggle ───────────────────────────────────────────────────────

  var LANG_KEY  = 'lang';
  var langToggle = document.getElementById('lang-toggle');

  function applyLang(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    localStorage.setItem(LANG_KEY, lang);
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var text = i18n[lang] && i18n[lang][key];
      if (text) el.textContent = text;
    });
  }

  applyLang(localStorage.getItem(LANG_KEY) || 'es');

  if (langToggle) {
    langToggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-lang') || 'es';
      applyLang(current === 'es' ? 'en' : 'es');
    });
  }

  // ── Dark / Light Mode Toggle ──────────────────────────────────────────────

  var THEME_KEY   = 'theme';
  var themeToggle = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    if (themeToggle) {
      var lang = document.documentElement.getAttribute('data-lang') || 'es';
      themeToggle.setAttribute('aria-label',
        theme === 'dark'
          ? (lang === 'en' ? 'Switch to light mode' : 'Cambiar a modo claro')
          : (lang === 'en' ? 'Switch to dark mode'  : 'Cambiar a modo oscuro')
      );
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  // ── Back to Top ───────────────────────────────────────────────────────────

  var backToTop = document.getElementById('back-to-top');

  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('is-visible', window.scrollY > 400);
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Mobile Nav Toggle ────────────────────────────────────────────────────

  var navToggle = document.getElementById('nav-toggle');
  var siteNav   = document.getElementById('site-nav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    siteNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── Copy Email to Clipboard ───────────────────────────────────────────────

  var emailLink = document.getElementById('email-copy');

  if (emailLink) {
    emailLink.addEventListener('click', function (e) {
      var email = emailLink.textContent.trim();
      if (navigator.clipboard) {
        e.preventDefault();
        navigator.clipboard.writeText(email).then(function () {
          var original = emailLink.textContent;
          var lang = document.documentElement.getAttribute('data-lang') || 'es';
          emailLink.textContent = lang === 'en' ? 'Email copied!' : '¡Email copiado!';
          setTimeout(function () { emailLink.textContent = original; }, 2000);
        });
      }
    });
  }

  // ── Skills stars — animar al entrar en viewport ──────────────────────────

  var skillsGrid = document.querySelector('.skills-categories');

  if (skillsGrid) {
    var skillsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          skillsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    skillsObserver.observe(skillsGrid);
  }

  // ── Reading progress bar ─────────────────────────────────────────────────

  var progressBar = document.getElementById('reading-progress');

  if (progressBar) {
    window.addEventListener('scroll', function () {
      var article = document.querySelector('.post-content');
      if (!article) return;
      var rect    = article.getBoundingClientRect();
      var total   = rect.height - window.innerHeight;
      var scrolled = -rect.top;
      var pct     = total > 0 ? Math.min(Math.max(scrolled / total * 100, 0), 100) : 0;
      progressBar.style.width = pct + '%';
    }, { passive: true });
  }

  // ── Active nav link on scroll ─────────────────────────────────────────────

  var sections = document.querySelectorAll('[id]');
  var navLinks  = document.querySelectorAll('.site-nav a');

  if (sections.length && navLinks.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            var href = link.getAttribute('href');
            var matches = href === '#' + entry.target.id || href === '/#' + entry.target.id;
            if (matches) link.setAttribute('aria-current', 'page');
            else if (!href.includes('/blog')) link.removeAttribute('aria-current');
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(function (section) { observer.observe(section); });
  }

  // ── Projects Pagination ──────────────────────────────────────────────────

  var projGrid  = document.getElementById('projects-grid');
  var projPager = document.getElementById('projects-pagination');
  var projCards = projGrid ? Array.from(projGrid.querySelectorAll('.project-card')) : [];
  var PROJ_PAGE = 6;
  var projPage  = 1;

  function projTotalPages() {
    return Math.max(1, Math.ceil(projCards.length / PROJ_PAGE));
  }

  function renderProjects() {
    var total = projTotalPages();
    var start = (projPage - 1) * PROJ_PAGE;
    var end   = start + PROJ_PAGE;

    projCards.forEach(function (card, i) {
      card.hidden = i < start || i >= end;
    });

    renderProjPagination(total);
  }

  function renderProjPagination(totalPages) {
    if (!projPager) return;
    if (totalPages <= 1) { projPager.innerHTML = ''; return; }

    var arrowL = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>';
    var arrowR = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>';

    var html = '<nav class="pagination" aria-label="Páginas de proyectos">';
    html += '<button class="pagination__arrow" data-proj-page="' + (projPage - 1) + '" aria-label="Anterior"' + (projPage === 1 ? ' disabled' : '') + '>' + arrowL + '</button>';

    projPageNumbers(projPage, totalPages).forEach(function (p) {
      if (p === '…') {
        html += '<span class="pagination__ellipsis" aria-hidden="true">…</span>';
      } else {
        var active = p === projPage;
        html += '<button class="pagination__page' + (active ? ' is-active' : '') + '" data-proj-page="' + p + '" aria-label="Página ' + p + '"' + (active ? ' aria-current="page"' : '') + '>' + p + '</button>';
      }
    });

    html += '<button class="pagination__arrow" data-proj-page="' + (projPage + 1) + '" aria-label="Siguiente"' + (projPage === totalPages ? ' disabled' : '') + '>' + arrowR + '</button>';
    html += '</nav>';
    projPager.innerHTML = html;
  }

  function projPageNumbers(cur, total) {
    if (total <= 7) {
      var r = [];
      for (var i = 1; i <= total; i++) r.push(i);
      return r;
    }
    var result = [1];
    if (cur > 3) result.push('…');
    for (var p = Math.max(2, cur - 1); p <= Math.min(total - 1, cur + 1); p++) result.push(p);
    if (cur < total - 2) result.push('…');
    result.push(total);
    return result;
  }

  if (projPager) {
    projPager.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-proj-page]');
      if (!btn || btn.disabled) return;
      var page = parseInt(btn.getAttribute('data-proj-page'), 10);
      if (page < 1 || page === projPage) return;
      projPage = page;
      renderProjects();
      if (projGrid) projGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  renderProjects();

  // ── Global Search Overlay ────────────────────────────────────────────────

  var searchBtn     = document.getElementById('search-btn');
  var searchOverlay = document.getElementById('search-overlay');
  var searchInput   = document.getElementById('search-overlay-input');
  var searchResults = document.getElementById('search-overlay-results');
  var searchClose   = document.getElementById('search-overlay-close');
  var searchData    = null;
  var searchLoading = false;

  function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.hidden = false;
    document.body.style.overflow = 'hidden';
    setTimeout(function () { if (searchInput) searchInput.focus(); }, 50);
    if (!searchData && !searchLoading) loadSearchData();
  }

  function closeSearch() {
    if (!searchOverlay) return;
    searchOverlay.hidden = true;
    document.body.style.overflow = '';
    if (searchInput) searchInput.value = '';
    if (searchResults) searchResults.innerHTML = '';
  }

  function loadSearchData() {
    searchLoading = true;
    var base = document.querySelector('meta[name="base-url"]');
    var url  = (base ? base.getAttribute('content').replace(/\/$/, '') : '') + '/search.json';
    fetch(url)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        searchData    = data;
        searchLoading = false;
        if (searchInput && searchInput.value.trim()) runSearch();
      })
      .catch(function () { searchLoading = false; });
  }

  function runSearch() {
    if (!searchInput || !searchResults) return;
    var q = searchInput.value.trim().toLowerCase();
    if (!q) {
      searchResults.innerHTML = '<p class="search-overlay__hint">Escribe para buscar posts...</p>';
      return;
    }
    if (!searchData) {
      searchResults.innerHTML = '<p class="search-overlay__hint">Cargando...</p>';
      return;
    }
    var results = searchData.filter(function (post) {
      var text = [post.title, post.excerpt, (post.categories || []).join(' '), (post.tags || []).join(' ')].join(' ').toLowerCase();
      return text.indexOf(q) !== -1;
    });
    renderResults(results, q);
  }

  function renderResults(results, query) {
    if (!results.length) {
      searchResults.innerHTML = '<p class="search-overlay__empty">Sin resultados para "<strong>' + escapeHtml(query) + '</strong>".</p>';
      return;
    }
    searchResults.innerHTML = results.slice(0, 12).map(function (post) {
      var cats = (post.categories || []).map(function (c) {
        return '<span class="search-result-item__cat">' + escapeHtml(c) + '</span>';
      }).join('');
      return '<a href="' + escapeHtml(post.url) + '" class="search-result-item">' +
        '<div class="search-result-item__title">' + escapeHtml(post.title) + '</div>' +
        '<div class="search-result-item__meta"><span>' + escapeHtml(post.date) + '</span>' + cats + '</div>' +
        (post.excerpt ? '<div class="search-result-item__excerpt">' + escapeHtml(post.excerpt) + '</div>' : '') +
        '</a>';
    }).join('');
  }

  function escapeHtml(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  if (searchBtn)   searchBtn.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      var q = searchInput.value.trim();
      if (!q) { searchResults.innerHTML = ''; return; }
      runSearch();
    });
  }

  if (searchOverlay) {
    searchOverlay.addEventListener('click', function (e) {
      if (e.target === searchOverlay || e.target.classList.contains('search-overlay__backdrop')) closeSearch();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && searchOverlay && !searchOverlay.hidden) closeSearch();
    if ((e.key === 'k' && (e.metaKey || e.ctrlKey))) { e.preventDefault(); openSearch(); }
  });

  // ── Share Bar — Copy Link ────────────────────────────────────────────────

  document.querySelectorAll('[data-share-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var url = btn.getAttribute('data-share-copy');
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(url).then(function () {
        btn.classList.add('is-copied');
        var original = btn.innerHTML;
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';
        setTimeout(function () {
          btn.classList.remove('is-copied');
          btn.innerHTML = original;
        }, 2000);
      });
    });
  });

  // ── Scroll Reveal Entrance Animations ──────────────────────────────────────
  var revealElements = document.querySelectorAll('.scroll-reveal');
  if (revealElements.length && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  // ── Code Blocks: Header & Copy Button ─────────────────────────────────────
  document.querySelectorAll('div.highlighter-rouge, figure.highlight').forEach(function (wrapper) {
    if (wrapper.querySelector('.code-header')) return;

    var lang = 'CODE';
    wrapper.classList.forEach(function (cls) {
      if (cls.indexOf('language-') === 0) {
        lang = cls.replace('language-', '').toUpperCase();
      }
    });

    var header = document.createElement('div');
    header.className = 'code-header';
    header.innerHTML = '' +
      '<div class="code-header__dots">' +
      '  <span class="dot dot--yellow" title="Amarillo"></span>' +
      '  <span class="dot dot--blue" title="Azul"></span>' +
      '  <span class="dot dot--red" title="Rojo"></span>' +
      '</div>' +
      '<span class="code-header__lang">' + lang + '</span>' +
      '<button class="code-copy-btn" aria-label="Copiar código" title="Copiar código">' +
      '  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>' +
      '  <span>Copiar</span>' +
      '</button>';

    wrapper.insertBefore(header, wrapper.firstChild);

    var copyBtn = header.querySelector('.code-copy-btn');
    var codeEl = wrapper.querySelector('pre');
    if (!codeEl) codeEl = wrapper;

    copyBtn.addEventListener('click', function () {
      var codeText = codeEl.innerText || codeEl.textContent;
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(codeText).then(function () {
        copyBtn.classList.add('is-copied');
        copyBtn.innerHTML = '' +
          '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' +
          '<span style="color: #22c55e;">¡Copiado!</span>';
        setTimeout(function () {
          copyBtn.classList.remove('is-copied');
          copyBtn.innerHTML = '' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>' +
            '<span>Copiar</span>';
        }, 2000);
      });
    });
  });

})();
