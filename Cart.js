document.addEventListener("DOMContentLoaded", () => {

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  if (!currentUser) {
    alert("Please login first!");
    window.location.href = "index.html";
    return;
  }

  const userEmail = currentUser.email.toLowerCase();
  const cartKey = "cart_" + userEmail; // 🔥 unique cart per user

  const cartContainer = document.getElementById("full-div");
  const emptyDiv = document.getElementById("empty-div");
  const clearCartBtn = document.getElementById("clearCart");

  const subTotalEl = document.getElementById("subTotal");
  const shippingEl = document.getElementById("EstimatedShipping");
  const taxEl = document.getElementById("EstimatedTax");

  const discountForm = document.querySelector('form[role="apply-discount"]');
  const discountInput = document.getElementById("discount-code");

  const SHIPPING_RATE = 10;
  const TAX_RATE = 0.08;
  let discount = 0;

  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const templateRow = cartContainer.querySelector(".row");
  cartContainer.innerHTML = "";

  function saveCart() {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }

  function toggleEmptyState() {
    if (cart.length === 0) {
      cartContainer.style.display = "none";
      emptyDiv.style.display = "flex";
    } else {
      cartContainer.style.display = "block";
      emptyDiv.style.display = "none";
    }
  }

  function calculateTotals() {
    let subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    let shipping = cart.length ? SHIPPING_RATE : 0;
    let tax = subtotal * TAX_RATE;
    let total = subtotal + shipping + tax - discount;

    subTotalEl.textContent = `$${subtotal.toFixed(2)}`;
    shippingEl.textContent = `$${shipping.toFixed(2)}`;
    taxEl.textContent = `$${tax.toFixed(2)}`;

    document.querySelectorAll("#EstimatedTax")[1].textContent =
      `$${total.toFixed(2)}`;

    return total;
  }

  function renderCart() {

    cartContainer.innerHTML = "";

    cart.forEach((item, index) => {

      const row = templateRow.cloneNode(true);

      row.querySelector("#item-img img").src = item.image;
      row.querySelector("#item-img img").alt = item.title;
      row.querySelector("#item-title").textContent = item.title;
      row.querySelector("#item-subTitle").textContent = item.subTitle;
      row.querySelector("#item-price").textContent = `$${item.price.toFixed(2)}`;
      row.querySelector("#qty").value = item.qty;
      row.querySelector("#subTotalPrice").textContent =
        `$${(item.price * item.qty).toFixed(2)}`;

      row.querySelector("#btn-plus").onclick = () => {
        item.qty++;
        saveCart();
        renderCart();
      };

      row.querySelector("#btn-minus").onclick = () => {
        if (item.qty > 1) item.qty--;
        saveCart();
        renderCart();
      };

      row.querySelector("#deleteProduct").onclick = () => {
        cart.splice(index, 1);
        saveCart();
        renderCart();
      };

      cartContainer.appendChild(row);
    });

    toggleEmptyState();
    calculateTotals();
  }

  // Discount
  discountForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const code = discountInput.value.trim().toUpperCase();

    if (code === "SAVE10") discount = 10;
    else if (code === "SAVE20") discount = 20;
    else discount = 0;

    calculateTotals();
  });

  clearCartBtn?.addEventListener("click", () => {
    localStorage.removeItem(cartKey); // 🔥 remove only this user's cart
    cart = [];
    discount = 0;
    renderCart();
  });

  // Submit Order
  const submitOrderBtn = document.getElementById("submit-order");

  submitOrderBtn?.addEventListener("click", () => {

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const totalPrice = calculateTotals();
    const orderId = Math.floor(Math.random() * 1000000);

    const order = {
      orderId,
      email: currentUser.email,   // 🔥 save by email
      totalPrice,
      items: cart
    };

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    localStorage.removeItem(cartKey); // clear only this user's cart
    cart = [];

    alert(`Order #${orderId} submitted successfully!`);
    renderCart();
  });

  renderCart();
});
