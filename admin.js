
⚠️ ADD THIS TO TOP OF admin.js(SECURITY GUARD)

import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

/* ---------------- AUTH PROTECTION ---------------- */

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
    } else {
        document.getElementById("adminName").innerText = user.email;
    }
});

/* ---------------- LOGOUT ---------------- */

window.logout = async () => {
    await signOut(auth);
    window.location.href = "login.html";
};

import { db } from "./firebase.js";
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

/* ---------------- FIR LOAD ---------------- */

const firTable = document.getElementById("firTable");
const totalFir = document.getElementById("totalFir");

function loadFIR() {
    onSnapshot(collection(db, "firReports"), (snapshot) => {

        firTable.innerHTML = "";

        totalFir.innerText = snapshot.size;

        snapshot.forEach((docItem) => {
            const data = docItem.data();

            firTable.innerHTML += `
        <tr>
          <td>${docItem.id}</td>
          <td>${data.name}</td>
          <td>${data.crime}</td>
          <td>${data.location}</td>
          <td>${data.status || "Pending"}</td>
          <td>
            <button onclick="deleteFIR('${docItem.id}')">Delete</button>
          </td>
        </tr>
      `;
        });

    });
}

/* ---------------- DELETE FIR ---------------- */

window.deleteFIR = async (id) => {
    await deleteDoc(doc(db, "firReports", id));
    alert("FIR Deleted");
};

/* ---------------- ADD FIR ---------------- */

window.addFIR = async () => {

    const name = prompt("Enter Name");
    const crime = prompt("Enter Crime");
    const location = prompt("Enter Location");

    if (!name || !crime) return;

    await addDoc(collection(db, "firReports"), {
        name,
        crime,
        location,
        status: "Pending",
        time: Date.now()
    });

    alert("FIR Added");
};

/* ---------------- INIT ---------------- */

loadFIR();
// admin.js (PART 3)

import { db } from "./firebase.js";
import {
    collection,
    onSnapshot,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

/* ---------------- OFFICERS COUNT ---------------- */

const totalOfficer = document.getElementById("totalOfficer");

function loadOfficers() {
    onSnapshot(collection(db, "officers"), (snapshot) => {
        totalOfficer.innerText = snapshot.size;
    });
}

/* ---------------- CRIMINALS COUNT ---------------- */

const totalCriminal = document.getElementById("totalCriminal");

function loadCriminals() {
    onSnapshot(collection(db, "criminals"), (snapshot) => {
        totalCriminal.innerText = snapshot.size;
    });
}

/* ---------------- ADD OFFICER ---------------- */

window.addOfficer = async () => {

    const name = prompt("Officer Name");
    const badge = prompt("Badge ID");

    if (!name || !badge) return;

    await addDoc(collection(db, "officers"), {
        name,
        badge,
        time: Date.now()
    });

    alert("Officer Added");
};

/* ---------------- ADD CRIMINAL ---------------- */

window.addCriminal = async () => {

    const name = prompt("Criminal Name");
    const caseId = prompt("Case ID");

    if (!name || !caseId) return;

    await addDoc(collection(db, "criminals"), {
        name,
        caseId,
        time: Date.now()
    });

    alert("Criminal Added");
};

/* ---------------- INIT ---------------- */

loadOfficers();
loadCriminals();
// admin.js (PART 4)

import { db } from "./firebase.js";
import {
    collection,
    onSnapshot,
    orderBy,
    query
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import Chart from "https://cdn.jsdelivr.net/npm/chart.js";

/* ---------------- CRIME CHART ---------------- */

const ctx = document.getElementById("crimeChart");

function loadChart() {

    const q = query(collection(db, "firReports"), orderBy("time", "desc"));

    onSnapshot(q, (snapshot) => {

        let crimes = {};

        snapshot.forEach((doc) => {
            const data = doc.data();
            crimes[data.crime] = (crimes[data.crime] || 0) + 1;
        });

        const labels = Object.keys(crimes);
        const values = Object.values(crimes);

        new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    label: "Crime Analysis",
                    data: values
                }]
            }
        });

    });
}

/* ---------------- INIT CHART ---------------- */

loadChart();
// admin.js (FINAL PART)

import { auth } from "./firebase.js";
import {
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

/* ---------------- AUTH CHECK ---------------- */

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
    } else {
        document.getElementById("adminName").innerText =
            user.email || "Admin";
    }
});

/* ---------------- LOGOUT ---------------- */

window.logout = async () => {
    await signOut(auth);
    window.location.href = "login.html";
};

/* ---------------- BUTTON EVENTS ---------------- */

document.getElementById("logoutBtn").addEventListener("click", logout);

document.getElementById("addFir").addEventListener("click", addFIR);
document.getElementById("addOfficer").addEventListener("click", addOfficer);
document.getElementById("addCriminal").addEventListener("click", addCriminal);

/* ---------------- INIT ---------------- */

console.log("Admin Panel Loaded");
/* ---------------- ALERT SYSTEM ---------------- */

function playAlert() {
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
    audio.play();
}

onSnapshot(collection(db, "firReports"), (snap) => {

    const currentCount = snap.size;
    const oldCount = window.lastFirCount || 0;

    // NEW FIR ALERT
    if (currentCount > oldCount) {
        playAlert();
        alert("🚨 New FIR Report Received!");
    }

    window.lastFirCount = currentCount;
});
/* ---------------- AUTO UI SYNC ---------------- */

setInterval(() => {

    onSnapshot(collection(db, "firReports"), (snap) => {
        document.getElementById("totalFir").innerText = snap.size;
    });

}, 5000);
/* ---------------- TOP NOTIFICATION BELL ---------------- */

window.bell = document.createElement("div");
bell.innerHTML = "🔔";
bell.style.position = "fixed";
bell.style.top = "15px";
bell.style.right = "15px";
bell.style.fontSize = "22px";
bell.style.cursor = "pointer";
bell.style.zIndex = "9999";
bell.style.animation = "blink 1s infinite";

document.body.appendChild(bell);

bell.addEventListener("click", () => {
    alert("🚨 Check Latest FIR Reports in Dashboard");
    bell.style.animation = "none";
});
/* ---------------- CLEAN + FIXED NOTIFICATION SYSTEM ---------------- */

import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

/* 🔔 CREATE NOTIFICATION BELL */
window.bell = document.createElement("div");
bell.innerHTML = "🔔";
bell.style.position = "fixed";
bell.style.top = "15px";
bell.style.right = "15px";
bell.style.fontSize = "24px";
bell.style.cursor = "pointer";
bell.style.zIndex = "9999";
bell.style.animation = "blink 1s infinite";
document.body.appendChild(bell);

/* 🚨 ALERT SOUND */
function playAlert() {
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
    audio.play();
}

/* 📡 FIRESTORE REAL-TIME LISTENER */
onSnapshot(collection(db, "firReports"), (snap) => {

    snap.docChanges().forEach((change) => {
        if (change.type === "added") {
            playAlert();
            console.log("🚨 New FIR:", change.doc.data());

            // visual blink effect
            bell.style.color = "red";
            setTimeout(() => {
                bell.style.color = "white";
            }, 1000);
        }
    });

});
import {
    listenReports,
    deleteReport,
    updateStatus
} from "./firebase.js";

/* ---------------- DOM ---------------- */

const firTable = document.getElementById("firTable");
const totalFir = document.getElementById("totalFir");

/* ---------------- LIVE DATA ---------------- */

listenReports((snapshot) => {
    firTable.innerHTML = "";

    totalFir.innerText = snapshot.size;

    snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const id = docSnap.id;

        const row = `
      <tr>
        <td>${data.firNo || id}</td>
        <td>${data.fullname || "-"}</td>
        <td>${data.crimeType || "-"}</td>
        <td>${data.location || "-"}</td>
        <td>
          <select onchange="changeStatus('${id}', this.value)">
            <option ${data.status === "Pending" ? "selected" : ""}>Pending</option>
            <option ${data.status === "Under Investigation" ? "selected" : ""}>Under Investigation</option>
            <option ${data.status === "Solved" ? "selected" : ""}>Solved</option>
          </select>
        </td>
        <td>
          <button onclick="removeReport('${id}')">Delete</button>
        </td>
      </tr>
    `;

        firTable.innerHTML += row;
    });
});

/* ---------------- ACTIONS ---------------- */

window.removeReport = async (id) => {
    await deleteReport(id);
    alert("🗑 Report Deleted");
};

window.changeStatus = async (id, status) => {
    await updateStatus(id, status);
};