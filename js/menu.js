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







const products = {

    pizza: [
        {
            id: 1,
            name: "Pepperoni Pizza",
            price: 8500,
            image: "images/pizza.png"
        },
        {
            id: 2,
            name: "Chicken Pizza",
            price: 9000,
            image: "images/pizza.png"
        },
        {
            id: 3,
            name: "BBQ Pizza",
            price: 9500,
            image: "images/products/pizza.png"
        }
    ],

    shawarma: [
        {
            id: 4,
            name: "Chicken Shawarma",
            price: 3500,
            image: "images/shawama.png"
        },
        {
            id: 5,
            name: "Beef Shawarma",
            price: 4000,
            image: "images/shawama2.png"
        },
        {
            id: 6,
            name: "Jumbo Shawarma",
            price: 6000,
            image: "images/jumbo.png"
        },
        {
            id: 6,
            name: "Double hot dog Shawarma",
            price: 6000,
            image: "images/doublehotdog.png"
        }
    ],

    bbq: [
        {
            id: 7,
            name: "BBQ Chicken",
            price: 6000,
            image: "images/bbq.png"
        },
        {
            id: 8,
            name: "BBQ Turkey",
            price: 7500,
            image: "images/bbq.png"
        }
    ],

    burger: [
        {
            id: 9,
            name: "Classic Burger",
            price: 4500,
            image: "images/burger.png"
        },
        {
            id: 10,
            name: "Double Burger",
            price: 5500,
            image: "images/burger2.png"
        },
        {
            id: 10,
            name: "Double Burger",
            price: 5500,
            image: "images/home-hero.png"
        },
        {
            id: 10,
            name: "Double Burger",
            price: 5500,
            image: "images/burger3.png"
        }
    ],

    drinks: [
        {
            id: 11,
            name: "Coke",
            price: 600,
            image: "images/coke.png"
        },
        {
            id: 12,
            name: "Exotic",
            price: 2000,
            image: "images/fanta.png"
        },
        {
            id: 12,
            name: "Hollandia",
            price: 3000,
            image: "images/hollandia.png"
        },
        {
            id: 12,
            name: "Water",
            price: 500,
            image: "images/water.png"
        },
        {
            id: 12,
            name: "schweppes",
            price: 1000,
            image: "images/scheppes.png"
        },
        {
            id: 12,
            name: "Malt",
            price: 800,
            image: "images/malt.png"
        },
        {
            id: 12,
            name: "60cl Sprite",
            price: 600,
            image: "images/sprite.png"
        },
        {
            id: 12,
            name: "Chivita Active",
            price: 2000,
            image: "images/drinks.png"
        }
    ]
};

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// URL category
const params = new URLSearchParams(window.location.search);
const category = params.get("category");

// Elements
const title = document.getElementById("menu-title");
const container = document.getElementById("products-container");

// 🔥 SAFETY CHECK (prevents blank page / crash)
if (!category || !products[category]) {

    if (title) title.textContent = "Invalid Category";

    if (container) {
        container.innerHTML = `
            <p style="color:red; font-size:18px;">
                No products found. Please go back and select a category.
            </p>
        `;
    }

} else {

    // Set title
    title.textContent = category.toUpperCase();

    // Render products
    products[category].forEach(product => {

        container.innerHTML += `
            <div class="product-card">

                <img src="${product.image}" alt="${product.name}">

                <h3>${product.name}</h3>

                <p>₦${product.price.toLocaleString()}</p>

                <div class="product-actions">

                    <button class="cart-btn" data-id="${product.id}">
                        <i class="fa-solid fa-cart-shopping"></i>
                        Add To Cart
                    </button>

                </div>

            </div>
        `;
    });
}

// Click event (event delegation)
document.addEventListener("click", function (e) {

    const btn = e.target.closest(".cart-btn");
    if (!btn) return;

    const productId = Number(btn.dataset.id);
    addToCart(productId);
});

// Add to cart
function addToCart(id) {

    let selectedProduct = null;

    Object.values(products).forEach(category => {
        const found = category.find(product => product.id === id);
        if (found) selectedProduct = found;
    });

    if (!selectedProduct) return;

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...selectedProduct,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
     showToast(
        `${selectedProduct.name} added to cart`
    );
}

// Cart count UI
function updateCartCount() {

    const cartCount = document.getElementById("cart-count");
    if (!cartCount) return;

    const count = cart.reduce((total, item) => total + item.quantity, 0);

    cartCount.textContent = count;
}

// Init
updateCartCount();


// ================toast====================
function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 5000);

}