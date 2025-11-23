// map.js
import { openPostcardForPin } from "./postcards.js";

// Initialize Leaflet map
export const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Load pins from localStorage
let savedPins = JSON.parse(localStorage.getItem("pins")) || [];

export function renderPins() {
    savedPins.forEach(pin => {
        const marker = L.marker(pin.coords).addTo(map);
        marker._leaflet_id = pin.id; // assign ID for postcard linking
        marker.on("click", () => openPostcardForPin(pin.id));
    });
}

// Add pin on map click
map.on("click", (e) => {
    const id = Date.now(); // unique ID
    const coords = [e.latlng.lat, e.latlng.lng];

    const marker = L.marker(coords).addTo(map);
    marker._leaflet_id = id;
    marker.on("click", () => openPostcardForPin(id));

    savedPins.push({ id, coords });
    localStorage.setItem("pins", JSON.stringify(savedPins));

    // Create empty postcard for this pin
    createEmptyPostcard(id, coords);
});
