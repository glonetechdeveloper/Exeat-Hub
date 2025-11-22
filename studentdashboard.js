// ---------------------------
// Sidebar toggling
// ---------------------------
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");
const navbar = document.getElementById("navbar");





hamburger.addEventListener("click", () => {
    sidebar.classList.toggle("expanded");
    hamburger.classList.toggle("active"); // animate hamburger
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






//exeat type
const cards = document.querySelectorAll(".exeat-card");
const formWrapper = document.querySelector(".exeat-form-wrapper");

let activeType = null;

cards.forEach(card => {
    card.addEventListener("click", () => {
        const type = card.dataset.type;

        // Toggle form if same type clicked
        if (activeType === type) {
            card.classList.remove("active");
            formWrapper.style.display = "none";
            activeType = null;
        } else {
            cards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");
            formWrapper.style.display = "block";
            activeType = type;

            // Scroll smoothly to form
            setTimeout(() => {
                formWrapper.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
        }
    });
});


// DRAG & DROP UPLOAD
const uploadBox = document.getElementById("uploadBox");
const fileInput = document.getElementById("fileInput");

// Click to browse
uploadBox.querySelector("button").addEventListener("click", () => {
    fileInput.click();
});

// Manual file selection
fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) handleFile(file);
});

// Drag over
uploadBox.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadBox.style.background = "#e5eeff";
});

// Drag leave
uploadBox.addEventListener("dragleave", () => {
    uploadBox.style.background = "#f0f6ff";
});

// Drop file
uploadBox.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadBox.style.background = "#f0f6ff";

    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
});

function handleFile(file) {
    uploadBox.innerHTML = `
        <p><strong>${file.name}</strong></p>
        <p style="color:#0047AB; font-size:0.9rem;">Uploaded Successfully</p>
    `;
}



//pending exeat and exeat history
// Filter Popup
const filterBtn = document.querySelector('.filter-btn');
const filterPopup = document.querySelector('.filter-popup');
const applyFilter = document.querySelector('.apply-filter');

filterBtn.addEventListener('click', () => {
    filterPopup.style.display = 'flex';
});
applyFilter.addEventListener('click', () => {
    filterPopup.style.display = 'none';
    const type = document.getElementById('filterType').value;
    const status = document.getElementById('filterStatus').value;
    const items = document.querySelectorAll('.exeat-item');
    items.forEach(item => {
        let show = true;
        if (type !== 'all' && item.dataset.type !== type) show = false;
        if (status !== 'all' && item.dataset.status !== status) show = false;
        item.style.display = show ? 'flex' : 'none';
    });
});


// Track Status Modal
// Elements
const trackBtns = document.querySelectorAll('.track-status-btn');
const trackModal = document.getElementById('trackModal');
const closeModal = document.getElementById('closeTrackModal');

// Open modal only when clicking the button
trackBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        trackModal.style.display = 'flex';
    });
});

// Close modal when clicking the X
closeModal.addEventListener('click', () => {
    trackModal.style.display = 'none';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', e => {
    if (e.target === trackModal) {
        trackModal.style.display = 'none';
    }
});

