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

  // Horizontal Collection Scrub (Optional if needed)
}

// --- 04. MAGNETIC BUTTONS ---
function initMagneticButtons() {
  $$('.magnetic-wrap').forEach(wrap => {
    const btn = wrap.querySelector('a, button');
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
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// --- 06. CART LOGIC ---
function initCart() {
  let count = 0;
  const countEl = $('.cart-count');
  
  $$('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      count++;
      countEl.innerText = count;
      
      // Feedback
      gsap.fromTo(countEl, { scale: 0.5 }, { scale: 1, duration: 0.4, ease: 'back.out(3)' });
      
      // Floating spice effect on click
      createFloatingSpice(btn);
    });
  });
}

function createFloatingSpice(btn) {
  const spice = document.createElement('div');
  spice.innerHTML = '🌶️';
  spice.style.position = 'fixed';
  spice.style.left = `${event.clientX}px`;
  spice.style.top = `${event.clientY}px`;
  spice.style.pointerEvents = 'none';
  spice.style.zIndex = '9999';
  document.body.appendChild(spice);

  gsap.to(spice, {
    y: -100,
    x: (Math.random() - 0.5) * 100,
    opacity: 0,
    duration: 1,
    onComplete: () => spice.remove()
  });
}
