
const foods = [
    { id: 1, name: "Margherita Pizza", category: "Pizza", price: 249, emoji: "🍕", description: "Classic cheese pizza with fresh toppings." },
    { id: 2, name: "Cheese Burger", category: "Burger", price: 159, emoji: "🍔", description: "Juicy burger with cheese and fresh veggies." },
    { id: 3, name: "Chicken Biryani", category: "Biryani", price: 299, emoji: "🍛", description: "Aromatic rice with delicious spices." },
    { id: 4, name: "Chocolate Cake", category: "Dessert", price: 129, emoji: "🍰", description: "Rich and creamy chocolate delight." },
    { id: 5, name: "French Fries", category: "Burger", price: 99, emoji: "🍟", description: "Crispy golden potato fries." },
    { id: 6, name: "Cold Coffee", category: "Drinks", price: 119, emoji: "🥤", description: "Refreshing chilled coffee." },
    { id: 7, name: "Farmhouse Pizza", category: "Pizza", price: 349, emoji: "🍕", description: "Loaded with fresh vegetables." },
    { id: 8, name: "Veg Biryani", category: "Biryani", price: 199, emoji: "🍚", description: "Flavourful vegetarian biryani." },
    { id: 9, name: "Ice Cream", category: "Dessert", price: 89, emoji: "🍨", description: "Creamy and delicious ice cream." }
];

let cart = [];
let currentCategory = "All";

function displayFoods(items) {
    const container = document.getElementById("food-container");
    const noResults = document.getElementById("no-results");

    container.innerHTML = "";

    noResults.hidden = items.length !== 0;

    items.forEach(food => {
        const card = document.createElement("div");
        card.className = "food-card";

        card.innerHTML = `
            <div class="food-image">${food.emoji}</div>
            <div class="food-info">
                <h3>${food.name}</h3>
                <p>${food.description}</p>
                <div class="food-bottom">
                    <span class="price">₹${food.price}</span>
                    <button class="add-btn" onclick="addToCart(${food.id})">
                        + Add
                    </button>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

function filterFood(category, button) {
    currentCategory = category;

    document.querySelectorAll(".category").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");
    searchFood();
}

function searchFood() {
    const search = document.getElementById("search-input").value
        .trim().toLowerCase();

    const filtered = foods.filter(food => {
        const matchesCategory =
            currentCategory === "All" ||
            food.category === currentCategory;

        const matchesSearch =
            food.name.toLowerCase().includes(search) ||
            food.category.toLowerCase().includes(search);

        return matchesCategory && matchesSearch;
    });

    displayFoods(filtered);
}

document.getElementById("search-input").addEventListener("input", searchFood);

function addToCart(id) {
    const food = foods.find(item => item.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...food, quantity: 1 });
    }

    updateCartCount();
    alert(food.name + " added to your cart!");
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cart-count").textContent = count;
}

function showCart() {
    const modal = document.getElementById("cart-modal");
    const cartItems = document.getElementById("cart-items");

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty!</p>";
    }

    cart.forEach(item => {
        const row = document.createElement("div");
        row.className = "cart-row";

        row.innerHTML = `
            <div>
                <strong>${item.emoji} ${item.name}</strong>
                <p>₹${item.price} × ${item.quantity}</p>
            </div>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;

        cartItems.appendChild(row);
    });

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    document.getElementById("cart-total").textContent = "Total: ₹" + total;
    modal.hidden = false;
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartCount();
    showCart();
}

function closeCart() {
    document.getElementById("cart-modal").hidden = true;
}

function checkout() {
    if (cart.length === 0) {
        alert("Please add food items to your cart first!");
        return;
    }

    alert("Great! Your cart is ready. Order placement will be connected to our Spring Boot backend in a later phase.");
}

displayFoods(foods);
