/* Header Section */
window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
});

/* Cart Sidebar */
const cartBtn = document.getElementById("cart-btn");
const cartSidebar = document.getElementById("cart-sidebar");
const closeSidebar = document.getElementById("close-sidebar");
const sidebarOverlay = document.getElementById("sidebar-overlay");
const cartList = document.querySelector("#cart-sidebar .cart");
const cartCount = document.getElementById("cart-count");
const cartNumItems = document.getElementById("cart-num-items");
const cartTotal = document.getElementById("cart-total");

cartBtn.addEventListener("click", () => {
    cartSidebar.classList.add("open");
    sidebarOverlay.classList.add("active");
    document.body.classList.add("sidebar-open");
});

function closeSidebarFunc() {
    cartSidebar.classList.remove("open");
    sidebarOverlay.classList.remove("active");
    document.body.classList.remove("sidebar-open");
}

closeSidebar.addEventListener("click", closeSidebarFunc);
sidebarOverlay.addEventListener("click", closeSidebarFunc);

// Update cart summary
function updateCartSummary() {
    const items = cartList.querySelectorAll(".cart-item");
    cartNumItems.textContent = `Checkout (${items.length} item${items.length !== 1 ? "s" : ""})`;

    let total = 0;
    items.forEach(item => {
        const priceText = item.querySelector(".price")?.textContent || "0";

        const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));
        if (!isNaN(price)) total += price;
    });
    cartTotal.textContent = `$${total}`;
}

// Update cart count
function updateCartCount() {
    const count = cartList.querySelectorAll(".cart-item").length;
    cartCount.textContent = count > 0 ? count : "";
}

// Add to cart logic
document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", function () {
        const item = btn.closest(".featured-item");
        if (!item) return;

        const img = item.querySelector(".product-img");
        const imgSrc = img ? img.src : "";
        const imgAlt = img ? img.alt : "";
        const name = item.querySelector(".product-name")?.textContent || "";
        const price = item.querySelector(".price")?.textContent || "";

        const li = document.createElement("li");
        li.className = "cart-item";
        li.innerHTML = `
            <img src="${imgSrc}" class="cart-img" alt="${imgAlt}">
            <div class="featured-item-bottom">
                <h1 class="product-name">${name}</h1>
                <p class="price">${price}</p>
            </div>
            <button class="remove-item">Remove Item</button>
        `;
        li.querySelector('img').addEventListener('dragstart', (e) => e.preventDefault());
        cartList.appendChild(li);

        updateCartSummary();
        updateCartCount();

        cartSidebar.classList.add("open");
        sidebarOverlay.classList.add("active");
        document.body.classList.add("sidebar-open");
    });
});

// Remove item from cart
cartList.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-item")) {
        e.target.closest(".cart-item").remove();
        updateCartSummary();
        updateCartCount();
    }
});

let isDraggingCart = false;
let startXCart;
let scrollLeftCart;

cartList.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;
    isDraggingCart = true;
    cartList.classList.add("dragging");
    startXCart = e.pageX - cartList.offsetLeft;
    scrollLeftCart = cartList.scrollLeft;
});

document.addEventListener("mouseup", () => {
    isDraggingCart = false;
    cartList.classList.remove("dragging");
});

cartList.addEventListener("mouseleave", () => {
    isDraggingCart = false;
    cartList.classList.remove("dragging");
});

cartList.addEventListener("mousemove", (e) => {
    if (!isDraggingCart) return;
    e.preventDefault();
    const x = e.pageX - cartList.offsetLeft;
    const walk = x - startXCart;
    cartList.scrollLeft = scrollLeftCart - walk;
});

// Prevent default drag behavior on cart images
cartList.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', (e) => e.preventDefault());
});

/* Featured Section */
const bestSellersSelect = document.getElementById("best-sellers-select");
const saleSelect = document.getElementById("sale-select");
const bestSellers = document.getElementById("best-sellers");
const sale = document.getElementById("sale");
const featuredBack = document.getElementById("featured-back");
const featuredNext = document.getElementById("featured-next");

const scrollAmount = 400;

bestSellersSelect.addEventListener("click", () => {
    bestSellers.style.display = "flex";
    sale.style.display = "none";
});

saleSelect.addEventListener("click", () => {
    sale.style.display = "flex";
    bestSellers.style.display = "none";
});

function enableHorizontalDragScroll(section) {
    let isDragging = false;
    let startX;
    let scrollLeft;

    section.addEventListener("mousedown", (e) => {
        if (e.button !== 0) return;
        isDragging = true;
        section.classList.add("dragging");
        startX = e.pageX - section.offsetLeft;
        scrollLeft = section.scrollLeft;
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        section.classList.remove("dragging");
    });

    section.addEventListener("mouseleave", () => {
        isDragging = false;
        section.classList.remove("dragging");
    });

    section.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - section.offsetLeft;
        const walk = x - startX;
        section.scrollLeft = scrollLeft - walk;
    });

    section.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', (e) => e.preventDefault());
    });
}

enableHorizontalDragScroll(bestSellers);
enableHorizontalDragScroll(sale);

function getActiveFeaturedSection() {
    if (bestSellers.style.display !== "none") {
        return bestSellers;
    }
    if (sale.style.display !== "none") {
        return sale;
    }
    return bestSellers;
}

// Products Scroll Buttons
featuredBack.addEventListener("click", () => {
    const activeSection = getActiveFeaturedSection();
    activeSection.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});

featuredNext.addEventListener("click", () => {
    const activeSection = getActiveFeaturedSection();
    activeSection.scrollBy({ left: scrollAmount, behavior: "smooth" });
});

/* Moving Banner */
const bannerSentences = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem",
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis",
    "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id",
    "Itaque earum rerum hic tenetur a sapiente delectus"
];

const bannerText = document.getElementById("banner-text");
let bannerIndex = 0;

function showNextBannerSentence() {
    
    bannerText.classList.add("fade");
    setTimeout(() => {
        bannerIndex = (bannerIndex + 1) % bannerSentences.length;
        bannerText.textContent = bannerSentences[bannerIndex];
        bannerText.classList.remove("fade");
    }, 500);
}

setInterval(showNextBannerSentence, 3000);


// Hero Fade In
window.addEventListener("DOMContentLoaded", function () {
    document.getElementById("hero").classList.add("visible");
});

updateCartCount();