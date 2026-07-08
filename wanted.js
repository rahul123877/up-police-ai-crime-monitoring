// =======================================
// UP Police AI - Most Wanted JS
// =======================================

// Search
const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".criminal-card");

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    cards.forEach(card => {

        const text = card.innerText.toLowerCase();

        if (text.includes(value)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});

// =======================================
// Crime Filter
// =======================================

const crimeFilter = document.getElementById("crimeFilter");

crimeFilter.addEventListener("change", () => {

    const value = crimeFilter.value.toLowerCase();

    cards.forEach(card => {

        if (value === "all crimes") {

            card.style.display = "block";
            return;

        }

        if (card.innerText.toLowerCase().includes(value)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});

// =======================================
// Danger Filter
// =======================================

const dangerFilter = document.getElementById("dangerFilter");

dangerFilter.addEventListener("change", () => {

    const value = dangerFilter.value.toLowerCase();

    cards.forEach(card => {

        if (value === "danger level") {

            card.style.display = "block";
            return;

        }

        if (card.innerText.toLowerCase().includes(value)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});

// =======================================
// View Profile
// =======================================

document.querySelectorAll(".detailsBtn").forEach(btn => {

    btn.addEventListener("click", function () {

        const card = this.closest(".criminal-card");

        const name = card.querySelector("h2").innerText;

        alert(
            `Criminal Profile

Name : ${name}

Complete criminal profile module
will be connected with database.

Status : WANTED`
        );

    });

});

// =======================================
// Report Button
// =======================================

document.querySelectorAll(".reportBtn").forEach(btn => {

    btn.addEventListener("click", function () {

        alert("Report has been forwarded to UP Police Control Room.");

    });

});

// =======================================
// Statistics Counter Animation
// =======================================

const counters = document.querySelectorAll(".stat-card h2");

counters.forEach(counter => {

    let target = parseInt(counter.innerText.replace(/\D/g, ""));

    let count = 0;

    let speed = target / 80;

    function update() {

        count += speed;

        if (count < target) {

            counter.innerText = Math.floor(count);

            requestAnimationFrame(update);

        }
        else {

            counter.innerText = target;

        }

    }

    update();

});

// =======================================
// Hero Button
// =======================================

document.querySelector(".primary").onclick = function () {

    searchInput.focus();

}

console.log("UP Police AI Most Wanted Loaded Successfully");