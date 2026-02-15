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
    card.className = "col-md-3";

    card.innerHTML = `
      <div class="card h-100 p-2">
        <img src="${product.image}" class="card-img-top" height="160">
        <div class="card-body text-center">
          <h5 class="card-title">${product.title}</h5>
          <p class="text-muted">${product.subTitle}</p>
          <p class="text-primary">$${product.price}</p>

          <div class="d-flex justify-content-center gap-2"> <a href="product-add.html?id=${product.id}" class="btn btn-primary btn-sm" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; line-height: 1; color: #ffffff;"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="height: 1.5em; width: auto; fill: currentColor;"> <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"/> </svg> Edit </a> <button class="btn btn-danger btn-sm" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; line-height: 1;"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style="height: 1.5em; width: auto; fill: currentColor;"> <path d="M262.2 48C248.9 48 236.9 56.3 232.2 68.8L216 112L120 112C106.7 112 96 122.7 96 136C96 149.3 106.7 160 120 160L520 160C533.3 160 544 149.3 544 136C544 122.7 533.3 112 520 112L424 112L407.8 68.8C403.1 56.3 391.2 48 377.8 48L262.2 48zM128 208L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 208L464 208L464 512C464 520.8 456.8 528 448 528L192 528C183.2 528 176 520.8 176 512L176 208L128 208zM288 280C288 266.7 277.3 256 264 256C250.7 256 240 266.7 240 280L240 456C240 469.3 250.7 480 264 480C277.3 480 288 469.3 288 456L288 280zM400 280C400 266.7 389.3 256 376 256C362.7 256 352 266.7 352 280L352 456C352 469.3 362.7 480 376 480C389.3 480 400 469.3 400 456L400 280z"/> </svg> Remove </button> </div>
        </div>
      </div>
    `;

    card.querySelector(".btn-danger").onclick =
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
