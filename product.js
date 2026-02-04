
let productsData = JSON.parse(localStorage.getItem("products")) || products;

function addToCart(productId) {
  // get cart from localStorage or create empty array
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // check if product already in cart
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    const product = productsData.find(p => p.id === productId);
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to cart ✅");
}

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
                    <div class="col-8 d-flex align-items-center gap-2">
                        <div class="input-group" style="max-width: 150px;">
                            <button class="btn btn-outline-secondary" type="button" id="btn-minus">-</button>
                            <input type="text" class="form-control text-center" value="1" id="qty">
                            <button class="btn btn-outline-secondary" type="button" id="btn-plus">+</button>
                        </div>

                        <button type="button" class="btn btn-primary"onclick="addToCart(${product.id})">Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `;

}
