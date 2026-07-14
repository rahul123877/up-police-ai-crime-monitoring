import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

let map, marker, circle;
let currentLatitude = null;
let currentLongitude = null;
let closestStationName = "Unknown Station";
let closestDistance = null;

// Mock Police Stations Coordinates Database (Example: Delhi/NCR region - replace with your local stations)
const policeStations = [
    { name: "Hazratganj Police Station", lat: 26.8467, lng: 80.9462 },
    { name: "Connaught Place Police Station", lat: 28.6304, lng: 77.2177 },
    { name: "Noida Sector 20 Police Station", lat: 28.5772, lng: 77.3261 },
    { name: "Indirapuram Police Station", lat: 28.6477, lng: 77.3711 },
    { name: "Ghaziabad Kotwali", lat: 28.6678, lng: 77.4244 }
];

const liveAddressText = document.getElementById("liveAddress");
const nearestStationText = document.getElementById("nearestStation");
const stationDistanceText = document.getElementById("stationDistance");
const gpsStatus = document.getElementById("gpsStatus");

// Calculate Distance via Haversine Formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function findNearestStation(userLat, userLng) {
    let minDistance = Infinity;
    let nearest = policeStations[0];

    policeStations.forEach(station => {
        const dist = calculateDistance(userLat, userLng, station.lat, station.lng);
        if (dist < minDistance) {
            minDistance = dist;
            nearest = station;
        }
    });

    closestStationName = nearest.name;
    closestDistance = minDistance.toFixed(2);

    nearestStationText.innerText = closestStationName;
    stationDistanceText.innerText = `${closestDistance} km`;
}

function initMap() {
    map = L.map("map").setView([28.6139, 77.2090], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap"
    }).addTo(map);
}

function updateLocationUI(lat, lng) {
    currentLatitude = lat;
    currentLongitude = lng;
    liveAddressText.innerText = `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
    gpsStatus.innerText = "GPS Connected";

    if (marker) map.removeLayer(marker);
    if (circle) map.removeLayer(circle);

    marker = L.marker([lat, lng]).addTo(map).bindPopup("🚨 Current SOS Point").openPopup();
    circle = L.circle([lat, lng], { radius: 100, color: 'red', fillOpacity: 0.15 }).addTo(map);
    map.setView([lat, lng], 15);

    findNearestStation(lat, lng);
}

function trackGPS() {
    if (!navigator.geolocation) {
        gpsStatus.innerText = "Geolocation not supported";
        return;
    }
    navigator.geolocation.getCurrentPosition(position => {
        updateLocationUI(position.coords.latitude, position.coords.longitude);
    }, () => {
        gpsStatus.innerText = "Permission Denied";
    }, { enableHighAccuracy: true });
}

// Trigger Firebase SOS Data Entry
async function fireSOS() {
    const nameInput = document.getElementById("username");
    const phoneInput = document.getElementById("phone");
    const msgInput = document.getElementById("message");

    if (!currentLatitude || !currentLongitude) return alert("Detecting coordinates. Please wait...");
    if (!nameInput.value.trim() || !phoneInput.value.trim()) return alert("Fill Name and Mobile details.");

    document.getElementById("loadingOverlay").style.display = "flex";

    const sosPayload = {
        name: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
        message: msgInput.value.trim(),
        latitude: currentLatitude,
        longitude: currentLongitude,
        nearestStation: closestStationName,
        distanceKM: closestDistance,
        status: "ACTIVE",
        createdAt: serverTimestamp()
    };

    try {
        await addDoc(collection(db, "SOS"), sosPayload);
        document.getElementById("loadingOverlay").style.display = "none";
        document.getElementById("stationAssigned").innerText = `Dispatched to: ${closestStationName} (${closestDistance} km)`;
        document.getElementById("successPopup").style.display = "block";
        setTimeout(() => document.getElementById("successPopup").style.display = "none", 4000);
    } catch (err) {
        document.getElementById("loadingOverlay").style.display = "none";
        alert("Firestore Error: " + err.message);
    }
}

document.getElementById("sosBtn").addEventListener("click", fireSOS);
document.getElementById("getLocationBtn").addEventListener("click", trackGPS);
window.addEventListener("load", () => { initMap(); trackGPS(); });