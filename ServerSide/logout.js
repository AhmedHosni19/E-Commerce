document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutButton");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser"); 

      window.location.href = "../index.html";
    });
  }
});