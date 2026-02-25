const productGrid = document.getElementById('productGrid');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const checkoutButton = document.getElementById('checkoutButton');
const cartCount = document.getElementById('cartCount');
const statusEl = document.getElementById('status');

let products = [];

function setStatus(message, type = '') {
  statusEl.textContent = message;
  statusEl.className = `message ${type}`;
}

function renderProducts() {
  productGrid.innerHTML = products
    .map(
      (p) => `
      <article class="card">
        <img src="${p.image_url}" alt="${p.name}" />
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <div class="price">$${p.price}</div>
        <button class="button primary" data-add="${p.id}">Add to Cart</button>
      </article>
    `
    )
    .join('');

  productGrid.querySelectorAll('[data-add]').forEach((btn) => {
    btn.addEventListener('click', () => {
      window.Averon.upsertCartItem(Number(btn.dataset.add));
      renderCart();
      setStatus('Item added to cart.', 'success');
    });
  });
}

function renderCart() {
  const cart = window.Averon.getCart();
  cartCount.textContent = String(window.Averon.cartCount());

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p>Your cart is empty.</p>';
    cartTotalEl.textContent = '$0.00';
    return;
  }

  const lines = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) return null;
    return {
      ...item,
      name: product.name,
      lineTotal: product.price_cents * item.quantity
    };
  }).filter(Boolean);

  const total = lines.reduce((sum, line) => sum + line.lineTotal, 0);

  cartItemsEl.innerHTML = lines
    .map(
      (line) => `
      <div class="cart-item">
        <span>${line.name} x ${line.quantity}</span>
        <strong>${window.Averon.money(line.lineTotal)}</strong>
      </div>
    `
    )
    .join('');

  cartTotalEl.textContent = window.Averon.money(total);
}

async function beginCheckout() {
  const token = window.Averon.getToken();
  if (!token) {
    setStatus('Please login first to continue checkout.', 'error');
    window.location.href = '/login.html';
    return;
  }

  const items = window.Averon.getCart();
  if (!items.length) {
    setStatus('Add products before checkout.', 'error');
    return;
  }

  try {
    checkoutButton.disabled = true;
    setStatus('Creating secure payment session...');

    const data = await window.Averon.apiFetch('/checkout/create-session', {
      method: 'POST',
      body: JSON.stringify({ items })
    });

    window.location.href = data.checkoutUrl;
  } catch (error) {
    checkoutButton.disabled = false;
    setStatus(error.message, 'error');
  }
}

checkoutButton.addEventListener('click', beginCheckout);

(async function init() {
  try {
    products = await window.Averon.apiFetch('/products');
    renderProducts();
    renderCart();
  } catch (error) {
    setStatus(error.message, 'error');
  }
})();
