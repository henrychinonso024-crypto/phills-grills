


// ================= HAMBURGER MENU =================



const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        mobileMenu.classList.toggle("active");
    });

    const mobileLinks = document.querySelectorAll(".mobile-menu a");

    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            mobileMenu.classList.remove("active");
        });
    });
}




// ================= GET CART =================

let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

const cartItems =
document.getElementById("cart-items");

const totalPrice =
document.getElementById("total-price");


// ================= RENDER CART =================

function renderCart() {

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `

        <div class="empty-cart">

            <h3>Your cart is empty</h3>

            <a href="index.html"
            class="continue-shopping">

                Continue Shopping

            </a>

        </div>

        `;

        totalPrice.textContent = "₦0";

        return;
    }

    cart.forEach(item => {

        const price =
        Number(
            String(item.price)
            .replace("₦", "")
            .replace(/,/g, "")
        );

        const itemTotal =
        price * item.quantity;

        total += itemTotal;

        cartItems.innerHTML += `

        <div class="cart-card">

            <img
            src="${item.image}"
            alt="${item.name}">

            <div class="cart-info">

                <h3>${item.name}</h3>

                <p>
                    ₦${price.toLocaleString()}
                </p>

                <div class="quantity-controls">

                    <button
                    onclick="decreaseQuantity(${item.id})">

                        -

                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                    onclick="increaseQuantity(${item.id})">

                        +

                    </button>

                </div>

                <p class="subtotal">

                    Subtotal:
                    ₦${itemTotal.toLocaleString()}

                </p>

                <button
                class="remove-btn"
                onclick="removeItem(${item.id})">

                    Remove

                </button>

            </div>

        </div>

        `;

    });

    totalPrice.textContent =
    `₦${total.toLocaleString()}`;
}


// ================= INCREASE =================

function increaseQuantity(id) {

    const item =
    cart.find(
        item => item.id === id
    );

    if (item) {

        item.quantity++;

        saveCart();

    }

}


// ================= DECREASE =================

function decreaseQuantity(id) {

    const item =
    cart.find(
        item => item.id === id
    );

    if (item) {

        if (item.quantity > 1) {

            item.quantity--;

        } else {

            cart =
            cart.filter(
                product =>
                product.id !== id
            );

        }

        saveCart();

    }

}


// ================= REMOVE =================

function removeItem(id) {

    cart =
    cart.filter(
        item =>
        item.id !== id
    );

    saveCart();

}


// ================= SAVE =================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    renderCart();

}


// ================= START =================

renderCart();