document.addEventListener("DOMContentLoaded", () => {

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  if (!currentUser) {
    alert("Please login first!");
    window.location.href = "index.html";
    return;
  }

  const userEmail = currentUser.email.toLowerCase();
  const wishlistKey = "wishlist_" + userEmail; // 🔥 unique per user

  const wishlistContainer = document.getElementById("full-div");
  const emptyDiv = document.getElementById("empty-div");
  const clearWishlistBtn = document.getElementById("clearCart");

  let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];

  const templateRow = wishlistContainer.querySelector(".row");
  wishlistContainer.innerHTML = "";

  function saveWishlist() {
    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
  }

  function toggleEmptyState() {
    if (wishlist.length === 0) {
      wishlistContainer.style.display = "none";
      emptyDiv.style.display = "flex";
    } else {
      wishlistContainer.style.display = "block";
      emptyDiv.style.display = "none";
    }
  }

  function renderWishlist() {

    wishlistContainer.innerHTML = "";

    wishlist.forEach((item, index) => {

      const row = templateRow.cloneNode(true);

      row.querySelector("#item-img img").src = item.image;
      row.querySelector("#item-img img").alt = item.title;
      const titleEl = row.querySelector("#item-title");
      titleEl.innerHTML = `
  <a href="product.html?id=${item.id}" style="text-decoration:none; color:inherit;">
    ${item.title}
  </a>
`;
      row.querySelector("#item-subTitle").textContent = item.subTitle;
      row.querySelector("#item-price").textContent =
        `$${item.price.toFixed(2)}`;

      row.querySelector("#deleteProduct").onclick = () => {
        wishlist.splice(index, 1);
        saveWishlist();
        renderWishlist();
      };

      wishlistContainer.appendChild(row);
    });

    toggleEmptyState();
  }

  // 🔥 Add To Wishlist (GLOBAL FUNCTION)
  window.addToWishlist = function (product) {

    const exists = wishlist.some(item => item.id === product.id);

    if (!exists) {
      wishlist.push(product);
      saveWishlist();
      alert("Added to wishlist!");
    } else {
      alert("Already in wishlist");
    }
  };

  clearWishlistBtn?.addEventListener("click", () => {
    localStorage.removeItem(wishlistKey);
    wishlist = [];
    renderWishlist();
  });

  renderWishlist();
});
