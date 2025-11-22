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


// Select Elements
const uploadBox = document.getElementById("uploadBox");
const fileInput = document.getElementById("fileInput");

// Let button open file picker
uploadBox.querySelector("button").addEventListener("click", () => {
    fileInput.click();
});

// Handle manual file selection
fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) handleFile(file);
});

// Prevent default & highlight on dragover
uploadBox.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadBox.style.background = "#e5eeff"; // highlight
});

// Remove highlight on dragleave
uploadBox.addEventListener("dragleave", () => {
    uploadBox.style.background = "#f0f6ff";
});

// Handle drop event
uploadBox.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadBox.style.background = "#f0f6ff";

    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
});

// Process file + show name
function handleFile(file) {
    uploadBox.innerHTML = `
        <p><strong>${file.name}</strong></p>
        <p style="color:#0047AB; font-size:0.9rem;">Uploaded Successfully</p>
    `;
}



//pending applications 
// Modal functionality
const detailsModal = document.getElementById('detailsModal');
const closeModal = document.getElementById('closeModal');
const detailsInfo = document.querySelector('.details-info');

document.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const row = btn.closest('.pending-row');
        const data = JSON.parse(row.dataset.application);

        // Clear previous details
        detailsInfo.innerHTML = '';

        // Add details dynamically (excluding name, matric, college, level, course)
        const keysToShow = ['reason', 'contact_relation', 'contact_phone', 'phone_while_away', 'start_date', 'end_date'];
        keysToShow.forEach(key => {
            if (data[key]) {
                const p = document.createElement('p');
                p.innerHTML = `<strong>${key.replace(/_/g, ' ')}:</strong> ${data[key]}`;
                detailsInfo.appendChild(p);
            }
        });

        // Reset tracked status
        const steps = detailsModal.querySelectorAll('.step');
        steps.forEach(s => {
            s.classList.remove('completed', 'failed');
            if (s.dataset.step === 'Applied') s.classList.add('completed');
        });

        detailsModal.style.display = 'flex';
    });
});

// Close modal
closeModal.addEventListener('click', () => detailsModal.style.display = 'none');
window.addEventListener('click', e => {
    if (e.target === detailsModal) detailsModal.style.display = 'none';
});

// Close modal with ESC key
window.addEventListener('keydown', e => {
    if (e.key === "Escape") detailsModal.style.display = 'none';
});
