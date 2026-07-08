import { db, listenReports } from "./firebase.js";
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


// ================= CHAT SYSTEM =================
document.addEventListener("DOMContentLoaded", () => {

    const input = document.querySelector(".chat-input input");
    const button = document.querySelector(".chat-input button");
    const chatBox = document.querySelector(".chat-box");

    if (input && button && chatBox) {

        function botReply(msg) {
            msg = msg.toLowerCase();

            if (msg.includes("police")) return "Nearest Police Station: Hazratganj.";
            if (msg.includes("emergency")) return "Dial 112 immediately 🚨";
            if (msg.includes("crime")) return "High crime alert area detected.";
            if (msg.includes("fir")) return "You can file FIR in Report section.";
            if (msg.includes("help")) return "Police support activated.";

            return "AI is analyzing your request...";
        }

        function sendMessage() {
            const text = input.value.trim();
            if (!text) return;

            // USER MESSAGE
            const userDiv = document.createElement("div");
            userDiv.className = "user-message";
            userDiv.innerHTML = `<p>${text}</p>`;
            chatBox.appendChild(userDiv);

            input.value = "";

            // BOT TYPING
            const botDiv = document.createElement("div");
            botDiv.className = "bot-message";
            botDiv.innerHTML = `<p>Typing...</p>`;
            chatBox.appendChild(botDiv);

            chatBox.scrollTop = chatBox.scrollHeight;

            setTimeout(() => {
                botDiv.innerHTML = `<p>${botReply(text)}</p>`;
                chatBox.scrollTop = chatBox.scrollHeight;
            }, 800);
        }

        button.onclick = sendMessage;

        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") sendMessage();
        });
    }
});


// ================= POPUP =================
window.onload = () => {
    setTimeout(() => {
        document.getElementById("aiPopup")?.classList.add("show");
    }, 1500);
};

window.closePopup = function () {
    document.getElementById("aiPopup")?.classList.remove("show");
};


// ================= DASHBOARD COUNTERS =================
const totalCrime = document.getElementById("totalCrime");
const solvedCase = document.getElementById("solvedCase");
const pendingCase = document.getElementById("pendingCase");
const aiAlert = document.getElementById("aiAlert");

listenReports((snapshot) => {

    let total = snapshot.size;
    let solved = 0;
    let pending = 0;
    let alerts = 0;

    snapshot.forEach((doc) => {
        const data = doc.data();

        let status = (data.status || "").toLowerCase();
        if (status === "solved") solved++;
        else pending++;

        let text = (data.crime || "").toLowerCase();

        if (
            text.includes("murder") ||
            text.includes("kidnap") ||
            text.includes("robbery") ||
            text.includes("terror")
        ) {
            alerts++;
        }
    });

    if (totalCrime) totalCrime.innerText = total;
    if (solvedCase) solvedCase.innerText = solved;
    if (pendingCase) pendingCase.innerText = pending;
    if (aiAlert) aiAlert.innerText = alerts;
});


// ================= OFFICER COUNT =================
const officerCount = document.getElementById("officerCount");

onSnapshot(collection(db, "policeUsers"), (snapshot) => {
    if (officerCount) {
        officerCount.innerText = snapshot.size;
    }
});
/* =====================================================
   UP POLICE AI COMMAND CENTER
   SCRIPT PART 3A
=====================================================*/

// ================= LIVE DATE & TIME =================

function updateDateTime() {

    const now = new Date();

    const dateOptions = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    document.getElementById("date").innerHTML =
        now.toLocaleDateString("en-IN", dateOptions);

    document.getElementById("time").innerHTML =
        now.toLocaleTimeString("en-IN");

}

setInterval(updateDateTime, 1000);

updateDateTime();


// ================= ANIMATED COUNTERS =================

function animateValue(id, end) {

    const el = document.getElementById(id);

    if (!el) return;

    let start = 0;

    let duration = 1500;

    let increment = end / (duration / 20);

    const counter = setInterval(() => {

        start += increment;

        if (start >= end) {

            start = end;

            clearInterval(counter);

        }

        el.innerHTML = Math.floor(start);

    }, 20);

}

animateValue("totalCrime", 1568);
animateValue("solvedCase", 1324);
animateValue("pendingCase", 244);
animateValue("aiAlert", 19);


// ================= WELCOME MESSAGE =================

const officerName = localStorage.getItem("officerName") || "Officer";

const welcome = document.getElementById("welcomeUser");

if (welcome) {

    welcome.innerHTML =
        `Welcome, <strong>${officerName}</strong>`;

}


// ================= DARK MODE =================

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {

        themeBtn.innerHTML = "☀️";

    } else {

        themeBtn.innerHTML = "🌙";

    }

});


// ================= AI ALERT POPUP =================

setTimeout(() => {

    document.getElementById("aiPopup").style.right = "30px";

}, 2500);

function closePopup() {

    document.getElementById("aiPopup").style.right = "-450px";

}


// ================= LIVE ALERT TEXT =================

const alerts = [

    "🚨 AI detected suspicious activity near Hazratganj.",

    "🚓 Bravo Patrol dispatched successfully.",

    "📹 CCTV Motion detected in Gomti Nagar.",

    "🧠 AI Prediction updated successfully.",

    "⚠ Cyber Crime alert received from Control Room.",

    "🚔 Emergency Response Team is active."

];

let index = 0;

setInterval(() => {

    const mq = document.querySelector(".alert-bar marquee");

    if (mq) {

        mq.innerHTML = alerts[index];

        index++;

        if (index >= alerts.length) index = 0;

    }

}, 6000);


// ================= COMMAND STATUS =================

console.log("UP Police AI Dashboard Loaded Successfully");
/* =====================================================
   UP POLICE AI COMMAND CENTER
   SCRIPT PART 3B
=====================================================*/

// ================= CRIME ANALYTICS CHART =================

const chartCanvas = document.getElementById("crimeChart");

if (chartCanvas) {

    new Chart(chartCanvas, {

        type: "line",

        data: {

            labels: [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun"
            ],

            datasets: [{

                label: "Crime Reports",

                data: [45, 62, 51, 70, 68, 82, 60],

                borderColor: "#00c3ff",

                backgroundColor: "rgba(0,195,255,.15)",

                borderWidth: 3,

                pointRadius: 5,

                pointHoverRadius: 7,

                fill: true,

                tension: .45

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    labels: {

                        color: "#ffffff"

                    }

                }

            },

            scales: {

                x: {

                    ticks: {

                        color: "#ffffff"

                    },

                    grid: {

                        color: "rgba(255,255,255,.08)"

                    }

                },

                y: {

                    beginAtZero: true,

                    ticks: {

                        color: "#ffffff"

                    },

                    grid: {

                        color: "rgba(255,255,255,.08)"

                    }

                }

            }

        }

    });

}

// ================= WEATHER =================

const weather = document.querySelector(".weather-card");

if (weather) {

    const hour = new Date().getHours();

    let icon = "☀️";

    let temp = "31°C";

    if (hour >= 18) {

        icon = "🌙";

        temp = "28°C";

    }

    weather.innerHTML = `${icon} ${temp} • Lucknow`;

}

// ================= LIVE NOTIFICATIONS =================

const notifications = [

    "🚔 Patrol Bravo reached Hazratganj.",

    "📹 CCTV Camera 07 detected movement.",

    "🚨 AI raised High Risk Alert.",

    "👮 Officer Rahul accepted duty.",

    "🛰 GPS tracking synchronized.",

    "📍 New FIR registered successfully."

];

let notify = 0;

setInterval(() => {

    const list = document.querySelector(".notification-list");

    if (!list) return;

    const li = document.createElement("li");

    li.innerHTML = notifications[notify];

    list.prepend(li);

    while (list.children.length > 6) {

        list.removeChild(list.lastElementChild);

    }

    notify++;

    if (notify >= notifications.length)

        notify = 0;

}, 7000);


// ================= PATROL STATUS =================

const patrolTeams = [

    "Bravo Team → Hazratganj",

    "Alpha Team → Gomti Nagar",

    "Charlie Team → Alambagh",

    "Delta Team → Charbagh"

];

let patrol = 0;

setInterval(() => {

    const dispatch = document.querySelector(".dispatch-card ul");

    if (!dispatch) return;

    dispatch.firstElementChild.innerHTML =
        "🚓 " + patrolTeams[patrol];

    patrol++;

    if (patrol >= patrolTeams.length)

        patrol = 0;

}, 5000);


// ================= THREAT LEVEL =================

const threat = document.querySelector(".threat-card h2");

const score = document.querySelector(".threat-card small");

const levels = [

    {

        level: "LOW",

        score: "Risk Score : 34%"

    },

    {

        level: "MEDIUM",

        score: "Risk Score : 61%"

    },

    {

        level: "HIGH",

        score: "Risk Score : 92%"

    }

];

let threatIndex = 2;

setInterval(() => {

    if (!threat || !score) return;

    threat.innerHTML = levels[threatIndex].level;

    score.innerHTML = levels[threatIndex].score;

    threatIndex++;

    if (threatIndex >= levels.length)

        threatIndex = 0;

}, 10000);


// ================= AUTO REFRESH =================

setInterval(() => {

    console.log("Dashboard Synced Successfully...");

}, 30000);


// ================= LOADING =================

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

});
// ================= DATE & TIME =================


function updateDateTime() {

    let now = new Date();


    document.getElementById("date").innerHTML =
        now.toLocaleDateString();


    document.getElementById("time").innerHTML =
        now.toLocaleTimeString();


}


setInterval(updateDateTime, 1000);

updateDateTime();





// ================= THEME SWITCH =================


const themeBtn = document.getElementById("themeBtn");


if (themeBtn) {


    themeBtn.addEventListener("click", () => {


        document.body.classList.toggle("dark-mode");



        if (document.body.classList.contains("dark-mode")) {


            themeBtn.innerHTML = "☀️";


        }


        else {


            themeBtn.innerHTML = "🌙";


        }



    });


}







// ================= WELCOME OFFICER =================


let officerName = "Officer";


let welcome = document.getElementById("welcomeUser");


if (welcome) {


    welcome.innerHTML =
        "Welcome " + officerName + " 👮";


}







// ================= CRIME ANALYTICS CHART =================


const chart = document.getElementById("crimeChart");



if (chart) {


    new Chart(chart, {


        type: "line",


        data: {


            labels: [

                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun"

            ],


            datasets: [{


                label: "Crime Cases",


                data: [

                    120,
                    150,
                    100,
                    180,
                    130,
                    90

                ],


                borderWidth: 3



            }]


        },



        options: {


            responsive: true,


            plugins: {


                legend: {


                    display: true


                }


            }



        }



    });


}







// ================= COUNTER ANIMATION =================



function animateCounter(id, end) {


    let element = document.getElementById(id);


    if (!element)
        return;



    let count = 0;


    let speed = end / 50;



    let timer = setInterval(() => {


        count += speed;



        if (count >= end) {


            count = end;


            clearInterval(timer);


        }



        element.innerHTML = Math.floor(count);



    }, 30);



}



animateCounter(
    "totalCrime",
    252
);



animateCounter(
    "solvedCase",
    180
);



animateCounter(
    "pendingCase",
    72
);



animateCounter(
    "aiAlert",
    25
);









// ================= AI POPUP =================


setTimeout(() => {


    let popup = document.getElementById("aiPopup");


    if (popup) {


        popup.style.display = "block";


    }



}, 5000);









// ================= AUTO ALERT SYSTEM =================


setInterval(() => {


    console.log(
        "AI Monitoring Scan Running..."
    );



}, 10000);