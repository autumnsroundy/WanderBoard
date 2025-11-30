import { renderPins } from "./map.js";
import "./postcards.js";
import { renderGallery } from "./gallery.js";

window.addEventListener("DOMContentLoaded", () => {
  // initial render of map pins
  renderPins();

  // wire navigation buttons
  const mapBtn = document.getElementById("viewMapBtn");
  const galleryBtn = document.getElementById("viewGalleryBtn");
  const mapView = document.getElementById("mapView");
  const galleryView = document.getElementById("galleryView");

  function activateButton(btn) {
    document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  }

  mapBtn.addEventListener("click", () => {
    mapView.classList.remove("hidden");
    galleryView.classList.add("hidden");
    activateButton(mapBtn);
    // when returning to map we want the markers to show (map module reads pins at load)
    // If you deleted pins while in gallery, page reload may have occurred already.
  });

  galleryBtn.addEventListener("click", () => {
    mapView.classList.add("hidden");
    galleryView.classList.remove("hidden");
    activateButton(galleryBtn);
    // render gallery fresh each time
    renderGallery();
  });
});
