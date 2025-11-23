🗺️ WanderBoard
A Digital Postcard Map for Travel Memories
WanderBoard is an interactive web application that lets users drop pins on a world map and attach “digital postcards” containing notes, photos, and travel memories. The app stores data locally so users can build a personal travel journal that persists across browser sessions.
This project is built for WDD II and demonstrates skills in multi-view UI design, state management, API consumption, and interactive map rendering.
🌟 Features (Planned + Completed)
✅ Current Features
Interactive world map using Leaflet.js
Drop pins by clicking anywhere on the map
Pins automatically save to localStorage
Map state persists between sessions
Simple navigation between Map View and Gallery View
🔧 In Development
Postcard modal UI
Image upload using URL.createObjectURL()
Editable notes tied to individual pins
Postcard gallery view
Export / import travel board to .json
Scrapbook-inspired UI styling + animations
🎯 Purpose
WanderBoard allows users to visually document places they’ve visited by attaching memories to locations on a map. Instead of using a typical photo album, users can create a creative scrapbook-like travel journal.
This project demonstrates:
Multi-view, state-driven UI
Local data storage + retrieval
Working with a map rendering library
Basic animations and styled components
Optional work with third-party APIs
👤 Target Audience
Travelers and adventurers
Students who want a visual memory board
Anyone who prefers creative journaling over plain photo storage
Casual users who enjoy map-based interfaces
The design aims to feel warm, friendly, and scrapbook-like—not corporate or sterile.
🛠️ Tech Stack
Libraries
Leaflet.js – Map UI + events
OpenStreetMap – Map tiles
CSS transitions – Flip animations, fades, movement
Browser APIs
localStorage – Persist postcard objects & pin positions
URL.createObjectURL() – (Planned) Handle user image uploads
🗃️ Data Storage
WanderBoard uses the browser’s localStorage to save:
Pin coordinates
Associated postcard data (text, images)
Map state (optional stretch)
A .json export/import system will allow users to save or restore their memory board.
🎨 Style Guide
Colors
Sand Beige #F8EBD8
Deep Ocean Blue #264653
Postcard Red #C44536
Forest Green #2A9D8F
Typography
Headings: Serif — Georgia, Cormorant Garamond
Body: Sans-serif — Inter, Roboto
UI Elements
Rounded card edges
Paper textures
Small drop shadows
Smooth fade + slide animations