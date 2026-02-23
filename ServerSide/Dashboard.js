document.addEventListener("DOMContentLoaded", () => {
  const ordersDiv = document.getElementById("orders-div");
  const emptyDiv = document.getElementById("empty-div");
function stockUpdate(orderItems) {
  let products = JSON.parse(localStorage.getItem("products")) || {};
  
  orderItems.forEach(orderItem => {
    for (let category in products) {
      const product = products[category].find(p => p.id === orderItem.productId);
      if (product) {
        product.stock = orderItem.stock;
      }
    }
  });
  
  localStorage.setItem("products", JSON.stringify(products));
}
  function renderOrders() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length === 0) {
      ordersDiv.style.display = "none";
      emptyDiv.style.display = "flex";
      return;
    }

    emptyDiv.style.setProperty("display", "none", "important");
    ordersDiv.style.display = "block";
    ordersDiv.innerHTML = "";

    orders.forEach((order, index) => {
      const row = document.createElement("div");
      row.className = "row g-0 ms-3 text-center mb-2";

      const actionContent = order.status && order.status !== "Pending"
        ? `<span class="badge ${order.status === 'Confirmed' ? 'bg-success' : 'bg-danger'}">${order.status}</span>`
        : `
        <button class="btn btn-primary me-2 btn-confirm">Confirm</button>
        <button class="btn btn-outline-danger btn-reject">Reject</button>
      `;

      // Main row
      row.innerHTML = `
        <div class="col-2 fw-bold">#ORD-${order.orderId}</div>
        <div class="col-3 d-flex align-items-center justify-content-center fw-bold">${order.email}</div>
        <div class="col-3 d-flex align-items-center justify-content-center fw-bold">
          <button class="btn btn-sm btn-outline-secondary toggle-details">
            Order Details
          </button>
        </div>
        <div class="col-2 d-flex align-items-center justify-content-center fw-bold">$${order.totalPrice.toFixed(2)}</div>
        <div class="col-2 d-flex align-items-center justify-content-center">
          ${actionContent}
        </div>
      `;

      // Create hidden order details container
      const detailsDiv = document.createElement("div");
      detailsDiv.className = "order-details d-none mt-2 mb-2 p-2";
      detailsDiv.style.background = "#f8f9fa";
      detailsDiv.style.borderRadius = "8px";

      // Fill order items
      if (order.items && order.items.length > 0) {
        order.items.forEach(p => {
          const itemDiv = document.createElement("div");
          itemDiv.className = "d-flex align-items-center justify-content-between py-2 border-bottom";

          itemDiv.innerHTML = `
            <img src="${p.productImage || './images/placeholder.png'}" 
                 alt="${p.title}" 
                 style="width:50px;height:50px;object-fit:cover;border-radius:6px;">
            <div class="flex-grow-1 ms-2">
              <div class="fw-semibold">${p.title}</div>
              <small class="text-muted">Qty: ${p.qty}</small>
            </div>
            <div class="text-end">
              <div>$${p.price.toFixed(2)}</div>
              <small class="text-muted">$${(p.price * p.qty).toFixed(2)}</small>
            </div>
          `;
          detailsDiv.appendChild(itemDiv);
        });
      } else {
        detailsDiv.innerHTML = `<small class="text-muted">No items</small>`;
      }

      // Append details below the main row
      row.appendChild(detailsDiv);

      // Toggle button logic
      const toggleBtn = row.querySelector(".toggle-details");
      toggleBtn.onclick = () => {
        detailsDiv.classList.toggle("d-none");
        toggleBtn.textContent = detailsDiv.classList.contains("d-none")
          ? "Order Details"
          : "Hide Details";
      };

      // Confirm / Reject buttons
      const confirmBtn = row.querySelector(".btn-confirm");
      if (confirmBtn) {
        confirmBtn.onclick = () => {
          orders[index].status = "Confirmed"; 
        
          localStorage.setItem("orders", JSON.stringify(orders)); 
          renderOrders(); 
        };
      }

     const rejectBtn = row.querySelector(".btn-reject");
if (rejectBtn) {
  rejectBtn.onclick = () => {
    orders[index].status = "Rejected";

    // reverse stock
    const restoreItems = orders[index].items.map(item => ({
      productId: item.productId,
      stock: item.stock + item.qty
    }));

    stockUpdate(restoreItems);

    localStorage.setItem("orders", JSON.stringify(orders));
    renderOrders();
  };
}

      ordersDiv.appendChild(row);
    });
  }

  renderOrders();
});