//<!--Mark Palmer||2408091-->
function addToCart(name, price, image) {
    // Load cart or create empty
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product already exists
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        // Increase quantity
        existingItem.quantity += 1;
    } 
    else {
        // Add new product
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    // Save back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart!");
}
