const container = document.getElementById("products");

// load products (from localStorage if exists)
let productsData = JSON.parse(localStorage.getItem("products")) || products;

// save products
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(productsData));
}

// remove product
function removeProduct(id) {
  if (!confirm("Are you sure you want to delete this product?")) return;

  productsData = productsData.filter(p => p.id !== id);
  saveProducts();
  renderProducts(productsData);
  }

// render products
function renderProducts(list) {
  container.innerHTML = "";

  list.forEach(product => {
    const card = document.createElement("div");
    card.className = "col-md-3";

    card.innerHTML = `
      <div class="card h-100 p-2" >
        <img src="${product.image}" class="card-img-top" height="160"">
        <div class="card-body text-center">
          <h5 class="card-title">${product.title}</h5>
          <p class="text-muted">${product.subTitle}</p>
          <p class="text-primary">$${product.price}</p>

          <div class="d-flex justify-content-center gap-2">
            <a href="product-add.html?id=${product.id}" class="btn btn-warning btn-sm">
              ✏️ Edit
            </a>
            <button class="btn btn-danger btn-sm">
              🗑 Remove
            </button>
          </div>
        </div>
      </div>
    `;

    card.querySelector(".btn-danger").onclick = () => removeProduct(product.id);

    container.appendChild(card);
  });
}

// init
renderProducts(productsData);
