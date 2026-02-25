const form = document.getElementById('contactForm');
const messageEl = document.getElementById('contactMessage');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const payload = {
    fullName: document.getElementById('fullName').value.trim(),
    email: document.getElementById('email').value.trim(),
    subject: document.getElementById('subject').value.trim(),
    message: document.getElementById('message').value.trim()
  };

  try {
    const data = await window.Averon.apiFetch('/contact', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    form.reset();
    messageEl.textContent = data.message;
    messageEl.className = 'message success';
  } catch (error) {
    messageEl.textContent = error.message;
    messageEl.className = 'message error';
  }
});
