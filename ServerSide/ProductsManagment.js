const container = document.getElementById("products");

// load products (from localStorage if exists)
let productsDataRaw = JSON.parse(localStorage.getItem("products")) || products;
let productsData = Object.values(productsDataRaw).flat();

// pagination variables
let currentPage = 1;
const itemsPerPage = 8;

// save products
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(productsData));
}

// remove product
function removeProduct(id) {

  const currentUser = JSON.parse(sessionStorage.getItem("currentAdmin"));

  if (!currentUser) {
    alert("Please log in first!");
    return;
  }

  if (!confirm("Are you sure you want to delete this product?")) return;

  productsData = productsData.filter(p => p.id !== id);

  saveProducts();

  const totalPages = Math.ceil(productsData.length / itemsPerPage);
  if (currentPage > totalPages) {
    currentPage = totalPages || 1;
  }

  renderProducts(productsData);
}

// render products
function renderProducts(list) {

  container.innerHTML = "";

  const totalPages = Math.ceil(list.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const paginatedItems = list.slice(start, end);

 paginatedItems.forEach(product => {

  const card = document.createElement("div");
  card.className = "product-card"; // ⬅ works with flex container

  card.innerHTML = `
    <div class="card admin-product-card">
      <div class="image-wrapper">
        <img src="${product.image}" alt="${product.title}">
      </div>

      <div class="card-body text-center">
        <h6 class="product-title">${product.title}</h6>
        <p class="product-subtitle">${product.subTitle}</p>
        <p class="product-price">$${product.price}</p>

        <div class="action-buttons">
          <a href="product-add.html?id=${product.id}" class="btn btn-edit">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0z"/>
            </svg>
            Edit
          </a>

          <button class="btn btn-remove">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M232.7 69.9C237.1 56.8 249.3 48 263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9zM128 208L512 208L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 208zM216 272C202.7 272 192 282.7 192 296L192 488C192 501.3 202.7 512 216 512C229.3 512 240 501.3 240 488L240 296C240 282.7 229.3 272 216 272zM320 272C306.7 272 296 282.7 296 296L296 488C296 501.3 306.7 512 320 512C333.3 512 344 501.3 344 488L344 296C344 282.7 333.3 272 320 272zM424 272C410.7 272 400 282.7 400 296L400 488C400 501.3 410.7 512 424 512C437.3 512 448 501.3 448 488L448 296C448 282.7 437.3 272 424 272z"/></svg>
            Remove
          </button>
        </div>
      </div>
    </div>
  `;

  // 🔥 LOGIC UNTOUCHED
  card.querySelector(".btn-remove").onclick =
    () => removeProduct(product.id);

  container.appendChild(card);
});


  renderPagination(totalPages, list);
}

// render pagination
function renderPagination(totalPages, list) {

  // remove old pagination if exists
  const oldPagination = document.getElementById("pagination");
  if (oldPagination) oldPagination.remove();

  if (totalPages <= 1) return;

  const pagination = document.createElement("div");
  pagination.id = "pagination";
  pagination.className = "d-flex justify-content-center mt-4 gap-2";

  // Prev button
  const prev = document.createElement("button");
  prev.className = "btn btn-outline-dark btn-sm";
  prev.textContent = "Prev";
  prev.disabled = currentPage === 1;
  prev.onclick = () => {
    currentPage--;
    renderProducts(list);
    window.scrollTo({ top: 0, behavior: "smooth" });

    
  };
  pagination.appendChild(prev);

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {

    const btn = document.createElement("button");

    btn.className =
      "btn btn-sm " +
      (i === currentPage ? "btn-dark" : "btn-outline-dark");

    btn.textContent = i;

    btn.onclick = () => {
      currentPage = i;
      renderProducts(list);
            window.scrollTo({ top: 0, behavior: "smooth" });

    };

    pagination.appendChild(btn);
  }

  // Next button
  const next = document.createElement("button");
  next.className = "btn btn-outline-dark btn-sm";
  next.textContent = "Next";
  next.disabled = currentPage === totalPages;
  next.onclick = () => {
    currentPage++;
    renderProducts(list);
    window.scrollTo({ top: 0, behavior: "smooth" });

  };
  pagination.appendChild(next);

  container.after(pagination);

}

// init
renderProducts(productsData);
