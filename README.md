**🗺️ WanderBoard**

WanderBoard is an interactive web application that lets users drop pins anywhere on a world map and attach “digital postcards” with titles, notes, and optional images.
All data is saved automatically using localStorage, creating a personal travel journal that persists across browser sessions.
This project was built for WDD II and demonstrates state management, multi-view UI design, map rendering, and interactive user input.

**🌟 Features (Planned + Completed)**

**✅ Current Features**
- Interactive world map built with Leaflet.js
- Drop pins by clicking anywhere on the map
- Pins save automatically to localStorage
- Persistent postcard data (title, notes, image)
- Postcard modal for creating/editing memories
- Image upload support with preview
- Gallery View showing all postcards in a responsive card layout
- Delete functionality for removing postcards and pins
- Navigation between Map and Gallery with active styling
- Warm, scrapbook-inspired theme + responsive layout

**🎯 Purpose**
WanderBoard allows users to visually document places they’ve traveled by attaching memories directly to locations on a world map.
Instead of a standard photo album, users create a scrapbook-like travel journal that feels personal, interactive, and creative.

**This project demonstrates:**
- Multi-view, state-driven UI
- Persistent local browser storage / retrieval 
- Working with a map rendering library
- Modular JavaScript structure
- External API usage (Leaflet + OSM)
- Basic animations and styled components
- CSS-based UI animations and styling
- Optional work with third-party APIs

**👤 Target Audience**
- Travelers and adventurers
- Students who want a visual memory board
- Anyone who prefers creative journaling over plain photo storage
- Casual users who enjoy map-based interfaces
- The design aims to feel warm, friendly, and scrapbook-like—not corporate or sterile.

**🛠️ Tech Stack**
Libraries
- Leaflet.js – Map UI + events
- OpenStreetMap – Map tiles
- CSS transitions – Flip animations, fades, movement
Browser APIs
- localStorage – Persist postcard objects & pin positions
- URL.createObjectURL() – (Planned) Handle user image uploads

**🗃️ Data Storage**
WanderBoard uses the browser’s localStorage to save:
- Pin coordinates
- Associated postcard data (text, images)
- Map state (optional stretch)
- A .json export/import system will allow users to save or restore their memory board.

**🎨 Style Guide**
Colors
- Sand Beige #F8EBD8
- Deep Ocean Blue #264653
- Postcard Red #C44536
- Forest Green #2A9D8F
Typography
- Headings: Serif — Georgia, Cormorant Garamond
- Body: Sans-serif — Inter, Roboto
UI Elements
- Rounded card edges
- Paper textures
- Small drop shadows
- Smooth fade + slide animations