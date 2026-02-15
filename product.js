
let productsDataRaw = JSON.parse(localStorage.getItem("products")) || products;

let productsData = Object.values(productsDataRaw).flat();
function addToCart(productId) {
    // get cart from localStorage or create empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // check if product already in cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        alert(`${product.title} is already in your cart `);
    } else {
        const product = productsData.find(p => p.id === productId);
        cart.push({ ...product, qty: 1 });
        alert(`${product.title} added to your cart `);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

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
