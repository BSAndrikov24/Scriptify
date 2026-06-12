
let dishes = loadDishes();
let activeCategory = 'all';
let searchQuery = '';
let sortMode = 'default';
let editingId = null;
let deletingId = null;


const menuGrid       = document.getElementById('menuGrid');
const emptyState     = document.getElementById('emptyState');
const searchInput    = document.getElementById('searchInput');
const clearSearch    = document.getElementById('clearSearch');
const sortSelect     = document.getElementById('sortSelect');
const filterBtns     = document.querySelectorAll('.filter-btn');
const dishCountEl    = document.getElementById('dishCount');
const favCountEl     = document.getElementById('favCount');
const avgPriceEl     = document.getElementById('avgPrice');

const dishModal      = document.getElementById('dishModal');
const openAddBtn     = document.getElementById('openAddModal');
const closeModalBtn  = document.getElementById('closeModal');
const cancelModalBtn = document.getElementById('cancelModal');
const saveDishBtn    = document.getElementById('saveDish');
const modalTitle     = document.getElementById('modalTitle');


const deleteModal    = document.getElementById('deleteModal');
const cancelDeleteBtn = document.getElementById('cancelDelete');
const confirmDeleteBtn = document.getElementById('confirmDelete');


const dishName     = document.getElementById('dishName');
const dishCategory = document.getElementById('dishCategory');
const dishPrice    = document.getElementById('dishPrice');
const dishDesc     = document.getElementById('dishDesc');
const dishEmoji    = document.getElementById('dishEmoji');
const dishTags     = document.getElementById('dishTags');
const dishVeg      = document.getElementById('dishVeg');
const dishSpicy    = document.getElementById('dishSpicy');
const dishFeatured = document.getElementById('dishFeatured');


const nameError  = document.getElementById('nameError');
const catError   = document.getElementById('catError');
const priceError = document.getElementById('priceError');
const descError  = document.getElementById('descError');

function getFilteredSorted() {
  let list = [...dishes];

 
  if (activeCategory !== 'all') {
    list = list.filter(d => d.category === activeCategory);
  }


  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    list = list.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q) ||
      (d.tags && d.tags.some(t => t.toLowerCase().includes(q)))
    );
  }

 
  switch (sortMode) {
    case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
    case 'price-desc': list.sort((a, b) => b.price - a.price); break;
    case 'name-asc':   list.sort((a, b) => a.name.localeCompare(b.name)); break;
    case 'rating-desc': list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
    default: break;
  }

  return list;
}

function buildCard(d) {
  return `
    <article class="dish-card" data-id="${d.id}" style="${d.available ? '' : 'opacity:.55'}">
      <div class="dish-card-top">
        <span>${d.emoji || '🍽️'}</span>
        <div class="dish-badges">
          ${d.vegetarian ? '<span class="badge-tag veg">🌿 Veg</span>' : ''}
          ${d.spicy      ? '<span class="badge-tag spicy">🌶️ Spicy</span>' : ''}
          ${d.featured   ? '<span class="badge-tag">⭐ Featured</span>' : ''}
          ${!d.available ? '<span class="badge-tag" style="background:#f5f5f5;color:#999">❌ Unavailable</span>' : ''}
        </div>
        <button class="dish-fav-btn ${d.favourite ? 'active' : ''}" data-action="fav" data-id="${d.id}" title="Favourite">
          <i class="fa-${d.favourite ? 'solid' : 'regular'} fa-heart"></i>
        </button>
      </div>
      <div class="dish-card-body">
        <span class="dish-cat">${d.category}</span>
        <h3>${d.name}</h3>
        <p>${d.description}</p>
      </div>
      <div class="dish-card-footer">
        <span class="dish-price">${Number(d.price).toFixed(2)} EUR</span>
        <div class="dish-actions">
          <button data-action="toggle" data-id="${d.id}" title="${d.available ? 'Mark unavailable' : 'Mark available'}">
            <i class="fa-solid fa-${d.available ? 'eye' : 'eye-slash'}"></i>
          </button>
          <button data-action="edit" data-id="${d.id}" title="Edit">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="del" data-action="delete" data-id="${d.id}" title="Delete">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </article>`;
}

function renderMenu() {
  const list = getFilteredSorted();

  if (list.length === 0) {
    menuGrid.innerHTML = '';
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
    menuGrid.innerHTML = list.map(buildCard).join('');
  }

  updateStats();
}


function updateStats() {
  const shown = getFilteredSorted();
  const favs  = dishes.filter(d => d.favourite).length;
  const avg   = shown.length ? (shown.reduce((s, d) => s + d.price, 0) / shown.length) : 0;

  dishCountEl.textContent = `${shown.length} dish${shown.length !== 1 ? 'es' : ''}`;
  favCountEl.innerHTML = `<i class="fa-solid fa-heart" style="color:var(--clr-accent)"></i> ${favs} favourite${favs !== 1 ? 's' : ''}`;
  avgPriceEl.textContent = `Avg: ${avg.toFixed(2)} EUR`;
}

searchInput.addEventListener('input', () => {
  searchQuery = searchInput.value;
  clearSearch.hidden = searchQuery === '';
  renderMenu();
});

clearSearch.addEventListener('click', () => {
  searchInput.value = '';
  searchQuery = '';
  clearSearch.hidden = true;
  searchInput.focus();
  renderMenu();
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.cat;
    renderMenu();
  });
});

sortSelect.addEventListener('change', () => {
  sortMode = sortSelect.value;
  renderMenu();
});

menuGrid.addEventListener('click', e => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const id = Number(btn.dataset.id);
  const action = btn.dataset.action;

  if (action === 'fav')    toggleFavourite(id);
  if (action === 'edit')   openEdit(id);
  if (action === 'delete') openDeleteConfirm(id);
  if (action === 'toggle') toggleAvailability(id);
});

function toggleFavourite(id) {
  const d = dishes.find(x => x.id === id);
  if (!d) return;
  d.favourite = !d.favourite;
  saveDishes(dishes);
  renderMenu();
  showToast(d.favourite ? `❤️ ${d.name} added to favourites` : `${d.name} removed from favourites`, 'success');
}

function toggleAvailability(id) {
  const d = dishes.find(x => x.id === id);
  if (!d) return;
  d.available = !d.available;
  saveDishes(dishes);
  renderMenu();
  showToast(`${d.name} marked as ${d.available ? 'available' : 'unavailable'}`, 'success');
}

function openAddModal() {
  editingId = null;
  modalTitle.textContent = 'Add New Dish';
  clearForm();
  dishModal.classList.remove('hidden');
  dishName.focus();
}

function openEdit(id) {
  const d = dishes.find(x => x.id === id);
  if (!d) return;
  editingId = id;
  modalTitle.textContent = 'Edit Dish';

  dishName.value     = d.name;
  dishCategory.value = d.category;
  dishPrice.value    = d.price;
  dishDesc.value     = d.description;
  dishEmoji.value    = d.emoji || '';
  dishTags.value     = d.tags ? d.tags.join(', ') : '';
  dishVeg.checked      = d.vegetarian;
  dishSpicy.checked    = d.spicy;
  dishFeatured.checked = d.featured;

  clearErrors();
  dishModal.classList.remove('hidden');
  dishName.focus();
}

function closeModal() {
  dishModal.classList.add('hidden');
  clearForm();
  editingId = null;
}

function clearForm() {
  [dishName, dishCategory, dishPrice, dishDesc, dishEmoji, dishTags].forEach(el => el.value = '');
  dishVeg.checked = dishSpicy.checked = dishFeatured.checked = false;
  clearErrors();
}

function clearErrors() {
  [nameError, catError, priceError, descError].forEach(el => el.textContent = '');
  [dishName, dishCategory, dishPrice, dishDesc].forEach(el => el.classList.remove('error'));
}

openAddBtn.addEventListener('click', openAddModal);
closeModalBtn.addEventListener('click', closeModal);
cancelModalBtn.addEventListener('click', closeModal);
dishModal.addEventListener('click', e => { if (e.target === dishModal) closeModal(); });

function validateForm() {
  clearErrors();
  let valid = true;

  const name = dishName.value.trim();
  if (!name) {
    nameError.textContent = 'Dish name is required.';
    dishName.classList.add('error');
    valid = false;
  } else if (name.length < 3) {
    nameError.textContent = 'Name must be at least 3 characters.';
    dishName.classList.add('error');
    valid = false;
  }

  if (!dishCategory.value) {
    catError.textContent = 'Please select a category.';
    dishCategory.classList.add('error');
    valid = false;
  }

  const price = parseFloat(dishPrice.value);
  if (!dishPrice.value || isNaN(price)) {
    priceError.textContent = 'Price is required.';
    dishPrice.classList.add('error');
    valid = false;
  } else if (price < 0) {
    priceError.textContent = 'Price cannot be negative.';
    dishPrice.classList.add('error');
    valid = false;
  } else if (price > 500) {
    priceError.textContent = 'Price seems too high (max 500 EUR).';
    dishPrice.classList.add('error');
    valid = false;
  }

  const desc = dishDesc.value.trim();
  if (!desc) {
    descError.textContent = 'Description is required.';
    dishDesc.classList.add('error');
    valid = false;
  } else if (desc.length < 10) {
    descError.textContent = 'Description must be at least 10 characters.';
    dishDesc.classList.add('error');
    valid = false;
  }

  return valid;
}

/* ── Save Dish ── */
saveDishBtn.addEventListener('click', () => {
  if (!validateForm()) return;

  const tags = dishTags.value
    ? dishTags.value.split(',').map(t => t.trim()).filter(Boolean)
    : [];

  if (editingId !== null) {

    const idx = dishes.findIndex(x => x.id === editingId);
    if (idx === -1) return;
    dishes[idx] = {
      ...dishes[idx],
      name:       dishName.value.trim(),
      category:   dishCategory.value,
      price:      parseFloat(dishPrice.value),
      description: dishDesc.value.trim(),
      emoji:      dishEmoji.value.trim() || '🍽️',
      tags,
      vegetarian: dishVeg.checked,
      spicy:      dishSpicy.checked,
      featured:   dishFeatured.checked,
    };
    showToast(`✏️ ${dishes[idx].name} updated!`, 'success');
  } else {
    const newDish = {
      id:          generateId(),
      name:        dishName.value.trim(),
      category:    dishCategory.value,
      price:       parseFloat(dishPrice.value),
      description: dishDesc.value.trim(),
      emoji:       dishEmoji.value.trim() || '🍽️',
      tags,
      vegetarian:  dishVeg.checked,
      spicy:       dishSpicy.checked,
      featured:    dishFeatured.checked,
      favourite:   false,
      available:   true,
    };
    dishes.push(newDish);
    showToast(`✅ ${newDish.name} added to menu!`, 'success');
  }

  saveDishes(dishes);
  closeModal();
  renderMenu();
});

/* ── Keyboard: close modal on Escape ── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (!dishModal.classList.contains('hidden')) closeModal();
    if (!deleteModal.classList.contains('hidden')) closeDeleteModal();
  }
});

function openDeleteConfirm(id) {
  const d = dishes.find(x => x.id === id);
  if (!d) return;
  deletingId = id;
  document.getElementById('deleteMsg').textContent =
    `Are you sure you want to remove "${d.name}"? This cannot be undone.`;
  deleteModal.classList.remove('hidden');
}

function closeDeleteModal() {
  deleteModal.classList.add('hidden');
  deletingId = null;
}

cancelDeleteBtn.addEventListener('click', closeDeleteModal);
deleteModal.addEventListener('click', e => { if (e.target === deleteModal) closeDeleteModal(); });

confirmDeleteBtn.addEventListener('click', () => {
  const d = dishes.find(x => x.id === deletingId);
  if (!d) return;
  dishes = dishes.filter(x => x.id !== deletingId);
  saveDishes(dishes);
  closeDeleteModal();
  renderMenu();
  showToast(`🗑️ "${d.name}" removed from menu.`, 'error');
});

renderMenu();
