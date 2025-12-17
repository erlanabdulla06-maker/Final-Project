/* ================= PRODUCTS ================= */

const products = [
  { id: 1, name: "MacBook Pro", category: "Laptop", price: 1200 },
  { id: 2, name: "Asus ZenBook", category: "Laptop", price: 900 },
  { id: 3, name: "iPhone 14", category: "Phone", price: 800 },
  { id: 4, name: "Samsung Galaxy S23", category: "Phone", price: 700 }
];

const productsDiv = document.getElementById("products");
if (productsDiv) renderProducts(products);

/* Search */
document.getElementById("search")?.addEventListener("input", filterProducts);
document.getElementById("category")?.addEventListener("change", filterProducts);

function filterProducts() {
  const search = document.getElementById("search").value.toLowerCase();
  const category = document.getElementById("category").value;

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search) &&
    (category === "" || p.category === category)
  );

  renderProducts(filtered);
}

function renderProducts(list) {
  productsDiv.innerHTML = "";
  list.forEach(p => {
    productsDiv.innerHTML += `
      <div class="card">
        <h4>${p.name}</h4>
        <p>${p.category}</p>
        <p>${p.price}$</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

/* ================= CART ================= */

function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(products.find(p => p.id === id));
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

const cartDiv = document.getElementById("cart");
if (cartDiv) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) cartDiv.innerHTML = "Cart is empty";
  cart.forEach(p => {
    cartDiv.innerHTML += `<p>${p.name} — ${p.price}$</p>`;
  });
}

function buy() {
  if (!localStorage.getItem("logged")) {
    alert("Please login first");
    location.href = "auth.html";
    return;
  }
  localStorage.removeItem("cart");
  alert("Order successfully placed!");
  location.reload();
}

/* ================= AUTH ================= */

let isLogin = true;

function toggleAuth() {
  isLogin = !isLogin;
  document.getElementById("title").innerText = isLogin ? "Login" : "Sign Up";
  document.querySelector("button").innerText = isLogin ? "Login" : "Sign Up";
  document.getElementById("switch").innerHTML = isLogin
    ? `Don’t have an account? <span onclick="toggleAuth()">Sign up</span>`
    : `Already have an account? <span onclick="toggleAuth()">Login</span>`;
}

function submitAuth() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  if (!email || !pass) {
    alert("Fill all fields");
    return;
  }

  if (isLogin) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email === email && user.pass === pass) {
      localStorage.setItem("logged", true);
      location.href = "profile.html";
    } else {
      alert("Wrong email or password");
    }
  } else {
    localStorage.setItem("user", JSON.stringify({ email, pass }));
    alert("Account created");
    toggleAuth();
  }
}

function logout() {
  localStorage.removeItem("logged");
  location.href = "auth.html";
}

/* ================= PROFILE ================= */

const userEmail = document.getElementById("userEmail");
if (userEmail) {
  const user = JSON.parse(localStorage.getItem("user"));
  userEmail.innerText = "Email: " + (user?.email || "");
}
