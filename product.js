
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
    <div class="card border-0" style="max-width: 100%;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${product.image}" class="img-fluid rounded-start "
                    style="height: 900; width: 100%; object-fit: cover;" >
            </div>
            <div class="col-md-5 offset-md-1">
                <div class="card-body">
                    <h2 class="card-title">${product.title}</h2><br>
                    <h4 class="card-text text-body-secondary">${product.subTitle}</h4><br>

                    <h5 class="card-text">${product.description}</h5>
                    <br><br><br><br>
                  
<button class="btn btn-primary text-white btn-md " onclick="addToCart(${product.id})" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; line-height: 1;">
    Add to Cart
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="height: 1.1em; width: auto; fill: currentColor;">
        <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
    </svg>
</button>
 
                    </div>
                </div>
            </div>
        </div>
    </div>
  `;
   
}
