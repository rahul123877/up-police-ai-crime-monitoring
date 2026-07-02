import { db } from "./firebase.js";
import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let allCrimes = [];

// Load Dashboard Data
async function loadDashboard() {
    try {
        const querySnapshot = await getDocs(collection(db, "crimeReports"));

        let total = querySnapshot.size;
        let solved = 0;
        let pending = 0;

        const table = document.getElementById("crimeTable");
        table.innerHTML = "";

        allCrimes = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();

            // Store data for search
            allCrimes.push({
                id: doc.id,
                ...data
            });

            // Count solved/pending
            if (data.status === "Solved") {
                solved++;
            } else {
                pending++;
            }

            // Add table row
            table.innerHTML += `
                <tr>
                    <td>${doc.id}</td>
                    <td>${data.crimeType || "N/A"}</td>
                    <td>${data.location || "N/A"}</td>
                    <td class="${data.status === "Solved" ? "solved" : "pending"}">
                        ${data.status || "Pending"}
                    </td>
                </tr>
            `;
        });

        // Update cards
        document.getElementById("totalCrime").innerText = total;
        document.getElementById("solvedCase").innerText = solved;
        document.getElementById("pendingCase").innerText = pending;
        document.getElementById("aiAlert").innerText = pending;

    } catch (error) {
        console.error("Error loading dashboard:", error);
    }
}

// Search Function
window.liveSearch = function () {
    const searchValue = document.getElementById("searchBox").value.toLowerCase();
    const table = document.getElementById("crimeTable");

    table.innerHTML = "";

    const filteredCrimes = allCrimes.filter((crime) =>
        crime.crimeType?.toLowerCase().includes(searchValue) ||
        crime.location?.toLowerCase().includes(searchValue) ||
        crime.status?.toLowerCase().includes(searchValue)
    );

    filteredCrimes.forEach((crime) => {
        table.innerHTML += `
            <tr>
                <td>${crime.id}</td>
                <td>${crime.crimeType}</td>
                <td>${crime.location}</td>
                <td>${crime.status}</td>
            </tr>
        `;
    });
};

// Run function
loadDashboard();