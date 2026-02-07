const SHIPPING_RATE = 10;
  const TAX_RATE = 0.08;
  let discount = 0;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

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


// Cart

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const templateRow = cartContainer.querySelector(".row");
  cartContainer.innerHTML = "";

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function toggleEmptyState() {
    if (cart.length === 0) {
      cartContainer.style.display = "none";
      emptyDiv.style.display = "flex";
    } else {
      cartContainer.style.display = "block";
      emptyDiv.style.setProperty("display" ,"none", "important");
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



 

 //Discount

  discountForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const code = discountInput.value.trim().toUpperCase();

    if (code === "SAVE10") discount = 10;
    else if (code === "SAVE20") discount = 20;
    else discount = 0;

    calculateTotals();
  });

  clearCartBtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
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
 dashboardCart.push(products );
  saveDashboardCart();
  alert(`${products.title} added to dashboard cart 🛒`);
}
  


function orderSummery() {
    // Generate order ID
    let orderId = Math.floor(Math.random() * 1000000);

    // Make sure currentUser exists
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        alert("Please log in first!");
        return;
    }

    // Get total price
    const totalPrice = calculateTotal(); // make sure this function returns a number

    let userId = currentUser.id;

    console.log(`Order placed by user ID: ${userId}`);

    const order = { orderId, userId, totalPrice };

    // --- Save to localStorage ---
    // Get existing orders first
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    // Add this order
    orders.push(order);

    // Save back to localStorage
    localStorage.setItem("orders", JSON.stringify(orders));

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

if(submitOrderBtn) {
    submitOrderBtn.onclick = () => {
      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }
      location.reload();
        const order = orderSummery();      // save order
        localStorage.removeItem("cart"); 
                alert(`Order #${order.orderId} submitted!`);

    cart = [];
    saveCart();
    renderCart();
        
    }
     
}
