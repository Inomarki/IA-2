//Mark Palmer||2408091
document.addEventListener("DOMContentLoaded", loadCart);

// Load cart items from localStorage
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.querySelector(".cart-items");
    const totalElement = document.getElementById("cart-total");

    if (cart.length === 0) {
        cartContainer.innerHTML = `<p class="empty">Your cart is empty.</p>`;
        if (totalElement) totalElement.textContent = "0.00";
        return;
    }

    cartContainer.innerHTML = ""; // Clear old items

    cart.forEach((item, index) => {
        let card = document.createElement("div");
        card.classList.add("cart-card");

        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            
            <div class="info">
                <h3>${item.name}</h3>
                <p class="price">$${item.price}</p>

                <div class="quantity">
                    <button onclick="changeQty(${index}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQty(${index}, +1)">+</button>
                </div>

                <button class="remove" onclick="removeItem(${index})">Remove</button>
            </div>
        `;

        cartContainer.appendChild(card);
    });

    updateTotal(); // Update totals after rendering
}

// Update the total price
function updateTotal() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    const totalElement = document.getElementById("cart-total");
    if (totalElement) totalElement.textContent = total.toFixed(2);
}

// Change quantity
function changeQty(index, amount) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity += amount;

    if (cart[index].quantity < 1) cart[index].quantity = 1;

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Remove an item
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Checkout function
function checkout() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Thank you for your purchase!");

    // Clear the cart after checkout
    localStorage.removeItem("cart");

    loadCart(); // refresh UI
}