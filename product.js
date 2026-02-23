
let productsDataRaw = JSON.parse(localStorage.getItem("products")) || products;

let productsData = Object.values(productsDataRaw).flat();
// Function to add to Cart
function addToCart(productOrId) {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    if (!currentUser) {
        alert("Please login first!");
        window.location.href = "index.html";
        return;
    }

    // Safety: Find full product if only ID was passed from HTML
    let product;
    if (typeof productOrId === 'object' && productOrId !== null) {
        product = productOrId;
    } else {
        product = productsData.find(p => p.id === productOrId);
    }
    
    if (!product) return console.error("Product not found!");

    const userEmail = currentUser.email.toLowerCase();
    const cartKey = "cart_" + userEmail;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.qty += 1;
    } else {
        // Spread operator ensures all product details are saved
        cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    alert(`${product.title} added to cart!`);
}

// Function to add to Wishlist
function addToWishlist(productOrId) {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    if (!currentUser) {
        alert("Please login first!");
        window.location.href = "index.html";
        return;
    }

    // Safety: Find full product if only ID was passed from HTML
    let product;
    if (typeof productOrId === 'object' && productOrId !== null) {
        product = productOrId;
    } else {
        product = productsData.find(p => p.id === productOrId);
    }
    
    if (!product) return console.error("Product not found!");

    const userEmail = currentUser.email.toLowerCase();
    const wishlistKey = "wishlist_" + userEmail;
    let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];

    const exists = wishlist.some(item => item.id === product.id);

    if (!exists) {
        // Save full product snapshot
        wishlist.push({ ...product });
        localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
        alert(`${product.title} added to wishlist!`);
    } else {
        alert("This product is already in your wishlist.");
    }
}

const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));

const product = productsData.find(p => p.id === productId);

const container = document.getElementById("productDetails");

if (!product) {
    container.innerHTML = "<h3>Product not found</h3>";
} else {
   container.innerHTML = `
<div class="product-wrapper shadow-sm">
    <div class="row g-0">
        
        <div class="col-md-5 border-end bg-light d-flex align-items-center justify-content-center p-4">
            <div class="image-zoom-container">
                <img src="${product.image}" alt="${product.title}" class="img-fluid main-product-img">
            </div>
        </div>

        <div class="col-md-5 p-5 d-flex flex-column justify-content-center">
            
            <span class="text-uppercase text-muted fw-bold small mb-2 tracking-wider" style="letter-spacing: 2px;">
                ${product.category || 'Premium Collection'}
            </span>

            <h1 class="display-5 fw-bold mb-3">${product.title}</h1>
            
            <h5 class="text-secondary fw-normal mb-4">${product.subTitle || ""}</h5>

            <div class="price-container mb-4">
                <span class="h2 fw-bold text-dark">$${product.price ?? 0}</span>
                <span class="text-muted ms-2 small">Excl. shipping</span>
            </div>

            <p class="product-description text-muted mb-5" style="line-height: 1.8;">
                ${product.description || "No description available for this premium item."}
            </p>

            <div class="d-flex flex-column gap-3">
                <div class="d-flex gap-2">
                    <button class="add-cart-btn btn btn-dark btn-lg px-5 py-3 rounded-3 fw-bold"
                        onclick="addToCart(${product.id})"
                        ${product.stock <= 0 ? "disabled class='out-of-stock'" : ""}>
                        ${product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                    </button>
                    <button class="btn btn-outline-dark px-4" onclick="addToWishlist(${product.id})">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>

                </div>
                 <span class="text-muted small ms-3">
                  ${product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
                 </span>
                
                <div class="mt-4 pt-4 border-top">
                    <div class="d-flex align-items-center gap-3 text-muted mb-2">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                        <span class="small">Free shipping on all local orders</span>
                    </div>
                    <div class="d-flex align-items-center gap-3 text-muted">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                        <span class="small">2-Year RAFMAN Warranty included</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
`;


}
