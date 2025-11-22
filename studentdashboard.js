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













/* =======================
   Exeat History: Filter + Details (REPLACEMENT)
   This block is self-contained and safe to add at bottom.
======================= */

(function () {
    // elements
    const openHistoryFilter = document.getElementById("openHistoryFilter");
    const historyFilterPopup = document.getElementById("historyFilterPopup");
    const closeHistoryFilter = document.getElementById("closeHistoryFilter");
    const applyHistoryFilter = document.getElementById("applyHistoryFilter");

    const historyRows = Array.from(document.querySelectorAll(".history-row"));

    // details modal elements
    const historyDetailsModal = document.getElementById("historyDetailsModal");
    const closeHistoryDetails = document.getElementById("closeHistoryDetails");
    const detailsReason = document.getElementById("detailsReason");
    const detailsContactRelation = document.getElementById("detailsContactRelation");
    const detailsContactPhone = document.getElementById("detailsContactPhone");
    const detailsPhoneAway = document.getElementById("detailsPhoneAway");
    const detailsStartDate = document.getElementById("detailsStartDate");
    const detailsEndDate = document.getElementById("detailsEndDate");
    const historyTrackSteps = document.getElementById("historyTrackSteps");

    // open filter
    if (openHistoryFilter) {
        openHistoryFilter.addEventListener("click", () => {
            historyFilterPopup.style.display = "flex";
        });
    }
    if (closeHistoryFilter) {
        closeHistoryFilter.addEventListener("click", () => {
            historyFilterPopup.style.display = "none";
        });
    }

    // apply filter logic
    if (applyHistoryFilter) {
        applyHistoryFilter.addEventListener("click", () => {
            const type = document.getElementById("historyFilterType").value;
            const status = document.getElementById("historyFilterStatus").value;
            const range = document.getElementById("historyFilterRange").value;

            const now = new Date();

            historyRows.forEach(row => {
                const rowDateStr = row.getAttribute("data-date") || row.children[0].textContent.split(" ")[0];
                const rowType = (row.getAttribute("data-type") || row.children[1].textContent).trim();
                const rowStatus = row.querySelector(".history-status")?.textContent.trim() || "";

                let show = true;

                // type filter
                if (type !== "all" && type !== rowType) show = false;

                // status filter
                if (status !== "all" && status !== rowStatus) show = false;

                // range filter
                if (range !== "all" && rowDateStr) {
                    const rowDate = new Date(rowDateStr);
                    const diffDays = Math.floor((now - rowDate) / (1000 * 60 * 60 * 24));

                    if (range === "7days" && diffDays > 7) show = false;
                    if (range === "30days" && diffDays > 30) show = false;
                    if (range === "month") {
                        // this month
                        if (rowDate.getMonth() !== now.getMonth() || rowDate.getFullYear() !== now.getFullYear()) show = false;
                    }
                }

                row.style.display = show ? "grid" : "none";
            });

            historyFilterPopup.style.display = "none";
        });
    }

    // Open details modal: attach click handlers to current rows
    document.querySelectorAll(".history-row .history-view-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const row = e.currentTarget.closest(".history-row");

            // If you have real data attributes or data source, fetch them.
            // For demo we will read the visible values and populate default placeholders.
            const dateText = row.children[0].textContent.trim();
            const typeText = row.children[1].textContent.trim();
            const statusText = row.querySelector(".history-status")?.textContent.trim() || "";

            // populate details (replace with real data when available)
            detailsReason.textContent = row.getAttribute("data-reason") || "Family visit";
            detailsContactRelation.textContent = row.getAttribute("data-contact") || "Parent";
            detailsContactPhone.textContent = row.getAttribute("data-contact-phone") || "08012345678";
            detailsPhoneAway.textContent = row.getAttribute("data-phone-away") || "08123456789";
            detailsStartDate.textContent = row.getAttribute("data-start") || (dateText.split(" ")[0] || "2025-11-24");
            detailsEndDate.textContent = row.getAttribute("data-end") || (dateText.split(" ")[0] || "2025-11-25");

            // construct track pills — example states; if you have actual state data store it in data-track attribute
            // Example: data-track='[{"name":"Applied","state":"done"},...]'
            let trackData;
            try {
                const raw = row.getAttribute("data-track");
                trackData = raw ? JSON.parse(raw) : null;
            } catch (err) {
                trackData = null;
            }

            if (!trackData) {
                // fallback: derive based on status (demo)
                if (statusText === "Approved") {
                    trackData = [
                        { name: "Applied", state: "done" },
                        { name: "Approved for Confirmation", state: "done" },
                        { name: "Parent Confirmation", state: "done" },
                        { name: "Approved", state: "done" }
                    ];
                } else if (statusText === "Declined") {
                    trackData = [
                        { name: "Applied", state: "done" },
                        { name: "Approved for Confirmation", state: "done" },
                        { name: "Parent Confirmation", state: "failed" },
                        { name: "Approved", state: "failed" }
                    ];
                } else {
                    trackData = [
                        { name: "Applied", state: "done" },
                        { name: "Approved for Confirmation", state: "pending" },
                        { name: "Parent Confirmation", state: "pending" },
                        { name: "Approved", state: "pending" }
                    ];
                }
            }

            // render track pills
            historyTrackSteps.innerHTML = "";
            trackData.forEach(step => {
                const pill = document.createElement("div");
                pill.className = "track-pill";
                if (step.state === "done") pill.classList.add("active");
                if (step.state === "failed") pill.classList.add("failed");

                // icon + name
                const icon = document.createElement("span");
                icon.innerHTML = step.state === "done" ? "✔" : (step.state === "failed" ? "✖" : "");
                icon.style.fontWeight = 800;
                pill.appendChild(icon);

                const text = document.createElement("span");
                text.textContent = step.name;
                pill.appendChild(text);

                historyTrackSteps.appendChild(pill);
            });

            // show modal
            historyDetailsModal.style.display = "flex";
        });
    });

    // close details
    if (closeHistoryDetails) {
        closeHistoryDetails.addEventListener("click", () => {
            historyDetailsModal.style.display = "none";
        });
    }

    // close on outside click
    window.addEventListener("click", (e) => {
        if (e.target === historyFilterPopup) historyFilterPopup.style.display = "none";
        if (e.target === historyDetailsModal) historyDetailsModal.style.display = "none";
    });

})();





//View Exeat Slip placeholder
document.querySelectorAll(".view-slip-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        alert("Exeat slip will open here!");
        // Later, replace with logic to fetch/open slip PDF
    });
});

