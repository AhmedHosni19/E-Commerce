document.addEventListener("DOMContentLoaded", () => {
  const wishlistContainer = document.getElementById("full-div");
  const emptyDiv = document.getElementById("empty-div");
  const clearWishlistBtn = document.getElementById("clearCart");
function loadProducts() {
  const stored = localStorage.getItem("products");
  return stored ? JSON.parse(stored) : [...defaultProducts];
}

function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

  // ===============================
  // Wishlist Storage
  // ===============================
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const templateRow = wishlistContainer.querySelector(".row");
  wishlistContainer.innerHTML = "";

  function saveWishlist() {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }

  function toggleEmptyState() {
    if (wishlist.length === 0) {
      wishlistContainer.style.display = "none";
      emptyDiv.style.display = "flex";
    } else {
      wishlistContainer.style.display = "block";
      emptyDiv.style.setProperty("display", "none", "important");
    }
  }

  // ===============================
  // Render Wishlist
  // ===============================
  function renderWishlist() {
    wishlistContainer.innerHTML = "";

    wishlist.forEach((item, index) => {
      const row = templateRow.cloneNode(true);

      row.querySelector("#item-img img").src = item.image;
      row.querySelector("#item-img img").alt = item.title;
      row.querySelector("#item-title").textContent = item.title;
      row.querySelector("#item-subTitle").textContent = item.subTitle;
      row.querySelector("#item-price").textContent = `$${item.price.toFixed(2)}`;

      // Remove item
      row.querySelector("#deleteProduct").onclick = () => {
        wishlist.splice(index, 1);
        saveWishlist();
        renderWishlist();
      };

      wishlistContainer.appendChild(row);
    });

    toggleEmptyState();
  }

  // ===============================
  // Add to Wishlist (call from product page)
  // ===============================
  window.addToWishlist = function (product) {
    const exists = wishlist.some(item => item.id === product.id);

    if (!exists) {
      wishlist.push(product);
      saveWishlist();
      renderWishlist();
    }
  };



  // ===============================
  // Init
  // ===============================
  renderWishlist();
});
