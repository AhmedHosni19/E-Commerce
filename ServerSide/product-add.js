const imageInput = document.getElementById("formFileLg");
const titleInput = document.getElementById("title");
const subTitleInput = document.getElementById("subTitle");
const categoryInput = document.getElementById("category");
const priceInput = document.getElementById("price");
const descriptionInput = document.getElementById("description");
const submitBtn = document.getElementById("submitBtn");

let productsDataRaw = JSON.parse(localStorage.getItem("products")) || products;

let productsData = Object.values(productsDataRaw).flat();

// Load products from localStorage
function loadProducts() {
  const stored = localStorage.getItem("products");
  return stored ? JSON.parse(stored) : [...productsData];
}

// Save products to localStorage
function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

// Load existing products
productsData = loadProducts();

// Check if we are editing
const params = new URLSearchParams(window.location.search);
const editingId = Number(params.get("id"));
let editingProduct = null;

if (editingId) {
  editingProduct = productsData.find(p => p.id === editingId);

  if (editingProduct) {
    // Populate form
    titleInput.value = editingProduct.title;
    subTitleInput.value = editingProduct.subTitle;
    categoryInput.value = editingProduct.category;
    priceInput.value = editingProduct.price;
    descriptionInput.value = editingProduct.description;

    // Optional: show existing image preview
    const imgPreview = document.createElement("img");
    imgPreview.src = editingProduct.image;
    imgPreview.height = 100;
    imageInput.parentElement.appendChild(imgPreview);

    submitBtn.textContent = "Update Product";
  } else {
    alert("Product not found!");
  }
}

// Handle submit
submitBtn.addEventListener("click", e => {
  e.preventDefault();

  // Basic validation
  if (!editingProduct && !imageInput.files.length) return alert("Please upload a product image!");
  if (!titleInput.value.trim()) return alert("Please enter product title!");
  if (!subTitleInput.value.trim()) return alert("Please enter product subtitle!");
  if (!categoryInput.value.trim()) return alert("Please enter product category!");
  if (!priceInput.value || priceInput.value <= 0) return alert("Please enter a valid price!");
  if (!descriptionInput.value.trim()) return alert("Please enter product description!");

  const processProduct = (imageData) => {
    if (editingProduct) {
      // Update product
      editingProduct.title = titleInput.value.trim();
      editingProduct.subTitle = subTitleInput.value.trim();
      editingProduct.category = categoryInput.value.trim();
      editingProduct.price = parseFloat(priceInput.value);
      editingProduct.description = descriptionInput.value.trim();

      // Only update image if a new one was uploaded
      if (imageData !== null) { 
    editingProduct.image = imageData;
  } else if (!editingProduct.image) {
    alert("No image found for this product!");
    return;
  }


      saveProducts(productsData);
      alert(`${editingProduct.title} updated successfully!`);
    } else {
      // Create new product
      const newProduct = {
        id: Date.now(),
        title: titleInput.value.trim(),
        subTitle: subTitleInput.value.trim(),
        category: categoryInput.value.trim(),
        price: parseFloat(priceInput.value),
        description: descriptionInput.value.trim(),
        image: imageData
      };
      productsData.push(newProduct); 
      saveProducts(productsData);
      alert(`${newProduct.title} added successfully!`);
    }

    window.open("ProductsManagement.html", "_self");
  };

  // If a new image was uploaded, read it
  if (imageInput.files.length) {
    const reader = new FileReader();
    reader.onload = () => processProduct(reader.result);
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    processProduct(null);
  }
});

