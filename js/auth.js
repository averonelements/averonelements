const messageEl = document.getElementById('message');
const mode = document.body.dataset.authMode;

function setMessage(message, type) {
  messageEl.textContent = message;
  messageEl.className = `message ${type}`;
}

async function submitAuth(event) {
  event.preventDefault();

  const fullName = document.getElementById('fullName')?.value?.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    const payload = mode === 'signup' ? { fullName, email, password } : { email, password };

    const data = await window.Averon.apiFetch(`/auth/${mode}`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    window.Averon.setToken(data.token);
    window.Averon.setUser(data.user);
    setMessage('Authentication successful. Redirecting...', 'success');
    setTimeout(() => {
      window.location.href = '/collection.html';
    }, 700);
  } catch (error) {
    setMessage(error.message, 'error');
  }
}

document.getElementById('authForm').addEventListener('submit', submitAuth);
