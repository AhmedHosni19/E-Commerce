const container = document.getElementById("products");

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
  alert(`${product.title} added to cart 🛒`);
}

// =======================
// WISHLIST
// =======================
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function saveWishlist() {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function addToWishlist(product) {
  const exists = wishlist.some(item => item.id === product.id);
  if (exists) {
    alert("Already in wishlist 🤍");
    return;
  }
  wishlist.push(product);
  saveWishlist();
  alert(`${product.title} added to wishlist 🤍`);
}

// =======================
// FILTER BY CATEGORY
// =======================
function filterByCategory(category) {
  if (category === "All") {
    renderProducts(productsData);
  } else {
    const filtered = productsData.filter(p => p.category === category);
    renderProducts(filtered);
  }
}

// =======================
// RENDER PRODUCTS
// =======================
function renderProducts(list) {
  // Ensure list is an array
  if (!Array.isArray(list)) {
    console.error("renderProducts received non-array:", list);
    list = [];
  }

  container.innerHTML = ""; // Clear container before rendering

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
          <button class="btn btn-primary text-white btn-md">Add to Cart  🛒</button>
          <button class="btn btn-outline-danger btn-sm">🤍 Wishlist</button>
        </div>
      </div>
    `;

    const [cartBtn, wishBtn] = card.querySelectorAll("button");
    cartBtn.onclick = () => addToCart(product);
    wishBtn.onclick = () => addToWishlist(product);

    container.appendChild(card);
  });
}

// =======================
// CATEGORY DROPDOWN / BUTTONS
// =======================
document.querySelectorAll(".dropdown-item").forEach(item => {
  item.addEventListener("click", e => {
    e.preventDefault();
    const category = item.dataset.category;
    filterByCategory(category);
  });
});

// =======================
// INITIAL RENDER
// =======================
renderProducts(productsData);