let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

cartIcon.onclick = () => {
    cart.classList.add('active');
};

closeCart.onclick = () => {
    cart.classList.remove('active');
};

// add cart
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function toggleCart(open) {
    cart.classList.toggle('active', open);
    document.body.style.overflowY = open ? 'hidden' : 'scroll';
}

function ready() {
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }

    loadCartItems();
    updateTotal();
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
    saveCartItem();
    updateTotal();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    saveCartItem();
    updateCartIcon();
    updateTotal();
}

function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.querySelector('.product-title').innerText;
    var price = shopProducts.querySelector('.price').innerText;
    var product = shopProducts.querySelector('.product-img').src;
    addProductToCart(title, price, product);
    updateTotal();
    saveCartItem();
    updateCartIcon();
    updateTotal();
}

function addProductToCart(title, price, product) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.querySelector('.cart-content');
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert('Você já possui este produto no carrinho.');
            return;
        }
    }

    var cartBoxContent = `
        <img src="${product}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" name="" value="1" class="cart-quantity" />
        </div>
        <i class='bx bx-trash-alt cart-remove'></i>

    `
    updateTotal();    
    ;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.appendChild(cartShopBox);

    cartShopBox.querySelector('.cart-remove').addEventListener('click', removeCartItem);
    cartShopBox.querySelector('.cart-quantity').addEventListener('change', quantityChanged);
    saveCartItem();
    updateCartIcon();
    updateTotal();
}

function updateTotal() {
    var cartContent = document.querySelector('.cart-content');
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.querySelector('.cart-price');
        var quantityElement = cartBox.querySelector('.cart-quantity');
        var price = parseFloat(priceElement.innerText.replace('R$', ''));
        var quantity = quantityElement.value;
        total = total + price * quantity;
    }
    total = Math.round(total * 100) / 100;
    document.querySelector('.total-price').innerText = 'R$' + total;
    localStorage.setItem('cartTotal', total);
}

function saveCartItem() {
    var cartContent = document.querySelector('.cart-content');
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var cartItems = [];
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var titleElement = cartBox.querySelector('.cart-product-title');
        var priceElement = cartBox.querySelector('.cart-price');
        var quantityElement = cartBox.querySelector('.cart-quantity');
        var product = cartBox.querySelector('.cart-img').src;
        var item = {
            title: titleElement.innerText,
            price: priceElement.innerText,
            quantity: quantityElement.value,
            product: product,
        };
        cartItems.push(item);
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateTotal();
}

function loadCartItems() {
    var cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
        cartItems = JSON.parse(cartItems);
        for (var i = 0; i < cartItems.length; i++) {
            var item = cartItems[i];
            addProductToCart(item.title, item.price, item.product);
            var cartBoxes = document.getElementsByClassName('cart-box');
            var cartBox = cartBoxes[cartBoxes.length - 1];
            var quantityElement = cartBox.querySelector('.cart-quantity');
            quantityElement.value = item.quantity;
        }
    }
    var cartTotal = localStorage.getItem('cartTotal');
    if (cartTotal) {
        document.querySelector('.total-price').innerText = '$' + cartTotal;
    }
    updateCartIcon();
    updateTotal();
}

function updateCartIcon() {
    var cartBoxes = document.getElementsByClassName('cart-box');
    var quantity = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var quantityElement = cartBox.querySelector('.cart-quantity');
        quantity += parseInt(quantityElement.value);
    }
    var cartIcon = document.querySelector('#cart-icon');
    cartIcon.setAttribute('data-quantity', quantity);
    updateTotal();
}
