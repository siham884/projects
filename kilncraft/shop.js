document.addEventListener('DOMContentLoaded', function() {
    const minusButtons = document.querySelectorAll('.minus-btn');
    const plusButtons = document.querySelectorAll('.plus-btn');
    const addToBasketButtons = document.querySelectorAll('.add-to-basket-btn');
    const cartPopup = document.getElementById('cart-popup');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalCost = document.querySelector('.cart-total-cost');
    const cartTotalQuantity = document.querySelector('.cart-total-quantity');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    let cart = [];

    // Function to update the displayed quantity
    function updateQuantity(element, delta) {
        const quantityElement = element.nextElementSibling || element.previousElementSibling;
        let quantity = parseInt(quantityElement.innerText);
        quantity = Math.max(1, quantity + delta);
        quantityElement.innerText = quantity;
    }

    // Plus and minus buttons event listeners
    minusButtons.forEach(button => button.addEventListener('click', () => updateQuantity(button, -1)));
    plusButtons.forEach(button => button.addEventListener('click', () => updateQuantity(button, 1)));

    // Add to basket event listener
    addToBasketButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cardContent = button.parentElement;
            const productName = cardContent.querySelector('h3').innerText;
            const productPrice = parseFloat(cardContent.querySelector('p:nth-child(4)').innerText.replace('Price: $', ''));
            const productQuantity = parseInt(cardContent.querySelector('.quantity').innerText);
            const productImage = cardContent.querySelector('img').src;

            addItemToCart(productName, productPrice, productQuantity, productImage);
            showCart();
        });
    });

    function addItemToCart(name, price, quantity, image) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name, price, quantity, image });
        }
        updateCartDisplay();
    }

    function showCart() {
        cartPopup.classList.add('show');
    }

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let totalCost = 0;
        let totalQuantity = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" class="cart-item-image" alt="${item.name}">
                <div>
                    <h4>${item.name}</h4>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <label for="quantity-${item.name}">Quantity:</label>
                    <input type="number" id="quantity-${item.name}" class="cart-item-quantity" value="${item.quantity}" min="1">
                </div>
                <button class="remove-btn">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            totalCost += item.price * item.quantity;
            totalQuantity += item.quantity;
        });

        cartTotalCost.innerText = `Total Cost: $${totalCost.toFixed(2)}`;
        cartTotalQuantity.innerText = `Total Items: ${totalQuantity}`;
        emptyCartMessage.style.display = cart.length === 0 ? 'block' : 'none';

        document.querySelectorAll('.cart-item-quantity').forEach(input => {
            input.addEventListener('change', function() {
                const itemName = input.parentElement.querySelector('h4').innerText;
                const newQuantity = parseInt(input.value);
                updateItemQuantity(itemName, newQuantity);
            });
        });

        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', function() {
                const itemName = button.previousElementSibling.querySelector('h4').innerText;
                removeItemFromCart(itemName);
            });
        });
    }
    

    function updateItemQuantity(name, quantity) {
        const item = cart.find(item => item.name === name);
        if (item) {
            item.quantity = quantity;
            updateCartDisplay();
        }
    }

    function removeItemFromCart(name) {
        cart = cart.filter(item => item.name !== name);
        updateCartDisplay();
        if (cart.length === 0) {
            cartPopup.classList.remove('show');
        }
    }

    document.getElementById('close-cart').addEventListener('click', function() {
        cartPopup.classList.remove('show');
    });
});
