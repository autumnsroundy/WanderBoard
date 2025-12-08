import { renderPins } from "./map.js";
import "./postcards.js"; // keeps modal + postcard functionality active
import { renderGallery } from "./gallery.js";

window.addEventListener("DOMContentLoaded", () => {

  //DOM references
  const mapBtn = document.getElementById("viewMapBtn");
  const galleryBtn = document.getElementById("viewGalleryBtn");
  const mapView = document.getElementById("mapView");
  const galleryView = document.getElementById("galleryView");

  // Helper: activate nav button
  function activateButton(btn) {
    document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  }

  // Navigation buttons
  mapBtn.addEventListener("click", () => {
    mapView.classList.remove("hidden");
    galleryView.classList.add("hidden");
    activateButton(mapBtn);
    // Render pins fresh (optional)
    renderPins();
  });

  galleryBtn.addEventListener("click", () => {
    mapView.classList.add("hidden");
    galleryView.classList.remove("hidden");
    activateButton(galleryBtn);
    // Render gallery fresh
    renderGallery();
  });

  // Initial render
  renderPins();      // show pins on map
  renderGallery();   // load gallery in case user switches quickly
  activateButton(mapBtn); // default active tab = Map
});
