import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    Timestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const form = document.getElementById("firForm");
const table = document.getElementById("firTable");
const statusBox = document.getElementById("statusUpdate");


// ================= AI RISK =================

function getRiskLevel(crime, priority) {

    if (
        priority === "Critical" ||
        crime === "Murder" ||
        crime === "Kidnapping"
    ) {
        return "High";
    }

    if (
        priority === "High" ||
        crime === "Robbery" ||
        crime === "Cyber Crime"
    ) {
        return "Medium";
    }

    return "Low";
}



// ================= FIR ID =================

function createFirID() {

    const now = new Date();

    return "FIR-" +
        now.getFullYear() +
        "-" +
        Math.floor(
            1000 + Math.random() * 9000
        );

}



// ================= STATUS =================

function updateStatus(message, type = "success") {

    statusBox.className =
        "status-card " + type;

    statusBox.innerHTML = `

        <h3>${message}</h3>

        <p>

        AI Crime Monitoring Updated Successfully

        </p>

    `;

}
// ================= FIR SUBMIT =================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const firID = createFirID();

    const name = document.getElementById("name").value;

    const mobile = document.getElementById("mobile").value;

    const email = document.getElementById("email").value;

    const crime = document.getElementById("crime").value;

    const priority = document.getElementById("priority").value;

    const incidentDate =
        document.getElementById("incidentDate").value;

    const incidentTime =
        document.getElementById("incidentTime").value;

    const location =
        document.getElementById("location").value;

    const gpsLocation =
        document.getElementById("gpsLocation").value;

    const emergency =
        document.getElementById("emergency").value;

    const address =
        document.getElementById("address").value;

    const details =
        document.getElementById("details").value;

    const evidence =
        document.getElementById("evidence");



    const risk =
        getRiskLevel(crime, priority);



    document.getElementById("riskLevel").value =
        risk;



    let evidenceNames = [];



    if (evidence.files.length > 0) {

        for (let file of evidence.files) {

            evidenceNames.push(file.name);

        }

    }



    const firData = {

        firID,

        name,

        mobile,

        email,

        crime,

        priority,

        incidentDate,

        incidentTime,

        location,

        gpsLocation,

        emergency,

        address,

        details,

        evidence: evidenceNames,

        risk,

        status: "Pending",

        createdAt: Timestamp.now()

    };



    try {

        await addDoc(

            collection(db, "firs"),

            firData

        );



        updateStatus(

            "✅ FIR Submitted Successfully"

        );



        alert(

            "FIR Registered Successfully\n\nFIR Number : " +

            firID

        );



        form.reset();



        document.getElementById("riskLevel").value =
            "Pending AI Analysis";



        loadFIR();



    }

    catch (error) {

        console.error(error);



        updateStatus(

            "❌ Submission Failed",

            "error"

        );



        alert(error.message);

    }

});
// ================= LOAD FIR =================

async function loadFIR() {

    table.innerHTML = "";

    const snapshot = await getDocs(
        collection(db, "firs")
    );

    snapshot.forEach((documentData) => {

        const fir = documentData.data();

        const row = `

<tr>

<td>${fir.firID}</td>

<td>${fir.name}</td>

<td>${fir.crime}</td>

<td>${fir.priority}</td>

<td>${fir.location}</td>

<td>

${fir.incidentDate}

<br>

${fir.incidentTime}

</td>

<td>

<span class="status ${fir.status.toLowerCase()}">

${fir.status}

</span>

</td>

<td>

<button
class="delete-btn"
onclick="deleteFIR('${documentData.id}')">

Delete

</button>

</td>

</tr>

`;

        table.innerHTML += row;

    });

}






// ================= DELETE FIR =================

window.deleteFIR = async function (id) {

    const ok = confirm(
        "Delete this FIR?"
    );

    if (!ok) return;

    try {

        await deleteDoc(
            doc(db, "firs", id)
        );

        loadFIR();

    }

    catch (err) {

        alert(err.message);

    }

};







// ================= SEARCH =================

const searchBox =
    document.getElementById("searchFir");



if (searchBox) {

    searchBox.addEventListener("keyup", function () {

        const value =
            this.value.toLowerCase();

        const rows =
            table.querySelectorAll("tr");

        rows.forEach(row => {

            row.style.display =
                row.innerText
                    .toLowerCase()
                    .includes(value)

                    ? ""

                    : "none";

        });

    });

}
// ================= DASHBOARD COUNTERS =================

async function updateDashboardStats() {

    try {

        const snapshot = await getDocs(collection(db, "firs"));

        let total = 0;
        let pending = 0;
        let approved = 0;
        let critical = 0;

        snapshot.forEach((docSnap) => {

            total++;

            const fir = docSnap.data();

            if (fir.status === "Pending") {
                pending++;
            }

            if (fir.status === "Approved") {
                approved++;
            }

            if (
                fir.priority === "Critical" ||
                fir.risk === "High"
            ) {
                critical++;
            }

        });

        const totalBox = document.getElementById("totalFir");
        const pendingBox = document.getElementById("pendingFir");
        const approvedBox = document.getElementById("approvedFir");
        const criticalBox = document.getElementById("criticalFir");

        if (totalBox) totalBox.textContent = total;
        if (pendingBox) pendingBox.textContent = pending;
        if (approvedBox) approvedBox.textContent = approved;
        if (criticalBox) criticalBox.textContent = critical;

    } catch (err) {

        console.error("Dashboard stats error:", err);

    }

}



// ================= REFRESH DATA =================

async function refreshPageData() {

    await loadFIR();

    await updateDashboardStats();

}



// ================= AUTO REFRESH =================

setInterval(() => {

    refreshPageData();

}, 10000);



// ================= INITIAL LOAD =================

window.addEventListener("DOMContentLoaded", async () => {

    await refreshPageData();

});



// ================= AI STATUS MESSAGE =================

console.log("✅ AI Crime Monitoring FIR System Loaded Successfully");