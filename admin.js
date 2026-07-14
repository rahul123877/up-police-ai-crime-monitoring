import {
    auth,
    db
} from "./firebase.js";


import {

    onAuthStateChanged,
    signOut

} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


import {

    collection,
    onSnapshot

} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";



// ---------------- AUTH CHECK ----------------


onAuthStateChanged(auth, (user) => {


    if (!user) {

        window.location.href = "admin-login.html";

    }


});




// ---------------- LOGOUT ----------------


const logoutBtn = document.getElementById("logoutBtn");


logoutBtn.addEventListener("click", async () => {


    await signOut(auth);


    localStorage.removeItem("adminLoggedIn");


    window.location.href = "admin-login.html";


});




// ---------------- COMPLAINT COUNT ----------------


const reportsRef = collection(
    db,
    "reports"
);


onSnapshot(reportsRef, (snapshot) => {


    document.getElementById(
        "complaintCount"
    ).innerHTML = snapshot.size;


});




// ---------------- SOS ALERT COUNT ----------------


const sosRef = collection(
    db,
    "sosAlerts"
);



onSnapshot(sosRef, (snapshot) => {


    document.getElementById(
        "sosCount"
    ).innerHTML = snapshot.size;


});





// ---------------- LIVE LOCATION COUNT ----------------


const locationRef = collection(
    db,
    "liveLocations"
);



onSnapshot(locationRef, (snapshot) => {


    document.getElementById(
        "locationCount"
    ).innerHTML = snapshot.size;


});





// ---------------- POLICE USERS COUNT ----------------


const usersRef = collection(
    db,
    "policeUsers"
);



onSnapshot(usersRef, (snapshot) => {


    document.getElementById(
        "userCount"
    ).innerHTML = snapshot.size;


});
// ---------------- LIVE SOS TABLE ----------------


const sosTable = document.getElementById("sosTable");


onSnapshot(sosRef, (snapshot) => {


    let html = "";


    snapshot.forEach((doc) => {


        let data = doc.data();



        html += `

<tr>


<td>
${data.name || "Unknown"}
</td>


<td>
${data.mobile || "-"}
</td>



<td>
${data.message || "SOS Emergency"}
</td>



<td>

<a class="location-btn"

target="_blank"

href="https://www.google.com/maps?q=${data.lat},${data.lng}">

View Map

</a>

</td>



<td>

${data.time || "-"}

</td>



</tr>

`;



    });



    sosTable.innerHTML = html;



});