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

// Convert File → Base64
function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
}

// Open postcard from pin
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
    titleInput.value = pc.title;
    notesInput.value = pc.notes;

    if (pc.image) {
        imgPreview.src = pc.image;
        imgPreview.classList.remove("hidden");
    } else {
        imgPreview.classList.add("hidden");
    }

    modal.classList.remove("hidden");
}

// Close modal
closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    activePostcardId = null;
});

// Image upload
imgInput.addEventListener("change", async () => {
    if (!activePostcardId) return;
    const file = imgInput.files[0];
    if (!file) return;

    const base64 = await convertToBase64(file);
    postcards[activePostcardId].image = base64;
    savePostcards();

    imgPreview.src = base64;
    imgPreview.classList.remove("hidden");
});

// Save title & notes
saveBtn.addEventListener("click", () => {
    if (!activePostcardId) return;

    const pc = postcards[activePostcardId];
    pc.title = titleInput.value;
    pc.notes = notesInput.value;

    savePostcards();
    modal.classList.add("hidden");
    activePostcardId = null;
});

// Save postcards to localStorage
function savePostcards() {
    localStorage.setItem("postcards", JSON.stringify(postcards));
}

// Get pin coords
function findPinCoords(id) {
    const pins = JSON.parse(localStorage.getItem("pins")) || [];
    const pin = pins.find(p => p.id === id);
    return pin ? pin.coords : [0, 0];
}

// Create empty postcard
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
