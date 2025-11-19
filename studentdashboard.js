// ---------------------------
// Sidebar toggling
// ---------------------------
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");
const navbar = document.getElementById("navbar");

function openSidebar() {
    hamburger.classList.add("active");
    sidebar.classList.add("active");
    overlay.classList.add("active");
}

function closeSidebar() {
    hamburger.classList.remove("active");
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
}

hamburger.addEventListener("click", () => {
    if (sidebar.classList.contains("active")) closeSidebar();
    else openSidebar();
});

closeBtn.addEventListener("click", closeSidebar);
overlay.addEventListener("click", closeSidebar);
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSidebar();
});

// ---------------------------
// Navbar hide/show on scroll
// ---------------------------
let lastScroll = 0;
window.addEventListener("scroll", () => {
    const current = window.scrollY;
    if (current > lastScroll && current > 120) {
        navbar.classList.add("hide");
    } else {
        navbar.classList.remove("hide");
    }
    lastScroll = current;
});

// ---------------------------
// Fade-up animation (continuous)
// ---------------------------
const fadeElements = document.querySelectorAll("[data-animate]");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animated");
        } else {
            entry.target.classList.remove("animated"); // ensures continuous effect
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(el => observer.observe(el));





//Apply for exeat section
// Accordion toggle for exeat types
const exeatButtons = document.querySelectorAll(".exeat-type");
const exeatForm = document.getElementById("exeat-form-container");
const exeatTypeInput = document.getElementById("exeat-type-input");

let formOpen = false;
let currentActiveButton = null;

exeatButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const typeName = btn.dataset.type;

        // Highlight the clicked button
        exeatButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentActiveButton = btn;

        // Update form type input
        exeatTypeInput.value = typeName;

        // Toggle form
        if (!formOpen) {
            exeatForm.classList.add("active");
            formOpen = true;

        } else {
            // Optionally, add a small bounce/fade effect
            exeatForm.classList.remove("active");
            setTimeout(() => {
                exeatForm.classList.add("active");

            }, 300);
        }
    });
});

// File upload drag & drop
const fileUploadElements = document.querySelectorAll(".file-upload");
fileUploadElements.forEach(fileUpload => {
    const fileInput = fileUpload.querySelector("input[type='file']");

    fileUpload.addEventListener("click", () => fileInput.click());

    fileUpload.addEventListener("dragover", e => {
        e.preventDefault();
        fileUpload.classList.add("dragover");
    });

    fileUpload.addEventListener("dragleave", () => {
        fileUpload.classList.remove("dragover");
    });

    fileUpload.addEventListener("drop", e => {
        e.preventDefault();
        fileUpload.classList.remove("dragover");
        const files = e.dataTransfer.files;
        if (files.length) {
            fileInput.files = files;
            fileUpload.querySelector("p").textContent = files[0].name;
        }
    });

    fileInput.addEventListener("change", () => {
        if (fileInput.files.length) {
            fileUpload.querySelector("p").textContent = fileInput.files[0].name;
        }
    });
});







//exeat history section 
const typeFilters = document.querySelectorAll(".type-filter");
const statusFilters = document.querySelectorAll(".status-filter");
const historyItems = document.querySelectorAll(".history-item");

// Filter function
function filterHistory() {
    const activeType = document.querySelector(".type-filter.active").dataset.type;
    const activeStatus = document.querySelector(".status-filter.active").dataset.status;

    historyItems.forEach(item => {
        const matchesType = activeType === "all" || item.dataset.type === activeType;
        const matchesStatus = activeStatus === "all" || item.dataset.status === activeStatus;

        if (matchesType && matchesStatus) {
            item.style.display = "block";
            setTimeout(() => item.classList.add("visible"), 50); // fade-up
        } else {
            item.classList.remove("visible");
            setTimeout(() => item.style.display = "none", 300);
        }
    });
}

// Handle Type Filters
typeFilters.forEach(btn => {
    btn.addEventListener("click", () => {
        typeFilters.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        filterHistory();
    });
});

// Handle Status Filters
statusFilters.forEach(btn => {
    btn.addEventListener("click", () => {
        statusFilters.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        filterHistory();
    });
});

// Initialize fade-up animation on page load
window.addEventListener("load", filterHistory);



//view exeat slip button for history 
historyItems.forEach(item => {
    const status = item.dataset.status;

    // Remove existing button if any (for repeated filtering)
    const existingBtn = item.querySelector(".view-slip-btn");
    if (existingBtn) existingBtn.remove();

    if (status === "Approved") {
        const footer = document.createElement("div");
        footer.classList.add("item-footer");

        const btn = document.createElement("button");
        btn.classList.add("view-slip-btn");
        btn.textContent = "View Exeat Slip";

        // Add click event to show slip (could open modal or link)
        btn.addEventListener("click", () => {
            alert(`Here you can open or download the Exeat slip for ${item.dataset.type}`);
            // Or implement a modal or redirect to PDF
        });

        footer.appendChild(btn);
        item.appendChild(footer);
    }
});






