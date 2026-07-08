// =====================================
// UP Police AI Crime Analytics
// reports.js (Part 3A)
// =====================================

// ================= COUNTER =================

function animateCounter(id, endValue) {

    let element = document.getElementById(id);

    let start = 0;

    let speed = Math.ceil(endValue / 80);

    let counter = setInterval(() => {

        start += speed;

        if (start >= endValue) {

            start = endValue;

            clearInterval(counter);

        }

        if (id === "solveRate") {

            element.innerHTML = start + "%";

        } else {

            element.innerHTML = start.toLocaleString();

        }

    }, 20);

}

animateCounter("totalCrime", 1523);
animateCounter("solvedCases", 1288);
animateCounter("pendingCases", 235);
animateCounter("highRisk", 54);
animateCounter("solveRate", 84);

// ================= BAR CHART =================

new Chart(document.getElementById("crimeBarChart"), {

    type: "bar",

    data: {

        labels: [
            "Theft",
            "Robbery",
            "Cyber",
            "Murder",
            "Fraud",
            "Kidnapping"
        ],

        datasets: [{

            label: "Crime Cases",

            data: [420, 260, 510, 150, 340, 120],

            backgroundColor: [
                "#2196f3",
                "#4caf50",
                "#ff9800",
                "#f44336",
                "#9c27b0",
                "#00bcd4"
            ],

            borderRadius: 8

        }]

    },

    options: {

        responsive: true,

        plugins: {
            legend: {
                display: false
            }
        }

    }

});

// ================= PIE CHART =================

new Chart(document.getElementById("crimePieChart"), {

    type: "pie",

    data: {

        labels: [
            "Solved",
            "Pending",
            "Investigation"
        ],

        datasets: [{

            data: [
                1288,
                235,
                82
            ],

            backgroundColor: [
                "#16a34a",
                "#f59e0b",
                "#2563eb"
            ]

        }]

    },

    options: {

        responsive: true

    }

});

// ================= LINE CHART =================

new Chart(document.getElementById("crimeLineChart"), {

    type: "line",

    data: {

        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul"
        ],

        datasets: [{

            label: "Crime Trend",

            data: [
                180,
                220,
                260,
                240,
                280,
                300,
                340
            ],

            borderColor: "#3fa9ff",

            backgroundColor: "rgba(63,169,255,.15)",

            fill: true,

            tension: .4

        }]

    },

    options: {

        responsive: true

    }

});

// ================= PERFORMANCE =================

new Chart(document.getElementById("performanceChart"), {

    type: "doughnut",

    data: {

        labels: [
            "Solved",
            "Pending",
            "Rejected"
        ],

        datasets: [{

            data: [
                80,
                15,
                5
            ],

            backgroundColor: [
                "#22c55e",
                "#f59e0b",
                "#ef4444"
            ]

        }]

    },

    options: {

        responsive: true

    }

});
// =====================================
// SEARCH TABLE
// =====================================

const searchBox = document.querySelector(".header-right input");

if (searchBox) {

    searchBox.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        const rows = document.querySelectorAll(".crime-table tbody tr");

        rows.forEach(row => {

            const text = row.innerText.toLowerCase();

            row.style.display = text.includes(value) ? "" : "none";

        });

    });

}

// =====================================
// FILTER BUTTON
// =====================================

const filterBtn = document.querySelector(".filters button");

if (filterBtn) {

    filterBtn.addEventListener("click", () => {

        alert("Filters Applied Successfully");

    });

}

// =====================================
// EXPORT CSV
// =====================================

function exportCSV() {

    let csv = [];

    document.querySelectorAll(".crime-table tr").forEach(row => {

        let cols = row.querySelectorAll("td,th");

        let data = [];

        cols.forEach(col => {

            data.push('"' + col.innerText.replace(/"/g, '""') + '"');

        });

        csv.push(data.join(","));

    });

    const blob = new Blob([csv.join("\n")], {
        type: "text/csv"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "Crime_Report.csv";

    link.click();

}

// =====================================
// PRINT REPORT
// =====================================

function printReport() {

    window.print();

}

// =====================================
// HEADER BUTTONS
// =====================================

const buttons = document.querySelectorAll(".header-right button");

if (buttons.length >= 2) {

    // Export Button
    buttons[0].onclick = exportCSV;

    // Print Button
    buttons[1].onclick = printReport;

}

// =====================================
// CARD HOVER EFFECT
// =====================================

document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px) scale(1.02)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});

// =====================================
// AUTO REFRESH TIME
// =====================================

function updateTime() {

    const now = new Date();

    let footer = document.querySelector("footer p");

    if (footer) {

        footer.innerHTML =
            "© 2026 UP Police AI Crime Monitoring System | Last Updated : " +
            now.toLocaleString();

    }

}

updateTime();

setInterval(updateTime, 1000);

// =====================================
// FADE IN ANIMATION
// =====================================

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";

        }

    });

});

document.querySelectorAll(".card,.chart-card,.activity-card,.table-card")
    .forEach(el => {

        el.style.opacity = "0";

        el.style.transform = "translateY(40px)";

        el.style.transition = "0.6s";

        observer.observe(el);

    });

// =====================================
// SUCCESS MESSAGE
// =====================================

console.log("UP Police AI Crime Analytics Loaded Successfully");