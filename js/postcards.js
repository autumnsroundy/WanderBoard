// postcards.js
import { map } from "./map.js";
import { renderGallery } from "./gallery.js";

console.log("postcards.js loaded");

// DOM references
const modal = document.getElementById("postcardModal");
const closeModalBtn = document.getElementById("closeModal");
const imgInput = document.getElementById("pcImage");
const imgPreview = document.getElementById("pcPreview");
const saveBtn = document.getElementById("savePostcard");

console.log("Save button reference:", saveBtn);

let postcards = JSON.parse(localStorage.getItem("postcards")) || {};
let activePostcardId = null;

// ----------------------
// Image resize & compress
// ----------------------
function resizeImage(file, maxWidth = 800) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => { img.src = reader.result; };
    reader.onerror = reject;

    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);
      const canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const resizedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
      resolve(resizedDataUrl);
    };

    img.onerror = reject;
  });
}

// ----------------------
// Open postcard modal
// ----------------------
export function openPostcardForPin(id) {
  activePostcardId = id;

  if (!postcards[id]) {
    postcards[id] = {
      id,
      coords: findPinCoords(id),
      title: "",
      notes: "",
      image: ""
    };
    savePostcards();
  }

  const pc = postcards[id];

  // Populate modal inputs
  document.getElementById("pcTitle").value = pc.title;
  document.getElementById("pcNotes").value = pc.notes;

  if (pc.image) {
    imgPreview.src = pc.image;
    imgPreview.classList.remove("hidden");
  } else {
    imgPreview.classList.add("hidden");
  }

  modal.classList.remove("hidden");
}

// ----------------------
// Close modal
// ----------------------
closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  activePostcardId = null;
});

// ----------------------
// Image upload
// ----------------------
imgInput.addEventListener("change", async () => {
  if (!activePostcardId) return;
  const file = imgInput.files[0];
  if (!file) return;

  try {
    const base64 = await resizeImage(file, 800);
    postcards[activePostcardId].image = base64;
    savePostcards();

    imgPreview.src = base64;
    imgPreview.classList.remove("hidden");
  } catch (err) {
    console.error("Failed to process image:", err);
    alert("Failed to process image. Try a smaller file.");
  }
});

// ----------------------
// Save button handler
// ----------------------
saveBtn.addEventListener("click", () => {
  if (!activePostcardId) return;

  const titleInput = document.getElementById("pcTitle");
  const notesInput = document.getElementById("pcNotes");

  const pc = postcards[activePostcardId];
  pc.title = titleInput.value || "";
  pc.notes = notesInput.value || "";

  // Keep previously uploaded image
  pc.image = pc.image || (imgPreview.src && imgPreview.src !== "" ? imgPreview.src : "");

  savePostcards();
  modal.classList.add("hidden");
  activePostcardId = null;

  // Refresh gallery immediately
  renderGallery();
});

// ----------------------
// LocalStorage helpers
// ----------------------
function savePostcards() {
  localStorage.setItem("postcards", JSON.stringify(postcards));
}

// ----------------------
// Helper: find pin coords
// ----------------------
function findPinCoords(id) {
  const pins = JSON.parse(localStorage.getItem("pins")) || [];
  const pin = pins.find(p => p.id === id);
  return pin ? pin.coords : [0, 0];
}

// ----------------------
// Create empty postcard
// ----------------------
export function createEmptyPostcard(id, coords) {
  postcards[id] = {
    id,
    coords,
    title: "",
    notes: "",
    image: ""
  };
  savePostcards();
}
