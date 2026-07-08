// ================= MAP INIT =================
let map;
let userMarker;
let stationMarker;

// Demo police stations (Lucknow example)
const policeStations = [
    { name: "Hazratganj Police Station", lat: 26.8467, lng: 80.9462 },
    { name: "Aliganj Police Station", lat: 26.8800, lng: 80.9500 },
    { name: "Gomti Nagar Police Station", lat: 26.8500, lng: 81.0000 }
];

// ================= GET LOCATION =================
function getLocation() {

    if (!navigator.geolocation) {
        alert("Geolocation not supported");
        return;
    }

    navigator.geolocation.getCurrentPosition((position) => {

        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        // ================= INIT MAP =================
        if (!map) {
            map = L.map("map").setView([userLat, userLng], 13);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "&copy; OpenStreetMap contributors"
            }).addTo(map);
        } else {
            map.setView([userLat, userLng], 13);
        }

        // ================= USER MARKER =================
        if (userMarker) map.removeLayer(userMarker);

        userMarker = L.marker([userLat, userLng])
            .addTo(map)
            .bindPopup("📍 Your Location")
            .openPopup();

        // ================= FIND NEAREST =================
        let nearest = null;
        let minDist = Infinity;

        policeStations.forEach((station) => {

            const dist = getDistance(
                userLat, userLng,
                station.lat, station.lng
            );

            if (dist < minDist) {
                minDist = dist;
                nearest = station;
            }
        });

        // ================= NEAREST MARKER =================
        if (stationMarker) map.removeLayer(stationMarker);

        stationMarker = L.marker([nearest.lat, nearest.lng])
            .addTo(map)
            .bindPopup("🚔 " + nearest.name)
            .openPopup();

        // ================= INFO =================
        document.getElementById("stationInfo").innerHTML =
            `🚔 Nearest Station: <b>${nearest.name}</b>`;

    }, () => {
        alert("Location permission denied");
    });
}


// ================= DISTANCE FUNCTION =================
function getDistance(lat1, lon1, lat2, lon2) {

    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // km
}