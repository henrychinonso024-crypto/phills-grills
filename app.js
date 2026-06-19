


// ================= HAMBURGER MENU =================

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".overlay");

function toggleMenu() {
  hamburger.classList.toggle("active");
  menu.classList.toggle("active");
  overlay.classList.toggle("active");
}

hamburger.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);


// ================= FEATURED PRODUCTS =================


// ====================hero-image========================
const heroImage =
document.querySelector("#heroImage");

const heroImages = [

    "images/hero-food.webp",

    "images/indomie.png",
    "images/aiburger.png",
    "images/chickenai.png"

];

let currentImage = 0;

setInterval(() => {

    heroImage.classList.remove(
        "animate-hero"
    );

    setTimeout(() => {

        currentImage =
        (currentImage + 1) %
        heroImages.length;

        heroImage.src =
        heroImages[currentImage];

        void heroImage.offsetWidth;

        heroImage.classList.add(
            "animate-hero"
        );

    }, 100);

}, 5000);




// ================= CART =================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ================= RENDER PRODUCTS =================


// ================= ADD TO CART =================

document.addEventListener("click", function (e) {

    const btn = e.target.closest(".cart-btn");
    if (!btn) return;

    const productId = Number(btn.dataset.id);
    if (!productId) return;

    addToCart(productId);
});


function addToCart(id) {

    let selectedProduct = featuredProducts.find(product => product.id === id);

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
}


// ================= CART COUNT =================

function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (!cartCount) return;

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    cartCount.textContent = totalItems;
}

updateCartCount();


// ================= SLIDER CONTROLS =================



// ================= COUNTER =================

// ================= COUNTER ANIMATION =================

const counters =
document.querySelectorAll(".counter");

function animateCounters() {

    counters.forEach(counter => {

        counter.textContent = "0";

        const target =
        Number(counter.dataset.target);

        let count = 0;

        const increment =
        target / 100;

        function updateCounter() {

            count += increment;

            if (count < target) {

                counter.textContent =
                Math.ceil(count);

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent =
                target +
                (target > 10 ? "+" : "");

            }

        }

        updateCounter();

    });

}



// ================= SCROLL REVEAL =================

const reveals =
    document.querySelectorAll(".reveal");

function revealOnScroll() {

    reveals.forEach(section => {

        const windowHeight =
            window.innerHeight;

        const revealTop =
            section.getBoundingClientRect().top;

        const revealPoint = 120;

        if (revealTop < windowHeight - revealPoint) {

            section.classList.add("active");

        }

    });

}

window.addEventListener(
    "scroll",
    revealOnScroll
);

revealOnScroll();




// ================= TESTIMONIAL SLIDER =================

const testimonialCards =
document.querySelectorAll(
".testimonial-card"
);

const nextTestimonial =
document.querySelector(
".next-testimonial"
);

const prevTestimonial =
document.querySelector(
".prev-testimonial"
);

let testimonialIndex = 0;

function showTestimonial(index){

    testimonialCards.forEach(card => {

        card.classList.remove("active");

    });

    testimonialCards[index]
    .classList.add("active");

}

if(testimonialCards.length){

    nextTestimonial.addEventListener(
    "click",
    () => {

        testimonialIndex++;

        if(
            testimonialIndex >=
            testimonialCards.length
        ){

            testimonialIndex = 0;

        }

        showTestimonial(
        testimonialIndex
        );

    });

    prevTestimonial.addEventListener(
    "click",
    () => {

        testimonialIndex--;

        if(
            testimonialIndex < 0
        ){

            testimonialIndex =
            testimonialCards.length - 1;

        }

        showTestimonial(
        testimonialIndex
        );

    });

    setInterval(() => {

        testimonialIndex++;

        if(
            testimonialIndex >=
            testimonialCards.length
        ){

            testimonialIndex = 0;

        }

        showTestimonial(
        testimonialIndex
        );

    },4000);

}


// ================= PROMO COUNTDOWN =================

const targetDate =
new Date();

targetDate.setDate(
targetDate.getDate() + 7
);

function updateCountdown(){

    const now =
    new Date().getTime();

    const distance =
    targetDate - now;

    const days =
    Math.floor(
        distance /
        (1000 * 60 * 60 * 24)
    );

    const hours =
    Math.floor(
        (
            distance %
            (1000 * 60 * 60 * 24)
        ) /
        (1000 * 60 * 60)
    );

    const minutes =
    Math.floor(
        (
            distance %
            (1000 * 60 * 60)
        ) /
        (1000 * 60)
    );

    const seconds =
    Math.floor(
        (
            distance %
            (1000 * 60)
        ) /
        1000
    );

    document.getElementById("days")
    .textContent =
    String(days).padStart(2,"0");

    document.getElementById("hours")
    .textContent =
    String(hours).padStart(2,"0");

    document.getElementById("minutes")
    .textContent =
    String(minutes).padStart(2,"0");

    document.getElementById("seconds")
    .textContent =
    String(seconds).padStart(2,"0");

}

setInterval(
updateCountdown,
1000
);

updateCountdown();


// ================= CONTACT FORM =================
const contactForm =
document.getElementById("contactForm");

contactForm.addEventListener(
    "submit",
    async function (e) {

        e.preventDefault();

        const formData = {
            from_name:
                document.getElementById("name").value,

            from_email:
                document.getElementById("email").value,

            message:
                document.getElementById("message").value
        };

        try {

            await emailjs.send(
                "service_v4aa49v",
                "template_rgik4qo",
                formData
            );

            showToast("message sent successfully");

            contactForm.reset();

        } catch (error) {

            console.error(error);

            alert(
                "Failed to send message."
            );

        }

    }
);


// ===================faq==========================

// ================= FAQ =================

const faqItems =
document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question =
    item.querySelector(
    ".faq-question"
    );

    question.addEventListener(
    "click",
    () => {

        item.classList.toggle(
        "active"
        );

    });

});



// ================= ANNOUNCEMENT BAR =================

const announcements =
document.querySelectorAll(
".announcement-slide"
);

let announcementIndex = 0;

function showAnnouncement(){

    announcements.forEach(item => {

        item.classList.remove(
        "active"
        );

    });

    announcements[
    announcementIndex
    ].classList.add(
    "active"
    );

    announcementIndex++;

    if(
        announcementIndex >=
        announcements.length
    ){

        announcementIndex = 0;

    }

}

if(announcements.length){

    showAnnouncement();

    setInterval(
        showAnnouncement,
        4000
    );

}

// ===================notification==================



const notification =
document.getElementById(
"whatsappNotification"
);

window.addEventListener(
"load",
function(){

    setTimeout(() => {

        notification.classList.add(
            "show"
        );

    }, 19000);

    setTimeout(() => {

        notification.classList.remove(
            "show"
        );

    }, 19000);

});

// =================prompupu========================




const promoPopup =
document.getElementById(
"promoPopup"
);

const closePromo =
document.getElementById(
"closePromo"
);

const savedPromoTitle =
localStorage.getItem(
"promoTitle"
);

const savedPromoText =
localStorage.getItem(
"promoText"
);

const promoHeading =
document.getElementById(
"promo-heading"
);

const promoDescription =
document.getElementById(
"promo-description"
);

if(savedPromoTitle){

    promoHeading.textContent =
    savedPromoTitle;

}

if(savedPromoText){

    promoDescription.textContent =
    savedPromoText;

}

window.addEventListener(
"load",
function(){

    setTimeout(()=>{

        promoPopup.classList.add(
            "show"
        );

    },7000);

});

closePromo.addEventListener(
"click",
function(){

    promoPopup.classList.remove(
        "show"
    );

});

promoPopup.addEventListener(
"click",
function(e){

    if(
        e.target === promoPopup
    ){

        promoPopup.classList.remove(
            "show"
        );

    }



});




const slide1 =
document.getElementById(
"slide1"
);

const slide2 =
document.getElementById(
"slide2"
);

const slide3 =
document.getElementById(
"slide3"
);

const slide4 =
document.getElementById(
"slide4"
);

if(slide1){

slide1.textContent =

localStorage.getItem(
"announcement1"
) ||

slide1.textContent;

}

if(slide2){

slide2.textContent =

localStorage.getItem(
"announcement2"
) ||

slide2.textContent;

}

if(slide3){

slide3.textContent =

localStorage.getItem(
"announcement3"
) ||

slide3.textContent;

}

if(slide4){

slide4.textContent =

localStorage.getItem(
"announcement4"
) ||

slide4.textContent;

}




const backToTop =
document.getElementById(
"backToTop"
);

window.addEventListener(
"scroll",
()=>{

if(window.scrollY > 500){

backToTop.classList.add(
"show"
);

}else{

backToTop.classList.remove(
"show"
);

}

});

backToTop.addEventListener(
"click",
()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

// delivery button================================
const buttons = document.querySelectorAll(".delivery-btn");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
    });
});



const newsletterForm =
document.getElementById(
    "newsletterForm"
);

newsletterForm.addEventListener(
    "submit",
    async function (e) {

        e.preventDefault();

        const email =
        document.getElementById(
            "newsletterEmail"
        ).value;

        try {

            await emailjs.send(
                "service_v4aa49v",
                "template_mdpuswi",
                {
                    subscriber_email: email
                }
            );

            showToast("Thanks for subscribing!");

            newsletterForm.reset();

        } catch (error) {

    console.error("EmailJS Error:", error);

    alert(
        "Failed to subscribe: " +
        JSON.stringify(error)
    );

}

    }
);

// ============toast==========================

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}