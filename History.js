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
            row.className = "row g-0 ms-3 text-center mb-2";
            row.innerHTML = `
                <div class="col-4 d-flex align-items-center justify-content-center fw-bold">#ORD-${order.orderId}</div>
                <div class="col-4 d-flex align-items-center justify-content-center fw-bold ">$${order.totalPrice.toFixed(2)}</div>
                <div class="col-4 d-flex align-items-center justify-content-center fw-bold">${order.status || "Pending"}</div>
            `;
            ordersDiv.appendChild(row);
        });
    }

    renderOrders();
});