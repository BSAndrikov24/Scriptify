/**
 * script.js — La Bella Tavola
 * Shared functionality across all pages:
 *  - Dark / light theme toggle (localStorage persisted)
 *  - Hamburger menu
 *  - Toast notifications
 *  - Featured dishes on homepage
 */

/* ── Theme ── */
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

function applyTheme(dark) {
  if (dark) {
    body.classList.add('dark');
    if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    body.classList.remove('dark');
    if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
}

const savedTheme = localStorage.getItem('lbt_theme');
applyTheme(savedTheme === 'dark');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark');
    localStorage.setItem('lbt_theme', isDark ? 'dark' : 'light');
    applyTheme(isDark);
  });
}

/* ── Hamburger ── */
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('main-nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    nav.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });
  // Close on nav link click (mobile)
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      nav.classList.remove('open');
    });
  });
}

/* ── Toast ── */
function showToast(message, type = 'default', duration = 3000) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.className = 'toast ' + type;
  toast.classList.remove('hidden');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.add('hidden'), duration);
}

/* ── Homepage: Featured Dishes ── */
const featuredGrid = document.getElementById('featuredDishes');

if (featuredGrid) {
  const dishes = loadDishes();
  const featured = dishes.filter(d => d.featured).slice(0, 3);

  if (featured.length === 0) {
    featuredGrid.innerHTML = '<p style="color:var(--clr-text-muted);text-align:center;grid-column:1/-1">No featured dishes yet — add some from the Menu page!</p>';
  } else {
    featuredGrid.innerHTML = featured.map(d => `
      <article class="dish-card" style="animation: fadeUp .6s ease both; animation-delay: ${featured.indexOf(d) * .1}s">
        <div class="dish-card-top">
          <span>${d.emoji || '🍽️'}</span>
          <div class="dish-badges">
            ${d.vegetarian ? '<span class="badge-tag veg">🌿 Veg</span>' : ''}
            ${d.spicy ? '<span class="badge-tag spicy">🌶️ Spicy</span>' : ''}
          </div>
        </div>
        <div class="dish-card-body">
          <span class="dish-cat">${d.category}</span>
          <h3>${d.name}</h3>
          <p>${d.description}</p>
        </div>
        <div class="dish-card-footer">
          <span class="dish-price">${Number(d.price).toFixed(2)} лв</span>
          <a href="pages/menu.html" class="btn btn-sm btn-outline">See Menu</a>
        </div>
      </article>
    `).join('');
  }
}
