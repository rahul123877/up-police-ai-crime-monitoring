import { db } from "./firebase.js";
import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

window.initMap = async function () {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: { lat: 26.8467, lng: 80.9462 } // Lucknow
    });

    const querySnapshot = await getDocs(collection(db, "crimeReports"));

    querySnapshot.forEach((doc) => {
        const data = doc.data();

        if (data.latitude && data.longitude) {
            new google.maps.Marker({
                position: {
                    lat: parseFloat(data.latitude),
                    lng: parseFloat(data.longitude)
                },
                map: map,
                title: data.crimeType
            });
        }
    });
};