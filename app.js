// ============================================================
// CONFIGURACIÓN CENTRAL — edita solo aquí
// ============================================================
var WA = '522295953489';

// ============================================================
// CATÁLOGO OROVA — edita solo estos datos
//   stock : número de piezas disponibles (0 = oculto automáticamente)
//   price : precio formateado, ej. '$1,160.00' ('' = muestra "Consultar precio")
//   img   : ruta a la foto, ej. 'fotos/are-001.webp' ('' = usa ícono SVG)
// ============================================================
var allProducts = [
  { code: 'ARR-001',  name: 'Arracada Basica 10k',      stock: 1, price: '$1,160.00', img: 'img/productos/ARR-001.jpg' },
  { code: 'HUG-001',  name: 'Huggie 10k',                stock: 1, price: '$1,325.00', img: 'img/productos/HUG-001.png' },
  { code: 'CAD-004',  name: 'Cadena Pavé 10k',           stock: 1, price: '$3,920.00', img: 'img/productos/CAD-004.png' },
  { code: 'ARE-005',  name: 'Broquel 10k',               stock: 3, price: '$700.00',   img: 'img/productos/ARE-005' },
  { code: 'CAD-005',  name: 'Cadena Pavé 10k',           stock: 1, price: '$2,620.00', img: 'img/productos/CAD-005' },
  { code: 'ARE-005A', name: 'Broquel 10k',               stock: 3, price: '$700.00',   img: 'img/productos/ARE-005A' },
  { code: 'PUL-002',  name: 'Pulso 10k',                 stock: 1, price: '$3,225.00', img: 'img/productos/PUL-002' },
  { code: 'DIJ-002',  name: 'Dije Trebol Italiano 10k',  stock: 1, price: '$1,335.00', img: 'img/productos/DIJ-002' },
  { code: 'ARR-003',  name: 'Arracada Italiana 10k',     stock: 1, price: '$1,685.00', img: 'img/productos/ARR-003' }
];
var ICONS = {
  CAD: '<svg viewBox="0 0 100 100" fill="none"><path d="M15 38 Q50 14 85 38" stroke="#C9A84C" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M15 38 Q50 62 85 38" stroke="#C9A84C" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="50" cy="72" r="10" stroke="#E8C97A" stroke-width="3" fill="none"/><circle cx="50" cy="72" r="4" fill="#C9A84C"/></svg>',
  ARE: '<svg viewBox="0 0 100 100" fill="none"><circle cx="32" cy="58" r="18" stroke="#C9A84C" stroke-width="6" fill="none"/><circle cx="68" cy="58" r="18" stroke="#C9A84C" stroke-width="6" fill="none"/><line x1="32" y1="40" x2="32" y2="26" stroke="#E8C97A" stroke-width="3.5" stroke-linecap="round"/><line x1="68" y1="40" x2="68" y2="26" stroke="#E8C97A" stroke-width="3.5" stroke-linecap="round"/></svg>',
  ARR: '<svg viewBox="0 0 100 100" fill="none"><circle cx="32" cy="60" r="22" stroke="#C9A84C" stroke-width="5" fill="none"/><circle cx="68" cy="60" r="22" stroke="#C9A84C" stroke-width="5" fill="none"/><circle cx="32" cy="60" r="8" stroke="#E8C97A" stroke-width="2" fill="rgba(201,168,76,0.1)"/><circle cx="68" cy="60" r="8" stroke="#E8C97A" stroke-width="2" fill="rgba(201,168,76,0.1)"/></svg>',
  PUL: '<svg viewBox="0 0 100 100" fill="none"><ellipse cx="50" cy="54" rx="34" ry="21" stroke="#C9A84C" stroke-width="7" fill="none"/><ellipse cx="50" cy="54" rx="34" ry="21" stroke="#E8C97A" stroke-width="1.5" stroke-dasharray="4 4" fill="none"/></svg>',
  HUG: '<svg viewBox="0 0 100 100" fill="none"><path d="M25 50 A25 25 0 0 1 75 50" stroke="#C9A84C" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="25" cy="50" r="5" fill="#C9A84C"/><circle cx="75" cy="50" r="5" fill="#C9A84C"/><path d="M58 70 A25 25 0 0 1 25 50" stroke="#E8C97A" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="4 4"/></svg>',
  DIJ: '<svg viewBox="0 0 100 100" fill="none"><path d="M50 20 L60 40 L82 43 L66 58 L70 80 L50 69 L30 80 L34 58 L18 43 L40 40 Z" stroke="#C9A84C" stroke-width="3.5" fill="rgba(201,168,76,0.07)" stroke-linejoin="round"/><path d="M50 30 L57 44 L73 46 L62 57 L65 73 L50 65 L35 73 L38 57 L27 46 L43 44 Z" stroke="#E8C97A" stroke-width="1.5" fill="none" stroke-linejoin="round"/></svg>',
  DEFAULT: '<svg viewBox="0 0 100 100" fill="none"><polygon points="50,20 80,50 50,80 20,50" stroke="#C9A84C" stroke-width="4" fill="rgba(201,168,76,0.07)"/><polygon points="50,32 68,50 50,68 32,50" stroke="#E8C97A" stroke-width="2" fill="none"/><circle cx="50" cy="50" r="5" fill="#C9A84C"/></svg>'
};
var CATS = { CAD: 'Cadena', ARE: 'Aretes', ARR: 'Arracadas', PUL: 'Pulseras', HUG: 'Huggie', DIJ: 'Dijes' };

// ============================================================
// SANITIZACIÓN — previene XSS al insertar datos en HTML
// ============================================================
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getIconKey(code) { return (code || '').split('-')[0]; }
function getIcon(code)    { return ICONS[getIconKey(code)] || ICONS.DEFAULT; }
function getCat(code)     { return CATS[getIconKey(code)] || 'Joyería'; }

function waMsg(p) {
  var msg = 'Hola OROVA, me interesa *' + p.name + '* (Código: ' + p.code + ' · Oro 10K)';
  if (p.price) msg += ' — Precio publicado: ' + p.price;
  msg += '. ¿Está disponible?';
  return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(msg);
}
function waUrl(msg) {
  return 'https://wa.me/' + WA + (msg ? '?text=' + encodeURIComponent(msg) : '');
}

// ============================================================
// CATÁLOGO — render y filtros
// El ícono SVG fallback se referencia por clave (data-icon-key),
// nunca se almacena HTML crudo en atributos del DOM.
// ============================================================
var WA_ICON = '<svg viewBox="0 0 24 24" class="wa-btn-icon" aria-hidden="true"><use href="#icon-wa"/></svg>';

function renderProducts(f) {
  var grid = document.getElementById('catalogGrid');
  if (!grid) return;
  var withStock = allProducts.filter(function(p) { return p.stock > 0; });
  var list = f === 'all' ? withStock : withStock.filter(function(p) {
    return (p.code || '').indexOf(f) === 0;
  });

  if (list.length === 0) {
    var empty = document.createElement('div');
    empty.className = 'catalog-empty';
    empty.appendChild(document.createTextNode('No hay piezas disponibles en esta categoría por el momento.'));
    empty.appendChild(document.createElement('br'));
    var emptyLink = document.createElement('a');
    emptyLink.href = waUrl('Hola OROVA, ¿cuándo tienen stock disponible?');
    emptyLink.target = '_blank';
    emptyLink.rel = 'noopener noreferrer';
    emptyLink.style.cssText = 'color:var(--gold);text-decoration:none;font-size:0.8rem;letter-spacing:0.1em;margin-top:12px;display:inline-block';
    emptyLink.textContent = 'Preguntar disponibilidad';
    empty.appendChild(emptyLink);
    grid.innerHTML = '';
    grid.appendChild(empty);
    return;
  }

  grid.innerHTML = list.map(function(p, i) {
    var lastTxt  = p.stock === 1 ? 'Última' : 'Últimas';
    var badge    = p.stock <= 2 ? '<div class="stock-badge">' + lastTxt + ' ' + p.stock + '</div>' : '';
    var stockTxt = p.stock === 1 ? '1 pieza disponible' : p.stock + ' piezas disponibles';
    var priceHTML = p.price
      ? '<div class="product-price">' + esc(p.price) + '</div>'
      : '<div class="product-price product-price--consult">Consultar precio</div>';

    // Almacena solo la clave de categoría, nunca HTML crudo en el DOM.
    // Si p.img viene sin extensión (ej. 'img/productos/ARE-002'), se sirve
    // WebP con fallback JPG. Si ya trae extensión (.webp/.jpg/.png), se usa tal cual.
    var mediaHTML;
    if (p.img) {
      var hasExt   = /\.(webp|jpe?g|png|avif)$/i.test(p.img);
      var webpSrc  = hasExt ? p.img : p.img + '.webp';
      var jpgSrc   = hasExt ? p.img : p.img + '.jpg';
      var imgTag   = '<img src="' + esc(jpgSrc) + '"'
                   + ' alt="' + esc(p.name) + ' OROVA"'
                   + ' width="270" height="270"'
                   + ' loading="lazy" decoding="async"'
                   + ' data-icon-key="' + esc(getIconKey(p.code)) + '">';
      mediaHTML    = hasExt
        ? imgTag
        : '<picture>'
            + '<source srcset="' + esc(webpSrc) + '" type="image/webp">'
            + imgTag
          + '</picture>';
    } else {
      mediaHTML = getIcon(p.code);
    }

    return '<div class="product-card" style="--anim-delay:' + (i * 0.07) + 's">'
      + '<div class="product-img">' + badge + mediaHTML + '</div>'
      + '<div class="product-info">'
        + '<div class="product-code">' + esc(p.code) + ' &middot; Oro 10K</div>'
        + '<div class="product-name">' + esc(p.name) + '</div>'
        + priceHTML
        + '<div class="product-stock">Stock: <span>' + stockTxt + '</span></div>'
        + '<div class="product-footer">'
          + '<div class="product-label">' + getCat(p.code) + '</div>'
          + '<a href="' + waMsg(p) + '" class="wa-btn" target="_blank" rel="noopener noreferrer" aria-label="Pedir ' + esc(p.name) + ' por WhatsApp">'
          + WA_ICON + ' Pedir</a>'
        + '</div>'
      + '</div>'
      + '</div>';
  }).join('');

  // Error handler: si la foto falla, oculta el <img>/<picture> e inserta el
  // ícono SVG categórico como reemplazo (referenciado por clave, nunca HTML crudo).
  grid.querySelectorAll('img[data-icon-key]').forEach(function(img) {
    img.addEventListener('error', function() {
      var key = this.dataset.iconKey;
      var svgStr = ICONS[key] || ICONS.DEFAULT;
      var svgEl = new DOMParser().parseFromString(svgStr, 'image/svg+xml').documentElement;
      // Si el <img> vive dentro de <picture>, reemplaza el <picture> completo;
      // si no, reemplaza al <img> directamente.
      var host = this.parentNode && this.parentNode.tagName === 'PICTURE'
        ? this.parentNode
        : this;
      if (svgEl && host.parentNode) host.parentNode.insertBefore(svgEl, host.nextSibling);
      host.style.display = 'none';
    });
  });

  observeCards();
}

// ============================================================
// ANIMACIÓN DE CARDS — solo al entrar en viewport
// ============================================================
var cardObserver = null;
function observeCards() {
  if (cardObserver) cardObserver.disconnect();
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cards = document.querySelectorAll('.product-card');
  if (!('IntersectionObserver' in window) || reducedMotion) {
    cards.forEach(function(c) { c.classList.add('is-visible'); });
    return;
  }
  cardObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });
  cards.forEach(function(c) { cardObserver.observe(c); });
}

function setCatalogFilter(f) {
  document.querySelectorAll('.filter-btn').forEach(function(b) {
    var active = b.getAttribute('data-filter') === f;
    b.classList.toggle('active', active);
    b.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
  renderProducts(f);
}

// ============================================================
// LINKS WA — mensajes personalizados por punto de contacto
// ============================================================
var WA_MSGS = {
  float:  'Hola OROVA, me interesa conocer su catálogo de joyería de oro 10K',
  nav:    'Hola OROVA, quiero más información sobre sus piezas',
  hero:   'Hola OROVA, me gustaría ver el catálogo completo',
  social: 'Hola OROVA, me interesa adquirir joyería de oro 10K',
  cta:    'Hola OROVA, me interesa adquirir joyería de oro 10K. ¿Me pueden asesorar?',
  footer: ''
};
(function() {
  var map = {
    floatWa:   WA_MSGS.float,
    navWa:     WA_MSGS.nav,
    heroBtnWa: WA_MSGS.hero,
    socialWa:  WA_MSGS.social,
    ctaWa:     WA_MSGS.cta,
    footerWa:  WA_MSGS.footer
  };
  Object.keys(map).forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.href = waUrl(map[id]);
  });
})();

// ============================================================
// CURSOR PERSONALIZADO — solo en dispositivos con hover real
// ============================================================
if (!window.matchMedia('(hover: none)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.body.classList.add('has-cursor');
  var cw = document.getElementById('cursorWrap');
  var cr = document.getElementById('cursorRing');
  cw.style.display = 'block';
  cr.style.display = 'block';
  var mx = -200, my = -200, rx = -200, ry = -200;
  var rafId = null;
  document.addEventListener('mousemove', function(e) { mx = e.clientX; my = e.clientY; }, { passive: true });
  function tick() {
    cw.style.left = mx + 'px'; cw.style.top = my + 'px';
    rx += (mx - rx) * 0.13;   ry += (my - ry) * 0.13;
    cr.style.left = rx + 'px'; cr.style.top = ry + 'px';
    rafId = requestAnimationFrame(tick);
  }
  rafId = requestAnimationFrame(tick);
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
      rafId = null;
    } else if (!rafId) {
      rafId = requestAnimationFrame(tick);
    }
  });
}

// ============================================================
// MENÚ MÓVIL
// ============================================================
function toggleMobileMenu() {
  var menu    = document.getElementById('mobileMenu');
  var btn     = document.getElementById('hamburgerBtn');
  var overlay = document.getElementById('menuOverlay');
  var open    = menu.classList.toggle('open');
  btn.classList.toggle('open', open);
  overlay.classList.toggle('open', open);
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) {
    var firstLink = menu.querySelector('a');
    if (firstLink) firstLink.focus();
  } else {
    btn.focus();
  }
}

function closeMobileMenu() {
  var btn = document.getElementById('hamburgerBtn');
  document.getElementById('mobileMenu').classList.remove('open');
  btn.classList.remove('open');
  document.getElementById('menuOverlay').classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-label', 'Abrir menú');
  document.body.style.overflow = '';
  btn.focus();
}

document.addEventListener('keydown', function(e) {
  var menu = document.getElementById('mobileMenu');
  if (!menu.classList.contains('open')) return;
  if (e.key === 'Escape') { closeMobileMenu(); return; }
  if (e.key !== 'Tab') return;
  var focusable = Array.from(menu.querySelectorAll('a, button'));
  var first = focusable[0];
  var last  = focusable[focusable.length - 1];
  if (e.shiftKey) {
    if (document.activeElement === first) { e.preventDefault(); last.focus(); }
  } else {
    if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
  }
});

// ============================================================
// INTERSECTION OBSERVER — resaltado de sección activa en nav
// ============================================================
var navSections = ['catalogo', 'sobre-el-oro', 'envio', 'contacto'];
var navLinks = document.querySelectorAll('.nav-links a[data-section]');

function setActiveNav(sectionId) {
  navLinks.forEach(function(a) {
    a.classList.remove('active');
    a.removeAttribute('aria-current');
  });
  var active = document.querySelector('.nav-links a[data-section="' + sectionId + '"]');
  if (active) {
    active.classList.add('active');
    active.setAttribute('aria-current', 'section');
  }
}

if ('IntersectionObserver' in window) {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) setActiveNav(entry.target.id);
    });
  }, { rootMargin: '-30% 0px -40% 0px' });

  navSections.forEach(function(id) {
    var el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  var initialHash = window.location.hash.replace('#', '');
  if (initialHash && navSections.indexOf(initialHash) !== -1) {
    setActiveNav(initialHash);
  } else {
    navSections.forEach(function(id) {
      var el = document.getElementById(id);
      if (!el) return;
      var rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.3) {
        setActiveNav(id);
      }
    });
  }
}

// ============================================================
// SMOOTH SCROLL compatible con Safari (JS fallback)
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(function(a) {
  a.addEventListener('click', function(e) {
    var href = a.getAttribute('href');
    if (href === '#') return;
    var target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      var filter = a.getAttribute('data-filter-link');
      if (filter) setCatalogFilter(filter);
      target.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
      if (history.pushState) history.pushState(null, '', href);
    }
  });
});

// ============================================================
// EVENT LISTENERS — menú móvil y filtros
// ============================================================
document.getElementById('hamburgerBtn').addEventListener('click', toggleMobileMenu);
document.getElementById('mobileMenuClose').addEventListener('click', closeMobileMenu);
document.getElementById('menuOverlay').addEventListener('click', closeMobileMenu);
document.querySelectorAll('#mobileMenu a').forEach(function(a) {
  a.addEventListener('click', closeMobileMenu);
});
document.getElementById('filterGroup').addEventListener('click', function(e) {
  var btn = e.target.closest('.filter-btn');
  if (btn) setCatalogFilter(btn.getAttribute('data-filter'));
});

// ============================================================
// FILTROS DINÁMICOS — se generan solos desde allProducts
// ============================================================
function buildFilters() {
  var group = document.getElementById('filterGroup');
  if (!group) return;
  // Obtiene prefijos únicos con stock > 0
  var seen = {};
  allProducts.filter(function(p) { return p.stock > 0; }).forEach(function(p) {
    var key = getIconKey(p.code);
    if (!seen[key]) seen[key] = true;
  });
  // Elimina botones previos excepto "Todos"
  Array.from(group.querySelectorAll('.filter-btn:not([data-filter="all"])')).forEach(function(b) {
    b.remove();
  });
  // Inserta un botón por cada categoría encontrada
  Object.keys(seen).forEach(function(key) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'filter-btn';
    btn.setAttribute('data-filter', key);
    btn.setAttribute('aria-pressed', 'false');
    btn.textContent = CATS[key] || key;
    group.appendChild(btn);
  });
}

// ============================================================
// RENDER INICIAL
// ============================================================
buildFilters();
renderProducts('all');

document.getElementById('copyrightYear').textContent = new Date().getFullYear();

// ============================================================
// MODAL DE PRODUCTO — abre al hacer clic en la imagen
// ============================================================
(function() {
  var overlay  = document.getElementById('productModal');
  var modalImg = document.getElementById('modalImg');
  var modalCode  = document.getElementById('modalCode');
  var modalName  = document.getElementById('modalName');
  var modalPrice = document.getElementById('modalPrice');
  var modalStock = document.getElementById('modalStock');
  var modalCat   = document.getElementById('modalCat');
  var modalWa    = document.getElementById('modalWa');
  var closeBtn   = document.getElementById('modalClose');

  function openModal(p) {
    // Imagen o SVG
    if (p.img) {
      var hasExt  = /\.(webp|jpe?g|png|avif)$/i.test(p.img);
      var webpSrc = hasExt ? p.img : p.img + '.webp';
      var jpgSrc  = hasExt ? p.img : p.img + '.jpg';
      var imgTag  = '<img src="' + esc(jpgSrc) + '" alt="' + esc(p.name) + '" class="modal-img-fill">';
      modalImg.innerHTML = hasExt
        ? imgTag
        : '<picture><source srcset="' + esc(webpSrc) + '" type="image/webp">' + imgTag + '</picture>';
    } else {
      modalImg.innerHTML = getIcon(p.code);
    }

    var stockTxt = p.stock === 1 ? '1 pieza disponible' : p.stock + ' piezas disponibles';
    modalCode.textContent  = p.code + ' · Oro 10K';
    modalName.textContent  = p.name;
    modalPrice.textContent = p.price || 'Consultar precio';
    modalPrice.style.fontSize = p.price ? '' : '1.1rem';
    modalPrice.style.color    = p.price ? '' : 'var(--text-muted)';
    modalStock.textContent = '';
    var stockLabel = document.createTextNode('Stock: ');
    var stockSpan = document.createElement('span');
    stockSpan.textContent = stockTxt;
    modalStock.appendChild(stockLabel);
    modalStock.appendChild(stockSpan);
    modalCat.textContent = getCat(p.code);
    modalWa.href = waMsg(p);

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Delegación de eventos en el grid — clic en .product-img abre modal
  document.getElementById('catalogGrid').addEventListener('click', function(e) {
    var imgBox = e.target.closest('.product-img');
    if (!imgBox) return;
    var card = imgBox.closest('.product-card');
    if (!card) return;
    // Buscar el producto por código extraído del card
    var codeEl = card.querySelector('.product-code');
    if (!codeEl) return;
    var code = codeEl.textContent.split('·')[0].trim();
    var product = allProducts.find(function(p) { return p.code === code; });
    if (product) openModal(product);
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });
})();
