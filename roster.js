// ===============================
// UP Police AI - Roster JS
// ===============================

// Today's Date
const today = new Date();

const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
};

const dateBox = document.getElementById("todayDate");

if (dateBox) {
    dateBox.innerHTML = today.toLocaleDateString("en-IN", options);
}

// ===============================
// Search & Filter
// ===============================

const searchInput = document.getElementById("searchOfficer");
const rankFilter = document.getElementById("rankFilter");
const shiftFilter = document.getElementById("shiftFilter");
const locationFilter = document.getElementById("locationFilter");

const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");

const table = document.getElementById("rosterTable");
const rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

// Search Function
function filterRoster() {

    const keyword = searchInput.value.toLowerCase();
    const rank = rankFilter.value.toLowerCase();
    const shift = shiftFilter.value.toLowerCase();
    const location = locationFilter.value.toLowerCase();

    for (let i = 0; i < rows.length; i++) {

        let officer = rows[i].cells[1].innerText.toLowerCase();
        let officerRank = rows[i].cells[2].innerText.toLowerCase();
        let officerLocation = rows[i].cells[4].innerText.toLowerCase();
        let officerShift = rows[i].cells[5].innerText.toLowerCase();

        let show = true;

        if (keyword && !officer.includes(keyword))
            show = false;

        if (rank && !officerRank.includes(rank))
            show = false;

        if (location && !officerLocation.includes(location))
            show = false;

        if (shift && !officerShift.includes(shift))
            show = false;

        rows[i].style.display = show ? "" : "none";
    }

}

// Button
searchBtn.addEventListener("click", filterRoster);

// Live Search
searchInput.addEventListener("keyup", filterRoster);

rankFilter.addEventListener("change", filterRoster);

shiftFilter.addEventListener("change", filterRoster);

locationFilter.addEventListener("change", filterRoster);

// ===============================
// Reset
// ===============================

resetBtn.addEventListener("click", () => {

    searchInput.value = "";
    rankFilter.value = "";
    shiftFilter.value = "";
    locationFilter.value = "";

    for (let row of rows) {
        row.style.display = "";
    }

});

// ===============================
// Refresh
// ===============================

const refreshBtn = document.getElementById("refreshBtn");

refreshBtn.addEventListener("click", () => {

    location.reload();

});

// ===============================
// View Button
// ===============================

const viewButtons = document.querySelectorAll(".viewBtn");

viewButtons.forEach(button => {

    button.addEventListener("click", function () {

        let row = this.parentElement.parentElement;

        let msg =
            "Officer : " + row.cells[1].innerText +
            "\nRank : " + row.cells[2].innerText +
            "\nMobile : " + row.cells[3].innerText +
            "\nDuty : " + row.cells[4].innerText +
            "\nShift : " + row.cells[5].innerText +
            "\nStatus : " + row.cells[6].innerText;

        alert(msg);

    });

});

// ===============================
// Dashboard Count
// ===============================

function updateDashboard() {

    let total = 0;
    let day = 0;
    let night = 0;

    for (let row of rows) {

        if (row.style.display === "none")
            continue;

        total++;

        let shift = row.cells[5].innerText.toLowerCase();

        if (shift.includes("day"))
            day++;

        if (shift.includes("night"))
            night++;

    }

    document.getElementById("totalStaff").innerHTML = total;
    document.getElementById("dayDuty").innerHTML = day;
    document.getElementById("nightDuty").innerHTML = night;

}

updateDashboard();

searchBtn.addEventListener("click", updateDashboard);

resetBtn.addEventListener("click", updateDashboard);

searchInput.addEventListener("keyup", updateDashboard);

rankFilter.addEventListener("change", updateDashboard);

shiftFilter.addEventListener("change", updateDashboard);

locationFilter.addEventListener("change", updateDashboard);

// ===============================
// Auto Clock
// ===============================

const clock = document.createElement("div");

clock.style.position = "fixed";
clock.style.bottom = "20px";
clock.style.right = "20px";
clock.style.background = "#1f6feb";
clock.style.padding = "10px 18px";
clock.style.borderRadius = "10px";
clock.style.fontWeight = "bold";
clock.style.boxShadow = "0 0 10px rgba(0,0,0,.3)";
clock.style.zIndex = "999";

document.body.appendChild(clock);

setInterval(() => {

    const d = new Date();

    clock.innerHTML = d.toLocaleTimeString();

}, 1000);

// ===============================
// Print Shortcut
// ===============================

document.addEventListener("keydown", function (e) {

    if (e.ctrlKey && e.key === "p") {

        e.preventDefault();

        window.print();

    }

});

// ===============================
// End
// ===============================