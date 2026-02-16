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

const statusClass =
    order.status === "Confirmed"
        ? "status-confirmed"
        : order.status === "Rejected"
        ? "status-rejected"
        : "status-pending";

row.innerHTML = `
    <div class="col-4">
        <div class="fw-bold">#ORD-${order.orderId}</div>
        <small class="text-muted">Order ID</small>
    </div>

    <div class="col-4 text-center">
        <div class="fw-bold text-primary fs-5">
            $${order.totalPrice.toFixed(2)}
        </div>
        <small class="text-muted">Total Price</small>
    </div>

    <div class="col-4 text-center">
        <span class="status-badge ${statusClass}">
            ${order.status || "Pending"}
        </span>
    </div>
`;


            ordersDiv.appendChild(row);
        });
    }

    renderOrders();
});