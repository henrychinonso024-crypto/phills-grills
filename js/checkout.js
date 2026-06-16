

// ================= ORDER SUMMARY =================

const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

const checkoutItems =
    document.getElementById("checkout-items");

const totalPriceElement =
    document.getElementById("checkout-total-price");

const orderTypeSelect =
    document.getElementById("orderType");

const deliveryFeeRow =
    document.getElementById("delivery-fee-row");

const deliveryFeeElement =
    document.getElementById("delivery-fee");

let subtotal = 0;


// ================= DISPLAY CART ITEMS =================

if (checkoutItems && totalPriceElement) {

    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <p>Your cart is empty.</p>
        `;

    } else {

        cart.forEach(item => {

            const price =
                Number(
                    String(item.price)
                        .replace("₦", "")
                        .replace(/,/g, "")
                );

            const quantity =
                item.quantity || 1;

            const itemTotal =
                price * quantity;

            subtotal += itemTotal;

            checkoutItems.innerHTML += `

                <div class="checkout-item">

                    <img
                    src="${item.image}"
                    alt="${item.name}">

                    <div class="checkout-item-info">

                        <h4>${item.name}</h4>

                        <p>
                            Quantity: ${quantity}
                        </p>

                    </div>

                    <strong>
                        ₦${itemTotal.toLocaleString()}
                    </strong>

                </div>

            `;

        });

    }

}


// ================= UPDATE TOTAL =================

function updateTotalWithDelivery() {

    let deliveryFee = 0;

    if (
        orderTypeSelect &&
        orderTypeSelect.value === "Delivery"
    ) {

        deliveryFee = 1500;

        if (deliveryFeeRow) {

            deliveryFeeRow.style.display =
                "block";

        }

        if (deliveryFeeElement) {

            deliveryFeeElement.textContent =
                "₦1,500";

        }

    } else {

        if (deliveryFeeRow) {

            deliveryFeeRow.style.display =
                "none";

        }

    }

    const finalTotal =
        subtotal + deliveryFee;

    if (totalPriceElement) {

        totalPriceElement.textContent =
            `₦${finalTotal.toLocaleString()}`;

    }

}

if (orderTypeSelect) {

    orderTypeSelect.addEventListener(
        "change",
        updateTotalWithDelivery
    );

    updateTotalWithDelivery();

}


// ================= CHECKOUT FORM =================

const form =
    document.getElementById("checkout-form");

form.addEventListener(
    "submit",
    async function (e) {
        console.log("FORM SUBMITTED");

        e.preventDefault();

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }

    const name =
        document.getElementById("customerName").value;

    const phone =
        document.getElementById("customerPhone").value;

    const whatsapp =
        document.getElementById("customerWhatsapp").value;

    const orderType =
        document.getElementById("orderType").value;

    const branch =
        document.getElementById("branch").value;

    const address =
        document.getElementById("address").value;

    const notes =
        document.getElementById("notes").value;

    let total = 0;

    let orderItems = "";

    cart.forEach(item => {

        const price =
            Number(
                String(item.price)
                    .replace("₦", "")
                    .replace(/,/g, "")
            );

        const quantity =
            item.quantity || 1;

        const itemTotal =
            price * quantity;

        total += itemTotal;

        orderItems += `

${item.name}
Quantity: ${quantity}
Subtotal: ₦${itemTotal.toLocaleString()}

`;

    });

    // ================= DELIVERY FEE =================

    let deliveryFee = 0;

    if (orderType === "Delivery") {

        deliveryFee = 1500;

        total += deliveryFee;

    }

    // ================= WHATSAPP MESSAGE =================

    const message =

        `🍽️ NEW ORDER

👤 Customer Name:
${name}

📞 Phone Number:
${phone}

💬 WhatsApp:
${whatsapp}

🏪 Branch:
${branch}

🚚 Order Type:
${orderType}

📍 Address:
${address}

📝 Notes:
${notes}

━━━━━━━━━━━━━━

🛒 ORDER ITEMS

${orderItems}

━━━━━━━━━━━━━━

🚚 Delivery Fee:
₦${deliveryFee.toLocaleString()}

💰 TOTAL:
₦${total.toLocaleString()}

Please respond.
`;

    const adminNumber =
        "2349033035249";
        console.log("Opening WhatsApp...");

    const whatsappUrl =
        `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;
        console.log("Saving order to Supabase...");
        
        const { data, error } =
await window.supabaseClient.from("orders")
.insert([{

    customer_name: name,
    phone: phone,
    whatsapp: whatsapp,
    branch: branch,
    order_type: orderType,
    address: address,
    notes: notes,
    items: cart,
    total: total,
    status: "Pending"

}]);

console.log("Supabase Response:", data);
console.log("Supabase Error:", error);

if(error){

    console.error(
        "Supabase Error:",
        error
    );

    alert(
        error.message
    );

    return;

}

console.log(
    "Order Saved:",
    data
);

    window.open(
        whatsappUrl,
        "_blank"
    );

    // Clear form

    form.reset();

    // Clear cart

    localStorage.removeItem("cart");

    // Redirect

    setTimeout(() => {

        window.location.href =
            "thank-you.html";

    }, 10000);

});