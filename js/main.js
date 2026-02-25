const API = '/api';

function getToken() {
  return localStorage.getItem('averon_token');
}

function setToken(token) {
  localStorage.setItem('averon_token', token);
}

function clearAuth() {
  localStorage.removeItem('averon_token');
  localStorage.removeItem('averon_user');
}

function getUser() {
  const raw = localStorage.getItem('averon_user');
  return raw ? JSON.parse(raw) : null;
}

function setUser(user) {
  localStorage.setItem('averon_user', JSON.stringify(user));
}

function money(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}

function getCart() {
  const raw = localStorage.getItem('averon_cart');
  return raw ? JSON.parse(raw) : [];
}

function setCart(items) {
  localStorage.setItem('averon_cart', JSON.stringify(items));
}

function upsertCartItem(productId) {
  const cart = getCart();
  const found = cart.find((item) => item.productId === productId);
  if (found) found.quantity += 1;
  else cart.push({ productId, quantity: 1 });
  setCart(cart);
}

function cartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

function updateAuthUI() {
  const loginLink = document.getElementById('loginLink');
  if (!loginLink) return;

  const user = getUser();
  if (!user) {
    loginLink.textContent = 'Login';
    loginLink.href = '/login.html';
    return;
  }

  loginLink.textContent = `Hi, ${user.fullName.split(' ')[0]}`;
  loginLink.href = '#';
  loginLink.onclick = (event) => {
    event.preventDefault();
    clearAuth();
    window.location.reload();
  };
}

async function apiFetch(path, options = {}) {
  const headers = options.headers || {};
  const token = getToken();

  if (token) headers.Authorization = `Bearer ${token}`;
  if (!headers['Content-Type'] && options.body) headers['Content-Type'] = 'application/json';

  const res = await fetch(`${API}${path}`, {
    ...options,
    headers
  });

  const payload = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error = new Error(payload.error || 'Request failed');
    error.status = res.status;
    throw error;
  }

  return payload;
}

updateAuthUI();

window.Averon = {
  apiFetch,
  getToken,
  setToken,
  clearAuth,
  getUser,
  setUser,
  money,
  getCart,
  setCart,
  upsertCartItem,
  cartCount
};
