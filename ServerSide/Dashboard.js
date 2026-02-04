document.addEventListener("DOMContentLoaded", () => {
    const ordersDiv = document.getElementById("orders-div");
    const emptyDiv = document.getElementById("empty-div");

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

            row.innerHTML = `
                <div class="col-2 d-flex align-items-center justify-content-center fw-bold">#ORD-${order.orderId}</div>
                <div class="col-2 d-flex align-items-center justify-content-center fw-bold">#CUST-${order.userId.slice(-5)}</div>
                <div class="col-2 d-flex align-items-center justify-content-center fw-bold ">$${order.totalPrice.toFixed(2)}</div>
                <div class="col-2 d-flex align-items-center justify-content-center fw-bold">${order.status}</div>
                <div class="col-2 d-flex align-items-center justify-content-center offset-1">
                    <button class="btn btn-primary me-2 btn-confirm">Confirm</button>
                    <button class="btn btn-outline-danger btn-reject">Reject</button>
                </div>
            `;

            // Confirm button → remove order
            row.querySelector(".btn-confirm").onclick = () => {
                orders.splice(index, 1); // remove this order
                localStorage.setItem("orders", JSON.stringify(orders));
                renderOrders(); // re-render dashboard
            };

            // Reject button → remove order
            row.querySelector(".btn-reject").onclick = () => {
                orders.splice(index, 1); // remove this order
                localStorage.setItem("orders", JSON.stringify(orders));
                renderOrders(); // re-render dashboard
            };

            ordersDiv.appendChild(row);
        });
    }

    renderOrders();
});
