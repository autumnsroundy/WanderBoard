import { openPostcardForPin } from "./postcards.js";

const galleryContainer = document.getElementById("postcardList");

function readPostcards() {
  const raw = localStorage.getItem("postcards") || "{}";
  try {
    const obj = JSON.parse(raw);
    return Object.values(obj).sort((a, b) => b.id - a.id);
  } catch (e) {
    console.error("Failed to parse postcards from localStorage", e);
    return [];
  }
}

function formatDateFromId(id) {
  const n = Number(id);
  if (!isNaN(n) && n > 1000) return new Date(n).toLocaleString();
  return "";
}

function createCardElement(pc) {
  const card = document.createElement("article");
  card.className = "gallery-card";
  card.dataset.id = pc.id;

  const imgWrap = document.createElement("div");
  imgWrap.className = "gallery-thumb-wrap";

  const thumb = document.createElement("img");
  thumb.className = "gallery-thumb";

  // FIXED: postcards.js uses pc.image, not imageUrl
  thumb.src = pc.image || "assets/placeholder-card.png";
  thumb.alt = pc.title || "Postcard image";

  imgWrap.appendChild(thumb);

  const title = document.createElement("h3");
  title.className = "gallery-title";
  title.textContent = pc.title || "Untitled Postcard";

  const date = document.createElement("div");
  date.className = "gallery-date";
  date.textContent = formatDateFromId(pc.id);

  const actions = document.createElement("div");
  actions.className = "gallery-actions";

  const openBtn = document.createElement("button");
  openBtn.className = "btn small";
  openBtn.textContent = "Open";
  openBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openPostcardForPin(pc.id);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn small danger";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    handleDelete(pc.id);
  });

  actions.appendChild(openBtn);
  actions.appendChild(deleteBtn);

  card.appendChild(imgWrap);
  card.appendChild(title);
  card.appendChild(date);
  card.appendChild(actions);

  // Click anywhere on card = open postcard
  card.addEventListener("click", () => openPostcardForPin(pc.id));

  return card;
}

function handleDelete(id) {
  const ok = confirm("Delete this postcard and its pin? This cannot be undone.");
  if (!ok) return;

  // delete postcard
  const raw = localStorage.getItem("postcards") || "{}";
  const mapPost = JSON.parse(raw);
  delete mapPost[id];
  localStorage.setItem("postcards", JSON.stringify(mapPost));

  // delete pin
  const rawPins = localStorage.getItem("pins") || "[]";
  let pins = JSON.parse(rawPins);
  pins = pins.filter(p => String(p.id) !== String(id));
  localStorage.setItem("pins", JSON.stringify(pins));

  // refresh gallery
  renderGallery();

  // if map is visible, refresh markers
  if (!document.getElementById("mapView").classList.contains("hidden")) {
    location.reload();
  }
}

export function renderGallery() {
  if (!galleryContainer) return;
  const postcards = readPostcards();
  galleryContainer.innerHTML = "";

  if (postcards.length === 0) {
    const empty = document.createElement("div");
    empty.className = "gallery-empty";
    empty.innerHTML = `<p>No postcards yet. Drop a pin on the map to get started!</p>`;
    galleryContainer.appendChild(empty);
    return;
  }

  const grid = document.createElement("div");
  grid.className = "gallery-grid";

  postcards.forEach(pc => {
    grid.appendChild(createCardElement(pc));
  });

  galleryContainer.appendChild(grid);
}
