

let reservations = loadReservations();

const form      = document.getElementById('reservationForm');
const resList   = document.getElementById('resList');
const resEmpty  = document.getElementById('resEmpty');
const resCount  = document.getElementById('resCount');

const resDateInput = document.getElementById('resDate');
if (resDateInput) {
  const today = new Date().toISOString().split('T')[0];
  resDateInput.min = today;
}

function clearResErrors() {
  ['resNameError','resEmailError','resDateError','resTimeError','resGuestsError'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  });
  ['resName','resEmail','resDate','resTime','resGuests'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('error');
  });
}

function validateReservation() {
  clearResErrors();
  let valid = true;

  const name   = document.getElementById('resName');
  const email  = document.getElementById('resEmail');
  const date   = document.getElementById('resDate');
  const time   = document.getElementById('resTime');
  const guests = document.getElementById('resGuests');

  // Name
  if (!name.value.trim()) {
    document.getElementById('resNameError').textContent = 'Name is required.';
    name.classList.add('error');
    valid = false;
  } else if (name.value.trim().length < 2) {
    document.getElementById('resNameError').textContent = 'Name must be at least 2 characters.';
    name.classList.add('error');
    valid = false;
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim()) {
    document.getElementById('resEmailError').textContent = 'Email is required.';
    email.classList.add('error');
    valid = false;
  } else if (!emailRegex.test(email.value.trim())) {
    document.getElementById('resEmailError').textContent = 'Please enter a valid email address.';
    email.classList.add('error');
    valid = false;
  }

  // Date
  if (!date.value) {
    document.getElementById('resDateError').textContent = 'Please select a date.';
    date.classList.add('error');
    valid = false;
  } else {
    const today = new Date().toISOString().split('T')[0];
    if (date.value < today) {
      document.getElementById('resDateError').textContent = 'Date cannot be in the past.';
      date.classList.add('error');
      valid = false;
    }
  }

  // Time
  if (!time.value) {
    document.getElementById('resTimeError').textContent = 'Please select a time.';
    time.classList.add('error');
    valid = false;
  }

  // Guests
  if (!guests.value) {
    document.getElementById('resGuestsError').textContent = 'Please select number of guests.';
    guests.classList.add('error');
    valid = false;
  }

  return valid;
}


function renderReservations() {
  const sorted = [...reservations].sort((a, b) => b.id - a.id);

  resCount.textContent = reservations.length;

  const oldCards = resList.querySelectorAll('.res-card');
  oldCards.forEach(c => c.remove());

  if (reservations.length === 0) {
    resEmpty.style.display = '';
    return;
  }

  resEmpty.style.display = 'none';

  sorted.forEach(r => {
    const card = document.createElement('div');
    card.className = 'res-card';
    card.dataset.id = r.id;

    const dateFormatted = r.date
      ? new Date(r.date + 'T00:00:00').toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })
      : '—';

    card.innerHTML = `
      <button class="res-del-btn" data-id="${r.id}" title="Cancel reservation">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div class="res-card-name">
        <i class="fa-solid fa-circle-user"></i>
        ${r.name}
      </div>
      <div class="res-card-detail">
        <span><i class="fa-regular fa-calendar"></i> ${dateFormatted}</span>
        <span><i class="fa-regular fa-clock"></i> ${r.time}</span>
        <span><i class="fa-solid fa-users"></i> ${r.guests} guest${r.guests !== '1' ? 's' : ''}</span>
      </div>
      <div class="res-card-detail">
        <span><i class="fa-regular fa-envelope"></i> ${r.email}</span>
        ${r.phone ? `<span><i class="fa-solid fa-phone"></i> ${r.phone}</span>` : ''}
      </div>
      ${r.notes ? `<div class="res-card-detail" style="margin-top:.2rem;font-style:italic">"${r.notes}"</div>` : ''}
    `;

    resList.appendChild(card);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!validateReservation()) return;

  const newRes = {
    id:     generateId(),
    name:   document.getElementById('resName').value.trim(),
    email:  document.getElementById('resEmail').value.trim(),
    date:   document.getElementById('resDate').value,
    time:   document.getElementById('resTime').value,
    guests: document.getElementById('resGuests').value,
    phone:  document.getElementById('resPhone').value.trim(),
    notes:  document.getElementById('resNotes').value.trim(),
  };

  reservations.push(newRes);
  saveReservations(reservations);
  form.reset();
  clearResErrors();
  renderReservations();
  showToast(`✅ Reservation for ${newRes.name} confirmed!`, 'success');
});


resList.addEventListener('click', e => {
  const btn = e.target.closest('.res-del-btn');
  if (!btn) return;
  const id = Number(btn.dataset.id);
  const r  = reservations.find(x => x.id === id);
  if (!r) return;

  if (!confirm(`Cancel reservation for ${r.name} on ${r.date} at ${r.time}?`)) return;

  reservations = reservations.filter(x => x.id !== id);
  saveReservations(reservations);
  renderReservations();
  showToast(`Reservation for ${r.name} cancelled.`, 'error');
});


renderReservations();
