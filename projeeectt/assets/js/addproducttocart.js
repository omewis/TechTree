// Retrieve products and cart from local storage
var products = JSON.parse(localStorage.getItem('myProducts')) || [];
let cart = JSON.parse(localStorage.getItem('CART')) || [];

// DOM elements
var btnAdd = document.querySelector('.js--btnaddproduct');
var nameProduct = document.querySelector('.js-nameproduct');
var productID = parseInt(nameProduct.id);
var containerCartItem = document.querySelector('.js--container__cartitem');
var noCartItem = document.querySelector('.js--noproduct');
var payment = document.querySelector('.js--summoney');
var notiCart = document.querySelector('.js--cartnotification');
var intoMoney = document.querySelector('.js__intomoney');

console.log('Products:', products);
console.log('Cart:', cart);
console.log('Product ID:', productID);

updateCart();

// Event listener for the "Add to Cart" button
if (btnAdd) {
    btnAdd.addEventListener('click', function() {
        console.log('Add to Cart button clicked');
        addToCart(productID);
        showModalCart();  
    });
}

// Function to add a product to the cart
function addToCart(id) {
    let quantityProduct = document.querySelector('.js--enterquantity');
    let intQttProduct = parseInt(quantityProduct.value);

    console.log('Adding to cart:', id, 'Quantity:', intQttProduct);

    // Check if the product is already in the cart
    if (cart.some(item => item.id === id)) {
        cart.forEach(item => {
            if (item.id === id) {
                item.quantity += intQttProduct;
            }
        });
    } else {
        var item = products.find(product => product.id === id);
        if (item) {
            cart.push({
                ...item,
                quantity: intQttProduct
            });
        }
    }

    console.log('Cart after adding:', cart);
    updateCart();
}

// Function to update the cart
function updateCart() {
    console.log('Updating cart...');
    renderCartItem();
    localStorage.setItem('CART', JSON.stringify(cart));
    notiCart.innerText = cart.length;
    if (cart.length === 0) {
        noCartItem.classList.remove('hidden');
        payment.classList.remove('show');
    }
    totalMoneyToCart();
    changeNumberOfUnits();
}

// Function to calculate total money in the cart
function totalMoneyToCart() {
    let sum = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    intoMoney.innerText = sum;
    console.log('Total money in cart:', sum);
}

// Function to render cart items
function renderCartItem() {
    containerCartItem.innerHTML = "";
    noCartItem.classList.add('hidden');

    cart.forEach((item, index) => {
        containerCartItem.innerHTML += `
            <div class="modal__cartshopping--content">
                <div class="imgproduct">
                    <img src="${item.image}" alt="" class="imgproduct--img"> <!-- Adjust property name if needed -->
                </div>
                <div class="infoproduct">
                    <div class="infoproduct_boxweight">
                        <span class="infoproduct--name">${item.name}</span>
                        <span class="infoproduct--separate">-</span>
                    </div>
                    <div class="infoproduct__button">
                        <label for="">Quantity: </label>
                        <button class="infoproduct__button--decrease" data-id="${item.id}">-</button>
                        <input class="quantity js__quantity" value="${item.quantity}">
                        <button class="infoproduct__button--increase" data-id="${item.id}">+</button>
                    </div>
                    <div class="infoproduct__priceproduct">
                        <p class="priceproduct--labelprice">Price: </p>
                        <span class="priceproduct--price">${item.price}.000đ</span>
                    </div>
                    <button class="infoproduct__btnromove btn__removeItemCart" data-id="${index}">Remove Item</button>
                </div>
            </div>
        `;
    });

    payment.classList.add('show');

    console.log('Cart items rendered:', cart);

    // Remove items from cart
    document.querySelectorAll('.btn__removeItemCart').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            console.log('Removing item at index:', index);
            cart.splice(index, 1);
            updateCart();
        });
    });
}

// Function to change the number of units in the cart
function changeNumberOfUnits() {
    document.querySelectorAll('.infoproduct__button--decrease').forEach(btn => {
        var id = parseInt(btn.getAttribute('data-id'));
        btn.addEventListener('click', () => {
            console.log('Decreasing quantity for item ID:', id);
            var item = cart.find(item => item.id === id);
            if (item && item.quantity > 1) {
                item.quantity--;
                updateCart();
            }
        });
    });

    document.querySelectorAll('.infoproduct__button--increase').forEach(btn => {
        var id = parseInt(btn.getAttribute('data-id'));
        btn.addEventListener('click', () => {
            console.log('Increasing quantity for item ID:', id);
            var item = cart.find(item => item.id === id);
            if (item) {
                item.quantity++;
                updateCart();
            }
        });
    });
}
