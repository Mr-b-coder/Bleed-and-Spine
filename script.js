const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

nav.addEventListener('click', (e) => {
  if (e.target.closest('a')) {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

document.getElementById('year').textContent = new Date().getFullYear();

const themeToggle = document.querySelector('.theme-toggle');
const themeMedia = window.matchMedia('(prefers-color-scheme: dark)');

function syncThemeToggle() {
  if (!themeToggle) return;
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  themeToggle.setAttribute('aria-pressed', String(dark));
  themeToggle.setAttribute('aria-label', dark ? 'Use light theme' : 'Use dark theme');
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', dark ? '#101014' : '#16161A');
}

function setTheme(theme, persist) {
  if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  else document.documentElement.removeAttribute('data-theme');
  if (persist) localStorage.setItem('theme', theme);
  syncThemeToggle();
}

if (themeToggle) {
  syncThemeToggle();
  themeToggle.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(next, true);
  });
}

themeMedia.addEventListener('change', (event) => {
  if (localStorage.getItem('theme')) return;
  setTheme(event.matches ? 'dark' : 'light', false);
});

const carousel = document.querySelector('.hero-carousel');
if (carousel) {
  const slides = [...carousel.querySelectorAll('.hero-slide')];
  const dotsWrap = carousel.querySelector('.car-dots');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const INTERVAL = 6000;
  let current = 0;
  let timer = null;

  const dots = slides.map((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', `Show slide ${i + 1}`);
    b.addEventListener('click', () => { show(i); restart(); });
    dotsWrap.appendChild(b);
    return b;
  });

  function show(i, dir) {
    const next = (i + slides.length) % slides.length;
    if (next === current && slides[current].classList.contains('is-active')) return;
    const prev = slides[current];
    carousel.dataset.dir = (dir ?? (next >= current ? 1 : -1)) > 0 ? 'next' : 'prev';
    if (prev && next !== current) {
      prev.classList.add('is-leaving');
      setTimeout(() => prev.classList.remove('is-leaving'), 800);
    }
    current = next;
    slides.forEach((s, n) => {
      s.classList.toggle('is-active', n === current);
      s.setAttribute('aria-hidden', String(n !== current));
    });
    dots.forEach((d, n) => d.setAttribute('aria-current', String(n === current)));
  }
  function restartProgress() {
    carousel.classList.remove('is-timing');
    void carousel.offsetWidth;
    if (!reduced && timer) carousel.classList.add('is-timing');
  }
  function start() {
    if (reduced || timer) return;
    timer = setInterval(() => show(current + 1, 1), INTERVAL);
    restartProgress();
  }
  function stop() {
    clearInterval(timer);
    timer = null;
    carousel.classList.remove('is-timing');
  }
  function restart() { stop(); start(); }

  carousel.querySelectorAll('.car-btn').forEach((b) =>
    b.addEventListener('click', () => { show(current + Number(b.dataset.dir), Number(b.dataset.dir)); restart(); }));
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', start);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

  show(0);
  start();
}

document.querySelectorAll('.tile').forEach((t) => {
  t.addEventListener('pointermove', (e) => {
    const r = t.getBoundingClientRect();
    t.style.setProperty('--mx', `${e.clientX - r.left}px`);
    t.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
});
