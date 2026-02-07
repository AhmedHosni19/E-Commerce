// CategoriesManagment.js

// ===============================
// CONFIG
// ===============================
const STORAGE_KEY = "categories_db";

// DOM
const sidebarContainer = document.getElementById("dynamic-sidebar");
const newCategoryInput = document.getElementById("newCategoryInput");
const addCategoryBtn = document.getElementById("addCategoryBtn");

// ===============================
// INITIAL DATABASE SYNC
// ===============================
function initCategories() {
  // If localStorage is empty → load from products object
  if (!localStorage.getItem(STORAGE_KEY)) {
    const categoriesFromDB = Object.keys(products);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categoriesFromDB));
  }
}

// ===============================
// STORAGE HELPERS
// ===============================
function getCategories() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveCategories(categories) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
}

// ===============================
// RENDER SIDEBAR
// ===============================
function renderCategories() {
  const categories = getCategories();
  sidebarContainer.innerHTML = "";

  if (categories.length === 0) {
    sidebarContainer.innerHTML = `
      <div class="text-muted text-center">
        No categories available
      </div>
    `;
    return;
  }

  categories.forEach(category => {
    const item = document.createElement("a");
    item.className = "list-group-item ";
    item.innerHTML =  
     
    "<div class='row'> <div class='edit-icon col-7'>" + category + 
     "</div>"+ 
     "<div class='col-5 '><span class='edit-icon'><a href='#'class='m-1' style='text-decoration:none'>✏️</a></span> "+
      "<span class='delete-icon'><a href='#' style='text-decoration:none '>🗑️</a></span> </div> </div>";

    sidebarContainer.appendChild(item);
  });
}

// ===============================
// ADD CATEGORY
// ===============================
function addCategory() {
  const categoryName = newCategoryInput.value.trim();

  if (!categoryName) {
    alert("Category name cannot be empty");
    return;
  }

  let categories = getCategories();

  if (categories.includes(categoryName)) {
    alert("Category already exists");
    return;
  }

  // 1️⃣ Add to localStorage categories
  categories.push(categoryName);
  saveCategories(categories);

  // 2️⃣ Add empty category to products database
  products[categoryName] = [];

  newCategoryInput.value = "";
  renderCategories();
}

// ===============================
// EVENTS
// ===============================
addCategoryBtn.addEventListener("click", addCategory);

newCategoryInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addCategory();
});

// ===============================
// INIT
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  initCategories();
  renderCategories();
});
let productsDataRaw = JSON.parse(localStorage.getItem("products")) || products;

// Flatten into single array
let productsData = Object.values(productsDataRaw).flat();
// save products
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(productsData.categories));
}


