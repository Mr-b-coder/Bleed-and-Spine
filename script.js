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
