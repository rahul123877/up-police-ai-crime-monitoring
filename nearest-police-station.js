let map = L.map('map').setView([26.8467, 80.9462], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: "© OpenStreetMap"
}).addTo(map);

// ================= POLICE STATIONS =================
const policeStations = [
    { name: "Hazratganj Police Station", lat: 26.8480, lng: 80.9425 },
    { name: "Alambagh Police Station", lat: 26.8145, lng: 80.9002 },
    { name: "Gomti Nagar Police Station", lat: 26.8650, lng: 81.0100 }
];

let userMarker;
let stationMarker;

// ================= DISTANCE FUNCTION =================
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ================= GET LOCATION =================
function getLocation() {

    if (!navigator.geolocation) {
        alert("Geolocation not supported");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        function (position) {

            let userLat = position.coords.latitude;
            let userLng = position.coords.longitude;

            // remove old marker
            if (userMarker) map.removeLayer(userMarker);

            userMarker = L.marker([userLat, userLng])
                .addTo(map)
                .bindPopup("📍 Your Location")
                .openPopup();

            map.setView([userLat, userLng], 14);

            let nearest = null;
            let minDistance = Infinity;

            // remove old station marker
            if (stationMarker) map.removeLayer(stationMarker);

            policeStations.forEach(station => {

                const distance = getDistance(
                    userLat,
                    userLng,
                    station.lat,
                    station.lng
                );

                if (distance < minDistance) {
                    minDistance = distance;
                    nearest = station;
                }

                // show all stations
                L.marker([station.lat, station.lng])
                    .addTo(map)
                    .bindPopup(station.name);
            });

            // highlight nearest
            stationMarker = L.marker([nearest.lat, nearest.lng], {
                icon: L.icon({
                    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
                    iconSize: [35, 35]
                })
            })
                .addTo(map)
                .bindPopup("🚔 Nearest: " + nearest.name)
                .openPopup();

            document.getElementById("stationInfo").innerHTML =
                `🚔 Nearest Police Station: <b>${nearest.name}</b><br>
                 📍 Distance: ${minDistance.toFixed(2)} KM`;
        },

        function (error) {
            alert("Location access denied ❌");
        }
    );
}