import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
    getFirestore,
    collection,
    onSnapshot,
    deleteDoc,
    updateDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC8aoQxs8QuweHroIsNSH9tL5DyTMa3JBg",
    authDomain: "ai-crime-monitoring.firebaseapp.com",
    projectId: "ai-crime-monitoring",
    storageBucket: "ai-crime-monitoring.firebasestorage.app",
    messagingSenderId: "1006416656939",
    appId: "1:1006416656939:web:ea42ff5c576b3b60af486e",
    measurementId: "G-8J2VBLW3LX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

const adminTable = document.getElementById("adminTable");

if (adminTable) {
    onSnapshot(collection(db, "reports"), (snapshot) => {
        adminTable.innerHTML = "";

        snapshot.forEach((item) => {
            let data = item.data();

            // Saari rows aur columns bilkul same hain, koi data kam nahi hoga
            adminTable.innerHTML += `
                <tr>
                    <td>${data.name}</td>
                    <td>${data.crime}</td>
                    <td>${data.location}</td>
                    <td>${data.status || "Pending"}</td>
                    <td>
                        <button onclick="markSolved('${item.id}')">Solved</button>
                        <button onclick="deleteReport('${item.id}')">Delete</button>
                    </td>
                </tr>
            `;
        });
    });
}

// Window functions taaki HTML buttons bina kisi dikkat ke call ho sakein
window.deleteReport = async (id) => {
    try {
        await deleteDoc(doc(db, "reports", id));
        alert("Report Deleted");
    } catch (error) {
        console.error("Error deleting report: ", error);
    }
}

window.markSolved = async (id) => {
    try {
        await updateDoc(doc(db, "reports", id), {
            status: "Solved"
        });
        alert("Marked Solved");
    } catch (error) {
        console.error("Error updating status: ", error);
    }
}