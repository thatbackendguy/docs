let progressBar = null;
let rafPending = false;

function updateProgress() {
  if (!progressBar) return;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const progress = total > 0 ? window.scrollY / total : 0;
  progressBar.style.transform = `scaleX(${Math.min(progress, 1)})`;
}

function initScrollProgress() {
  if (progressBar) return;
  progressBar = document.createElement('div');
  progressBar.className = 'scrollProgressBar';
  document.body.prepend(progressBar);

  window.addEventListener('scroll', () => {
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(() => {
        updateProgress();
        rafPending = false;
      });
    }
  }, { passive: true });
}

function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        target.classList.add('is-visible');
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}

function initTilt() {
  const cards = document.querySelectorAll('.portfolioCard');

  cards.forEach(card => {
    if (card._tiltInit) return;
    card._tiltInit = true;

    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `translateY(-6px) perspective(700px) rotateX(${-y * 9}deg) rotateY(${x * 9}deg)`;
      card.style.transition = 'box-shadow 0.15s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = '';
    });
  });
}

export function onClientEntry() {
  initScrollProgress();
}

export function onRouteDidUpdate() {
  initReveal();
  initTilt();
  updateProgress();
}
