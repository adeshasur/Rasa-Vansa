/* ===================================================
   RASAVANSA - PREMUM CORE JS
   GSAP, LENIS, & INTERACTIVE DYNAMICS
   =================================================== */

// --- 01. INITIALIZATION & UTILITIES ---
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

document.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initGSAPAnimations();
  initMagneticButtons();
  initCart();
  initNavbar();
  initPageTransitions();
});

// --- 02. SMOOTH SCROLL (LENIS) ---
function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// --- 03. GSAP ANIMATIONS ---
function initGSAPAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Character Split Simulation (Simple)
  $$('.hero-title').forEach(title => {
    const text = title.innerText;
    title.innerHTML = text.split(' ').map(word => 
      `<span class="word" style="display:inline-block; overflow:hidden;">
        <span class="char" style="display:inline-block">${word}</span>
      </span>`
    ).join(' ');
  });

  // Hero Entrance
  const heroTl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  heroTl
    .from('.hero-badge', { y: 20, opacity: 0, duration: 1 })
    .from('.hero-title .char', { y: 100, stagger: 0.1, duration: 1.2 }, '-=0.8')
    .from('.hero-desc', { y: 20, opacity: 0, duration: 1 }, '-=0.8')
    .from('.hero-cta', { y: 20, opacity: 0, duration: 1 }, '-=0.8')
    .from('.hero-bg img', { scale: 1.2, duration: 2 }, 0);

  // Global Scroll Reveal [data-reveal]
  $$('[data-reveal]').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    });
  });

  // Parallax Effect [data-parallax]
  $$('[data-parallax]').forEach(el => {
    const speed = el.dataset.parallax || 0.1;
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        scrub: true,
        start: 'top bottom',
        end: 'bottom top'
      },
      y: (i, target) => -ScrollTrigger.maxScroll(window) * speed,
      ease: 'none'
    });
  });
}

// --- 04. MAGNETIC BUTTONS ---
function initMagneticButtons() {
  $$('.magnetic-wrap').forEach(wrap => {
    const btn = wrap.querySelector('a, button');
    if (!btn) return;
    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3 });
    });
    wrap.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    });
  });
}

// --- 05. NAVBAR DYNAMICS ---
function initNavbar() {
  const nav = $('.navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// --- 06. CART LOGIC (Persistence & Multi-page) ---
let cart = JSON.parse(localStorage.getItem('rasavansa_cart')) || [];

function initCart() {
  updateCartUI();
  
  $$('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const name = btn.dataset.name;
      const price = parseInt(btn.dataset.price);
      addToCart(name, price, e);
    });
  });

  const cartBtn = $('#cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', toggleCartDrawer);
  }
}

function addToCart(name, price, event) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  
  saveCart();
  updateCartUI();
  
  // Feedback
  const countEl = $('.cart-count');
  if (countEl) {
    gsap.fromTo(countEl, { scale: 0.5 }, { scale: 1, duration: 0.4, ease: 'back.out(3)' });
  }
  createFloatingSpice(event.clientX, event.clientY);
}

function saveCart() {
  localStorage.setItem('rasavansa_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const countEl = $('.cart-count');
  if (countEl) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    countEl.innerText = totalItems;
  }
}

function toggleCartDrawer() {
  if (cart.length === 0) {
    alert("Your dynasty bag is empty!");
  } else {
    transitionTo('checkout.html');
  }
}

// --- 07. PAGE TRANSITIONS (Lion Maroon Slide) ---
function initPageTransitions() {
  if (!$('.transition-overlay')) {
    const overlay = document.createElement('div');
    overlay.className = 'transition-overlay';
    document.body.appendChild(overlay);
  }

  gsap.to('.transition-overlay', {
    translateY: '-100%',
    duration: 1,
    ease: 'expo.inOut',
    delay: 0.2
  });

  $$('a').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('#') && !href.startsWith('http') && !href.includes('mailto') && !href.includes('wa.me')) {
        const target = link.getAttribute('target');
        if (target === '_blank') return;
        
        e.preventDefault();
        transitionTo(href);
      }
    });
  });
}

function transitionTo(url) {
  gsap.set('.transition-overlay', { translateY: '100%' });
  gsap.to('.transition-overlay', {
    translateY: '0%',
    duration: 0.8,
    ease: 'expo.inOut',
    onComplete: () => {
      window.location.href = url;
    }
  });
}

function createFloatingSpice(x, y) {
  const spice = document.createElement('div');
  spice.innerHTML = '🌶️';
  spice.style.position = 'fixed';
  spice.style.left = `${x}px`;
  spice.style.top = `${y}px`;
  spice.style.pointerEvents = 'none';
  spice.style.zIndex = '9999';
  spice.style.fontSize = '1.5rem';
  document.body.appendChild(spice);

  gsap.to(spice, {
    y: -100,
    x: (Math.random() - 0.5) * 100,
    opacity: 0,
    duration: 1,
    onComplete: () => spice.remove()
  });
}
