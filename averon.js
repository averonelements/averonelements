// Averon Elements - lightweight UI helpers (no framework)
const AVERON_PRODUCTS = [
  { id:'ae-nk-01', name:'Solstice Pendant', category:'Necklaces', metal:'Gold vermeil', price: 89, desc:'A warm, minimal pendant with a soft glow.', img:'' },
  { id:'ae-nk-02', name:'Arc Chain', category:'Necklaces', metal:'Sterling silver', price: 74, desc:'Clean chain profile designed for everyday wear.', img:'' },
  { id:'ae-rg-01', name:'Vela Ring', category:'Rings', metal:'Sterling silver', price: 58, desc:'A refined band with a subtle contour.', img:'' },
  { id:'ae-rg-02', name:'Aurum Signet', category:'Rings', metal:'Gold vermeil', price: 69, desc:'Modern signet with softened edges.', img:'' },
  { id:'ae-br-01', name:'Linea Bracelet', category:'Bracelets', metal:'Sterling silver', price: 62, desc:'A sleek bracelet that stacks effortlessly.', img:'' },
  { id:'ae-br-02', name:'Gild Bracelet', category:'Bracelets', metal:'Gold vermeil', price: 71, desc:'A clean, luminous finish with premium feel.', img:'' },
  { id:'ae-er-01', name:'Halo Studs', category:'Earrings', metal:'Sterling silver', price: 49, desc:'Minimal studs, high polish, timeless.', img:'' },
  { id:'ae-er-02', name:'Contour Hoops', category:'Earrings', metal:'Gold vermeil', price: 64, desc:'Everyday hoops with elegant thickness.', img:'' },
  { id:'ae-nk-03', name:'Dawn Pendant', category:'Necklaces', metal:'Sterling silver', price: 84, desc:'A bright pendant built around clean geometry.', img:'' },
  { id:'ae-rg-03', name:'Orbit Band', category:'Rings', metal:'Gold vermeil', price: 73, desc:'A rounded band with weight and presence.', img:'' },
  { id:'ae-br-03', name:'Muse Cuff', category:'Bracelets', metal:'Sterling silver', price: 78, desc:'An open cuff with a balanced profile.', img:'' },
  { id:'ae-er-03', name:'Drift Drops', category:'Earrings', metal:'Sterling silver', price: 68, desc:'Lightweight drop earrings, fluid movement.', img:'' },
];

function moneyUSD(n){
  return new Intl.NumberFormat('en-US', { style:'currency', currency:'USD' }).format(n);
}

function qs(sel, root=document){ return root.querySelector(sel); }
function qsa(sel, root=document){ return [...root.querySelectorAll(sel)]; }

function renderProductCard(p, { buttonText='View', buttonClass='lux-btn secondary', onClick=null } = {}){
  const el = document.createElement('div');
  el.className = 'product-card';
  el.innerHTML = `
    <div class="product-img" aria-hidden="true"></div>
    <div class="product-body">
      <div class="product-name">${p.name}</div>
      <div class="product-meta">${p.category} • ${p.metal}${p.price ? ` • ${moneyUSD(p.price)}` : ''}</div>
      <div class="product-actions">
        <button class="${buttonClass}" type="button">${buttonText}</button>
      </div>
    </div>
  `;
  const btn = el.querySelector('button');
  if(onClick) btn.addEventListener('click', () => onClick(p));
  return el;
}