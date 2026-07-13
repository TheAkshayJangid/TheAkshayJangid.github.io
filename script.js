/* ============================================================
   AKSHAY JANGID PORTFOLIO — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initParticles();
  initTyping();
  initNavbar();
  initScrollReveal();
  initSkillBars();
  initBackTop();
  initHamburger();
  initActiveNav();
});

/* ── THEME ── */
function initTheme() {
  const btn = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('aj-theme') || 'dark';
  applyTheme(saved);
  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('aj-theme', next);
  });
}
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = t === 'dark' ? '🌙' : '☀️';
}

/* ── PARTICLES ── */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = window.innerWidth < 768 ? 30 : 60;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const dur = Math.random() * 20 + 15;
    const delay = Math.random() * 10;
    const opacity = Math.random() * 0.5 + 0.1;
    p.style.cssText = `
      position:absolute; border-radius:50%;
      width:${size}px; height:${size}px;
      left:${x}%; top:${y}%;
      background: ${Math.random() > 0.5 ? '#f97316' : '#fb923c'};
      opacity:${opacity};
      animation: floatParticle ${dur}s ${delay}s infinite ease-in-out alternate;
    `;
    container.appendChild(p);
  }
  if (!document.getElementById('particle-style')) {
    const style = document.createElement('style');
    style.id = 'particle-style';
    style.textContent = `
      @keyframes floatParticle {
        0%   { transform: translate(0,0) scale(1); }
        33%  { transform: translate(${rand(-40,40)}px,${rand(-40,40)}px) scale(1.2); }
        66%  { transform: translate(${rand(-40,40)}px,${rand(-40,40)}px) scale(0.8); }
        100% { transform: translate(${rand(-40,40)}px,${rand(-40,40)}px) scale(1); }
      }
    `;
    document.head.appendChild(style);
  }
}
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

/* ── TYPING EFFECT ── */
function initTyping() {
  const el = document.getElementById('typing-text');
  if (!el) return;
  const lines = [
    'scalable REST APIs',
    'Laravel backends',
    'real-time systems',
    'full-stack web apps',
    'database solutions',
    'third-party integrations',
  ];
  let lineIdx = 0, charIdx = 0, deleting = false;
  const speed = { type: 80, delete: 40, pause: 1800, pauseAfterDelete: 400 };

  function tick() {
    const current = lines[lineIdx];
    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(tick, speed.pause);
        return;
      }
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        lineIdx = (lineIdx + 1) % lines.length;
        setTimeout(tick, speed.pauseAfterDelete);
        return;
      }
    }
    setTimeout(tick, deleting ? speed.delete : speed.type);
  }
  setTimeout(tick, 500);
}

/* ── NAVBAR SCROLL ── */
function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

/* ── ACTIVE NAV LINKS ── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const links = document.querySelectorAll('.nav-links a');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => observer.observe(s));
}

/* ── HAMBURGER ── */
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      btn.setAttribute('aria-expanded', false);
    });
  });
}

/* ── SCROLL REVEAL ── */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
}

/* ── SKILL BARS ── */
function initSkillBars() {
  const fills = document.querySelectorAll('.sbar-fill');
  if (!fills.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const w = target.getAttribute('data-w') || '0%';
        setTimeout(() => { target.style.width = w; }, 200);
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.3 });
  fills.forEach(f => observer.observe(f));
}

/* ── BACK TO TOP ── */
function initBackTop() {
  const btn = document.getElementById('back-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── SMOOTH ANCHOR SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 72;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
