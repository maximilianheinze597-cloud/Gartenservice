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

// Kontaktformular -> WhatsApp-Nachricht vorbereiten
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target;
  const text =
    'Hallo, ich habe eine Anfrage:\n' +
    'Name: ' + f.name.value + '\n' +
    'Telefon: ' + f.telefon.value + '\n' +
    'Leistung: ' + f.leistung.value + '\n' +
    'Nachricht: ' + f.nachricht.value;
  window.open('https://wa.me/4915259680596?text=' + encodeURIComponent(text), '_blank');
});
