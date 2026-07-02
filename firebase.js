{ initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBegLDQ4UQn-WfTAQs6jXYBbkv6NMJKUUg",
    authDomain: "crime-monitering.firebaseapp.com",
    projectId: "crime-monitering",
    storageBucket: "crime-monitering.firebasestorage.app",
    messagingSenderId: "158442658246",
    appId: "1:158442658246:web:22044be4cbb700cae73ac7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const adminTable = document.getElementById("adminTable");

if (adminTable) {

    onSnapshot(collection(db, "reports"), (snapshot) => {

        adminTable.innerHTML = "";

        snapshot.forEach((item) => {

            let data = item.data();

            adminTable.innerHTML += `
<tr>
<td>${data.name}</td>
<td>${data.crime}</td>
<td>${data.location}</td>
<td>${data.status || "Pending"}</td>

<td>
<button onclick="markSolved('${item.id}')">
Solved</button>

<button onclick="deleteReport('${item.id}')">
Delete
</button>
</td>
</tr>
`;

        });

    });

}
window.deleteReport = async (id) => {

    await deleteDoc(doc(db, "reports", id));

    alert("Report Deleted");

}
window.markSolved = async (id) => {

    await updateDoc(doc(db, "reports", id), {
        status: "Solved"
    });

    alert("Marked Solved");

}
import { getStorage } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

export const storage = getStorage(app);
latitude,
    longitude,
