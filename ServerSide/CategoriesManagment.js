const STORAGE_KEY = "categories_db";

const sidebarContainer = document.getElementById("dynamic-sidebar");
const newCategoryInput = document.getElementById("newCategoryInput");
const addCategoryBtn = document.getElementById("addCategoryBtn");

  const currentAdmin = JSON.parse(sessionStorage.getItem('currentAdmin'));

function initCategories() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    const categoriesFromDB = Object.keys(products);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categoriesFromDB));
  }

  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(products));
  }
}


function getCategories() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveCategories(categories) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
}

function getProductsDB() {
  return JSON.parse(localStorage.getItem("products")) || {};
}

function saveProductsDB(db) {
  localStorage.setItem("products", JSON.stringify(db));
}

// Render Sidebar
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
    const item = document.createElement("div");
    item.className = "list-group-item";

   item.innerHTML = `
  <div class="row align-items-center">
    <div class="col-7 fw-bold">${category}</div>

    <div class="col-5 d-flex justify-content-end gap-2">
      
      <!-- EDIT -->
      <button
        class="btn btn-sm btn-warning edit-btn d-flex align-items-center justify-content-center"
        data-category="${category}"
        title="Edit"
        style="width:36px; height:36px;"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="16" height="16">
          <path d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"/>
        </svg>
      </button>

      <button
        class="btn btn-sm btn-danger delete-btn d-flex align-items-center justify-content-center"
        data-category="${category}"
        title="Delete"
        style="width:36px; height:36px;"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16">
          <path d="M136.7 5.9L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-8.7-26.1C306.9-7.2 294.7-16 280.9-16L167.1-16c-13.8 0-26 8.8-30.4 21.9zM416 144L32 144 53.1 467.1C54.7 492.4 75.7 512 101 512L347 512c25.3 0 46.3-19.6 47.9-44.9L416 144z"/>
        </svg>
      </button>

    </div>
  </div>
`;


    sidebarContainer.appendChild(item);
  });
}

// Add Category

function addCategory() {
  const categoryName = newCategoryInput.value.trim();

  if (!categoryName) {
    alert("Category name can't be empty");
    return;
  }

  let categories = getCategories();

  if (categories.includes(categoryName)) {
    alert(categoryName +" Category is already exist");
    return;
  }

  // Add category
  categories.push(categoryName);
  saveCategories(categories);

  // Add an empty category to products database
  const productsDB = getProductsDB();
  productsDB[categoryName] = [];
  saveProductsDB(productsDB);

  alert(`${categoryName} category added successfully`);

  newCategoryInput.value = "";
  renderCategories();
}

// Delete Category
function deleteCategory(categoryName) {
  if (!confirm(`Delete "${categoryName}" category?`)) return;

  let categories = getCategories().filter(cat => cat !== categoryName);
  saveCategories(categories);

  const productsDB = getProductsDB();
  delete productsDB[categoryName];
  saveProductsDB(productsDB);

  renderCategories();
}

// edit category
function editCategory(oldName) {
  const newName = prompt("Enter new category name:", oldName);

  if (!newName || newName.trim() === oldName) return;
  alert("Category edited Sucessfully")
  let categories = getCategories();



  categories = categories.map(cat => (cat === oldName ? newName : cat));
  saveCategories(categories);

  const productsDB = getProductsDB();
  productsDB[newName] = productsDB[oldName] || [];
  delete productsDB[oldName];
  saveProductsDB(productsDB);

  renderCategories();
}


addCategoryBtn.addEventListener("click", addCategory);

newCategoryInput.addEventListener("keydown", e => {
  if (e.key === "Enter") addCategory();
});

sidebarContainer.addEventListener("click", (e) => {
  const button = e.target.closest("button");
  if (!button) return;

  if (button.classList.contains("delete-btn")) {
  if (!currentAdmin) {
    alert("Please log in first!");
    return;
  }else
    { deleteCategory(button.dataset.category);
    }
  }

  if (button.classList.contains("edit-btn")) {
    if (!currentAdmin) {
    alert("Please log in first!");
    return;
  }else {editCategory(button.dataset.category);}
  }
});



document.addEventListener("DOMContentLoaded", () => {
  initCategories();
  renderCategories();
});
