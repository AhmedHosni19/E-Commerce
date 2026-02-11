const container = document.getElementById("products");
const STORAGE_KEY = "categories_db";
function getCategories() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}
// =======================
// CART
// =======================
// Load products - handle both array and object structures
let productsDataRaw = JSON.parse(localStorage.getItem("products")) || products;

// Ensure productsData is always an array
let productsData = [];

// Check the structure and flatten if needed
if (Array.isArray(productsDataRaw)) {
  productsData = productsDataRaw;
} else if (productsDataRaw && typeof productsDataRaw === 'object') {
  // If it's an object, flatten all values into a single array
  productsData = Object.values(productsDataRaw).flat();
} else {
  // Fallback to empty array
  productsData = [];
}

// save products
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(productsData));
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  alert(`${product.title} added to your cart `);
}

//handle adding to wishlist
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function saveWishlist() {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function addToWishlist(product) {
  const exists = wishlist.some(item => item.id === product.id);
  if (exists) {
    alert(`${product.title} is already in your wishlist `);
    return;
  }
  wishlist.push(product);
  saveWishlist();
  alert(`${product.title} added to your wishlist `);
}

// category filtter
function filterByCategory(category) {
  if (category === "All") {
    renderProducts(productsData);
  } else {
    const filtered = productsData.filter(p => p.category === category);
    renderProducts(filtered);
  }
}


function renderProducts(list) {
  // Ensure list is an array
  if (!Array.isArray(list)) {
    console.error("renderProducts received non-array:", list);
    list = [];
  }
// Clear container before rendering
  container.innerHTML = ""; 

  // Check if list is empty
  if (list.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <h3>No products found</h3>
        <p>Try adding some products first!</p>
      </div>
    `;
    return;
  }

  list.forEach(product => {
    const card = document.createElement("div");
    card.className = "card p-2 m-2";
    card.style.width = "18rem";

    card.innerHTML = `
      <img src="${product.image || 'placeholder.jpg'}" class="card-img-top" height="160" alt="${product.title}">
      <div class="card-body text-center">
        <h5 class="card-title">
          <a href="product.html?id=${product.id}" class="text-decoration-none">
            ${product.title || 'Untitled Product'}
          </a>
        </h5>
        <p class="card-text">${product.subTitle || ''}</p>
        <p class="text-primary">$${product.price || 0}</p>
        <div class="d-flex justify-content-center gap-2">
          <button class="btn btn-primary text-white btn-md" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; line-height: 1;">
    Add to Cart
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="height: 1.1em; width: auto; fill: currentColor;">
        <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
    </svg>
</button>
<button class="btn btn-outline-danger btn-sm" style="display: inline-flex; align-items: center; justify-content: center; gap: 5px; line-height: 1;">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style="height: 1.1em; width: auto; fill: currentColor;">
        <path d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z"/>
    </svg>
    Wishlist
</button>        </div>
      </div>
    `;

    const [cartBtn, wishBtn] = card.querySelectorAll("button");
    cartBtn.onclick = () => addToCart(product);
    wishBtn.onclick = () => addToWishlist(product);

    container.appendChild(card);
  });


}
//Category dropdown List
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

menu.innerHTML = html;



document.querySelectorAll(".dropdown-item").forEach(item => {
  item.addEventListener("click", e => {
    e.preventDefault();
    const category = item.dataset.category;
    filterByCategory(category);
  });
});


renderProducts(productsData);