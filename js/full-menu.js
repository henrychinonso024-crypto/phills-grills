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





// ================= PRODUCTS =================



const products = [

    {
        id: 1,
        category: "shawarma",
        name: "Chicken Shawarma",
        price: 3500,
        image: "images/chicken-shawarma.png",
        description: "",
        featured: true
    },

    {
        id: 2,
        category: "shawarma",
        name: "Beef Shawarma",
        price: 4000,
        image: "images/beef-shawarma.png",
        description: "",
        featured: true
    },

    {
        id: 3,
        category: "pizza",
        name: "Pepperoni Pizza",
        price: 8500,
        image: "images/pizza.png",
        description: "",
        featured: true

    },

    {
        id: 4,
        category: "pizza",
        name: "Chicken Pizza",
        price: 9000,
        image: "images/pizza.png",
        description: "",
        featured: true
    },

    {
        id: 5,
        category: "bbq",
        name: "BBQ Chicken",
        price: 6000,
        image: "images/bbq.png",
        description: "",
        featured: true
    },

    {
        id: 6,
        category: "burger",
        name: "Classic Burger",
        price: 4500,
        image: "images/burger.png",
        description: "",
        featured: true
    },

    {
        id: 7,
        category: "drinks",
        name: "Coca Cola",
        price: 500,
        image: "images/coke.png",
        description: "",
        featured: true
    },

    {
        id: 8,
        category: "indomie",
        name: "Special Indomie",
        price: 2500,
        image: "images/indomie.png",
        description: "",
        featured: true
    }

];

// ================= QUANTITIES =================

const quantities = {};

products.forEach(product => {

    quantities[product.id] = 1;

});

// ================= DISPLAY PRODUCTS =================

const container =
    document.getElementById("products-container");

function displayProducts(productsToShow) {

    container.innerHTML = "";

    productsToShow.forEach(product => {

        container.innerHTML += `

<div class="product-card">

    <img
class="product-image"
data-id="${product.id}"
src="${product.image}"
alt="${product.name}">

    <h3>${product.name}</h3>

   <p>
  <span class="specc">Price:</span>
  <span class="price-value">
    ₦${Number(product.price).toLocaleString()}
  </span>
</p>

    <p class="product-description">
    ${product.description || ""}
</p>

    <div class="quantity-box">

        <button
        class="qty-minus"
        data-id="${product.id}">

            -

        </button>

        <span
        class="qty-value"
        id="qty-${product.id}">

            ${quantities[product.id]}

        </span>

        <button
        class="qty-plus"
        data-id="${product.id}">

            +

        </button>

    </div>

    <div class="product-actions">

        <button
        class="cart-btn"
        data-id="${product.id}">

            <i class="fa-solid fa-cart-shopping"></i>

            Add To Cart

        </button>

        

    </div>

</div>

`;

    });

}

displayProducts(products);

// ================= FILTERS =================

const filterBtns =
    document.querySelectorAll(".filter-btn");

filterBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        document
            .querySelector(".filter-btn.active")
            ?.classList.remove("active");

        btn.classList.add("active");

        const category =
            btn.dataset.category;

        if (category === "all") {

            displayProducts(products);

        } else {

            const filteredProducts =
                products.filter(product =>

                    product.category === category

                );

            displayProducts(filteredProducts);

        }

    });

});

// ================= SEARCH =================

const searchInput =
    document.getElementById("search-input");

if (searchInput) {

    searchInput.addEventListener(
        "keyup",
        function () {

            const searchValue =
                this.value.toLowerCase();

            const filteredProducts =
                products.filter(product =>

                    product.name
                        .toLowerCase()
                        .includes(searchValue)

                );

            displayProducts(filteredProducts);

        });

}

// ================= CART =================

let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];

function addToCart(id) {

    const selectedProduct =
        products.find(product =>

            product.id === id

        );

    if (!selectedProduct) return;

    const quantity =
        quantities[id];

    const existingItem =
        cart.find(item =>

            item.id === id

        );

    if (existingItem) {

        existingItem.quantity += quantity;

    } else {

        cart.push({

            ...selectedProduct,

            quantity

        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    showToast(
        `${selectedProduct.name} added to cart`
    );

}

// ================= BUTTON EVENTS =================

document.addEventListener(
    "click",
    function (e) {

        const plusBtn =
            e.target.closest(".qty-plus");

        if (plusBtn) {

            const id =
                Number(plusBtn.dataset.id);

            quantities[id]++;

            document.getElementById(
                `qty-${id}`
            ).textContent =
                quantities[id];

        }

        const minusBtn =
            e.target.closest(".qty-minus");

        if (minusBtn) {

            const id =
                Number(minusBtn.dataset.id);

            if (quantities[id] > 1) {

                quantities[id]--;

                document.getElementById(
                    `qty-${id}`
                ).textContent =
                    quantities[id];

            }

        }

        const cartBtn =
            e.target.closest(".cart-btn");

        if (cartBtn) {

            const id =
                Number(cartBtn.dataset.id);

            addToCart(id);

        }

    });

// ================= CART COUNT =================

function updateCartCount() {

    const totalItems =
        cart.reduce(

            (total, item) =>

                total + item.quantity,

            0

        );

    const cartCount =
        document.getElementById(
            "cart-count"
        );

    if (cartCount) {

        cartCount.textContent =
            totalItems;

    }

}

updateCartCount();

// ================= ANNOUNCEMENT BAR =================

const announcements =
    document.querySelectorAll(
        ".announcement-slide"
    );

let announcementIndex = 0;

function showAnnouncement() {

    announcements.forEach(item => {

        item.classList.remove(
            "active"
        );

    });

    if (announcements.length) {

        announcements[
            announcementIndex
        ].classList.add(
            "active"
        );

        announcementIndex++;

        if (
            announcementIndex >=
            announcements.length
        ) {

            announcementIndex = 0;

        }

    }

}

if (announcements.length) {

    showAnnouncement();

    setInterval(
        showAnnouncement,
        4000
    );

}

// =================modal=========================

const modal =
    document.getElementById(
        "product-modal"
    );

const modalImage =
    document.getElementById(
        "modal-image"
    );

const modalName =
    document.getElementById(
        "modal-name"
    );

const modalPrice =
    document.getElementById(
        "modal-price"
    );

const closeModal =
    document.getElementById(
        "close-modal"
    );

document.addEventListener(
    "click",
    function (e) {

        const image =
            e.target.closest(
                ".product-image"
            );
        currentModalProductId =
            product.id;

        if (modalCartBtn) {

            modalCartBtn.addEventListener(
                "click",
                function () {

                    if (currentModalProductId) {

                        addToCart(
                            currentModalProductId
                        );

                        modal.style.display =
                            "none";

                    }

                });

        }

        if (!image) return;

        const id =
            Number(
                image.dataset.id
            );

        const product =
            products.find(
                item =>
                    item.id === id
            );

        modal.style.display =
            "flex";

        modalImage.src =
            product.image;

        modalName.textContent =
            product.name;

        modalPrice.textContent =
            `₦${product.price.toLocaleString()}`;

        modalDescription.textContent =
            product.description ||
            "Freshly prepared with premium ingredients.";

        modalWhatsappBtn.href =
            `https://wa.me/2349033035249?text=${encodeURIComponent(
                `Hello Phills Grills, I want to order ${product.name}`
            )}`;

        const modalDescription =
            document.getElementById(
                "modal-description"
            );

        const modalWhatsappBtn =
            document.getElementById(
                "modal-whatsapp-btn"
            );


    });

closeModal.addEventListener(
    "click",
    function () {

        modal.style.display =
            "none";

    });

window.addEventListener(
    "click",
    function (e) {

        if (
            e.target === modal
        ) {

            modal.style.display =
                "none";

        }

    });

const modalCartBtn =
    document.getElementById(
        "modal-cart-btn"
    );

let currentModalProductId = null;


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