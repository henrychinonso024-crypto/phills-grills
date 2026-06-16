(async () => {

    const {
        data: { session }
    } =
    await window.supabaseClient
    .auth.getSession();

    if (!session) {

        window.location.href =
        "admin-login.html";

    }

})();



const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                "adminLoggedIn"
            );

            window.location.href =
                "admin-login.html";

        }
    );

}




let editIndex = null;

const form =
    document.getElementById(
        "product-form"
    );

const productsList =
    document.getElementById(
        "products-list"
    );

let products = [];

function saveProducts() {

    localStorage.setItem(

        "adminProducts",

        JSON.stringify(products)

    );

}

function renderProducts() {

    productsList.innerHTML = "";

    products.forEach((product, index) => {

        productsList.innerHTML += `

        <div class="product-item">

             <img
    src="${product.image}"
    alt="${product.name}"
    class="admin-product-image">

    <h3>
        ${product.name}
    </h3>

            <p>
                ₦${Number(product.price)
                .toLocaleString()}
            </p>

            <p>
                ${product.category}
            </p>

            <p>
                ${product.description}
            </p>

            <button
onclick="editProduct(${index})"
class="edit-btn">

Edit

</button>

            <button
            onclick="deleteProduct(${index})"
            class="delete-btn">

                Delete

            </button>

        </div>

        `;

    });

}

form.addEventListener(
    "submit",
    function (e) {

        e.preventDefault();

        const name =
            document.getElementById(
                "productName"
            ).value;

        const price =
            document.getElementById(
                "productPrice"
            ).value;

        const category =
            document.getElementById(
                "productCategory"
            ).value;

        const description =
            document.getElementById(
                "productDescription"
            ).value;

        const image =
            document.getElementById(
                "productImage"
            ).value;

        if (editIndex !== null) {

            products[editIndex] = {

                name,
                price,
                category,
                description,
                image

            };

            editIndex = null;

        } else {

            products.push({

                name,
                price,
                category,
                description,
                image

            });

        }



        form.reset();

    });

function deleteProduct(index) {

    products.splice(index, 1);

    saveProducts();

    renderProducts();

}

async function loadProducts() {

    const { data, error } =
        await window.supabaseClient
            .from("products")
            .select("*")
            .order("id", {
                ascending: false
            });

    if (error) {

        console.error(
            "Products Error:",
            error
        );

        return;

    }

    products = data;

    renderProducts();

}

function editProduct(index) {

    const product =
        products[index];

    document.getElementById(
        "productName"
    ).value =
        product.name;

    document.getElementById(
        "productPrice"
    ).value =
        product.price;

    document.getElementById(
        "productCategory"
    ).value =
        product.category;

    document.getElementById(
        "productDescription"
    ).value =
        product.description;

    document.getElementById(
        "productImage"
    ).value =
        product.image;

    editIndex = index;

}


const promoTitle =
    document.getElementById(
        "promoTitle"
    );

const promoText =
    document.getElementById(
        "promoText"
    );

const savePromo =
    document.getElementById(
        "savePromo"
    );

if (savePromo) {

    savePromo.addEventListener(
        "click",
        function () {

            localStorage.setItem(

                "promoTitle",

                promoTitle.value

            );

            localStorage.setItem(

                "promoText",

                promoText.value

            );

            alert(
                "Promotion Saved"
            );

        });

}

const saveAnnouncements =
    document.getElementById(
        "saveAnnouncements"
    );

if (saveAnnouncements) {

    saveAnnouncements.addEventListener(
        "click",
        function () {

            localStorage.setItem(
                "announcement1",
                document.getElementById(
                    "announcement1"
                ).value
            );

            localStorage.setItem(
                "announcement2",
                document.getElementById(
                    "announcement2"
                ).value
            );

            localStorage.setItem(
                "announcement3",
                document.getElementById(
                    "announcement3"
                ).value
            );

            localStorage.setItem(
                "announcement4",
                document.getElementById(
                    "announcement4"
                ).value
            );

            alert(
                "Announcements Saved"
            );

        });

}



// ================= ORDERS =================

const ordersList =
    document.getElementById(
        "orders-list"
    );

async function loadOrders() {

    if (!ordersList) return;

    const { data, error } =
        await window.supabaseClient
            .from("orders")
            .select("*")
            .order("created_at", {
                ascending: false
            });

    if (error) {

        console.error(
            "Orders Error:",
            error
        );

        return;

    }
    console.log("Orders:", data);

    ordersList.innerHTML = "";

    data.forEach(order => {

       ordersList.innerHTML += `

<div class="order-card">

    <h3>${order.customer_name}</h3>

    <p>📞 ${order.phone}</p>

    <p>💬 ${order.whatsapp}</p>

    <p>🏪 ${order.branch}</p>

    <p>🚚 ${order.order_type}</p>

    <p>📍 ${order.address}</p>

    <p>📝 ${order.notes || "No notes"}</p>

    <p>💰 ₦${Number(order.total).toLocaleString()}</p>

    <p>📦 Status: ${order.status}</p>

    <p>📅 ${new Date(order.created_at).toLocaleString()}</p>

    <div class="order-actions">

        <button
            class="complete-btn"
            onclick="completeOrder('${order.created_at}')">

            Complete

        </button>

        <button
            class="delete-btn"
            onclick="deleteOrder('${order.created_at}')">

            Delete

        </button>

    </div>

</div>

`;
    });

}
async function completeOrder(createdAt) {

    const { error } =
    await window.supabaseClient
        .from("orders")
        .update({
            status: "Completed"
        })
        .eq("created_at", createdAt);

    if (error) {
        console.error(error);
        return;
    }

    loadOrders();

}

async function deleteOrder(createdAt) {

    if (!confirm("Delete this order?")) {
        return;
    }

    const { error } =
    await window.supabaseClient
        .from("orders")
        .delete()
        .eq("created_at", createdAt);

    if (error) {
        console.error(error);
        return;
    }

    loadOrders();

}

// Load orders on page open

loadOrders();

// Realtime updates

window.supabaseClient
    .channel("orders-channel")
    .on(
        "postgres_changes",
        {
            event: "INSERT",
            schema: "public",
            table: "orders"
        },
        () => {

            console.log(
                "New order received"
            );

            loadOrders();

        }
    )
    .subscribe();