document.addEventListener('DOMContentLoaded', function() {
    const minusButtons = document.querySelectorAll('.minus-btn');
      const plusButtons = document.querySelectorAll('.plus-btn');
  
      minusButtons.forEach(button => {
        button.addEventListener('click', function() {
          const quantityElement = button.nextElementSibling;
          let quantity = parseInt(quantityElement.innerText);
          if (quantity > 1) {
            quantity--;
            quantityElement.innerText = quantity;
          }
        });
      });
  
      plusButtons.forEach(button => {
        button.addEventListener('click', function() {
          const quantityElement = button.previousElementSibling;
          let quantity = parseInt(quantityElement.innerText);
          quantity++;
          quantityElement.innerText = quantity;
        });
      });
  
  
  
  
  
      const addToBasketButtons = document.querySelectorAll('.add-to-basket-btn');
              const cartPopup = document.getElementById('cart-popup');
              const closeCartButton = document.getElementById('close-cart');
              const cartItemsContainer = document.getElementById('cart-items');
              const checkoutButton = document.getElementById('checkout-btn');
       
  
  
        let cartItems = []; // Array to store selected products
  
       // Add event listener to add-to-basket buttons
addToBasketButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        try {
            // Check if the button is inside a .card element
            const card = this.closest('.card');
            if (card) {
                const imageSrc = card.querySelector('.product').src;
                const title = card.querySelector('h3').innerText;
                const description = card.querySelector('p').innerText;
                const price = card.querySelector('p:nth-of-type(2)').innerText;
                const quantity = parseInt(card.querySelector('.quantity').innerText, 10);

                const existingItemIndex = cartItems.findIndex(item => item.title === title);
                if (existingItemIndex !== -1) {
                    // Item already exists, update its quantity
                    cartItems[existingItemIndex].quantity += quantity;
                    updateCart(); // Remember to update the cart after modifying the quantity
                } else {
                    // Item doesn't exist, add it to the cart
                    const item = {
                        imageSrc,
                        title,
                        description,
                        price,
                        quantity
                    };
                    cartItems.push(item);
                    updateCart();
                    showCartPopup();
                }
            } else {
                // Check if the button is inside a .card-content element
                const cardContent = this.closest('.card-content');
                if (cardContent) {
                    const imageSrc = cardContent.querySelector('.products').src;
                    const title = cardContent.querySelector('h3').innerText;
                    const description = cardContent.querySelector('p').innerText;
                    const price = cardContent.querySelector('p:nth-of-type(2)').innerText;
                    const quantity = parseInt(cardContent.querySelector('.quantity').innerText, 10);
                    
                    const existingItemIndex = cartItems.findIndex(item => item.title === title);
                    if (existingItemIndex !== -1) {
                        // Item already exists, update its quantity
                        cartItems[existingItemIndex].quantity += quantity;
                        updateCart(); // Remember to update the cart after modifying the quantity
                    } else {
                        // Item doesn't exist, add it to the cart
                        const item = {
                            imageSrc,
                            title,
                            description,
                            price,
                            quantity
                        };
                        cartItems.push(item);
                        updateCart();
                        showCartPopup();
                    }
                } else {
                    console.error('Unable to find card or card content.');
                }
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
        event.stopPropagation(); // Prevent propagation to parent event listener
    });
});

  
  
              closeCartButton.addEventListener('click', function() {
                  hideCartPopup();
              });
  
              checkoutButton.addEventListener('click', function() {
                  alert('Proceeding to checkout...');
              });
  
  
  
              function updateCart() {
  
                let totalQuantity = 0;
          let totalCost = 0;
                  cartItemsContainer.innerHTML = '';
                  cartItems.forEach(item => {
                      const cartItem = document.createElement('div');
                      cartItem.className = 'cart-item';
                      cartItem.innerHTML = `
                          <div class="cart-item-content">
                              <img src="${item.imageSrc}" class="cart-item-image">
                              <span>${item.title}</span>
                              <span>${item.description}</span>
                              <span>${item.price}</span>
                              <!-- Replace span with input field for quantity -->
                      <input type="number" class="quantity" value="${item.quantity}">
                      <button class="remove-btn">Remove</button>
                      
                          </div>
                      `;
                      cartItemsContainer.appendChild(cartItem);
                      
  
  // Update total quantity and total cost
  totalQuantity += item.quantity;
  totalCost += item.quantity * parseFloat(item.price.replace('$', ''));
                  });
                  document.querySelector('.cart-total-quantity').innerText = `Total Quantity: ${totalQuantity}`;
          document.querySelector('.cart-total-cost').innerText = `Total Cost: $${totalCost.toFixed(0)}`;
                  updateTotalCost();
  
                  const quantityInputs = document.querySelectorAll('.quantity');
          quantityInputs.forEach(input => {
              input.addEventListener('input', handleQuantityChange);
          });
              }
  
              function showCartPopup() {
                  cartPopup.classList.add('show');
              }
  
              function hideCartPopup() {
  
  
  
  
                  cartPopup.classList.remove('show');
              }
  
     
  
    
  
  
      // Function to handle quantity change
    // Function to handle quantity change
    function handleQuantityChange(event) {
          const inputField = event.target;
          const newValue = parseInt(inputField.value);
          const cartItem = inputField.closest('.cart-item');
          const index = Array.from(cartItem.parentNode.children).indexOf(cartItem);
  
          if (!isNaN(newValue) && newValue >= 1) {
              // Update quantity of the item
              cartItems[index].quantity = newValue;
          } else {
              // Reset the input field to its previous value
              inputField.value = cartItems[index].quantity;
          }
  
          // Call updateCart() to refresh the cart display
          updateCart();
      }
  
  
      // Function to update the entire cart
      function updateCart() {
          let totalQuantity = 0;
          let totalCost = 0;
  
          cartItemsContainer.innerHTML = '';
          cartItems.forEach(item => {
              const cartItem = document.createElement('div');
              cartItem.className = 'cart-item';
              cartItem.innerHTML = `
                  <div class="cart-item-content">
                      <img src="${item.imageSrc}" class="cart-item-image">
                      <span>${item.title}</span>
                      <span>${item.description}</span>
                      <span>${item.price}</span>
                      <!-- Replace span with input field for quantity -->
                      <input type="number" class="quantity" value="${item.quantity}">
                      <button class="remove-btn">Remove</button>
                  </div>
              `;
              cartItemsContainer.appendChild(cartItem);
  
  
  // Update total quantity and total cost
  totalQuantity += item.quantity;
  const priceString = item.price;
  const numericValue = parseFloat(priceString.split(":")[1].trim());
  totalCost += item.quantity * numericValue;
  
 });
  
  
  
  
          
  
 // Update total quantity and total cost in the DOM
          document.querySelector('.cart-total-quantity').innerText = `Total Quantity: ${totalQuantity}`;
          document.querySelector('.cart-total-cost').innerText = `Total Cost: $${totalCost.toFixed(0)}`;
          if (cartItems.length === 0) {
              console.log('No items in the cart');
              const emptyMessage = document.createElement('p');
              emptyMessage.innerText = 'No items in the cart';
              emptyMessage.classList.add('empty-cart-message'); // Apply the style
              cartItemsContainer.innerHTML = ''; // Clear existing items
              cartItemsContainer.appendChild(emptyMessage);
          } else {
              // Remove the empty cart message if cart is not empty
              const emptyMessage = cartItemsContainer.querySelector('.empty-cart-message');
              if (emptyMessage) {
                  emptyMessage.remove();
              }
          }
  
          // Add event listeners to input fields for quantity change
          const quantityInputs = document.querySelectorAll('.quantity');
          quantityInputs.forEach(input => {
              input.addEventListener('input', handleQuantityChange);
          });
          
          
      }
      updateCart();
  
  
  
  
      
  
      // Remove button functionality in the cart
      document.addEventListener('click', function(event) {
          if (event.target && event.target.classList.contains('remove-btn')) {
              const cartItem = event.target.closest('.cart-item, .text');
              const index = Array.from(cartItem.parentNode.children).indexOf(cartItem);
              cartItems.splice(index, 1); // Remove item from the cartItems array
              updateCart(); // Update the cart display
          }
      });
    });
  
  
  
    
  
  
  document.getElementById('close-cart').addEventListener('click', function() {
    document.getElementById('cart-popup').classList.remove('show');
  });
  
  