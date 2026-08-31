const header = document.querySelector('.site-header');
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const toast = document.querySelector('.toast');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 12);
}, { passive: true });

toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('.video-jump').forEach(button => {
  button.addEventListener('click', () => {
    const video = document.getElementById(button.dataset.video);
    if (!video) return;
    video.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => video.play().catch(() => {}), 450);
  });
});

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

document.querySelectorAll('.placeholder-link').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const label = link.dataset.placeholder;
    const messages = {
      linkedin: 'Añade tu URL de LinkedIn en index.html',
      cv: 'Añade tu CV y enlázalo en index.html',
      email: 'Añade tu email con un enlace mailto:'
    };
    showToast(messages[label] || 'Enlace pendiente de configurar');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
