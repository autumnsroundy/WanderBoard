console.log("WanderBoard starting...");

// --------------------
// INITIALIZE MAP
// --------------------
const map = L.map('map').setView([20, 0], 2); // default world view

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// --------------------
// LOCAL STORAGE HANDLER
// --------------------
function loadPins() {
    const saved = localStorage.getItem("wanderboard_pins");
    return saved ? JSON.parse(saved) : [];
}

function savePins(pins) {
    localStorage.setItem("wanderboard_pins", JSON.stringify(pins));
}

// --------------------
// RENDER PINS
// --------------------
let pins = loadPins();

function renderPins() {
    pins.forEach(pin => {
        L.marker(pin.coords).addTo(map);
    });
}
renderPins();

// --------------------
// MAP CLICK HANDLER
// --------------------
map.on("click", (e) => {
    const coords = [e.latlng.lat, e.latlng.lng];

    // Add to map
    L.marker(coords).addTo(map);

    // Save it
    pins.push({ coords });
    savePins(pins);

    console.log("Pin added:", coords);
});

// --------------------
// NAVIGATION BETWEEN MAP & GALLERY
// --------------------
const mapView = document.getElementById("mapView");
const galleryView = document.getElementById("galleryView");
const viewMapBtn = document.getElementById("viewMapBtn");
const viewGalleryBtn = document.getElementById("viewGalleryBtn");

viewMapBtn.addEventListener("click", () => {
    mapView.classList.remove("hidden");
    galleryView.classList.add("hidden");
    viewMapBtn.classList.add("active");
    viewGalleryBtn.classList.remove("active");
});

viewGalleryBtn.addEventListener("click", () => {
    galleryView.classList.remove("hidden");
    mapView.classList.add("hidden");
    viewGalleryBtn.classList.add("active");
    viewMapBtn.classList.remove("active");
});
