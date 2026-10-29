// Jahr im Footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobiles Menü
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', false);
}));

// Einblend-Animation beim Scrollen
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// Preisrechner
const checks = document.querySelectorAll('.calc-item input');
const sumEl = document.getElementById('calc-sum');
const form = document.getElementById('contact-form');
function calc() {
  let sum = 0;
  const names = [];
  checks.forEach(c => {
    if (c.checked) { sum += Number(c.dataset.price); names.push(c.dataset.name); }
  });
  sumEl.textContent = sum + ' €';
  return { sum, names };
}
checks.forEach(c => c.addEventListener('change', calc));
document.getElementById('calc-send').addEventListener('click', () => {
  const { sum, names } = calc();
  if (names.length) {
    form.leistung.value = 'Mehrere Leistungen';
    form.nachricht.value = 'Ich möchte: ' + names.join(', ') + ' (zusammen ' + sum + ' €).';
  }
});

// Vorher/Nachher-Regler
const range = document.getElementById('ba-range');
const before = document.getElementById('ba-before');
const handle = document.getElementById('ba-handle');
function updateBA() {
  const v = range.value;
  before.style.clipPath = 'inset(0 ' + (100 - v) + '% 0 0)';
  handle.style.left = v + '%';
}
range.addEventListener('input', updateBA);
updateBA();

// Kontaktformular -> WhatsApp-Nachricht vorbereiten
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text =
    'Hallo, ich habe eine Anfrage:\n' +
    'Name: ' + form.name.value + '\n' +
    'Telefon: ' + form.telefon.value + '\n' +
    'Leistung: ' + form.leistung.value + '\n' +
    'Nachricht: ' + form.nachricht.value;
  window.open('https://wa.me/4915259680596?text=' + encodeURIComponent(text), '_blank');
});
