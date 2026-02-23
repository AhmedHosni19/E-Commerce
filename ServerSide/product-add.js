const imageInput = document.getElementById("formFileLg");
const titleInput = document.getElementById("title");
const subTitleInput = document.getElementById("subTitle");
const categoryInput = document.getElementById("category-select");
const priceInput = document.getElementById("price");
const descriptionInput = document.getElementById("description");
const stockInput = document.getElementById("stock");
const submitBtn = document.getElementById("submitBtn");
const pageTitle = document.getElementById("Ptitle");

pageTitle.textContent = "Add New Product";

/* =========================
   LOAD PRODUCTS (FLAT)
========================= */
let productsData = JSON.parse(localStorage.getItem("products")) || products;

/* =========================
   SAVE PRODUCTS
========================= */
function saveProducts(data) {
  localStorage.setItem("products", JSON.stringify(data));
}

/* =========================
   LOAD CATEGORIES
========================= */
const categories = JSON.parse(localStorage.getItem("categories_db")) || [];
categories.forEach(catName => {
  const option = document.createElement("option");
  option.value = catName;
  option.textContent = catName;
  categoryInput.appendChild(option);
});

/* =========================
   EDIT MODE
========================= */
const params = new URLSearchParams(window.location.search);
const editingId = Number(params.get("id"));
let editingProduct = null;

if (editingId) {
  editingProduct = productsData.find(p => p.id === editingId);

  if (!editingProduct) {
    alert("Product not found!");
  } else {
    pageTitle.textContent = "Edit The Product";
    submitBtn.textContent = "Update Product";

    titleInput.value = editingProduct.title;
    subTitleInput.value = editingProduct.subTitle;
    categoryInput.value = editingProduct.category;
    priceInput.value = editingProduct.price;
    descriptionInput.value = editingProduct.description;
    stockInput.value = editingProduct.stock ?? 0;

    // Image preview
    const imgPreview = document.createElement("img");
    imgPreview.src = editingProduct.image;
    imgPreview.height = 100;
    imageInput.parentElement.appendChild(imgPreview);
  }
}

/* =========================
   SUBMIT
========================= */
submitBtn.addEventListener("click", e => {
  e.preventDefault();

  const currentAdmin = JSON.parse(sessionStorage.getItem("currentAdmin"));
  if (!currentAdmin) {
    alert("Please log in first!");
    return;
  }

  if (!editingProduct && !imageInput.files.length)
    return alert("Please upload a product image!");
  if (!titleInput.value.trim())
    return alert("Please enter product title!");
  if (!subTitleInput.value.trim())
    return alert("Please enter product subtitle!");
  if (!categoryInput.value.trim())
    return alert("Please select product category!");
  if (!priceInput.value || priceInput.value <= 0)
    return alert("Please enter a valid price!");
  if (!descriptionInput.value.trim())
    return alert("Please enter product description!");
  if (stockInput.value === "" || stockInput.value < 0)
    return alert("Please enter valid stock!");

  const processProduct = imageData => {
    if (editingProduct) {
      // UPDATE
      editingProduct.title = titleInput.value.trim();
      editingProduct.subTitle = subTitleInput.value.trim();
      editingProduct.category = categoryInput.value;
      editingProduct.price = parseFloat(priceInput.value);
      editingProduct.description = descriptionInput.value.trim();
      editingProduct.stock = Number(stockInput.value);

      if (imageData !== null) {
        editingProduct.image = imageData;
      }

      alert(`${editingProduct.title} updated successfully!`);
    } else {
      // ADD
      const newProduct = {
        id: Date.now(),
        title: titleInput.value.trim(),
        subTitle: subTitleInput.value.trim(),
        category: categoryInput.value.trim(),
        price: parseFloat(priceInput.value),
        description: descriptionInput.value.trim(),
        image: imageData,
        stock: Number(stockInput.value)
      };

      productsData.push(newProduct);
      alert(`${newProduct.title} added successfully!`);
    }

    saveProducts(productsData);
    window.open("ProductsManagement.html", "_self");
  };

  if (imageInput.files.length) {
    const reader = new FileReader();
    reader.onload = () => processProduct(reader.result);
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    processProduct(null);
  }
});