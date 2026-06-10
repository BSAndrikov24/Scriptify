/**
 * data.js — La Bella Tavola
 * Seed data: menu dishes stored as JS objects/arrays.
 * Used across all pages; loaded before menu.js / script.js.
 */

const SEED_DISHES = [
  // ── Antipasti ──
  {
    id: 1,
    name: "Bruschetta al Pomodoro",
    category: "antipasti",
    price: 8.90,
    description: "Toasted sourdough rubbed with garlic, topped with ripe heritage tomatoes, fresh basil, and extra-virgin olive oil.",
    emoji: "🍅",
    tags: ["vegetarian", "classic"],
    vegetarian: true,
    spicy: false,
    featured: false,
    favourite: false,
    available: true
  },
  {
    id: 2,
    name: "Carpaccio di Manzo",
    category: "antipasti",
    price: 14.50,
    description: "Thin slices of aged Piedmontese beef, dressed with capers, rocket, shaved Parmigiano-Reggiano and truffle oil.",
    emoji: "🥩",
    tags: ["signature"],
    vegetarian: false,
    spicy: false,
    featured: true,
    favourite: false,
    available: true
  },
  {
    id: 3,
    name: "Burrata con Prosciutto",
    category: "antipasti",
    price: 13.00,
    description: "Creamy Burrata from Puglia, Parma ham, roasted peppers and a drizzle of aged balsamic.",
    emoji: "🧀",
    tags: ["popular"],
    vegetarian: false,
    spicy: false,
    featured: false,
    favourite: false,
    available: true
  },
  // ── Pasta ──
  {
    id: 4,
    name: "Tagliatelle al Tartufo Nero",
    category: "pasta",
    price: 22.00,
    description: "Egg tagliatelle with Umbrian black truffle, aged Parmigiano, butter and a hint of sage.",
    emoji: "🍝",
    tags: ["signature", "seasonal"],
    vegetarian: true,
    spicy: false,
    featured: true,
    favourite: false,
    available: true
  },
  {
    id: 5,
    name: "Spaghetti alle Vongole",
    category: "pasta",
    price: 18.50,
    description: "Fresh spaghetti with Adriatic clams, dry white wine, garlic, parsley and a touch of chilli.",
    emoji: "🦪",
    tags: ["seafood", "classic"],
    vegetarian: false,
    spicy: true,
    featured: false,
    favourite: false,
    available: true
  },
  {
    id: 6,
    name: "Pappardelle al Cinghiale",
    category: "pasta",
    price: 20.00,
    description: "Wide egg pappardelle with slow-braised wild boar ragù, red wine, rosemary and juniper.",
    emoji: "🫕",
    tags: ["hearty"],
    vegetarian: false,
    spicy: false,
    featured: true,
    favourite: false,
    available: true
  },
  {
    id: 7,
    name: "Cacio e Pepe",
    category: "pasta",
    price: 15.00,
    description: "Tonnarelli pasta in a silky sauce of Pecorino Romano and freshly cracked black pepper. A Roman classic done right.",
    emoji: "🧆",
    tags: ["vegetarian", "roman"],
    vegetarian: true,
    spicy: false,
    featured: false,
    favourite: false,
    available: true
  },
  // ── Pizza ──
  {
    id: 8,
    name: "Margherita Verace",
    category: "pizza",
    price: 14.00,
    description: "San Marzano tomato, Fior di Latte mozzarella, fresh basil, extra-virgin olive oil. Certified Neapolitan.",
    emoji: "🍕",
    tags: ["vegetarian", "classic", "popular"],
    vegetarian: true,
    spicy: false,
    featured: false,
    favourite: false,
    available: true
  },
  {
    id: 9,
    name: "Diavola Piccante",
    category: "pizza",
    price: 16.00,
    description: "Spicy Calabrian salami, San Marzano tomato, mozzarella, fresh chilli and black olives. Hot and bold.",
    emoji: "🌶️",
    tags: ["spicy", "popular"],
    vegetarian: false,
    spicy: true,
    featured: false,
    favourite: false,
    available: true
  },
  {
    id: 10,
    name: "Quattro Formaggi",
    category: "pizza",
    price: 17.50,
    description: "Mozzarella, Gorgonzola, Taleggio and Parmigiano-Reggiano. A cheese lover's masterpiece.",
    emoji: "🧀",
    tags: ["vegetarian", "cheese"],
    vegetarian: true,
    spicy: false,
    featured: false,
    favourite: false,
    available: true
  },
  // ── Secondi ──
  {
    id: 11,
    name: "Ossobuco alla Milanese",
    category: "secondi",
    price: 28.00,
    description: "Slow-braised veal shank in white wine, with gremolata and saffron risotto.",
    emoji: "🍖",
    tags: ["signature", "hearty"],
    vegetarian: false,
    spicy: false,
    featured: true,
    favourite: false,
    available: true
  },
  {
    id: 12,
    name: "Branzino al Forno",
    category: "secondi",
    price: 26.00,
    description: "Whole sea bass baked in a herb crust with lemon, olives and cherry tomatoes.",
    emoji: "🐟",
    tags: ["seafood", "light"],
    vegetarian: false,
    spicy: false,
    featured: false,
    favourite: false,
    available: true
  },
  // ── Dolci ──
  {
    id: 13,
    name: "Tiramisù della Casa",
    category: "dolci",
    price: 9.00,
    description: "Our legendary house tiramisù — savoiardi dipped in espresso, mascarpone cream and bitter cocoa. Award-winning.",
    emoji: "🍰",
    tags: ["award-winning", "classic"],
    vegetarian: true,
    spicy: false,
    featured: true,
    favourite: false,
    available: true
  },
  {
    id: 14,
    name: "Panna Cotta al Frutti di Bosco",
    category: "dolci",
    price: 8.00,
    description: "Vanilla panna cotta with a wild berry coulis and fresh mint.",
    emoji: "🍮",
    tags: ["vegetarian", "light"],
    vegetarian: true,
    spicy: false,
    featured: false,
    favourite: false,
    available: true
  },
  // ── Beverages ──
  {
    id: 15,
    name: "Aperol Spritz",
    category: "beverages",
    price: 7.50,
    description: "Aperol, Prosecco and a splash of sparkling water over ice. The perfect aperitivo.",
    emoji: "🍹",
    tags: ["cocktail", "popular"],
    vegetarian: true,
    spicy: false,
    featured: false,
    favourite: false,
    available: true
  },
  {
    id: 16,
    name: "Acqua Panna 750ml",
    category: "beverages",
    price: 4.00,
    description: "Natural still mineral water from the Tuscan hills.",
    emoji: "💧",
    tags: ["non-alcoholic"],
    vegetarian: true,
    spicy: false,
    featured: false,
    favourite: false,
    available: true
  }
];

/**
 * loadDishes() — returns dishes from localStorage if present,
 * else seeds with SEED_DISHES.
 */
function loadDishes() {
  const raw = localStorage.getItem('lbt_dishes');
  if (raw) {
    try { return JSON.parse(raw); }
    catch { /* fall through */ }
  }
  localStorage.setItem('lbt_dishes', JSON.stringify(SEED_DISHES));
  return [...SEED_DISHES];
}

function saveDishes(dishes) {
  localStorage.setItem('lbt_dishes', JSON.stringify(dishes));
}

function loadReservations() {
  const raw = localStorage.getItem('lbt_reservations');
  if (raw) {
    try { return JSON.parse(raw); }
    catch { return []; }
  }
  return [];
}

function saveReservations(reservations) {
  localStorage.setItem('lbt_reservations', JSON.stringify(reservations));
}

function generateId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}
