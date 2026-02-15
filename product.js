
let productsDataRaw = JSON.parse(localStorage.getItem("products")) || products;

let productsData = Object.values(productsDataRaw).flat();
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

    alert("Product added to cart!");
}


let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];


const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));

const product = productsData.find(p => p.id === productId);

const container = document.getElementById("productDetails");

if (!product) {
    container.innerHTML = "<h3>Product not found</h3>";
} else {
    container.innerHTML = `
<div class="product-wrapper">

    <!-- Image Section -->
    <div class="product-image">
        <img src="${product.image}" alt="${product.title}">
    </div>

    <!-- Info Section -->
    <div class="product-info">

        <h1 class="product-title">
            ${product.title}
        </h1>

        <p class="product-subtitle">
            ${product.subTitle || ""}
        </p>

        <p class="product-description">
            ${product.description || ""}
        </p>
        <br><br>

        <div class="product-price">
            $${product.price ?? 0}
        </div>

        <button class="add-cart-btn" onclick="addToCart(${product.id})">
            Add to Cart
        </button>

    </div>

</div>
`;


}
