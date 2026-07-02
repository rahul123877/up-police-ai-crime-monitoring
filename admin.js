import { db } from "./firebase.js";
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Load FIR Data
async function loadAdminData() {
    const querySnapshot = await getDocs(collection(db, "crimeReports"));

    const table = document.getElementById("adminTable");
    table.innerHTML = "";

    querySnapshot.forEach((firDoc) => {
        const data = firDoc.data();

        table.innerHTML += `
            <tr>
                <td>${data.name || "N/A"}</td>
                <td>${data.crimeType || "N/A"}</td>
                <td>${data.location || "N/A"}</td>
                <td>${data.status || "Pending"}</td>
                <td>
                    <button onclick="approveFIR('${firDoc.id}')" class="btn">Approve</button>
                    <button onclick="deleteFIR('${firDoc.id}')" class="btn">Delete</button>
                </td>
            </tr>
        `;
    });
}

// Approve FIR
window.approveFIR = async function (id) {
    await updateDoc(doc(db, "crimeReports", id), {
        status: "Solved"
    });

    alert("FIR Approved Successfully");
    loadAdminData();
};

// Delete FIR
window.deleteFIR = async function (id) {
    await deleteDoc(doc(db, "crimeReports", id));

    alert("FIR Deleted Successfully");
    loadAdminData();
};

// Start
loadAdminData();