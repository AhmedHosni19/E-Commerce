const container = document.getElementById("products");
const STORAGE_KEY = "categories_db";

/* =======================
   GET CATEGORIES
======================= */
function getCategories() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

/* =======================
   LOAD PRODUCTS
======================= */
let productsDataRaw = JSON.parse(localStorage.getItem("products")) || products;

let productsData = [];

if (Array.isArray(productsDataRaw)) {
  productsData = productsDataRaw;
} else if (productsDataRaw && typeof productsDataRaw === "object") {
  productsData = Object.values(productsDataRaw).flat();
} else {
  productsData = [];
}

function saveProducts() {
  localStorage.setItem("products", JSON.stringify(productsData));
}

/* =======================
   CART
======================= */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}


  function addToCart(product) {

    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    if (!currentUser) {
        alert("Please login first!");
        window.location.href = "index.html";
        return;
    }

    const userEmail = currentUser.email.toLowerCase();
    const cartKey = "cart_" + userEmail;

    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    // Check if product already exists
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));

    alert(product.title + " added to cart!");
}



/* =======================
   WISHLIST
======================= */
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function saveWishlist() {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function addToWishlist(product) {

    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    if (!currentUser) {
        alert("Please login first!");
        window.location.href = "index.html";
        return;
    }

    const userEmail = currentUser.email.toLowerCase();
    const wishlistKey = "wishlist_" + userEmail;

    let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];

    const exists = wishlist.some(item => item.id === product.id);

    if (!exists) {
        wishlist.push(product);
        localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
        alert(`${product.title} added to your wishlist!`);
    } else {
        alert(`${product.title} is already in your wishlist.`);
    }
}

/* =======================
   PAGINATION
======================= */
const PRODUCTS_PER_PAGE = 12;
let currentPage = 1;
let currentList = [];

/* =======================
   FILTER BY CATEGORY
======================= */
function filterByCategory(category) {
  currentPage = 1;

  if (category === "All") {
    renderProducts(productsData);
  } else {
    const filtered = productsData.filter(p => p.category === category);
    renderProducts(filtered);
  }
}

/* =======================
   RENDER PRODUCTS
======================= */
function renderProducts(list) {
  if (!Array.isArray(list)) {
    console.error("renderProducts received non-array:", list);
    list = [];
  }

  currentList = list;
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <h3>No products found</h3>
        <p>Try adding some products first!</p>
      </div>
    `;
    return;
  }

  const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const end = start + PRODUCTS_PER_PAGE;
  const paginatedItems = list.slice(start, end);

  paginatedItems.forEach(product => {
    const card = document.createElement("div");
    card.style.width = "18rem";

    card.innerHTML = `
<div class="shop-card">

  <div class="image-box">
    <img src="${product.image || 'placeholder.jpg'}" 
         alt="${product.title }" height="160px">
  </div>

  <div class="content">

    <div class="price">
      $${product.price ?? 0}
    </div>

    <div class="title">
      <a href="product.html?id=${product.id}">
        ${product.title }
      </a>
    </div>

    <div class="desc">
      ${product.subTitle}
    </div>

    <div class="icons">

      <div class="icon wishlist-btn" data-id="${product.id}">
        <svg viewBox="0 0 512 512">
          <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/>
        </svg>
      </div>

      <div 
  class="icon add-to-cart-btn ${product.stock <= 0 ? 'out-of-stock' : ''}" 
  data-id="${product.id}"
  onclick="addToCart(${product.id})"
>
  ${
    product.stock > 0
      ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M24 48C10.7 48 0 58.7 0 72C0 85.3 10.7 96 24 96L69.3 96C73.2 96 76.5 98.8 77.2 102.6L129.3 388.9C135.5 423.1 165.3 448 200.1 448L456 448C469.3 448 480 437.3 480 424C480 410.7 469.3 400 456 400L200.1 400C188.5 400 178.6 391.7 176.5 380.3L171.4 352L475 352C505.8 352 532.2 330.1 537.9 299.8L568.9 133.9C572.6 114.2 557.5 96 537.4 96L124.7 96L124.3 94C119.5 67.4 96.3 48 69.2 48L24 48zM208 576C234.5 576 256 554.5 256 528C256 501.5 234.5 480 208 480C181.5 480 160 501.5 160 528C160 554.5 181.5 576 208 576zM432 576C458.5 576 480 554.5 480 528C480 501.5 458.5 480 432 480C405.5 480 384 501.5 384 528C384 554.5 405.5 576 432 576z"/></svg>` 
       : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M431.2 476.5L163.5 208.8C141.1 240.2 128 278.6 128 320C128 426 214 512 320 512C361.5 512 399.9 498.9 431.2 476.5zM476.5 431.2C498.9 399.8 512 361.4 512 320C512 214 426 128 320 128C278.5 128 240.1 141.1 208.8 163.5L476.5 431.2zM64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320z"/></svg>`
  }
</div>

      <div class="icon">
        <a href="product.html?id=${product.id}">
          <svg viewBox="0 0 640 640">
            <path d="M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96z"/>
          </svg>
        </a>
      </div>

    </div>
  </div>
</div>
`;

    const wishBtn = card.querySelector(".wishlist-btn");
    const cartBtn = card.querySelector(".add-to-cart-btn");

    if (cartBtn) cartBtn.onclick = () => addToCart(product);
    if (wishBtn) wishBtn.onclick = () => addToWishlist(product);

    container.appendChild(card);
  });

  renderPagination();
}

/* =======================
   RENDER PAGINATION
======================= */
function renderPagination() {
  const totalPages = Math.ceil(currentList.length / PRODUCTS_PER_PAGE);

  let paginationContainer = document.getElementById("pagination");

  if (!paginationContainer) {
    paginationContainer = document.createElement("div");
    paginationContainer.id = "pagination";
document.querySelector(".container-fluid").appendChild(paginationContainer);
  }

  paginationContainer.innerHTML = "";

  // 🔥 CENTER USING FLEX
  paginationContainer.style.display = "flex";
  paginationContainer.style.justifyContent = "center";
  paginationContainer.style.alignItems = "center";
  paginationContainer.style.gap = "10px";
  paginationContainer.style.margin = "40px 0";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;

    // 🔥 Clean Modern Style
    btn.style.padding = "8px 14px";
    btn.style.border = "1px solid #ddd";
    btn.style.background = "#fff";
    btn.style.cursor = "pointer";
    btn.style.borderRadius = "6px";
    btn.style.transition = "0.2s ease";
    btn.style.fontWeight = "500";

    // Active page
    if (i === currentPage) {
      btn.style.background = "#000";
      btn.style.color = "#fff";
      btn.style.border = "1px solid #000";
    }

    // Hover effect
    btn.onmouseenter = () => {
      if (i !== currentPage) {
        btn.style.background = "#000";
        btn.style.color = "#fff";
      }
    };

    btn.onmouseleave = () => {
      if (i !== currentPage) {
        btn.style.background = "#fff";
        btn.style.color = "#000";
      }
    };

    btn.onclick = () => {
      currentPage = i;
      renderProducts(currentList);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    paginationContainer.appendChild(btn);
  }
}


/* =======================
   CATEGORY DROPDOWN
======================= */
const menu = document.querySelector(".dropdown-menu");
const categories = getCategories();

let html = `
<li>
  <a class="dropdown-item" href="#" data-category="All">
    All Products
  </a>
</li>
<li><hr class="dropdown-divider"></li>
`;

categories.forEach(cat => {
  html += `
  <li>
    <a class="dropdown-item" href="#" data-category="${cat}">
      ${cat}
    </a>
  </li>
  `;
});

if (menu) menu.innerHTML = html;

document.querySelectorAll(".dropdown-item").forEach(item => {
  item.addEventListener("click", e => {
    e.preventDefault();
    const category = item.dataset.category;
    filterByCategory(category);
  });
});

  // INITIAL RENDER
renderProducts(productsData);
// slider elements
const minRange = document.getElementById("minRange");
const maxRange = document.getElementById("maxRange");
const minValue = document.getElementById("minValue");
const maxValue = document.getElementById("maxValue");
const resetFilterBtn = document.getElementById("resetFilter");

// 🔥 dynamically set max price based on products
const highestPrice = Math.max(...productsData.map(p => p.price));
minRange.max = highestPrice;
maxRange.max = highestPrice;
maxRange.value = highestPrice;
maxValue.textContent = highestPrice;

// update UI text
function updateSliderValues() {

  let min = parseFloat(minRange.value);
  let max = parseFloat(maxRange.value);

  // prevent overlap
  if (min > max) {
    [min, max] = [max, min];
  }

  minValue.textContent = min;
  maxValue.textContent = max;

  filteredProducts = productsData.filter(product =>
    product.price >= min && product.price <= max
  );

  currentPage = 1;
  renderProducts(filteredProducts);
}

// event listeners
minRange.addEventListener("input", updateSliderValues);
maxRange.addEventListener("input", updateSliderValues);

// reset
resetFilterBtn.addEventListener("click", () => {

  minRange.value = 0;
  maxRange.value = highestPrice;

  minValue.textContent = 0;
  maxValue.textContent = highestPrice;

  filteredProducts = [...productsData];
  currentPage = 1;

  renderProducts(filteredProducts);
});

function initCategories() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    const categoriesFromDB = Object.keys(products);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categoriesFromDB));
  }

  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(products));
  }
}
  initCategories();


  if (!window.location.hash) {
    window.location = window.location + '#loaded';
    window.location.reload();
  }

