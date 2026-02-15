document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutButton");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser"); 

      window.location.href = "../index.html";
    });
  }
});
const userBtn = document.getElementById("userBtn");
const userMenu = document.getElementById("userMenu");

userBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    userMenu.classList.toggle("show");
});

userMenu.addEventListener("click", function(e){
    e.stopPropagation();
});

document.addEventListener("click", function(){
    userMenu.classList.remove("show");
});
