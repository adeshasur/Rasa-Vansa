/* ===================================================
   RASAVANSA - script.js
   Interactions, animations, cart, slider, particles
   =================================================== */

// ============ UTILITY ============
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ============ NAVBAR SCROLL ============
const navbar = $('#navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ============ HAMBURGER MENU ============
const hamburger = $('#hamburger');
const navLinks  = $('#nav-links');
hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});
// Close menu on link click
$$('.nav-link').forEach(l => l.addEventListener('click', () => {
  navLinks.classList.remove('open');
  hamburger.classList.remove('open');
}));

// ============ CART (local session storage) ============
let cart = JSON.parse(sessionStorage.getItem('rv_cart') || '[]');
const cartCountEl = $('#cart-count');
const toast       = $('#cart-toast');

function updateCartCount() {
  const count = cart.reduce((a, i) => a + i.qty, 0);
  if (cartCountEl) cartCountEl.textContent = count;
}

function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

function addToCart(name, price) {
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price: Number(price), qty: 1 });
  }
  sessionStorage.setItem('rv_cart', JSON.stringify(cart));
  updateCartCount();
  showToast(`✅ "${name}" added to cart!`);

  // Bounce animation on cart button
  const cartBtn = $('#cart-btn');
  if (cartBtn) {
    cartBtn.style.transform = 'scale(1.2)';
    setTimeout(() => { cartBtn.style.transform = ''; }, 250);
  }
}

// Attach add-to-cart buttons
$$('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    addToCart(btn.dataset.name, btn.dataset.price);
  });
});

// Cart count display on load
updateCartCount();

// ============ SPICE INTENSITY SLIDER ============
const slider     = $('#intensity-slider');
const sliderHint = $('#slider-hint');

const spiceHints = [
  { max: 20,  text: '🟡 Mild Turmeric Warmth',    hue: '85' },
  { max: 40,  text: '🍊 Gentle Spice Blend',        hue: '55' },
  { max: 60,  text: '🟠 Medium Curry Heat',          hue: '30' },
  { max: 80,  text: '🔴 Bold Red Chili Kick!',       hue: '10' },
  { max: 101, text: '💥 Full Devil Chili Fire! 🌶️',  hue: '0'  },
];

function updateSlider(val) {
  if (!slider) return;
  const hint = spiceHints.find(s => val <= s.max);

  // Shift accent CSS variable
  document.documentElement.style.setProperty('--saffron', `hsl(${hint.hue}, 80%, 45%)`);
  document.documentElement.style.setProperty('--saffron-light', `hsl(${hint.hue}, 80%, 60%)`);

  // Shift background tint
  document.body.style.background = `hsl(${hint.hue}, 20%, 98%)`;

  if (sliderHint) sliderHint.textContent = hint.text;

  // Update slider track gradient
  slider.style.background = `linear-gradient(to right,
    hsl(${hint.hue}, 80%, 55%) 0%,
    hsl(0, 80%, 40%) 100%)`;
}

slider?.addEventListener('input', e => updateSlider(Number(e.target.value)));
updateSlider(30); // init

// ============ TESTIMONIALS TICKER — CLONE FOR INFINITE SCROLL ============
const tickerTrack = $('#ticker-track');
if (tickerTrack) {
  // Clone children for seamless loop
  const originalItems = [...tickerTrack.children];
  originalItems.forEach(item => {
    const clone = item.cloneNode(true);
    tickerTrack.appendChild(clone);
  });
}

// ============ INTERSECTION OBSERVER — FADE UP ANIMATIONS ============
const observerOpts = { threshold: 0.15, rootMargin: '0px 0px -60px 0px' };

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      fadeObserver.unobserve(e.target);
    }
  });
}, observerOpts);

// Apply fade-up to section headers and cards
$$('.section-header, .bento-card, .step-card, .trust-item, .review-card, .timeline-item').forEach(el => {
  el.classList.add('fade-up');
  fadeObserver.observe(el);
});

// ============ PARTICLE CANVAS — FLOATING SPICE PARTICLES ============
(function initParticles() {
  const canvas = $('#particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const EMOJIS = ['🌶️', '🫙', '⚫', '✨', '🌿'];
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  class Particle {
    constructor() { this.reset(true); }
    reset(random = false) {
      this.x    = Math.random() * W;
      this.y    = random ? Math.random() * H : H + 30;
      this.size = Math.random() * 14 + 10;
      this.vx   = (Math.random() - 0.5) * 0.4;
      this.vy   = -(Math.random() * 0.6 + 0.2);
      this.alpha= Math.random() * 0.3 + 0.05;
      this.emoji= EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      this.rot  = Math.random() * Math.PI * 2;
      this.rotV = (Math.random() - 0.5) * 0.01;
    }
    update() {
      this.x  += this.vx;
      this.y  += this.vy;
      this.rot += this.rotV;
      if (this.y < -40) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot);
      ctx.font = `${this.size}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.emoji, 0, 0);
      ctx.restore();
    }
  }

  // Create particles
  for (let i = 0; i < 30; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
})();

// ============ SHOP FILTERS ============
const filterBtns = $$('.filter-btn');
const productCards = $$('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    productCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter || card.dataset.heat === filter) {
        card.removeAttribute('data-hidden');
        card.style.display = '';
      } else {
        card.setAttribute('data-hidden', 'true');
        card.style.display = 'none';
      }
    });
  });
});

// Quick-add buttons in shop
$$('.quick-add').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.product-card');
    addToCart(card.dataset.name, card.dataset.price);
  });
});

// ============ PAYMENT OPTION SELECTOR ============
const paymentOpts = $$('.payment-opt');
paymentOpts.forEach(opt => {
  opt.addEventListener('click', () => {
    paymentOpts.forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
  });
});

// ============ ORDER FORM SUBMIT ============
const orderForm = $('#order-form');
orderForm?.addEventListener('submit', e => {
  e.preventDefault();
  showToast('🎉 Order placed! We\'ll WhatsApp you shortly!');
  orderForm.reset();
  paymentOpts.forEach(o => o.classList.remove('selected'));
});

// ============ TIMELINE INTERSECTION (story page) ============
$$('.timeline-item').forEach(item => {
  fadeObserver.observe(item);
});

// ============ SMOOTH ACTIVE NAV LINK ============
const currentPage = location.pathname.split('/').pop() || 'index.html';
$$('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

// ============ STAGGER BENTO CARDS ============
$$('.bento-card, .product-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 80}ms`;
});
