import { db } from "../firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const form = document.getElementById("crimeForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {

        await addDoc(collection(db, "reports"), {

            name: document.getElementById("fullname").value,
            fatherName: document.getElementById("fathername").value,
            age: document.getElementById("age").value,
            gender: document.getElementById("gender").value,
            mobile: document.getElementById("mobile").value,
            email: document.getElementById("email").value,

            address: document.getElementById("address").value,
            state: document.getElementById("state").value,
            district: document.getElementById("district").value,
            policeStation: document.getElementById("policeStation").value,

            crime: document.getElementById("crimeType").value,
            location: document.getElementById("crimeLocation").value,
            description: document.getElementById("description").value,

            priority: document.getElementById("priority").value,
            status: document.getElementById("status").value,
            officer: document.getElementById("officer").value,
            firNo: document.getElementById("firNo").value,

            latitude: document.getElementById("latitude").value,
            longitude: document.getElementById("longitude").value,

            createdAt: serverTimestamp()

        });

        alert("✅ Crime Report Submitted Successfully!");

        form.reset();

    } catch (error) {

        console.error(error);

        alert("❌ Error: " + error.message);

    }

});