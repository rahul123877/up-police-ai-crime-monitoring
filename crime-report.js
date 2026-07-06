import { db } from "../firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.getElementById("crimeForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const firNo = "FIR-" + Date.now();

    const data = {
        firNo,
        fullname: document.getElementById("fullname").value,
        mobile: document.getElementById("mobile").value,
        crimeType: document.getElementById("crimeType").value,
        description: document.getElementById("description").value,
        location: document.getElementById("crimeLocation").value,
        priority: document.getElementById("priority").value,
        status: document.getElementById("status").value,
        officer: document.getElementById("officer").value,
        latitude: document.getElementById("latitude").value,
        longitude: document.getElementById("longitude").value,
        time: new Date().toISOString()
    };

    await addDoc(collection(db, "crimeReports"), data);

    alert("🚔 Crime Report Saved Successfully: " + firNo);

    document.getElementById("crimeForm").reset();
});
document.getElementById("crimeForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const firNo = "FIR-" + Date.now();
    document.getElementById("firNo").value = firNo;

    const data = {
        firNo,
        fullname: document.getElementById("fullname").value,
        mobile: document.getElementById("mobile").value,
        crimeType: document.getElementById("crimeType").value,
        description: document.getElementById("description").value,
        location: document.getElementById("crimeLocation").value,
        time: new Date().toISOString()
    };

    import("./js/crime-report.js").then(async (module) => {
        await module.saveCrimeReport(data);
    });

    // SHOW POPUP
    document.getElementById("firText").innerText = "FIR ID: " + firNo;
    document.getElementById("successPopup").style.display = "flex";

    document.getElementById("crimeForm").reset();
});