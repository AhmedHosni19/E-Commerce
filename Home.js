const container = document.getElementById("products");

// =======================
// CART
// =======================
let productsData = JSON.parse(localStorage.getItem("products")) || products;

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
  if (category === "All") renderProducts(products);
  else renderProducts(products.filter(p => p.category === category));
}

// =======================
// RENDER PRODUCTS
// =======================
function renderProducts(list) {

  container.innerHTML = ""; // Clear container before rendering
 
  list.forEach(product => {
    const card = document.createElement("div");
    card.className = "card p-2 m-2";
    card.style.width = "18rem";

    card.innerHTML = `
      <img src="${product.image}" class="card-img-top" height="160">
      <div class="card-body text-center">
        <h5 class="card-title">
          <a href="product.html?id=${product.id}" class="text-decoration-none">
            ${product.title}
          </a>
        </h5>
        <p class="card-text">${product.subTitle}</p>
        <p class="text-primary">$${product.price}</p>
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
// INITIAL RENDER
// =======================
renderProducts(products);

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
renderProducts(productsData);
