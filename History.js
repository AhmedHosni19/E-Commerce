document.addEventListener("DOMContentLoaded", () => {
    const ordersDiv = document.getElementById("orders-div");
    const emptyDiv = document.getElementById("empty-div");
    
    // 1. Get the current user from Session Storage
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    function renderOrders() {
        // If no user is logged in, show the empty state and stop
        if (!currentUser) {
            ordersDiv.style.display = "none";
            emptyDiv.style.display = "flex";
            return;
        }

        let allOrders = JSON.parse(localStorage.getItem("orders")) || [];

        // 2. Filter orders to find only those belonging to the current user
        const userOrders = allOrders.filter(order => order.userId === currentUser.id);
        // 3. Check if the current user has any orders
        if (userOrders.length === 0) {
            ordersDiv.style.display = "none";
            emptyDiv.style.display = "flex";
            return;
        }

        // Show the div and clear previous content
        emptyDiv.style.setProperty("display", "none", "important");
        ordersDiv.style.display = "block";
        ordersDiv.innerHTML = ""; 

        userOrders.forEach((order) => {
            const row = document.createElement("div");
            row.className = "history-item row align-items-center py-3 border-bottom";
            console.log("User Orders:", userOrders);
console.log("Current Order:", userOrders);
 const item = document.createElement("div");
item.className = "history-item py-3 border-bottom";

const statusClass =
  order.status === "Confirmed"
    ? "status-confirmed"
    : order.status === "Rejected"
    ? "status-rejected"
    : "status-pending";

item.innerHTML = `
 <div class="history-item row align-items-center py-2 border-bottom">

  <!-- ORDER ID -->
  <div class="col-md-2 text-start">
    <div class="fw-bold">#ORD-${order.orderId}</div>
    <small class="text-muted">Order ID</small>
  </div>

  <!-- TOTAL PRICE -->
  <div class="col-md-3 text-center">
    <div class="fw-bold text-primary fs-5">
      $${order.totalPrice.toFixed(2)}
    </div>
    <small class="text-muted">Total Price</small>
  </div>

  <!-- STATUS -->
  <div class="col-md-4 text-center">
    <span class="status-badge ${statusClass}">
      ${order.status || "Pending"}
    </span>
  </div>

  <!-- EMPTY COLUMN (to match header spacing) -->
  <div class="col-md-3">
  <button class="btn btn-sm btn-outline-secondary toggle-details offset-md-5">
    Show Details
  </button>
  </div>

</div>

  

  <!-- DROPDOWN DETAILS -->
  <div class="order-details mt-3 d-none">
    ${
      (order.items || []).map(p => `
        <div class="d-flex align-items-center justify-content-between py-2 border-bottom">

          <img
            src="${p.productImage || './images/placeholder.png'}"
            onerror="this.src='./images/placeholder.png'"
            alt="${p.title}"
            style="width:60px;height:60px;object-fit:cover;border-radius:8px;"
          >

          <div class="flex-grow-1 ms-3">
            <div class="fw-semibold">${p.title}</div>
            <small class="text-muted">Qty: ${p.qty}</small>
          </div>

          <div class="text-end">
            <div>$${p.price.toFixed(2)}</div>
            <small class="text-muted">
              $${(p.price * p.qty).toFixed(2)}
            </small>
          </div>

        </div>
      `).join("")
    }
  </div>
`;

const toggleBtn = item.querySelector(".toggle-details");
const detailsDiv = item.querySelector(".order-details");

toggleBtn.onclick = () => {
  detailsDiv.classList.toggle("d-none");
  toggleBtn.textContent = detailsDiv.classList.contains("d-none")
    ? "Show details"
    : "Hide details";
};

ordersDiv.appendChild(item);
        });
    }

    renderOrders();

});