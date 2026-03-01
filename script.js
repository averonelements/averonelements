// in script.js
const pw = document.getElementById('passwordInput');
const bar = document.getElementById('strengthBar');
const txt = document.getElementById('strengthText');

pw.addEventListener('input', () => {
  const val = pw.value;
  let score = 0;
  if (val.length > 7) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  const pct = (score / 4) * 100;
  bar.style.width = pct + '%';

  const levels = [
    { msg: 'Too Short', color: '#D73F40' },
    { msg: 'Weak',      color: '#FF7F50' },
    { msg: 'Fair',      color: '#FFD700' },
    { msg: 'Good',      color: '#2E72ED' },
    { msg: 'Strong',    color: '#3BA62F' }
  ];
  const { msg, color } = levels[score];
  bar.style.background = color;
  txt.textContent = msg;
});
