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

      <div class="icon add-to-cart-btn" data-id="${product.id}">
        <svg viewBox="0 0 576 512">
          <path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"/>
        </svg>
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

