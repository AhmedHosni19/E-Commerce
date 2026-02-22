const SHIPPING_RATE = 10;
const TAX_RATE = 0.08;
let discount = 0;

// Helper function to get user-specific cart key
function getCartKey() {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  if (!currentUser) return null;
  return "cart_" + currentUser.email.toLowerCase();
}

// Load cart with user-specific key
function loadCart() {
  const cartKey = getCartKey();
  if (!cartKey) return [];
  return JSON.parse(localStorage.getItem(cartKey)) || [];
}

let cart = loadCart();

function calculateTotal() {
    let subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    let shipping = cart.length ? SHIPPING_RATE : 0;
    let tax = subtotal * TAX_RATE;
    return total = subtotal + shipping + tax - discount;
}

// const container = document.getElementById("products");
document.addEventListener("DOMContentLoaded", () => {
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

  // Cart - reload with current user
  cart = loadCart();

  const templateRow = cartContainer.querySelector(".row");
  cartContainer.innerHTML = "";

  function saveCart() {
    const cartKey = getCartKey();
    if (cartKey) {
      localStorage.setItem(cartKey, JSON.stringify(cart));
    }
  }

  function toggleEmptyState() {
    function renderOrders() {
      // If no user is logged in, show the empty state and stop
    }
    if (cart.length === 0) {
      cartContainer.style.display = "none";
      emptyDiv.style.display = "flex";
    } else {
      cartContainer.style.display = "block";
      emptyDiv.style.setProperty("display", "none", "important");
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
  }

  //   Render The Cart
  function renderCart() {
    cartContainer.innerHTML = "";

    cart.forEach((item, index) => {
      const row = templateRow.cloneNode(true);

      // row.querySelector("#item-img").src=item-img;
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



  clearCartBtn.addEventListener("click", () => {
    const cartKey = getCartKey();
    if (cartKey) {
      localStorage.removeItem(cartKey);
    }
    cart = [];
    discount = 0;
    saveCart();
    renderCart();
  });

  //  Init
  renderCart();
});

let dashboardCart = JSON.parse(localStorage.getItem("dashboard")) || [];
function saveDashboardCart() {
  localStorage.setItem("dashboard", JSON.stringify(dashboardCart));
}

function addToDashboardCart(products) {
  dashboardCart.push(products);
  saveDashboardCart();
  alert(`${products.title} added to dashboard cart`);
}
const orderItems = cart.map(item => ({
  productId: item.id,
  title: item.title,
  price: item.price,
  qty: item.qty
}));
function orderSummery() {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("Please log in first!");
    return;
  }

  let orderId = Number(localStorage.getItem("lastOrderId")) || 0;
  orderId++;
  localStorage.setItem("lastOrderId", orderId);

  const totalPrice = calculateTotal();

  const orderItems = cart.map(item => ({
    productId: item.id,
    title: item.title,
    price: item.price,
    qty: item.qty
  }));

  const order = {
    orderId,
    email: currentUser.email,
    userId: currentUser.id,
    items: orderItems,   // ✅ all products
    totalPrice,
    status: "Pending",
    date: new Date().toLocaleString(),
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  console.log("Order submitted:", order);
  return order;
}


function generateUserIdFromEmail(email) {
  return 'u_' + btoa(email.trim().toLowerCase()).replace(/=/g, '');
}

const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

if (currentUser) {
  if (!currentUser.id) {
    currentUser.id = generateUserIdFromEmail(currentUser.email);
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
  }
}

const submitOrderBtn = document.getElementById("submit-order");

if (submitOrderBtn) {
  submitOrderBtn.onclick = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
     location.reload();
    const order = orderSummery();
    localStorage.removeItem("cart");
    alert(`Order #${order.orderId} submitted!`);
  const cartKey = getCartKey();
    if (cartKey) {
      localStorage.removeItem(cartKey);
    }
    cart = [];
    discount = 0;
    saveCart();
    renderCart();
  
  }
}
