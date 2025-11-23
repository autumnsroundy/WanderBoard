// postcards.js
import { map } from "./map.js";

// DOM references
const modal = document.getElementById("postcardModal");
const closeModalBtn = document.getElementById("closeModal");
const titleInput = document.getElementById("pcTitle");
const notesInput = document.getElementById("pcNotes");
const imgInput = document.getElementById("pcImage");
const imgPreview = document.getElementById("pcPreview");
const saveBtn = document.getElementById("savePostcard");

let postcards = JSON.parse(localStorage.getItem("postcards")) || {};
let activePostcardId = null;

// Exported function to open postcard from a pin
export function openPostcardForPin(id) {
    activePostcardId = id;

    // If postcard doesn't exist, create it
    if (!postcards[id]) {
        postcards[id] = {
            id,
            coords: findPinCoords(id),
            title: "",
            notes: "",
            imageUrl: ""
        };
        savePostcards();
    }

    const pc = postcards[id];
    titleInput.value = pc.title;
    notesInput.value = pc.notes;

    if (pc.imageUrl) {
        imgPreview.src = pc.imageUrl;
        imgPreview.classList.remove("hidden");
    } else {
        imgPreview.classList.add("hidden");
    }

    modal.classList.remove("hidden");
}

// Close modal
closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
});

// Image upload
imgInput.addEventListener("change", () => {
    const file = imgInput.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    imgPreview.src = url;
    imgPreview.classList.remove("hidden");

    postcards[activePostcardId].imageUrl = url;
    savePostcards();
});

// Save button
saveBtn.addEventListener("click", () => {
    const pc = postcards[activePostcardId];
    pc.title = titleInput.value;
    pc.notes = notesInput.value;
    savePostcards();
    modal.classList.add("hidden");
});

// Save postcards to localStorage
function savePostcards() {
    localStorage.setItem("postcards", JSON.stringify(postcards));
}

// Helper: find pin coordinates
function findPinCoords(id) {
    const pins = JSON.parse(localStorage.getItem("pins")) || [];
    const pin = pins.find(p => p.id === id);
    return pin ? pin.coords : [0, 0];
}

// Create an empty postcard for a new pin
export function createEmptyPostcard(id, coords) {
    postcards[id] = {
        id,
        coords,
        title: "",
        notes: "",
        imageUrl: ""
    };
    savePostcards();
}
