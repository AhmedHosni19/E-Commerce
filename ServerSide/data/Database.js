/* ======================= DB CONFIG ======================= */
const PRODUCTS_KEY = "products";
const CATEGORIES_KEY = "categories_db";

/* ======================= DB INIT ======================= */
function initDB(defaultProducts) {
  if (!localStorage.getItem(PRODUCTS_KEY)) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(defaultProducts));
  }

  if (!localStorage.getItem(CATEGORIES_KEY)) {
    localStorage.setItem(
      CATEGORIES_KEY,
      JSON.stringify(Object.keys(defaultProducts))
    );
  }
}

/* ======================= PRODUCTS ======================= */
function getProductsDB() {
  return JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || {};
}

function saveProductsDB(db) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(db));
}

/* ======================= CATEGORIES ======================= */
function getCategories() {
  return JSON.parse(localStorage.getItem(CATEGORIES_KEY)) || [];
}

function saveCategories(categories) {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
}

/* ======================= HELPERS ======================= */
function getAllProducts() {
  const db = getProductsDB();
  return Object.values(db).flat();
}

function getProductsByCategory(category) {
  const db = getProductsDB();
  return db[category] || [];
}