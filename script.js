// ==========================================
// AUTO-FILL SERVICE FROM INDEX PAGE
// ==========================================

const serviceSelect = document.getElementById("service");

if (serviceSelect) {

    const params = new URLSearchParams(
        window.location.search
    );

    const selectedService =
        params.get("service");

    if (selectedService) {

        serviceSelect.value =
            selectedService;

    }

}
// ==========================================
// SAHAYA BOOKING SYSTEM
// ==========================================

const bookingForm = document.getElementById("bookingForm");


// ------------------------------------------
// CREATE BOOKING
// ------------------------------------------

if (bookingForm) {

    bookingForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const service = document.getElementById("service").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const location = document.getElementById("location").value.trim();
        const description = document.getElementById("description").value.trim();


        if (!name || !phone || !service || !date || !time || !location) {

            alert("Please fill in all required fields.");

            return;
        }


        // Generate booking ID

        const bookingID =
            "SH-" +
            Math.floor(1000 + Math.random() * 9000);


        const booking = {

            id: Date.now(),

            bookingID: bookingID,

            name: name,

            phone: phone,

            service: service,

            date: date,

            time: time,

            location: location,

            description: description,

            status: "REQUEST SENT",

            worker: "Searching for worker...",

            eta: "--",

            latitude: null,

            longitude: null,

            createdAt: new Date().toLocaleString()

        };


        // Get existing bookings

        let bookings =
            JSON.parse(localStorage.getItem("sahayaBookings")) || [];


        // Add newest booking first

        bookings.unshift(booking);


        // Save database

        localStorage.setItem(
            "sahayaBookings",
            JSON.stringify(bookings)
        );


        // Show success modal

        const modal =
            document.getElementById("successModal");

        if (modal) {

            modal.style.display = "flex";

        }


        bookingForm.reset();

    });

}


// ------------------------------------------
// CLOSE MODAL
// ------------------------------------------

function closeModal() {

    const modal =
        document.getElementById("successModal");

    if (modal) {

        modal.style.display = "none";

    }

}


// ==========================================
// DASHBOARD
// ==========================================

const bookingContainer =
    document.getElementById("recentBookings");


if (bookingContainer) {

    loadBookings();

}


// ------------------------------------------
// LOAD BOOKINGS
// ------------------------------------------

function loadBookings() {

    const bookings =
        JSON.parse(localStorage.getItem("sahayaBookings")) || [];


    if (bookings.length === 0) {

        bookingContainer.innerHTML = `

            <div class="empty-bookings">

                <div class="empty-icon">📅</div>

                <h3>No bookings yet</h3>

                <p>Your service requests will appear here.</p>

                <a href="booking.html">

                    <button class="primary-btn">
                        Book Your First Service →
                    </button>

                </a>

            </div>

        `;

        updateStats(0);

        return;

    }


    bookingContainer.innerHTML = "";


    bookings.forEach(function(booking) {

        const row =
            document.createElement("div");


        row.className =
            "booking-row";


        row.innerHTML = `

            <div class="booking-info">

                <div class="booking-service-icon">

                    ${getServiceIcon(booking.service)}

                </div>

                <div>

                    <strong>
                        ${booking.service}
                    </strong>

                    <p>
                        ${booking.name}
                        •
                        ${booking.location}
                    </p>

                    <small>
                        📅 ${booking.date}
                        &nbsp; • &nbsp;
                        ⏰ ${booking.time}
                    </small>

                    <br>

                    <small>
                        🆔 ${booking.bookingID}
                    </small>

                </div>

            </div>


            <span class="booking-status">

                ${booking.status}

            </span>

        `;


        bookingContainer.appendChild(row);

    });


    updateStats(bookings.length);

}


// ------------------------------------------
// SERVICE ICONS
// ------------------------------------------

function getServiceIcon(service) {

    const icons = {

        "Plumbing": "🔧",

        "Electrical": "⚡",

        "Cleaning": "🧹",

        "Carpentry": "🪚",

        "Gardening": "🌱",

        "Driver": "🚗"

    };


    return icons[service] || "🛠️";

}


// ------------------------------------------
// DASHBOARD STATS
// ------------------------------------------

function updateStats(totalBookings) {

    const activeBookings =
        document.getElementById("activeBookings");


    if (activeBookings) {

        activeBookings.textContent =
            totalBookings;

    }

}


// ==========================================
// LIVE UPDATES BETWEEN TABS
// ==========================================

window.addEventListener("storage", function(event) {

    if (event.key === "sahayaBookings") {

        if (bookingContainer) {

            loadBookings();

        }

        if (typeof loadPublicBookings === "function") {

            loadPublicBookings();

        }

    }

});