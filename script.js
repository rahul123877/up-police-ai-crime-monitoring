/* ==============================================
   DASHBOARD FEATURES (NEWLY ADDED)
   ============================================== */

// 1. Live Date & Time (लाइव घड़ी)
function updateClock() {
    const timeEl = document.getElementById("time");
    const dateEl = document.getElementById("date");

    if (timeEl && dateEl) {
        const now = new Date();

        // Time format: 10:30:45 AM
        timeEl.innerText = now.toLocaleTimeString("en-IN", {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        // Date format: 24 May 2026
        dateEl.innerText = now.toLocaleDateString("en-IN", {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}
// हर एक सेकंड (1000ms) में समय अपडेट करें
setInterval(updateClock, 1000);
updateClock(); // पेज लोड होते ही तुरंत चलाएं

// 2. Crime Analytics Chart (ग्राफ)
const chartCanvas = document.getElementById("crimeChart");
if (chartCanvas) {
    new Chart(chartCanvas, {
        type: 'line', // लाइन ग्राफ
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // महीने
            datasets: [{
                label: 'Total Crimes Registered',
                data: [120, 98, 140, 85, 110, 75], // डमी डेटा
                borderColor: '#00D4FF', // स्यान कलर की लाइन
                backgroundColor: 'rgba(0, 212, 255, 0.2)', // नीचे हल्का कलर (ग्लास इफ़ेक्ट)
                borderWidth: 2,
                fill: true,
                tension: 0.4 // लाइन को स्मूथ (curved) बनाने के लिए
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false } // ऊपर का लेबल छुपाने के लिए
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' } // हल्की ग्रिड लाइन
                },
                x: {
                    grid: { display: false } // X एक्सिस की लाइन हटा दी
                }
            }
        }
    });
}

// 3. Theme Toggle (अपडेटेड - अब आइकॉन भी बदलेगा)
const themeBtn = document.getElementById("themeBtn");
if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        // चेक करें कि अगर लाइट मोड है तो सूरज दिखाएं, नहीं तो चाँद
        if (document.body.classList.contains("light-mode")) {
            themeBtn.innerText = "☀️";
        } else {
            themeBtn.innerText = "🌙";
        }
    });
}


/* ==============================================
   YOUR ORIGINAL CODE (आपका पुराना कोड)
   ============================================== */

// Welcome User
let userName = localStorage.getItem("username");
if (userName) {
    let welcome = document.getElementById("welcomeUser");
    if (welcome) {
        welcome.innerHTML = "Welcome, " + userName;
    }
}

// FIR Form Submit
const firForm = document.querySelector(".fir-form form");
if (firForm) {
    firForm.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("FIR Submitted Successfully!");
    });
}

// Chatbot Send Message
const chatInput = document.querySelector(".chat-input input");
const chatButton = document.querySelector(".chat-input button");
const chatBox = document.querySelector(".chat-box");

if (chatButton) {
    chatButton.addEventListener("click", () => {
        let message = chatInput.value.trim();
        if (message !== "") {
            let userMsg = document.createElement("div");
            userMsg.classList.add("user-message");
            userMsg.innerHTML = "<p>" + message + "</p>";
            chatBox.appendChild(userMsg);

            let botMsg = document.createElement("div");
            botMsg.classList.add("bot-message");

            if (message.toLowerCase().includes("help")) {
                botMsg.innerHTML = "<p>Dial 112 immediately.</p>";
            }
            else if (message.toLowerCase().includes("police")) {
                botMsg.innerHTML = "<p>Nearest station: Hazratganj Police Station.</p>";
            }
            else {
                botMsg.innerHTML = "<p>Processing your request...</p>";
            }

            chatBox.appendChild(botMsg);
            chatInput.value = "";
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    });
}

// Admin Alert Buttons
const adminButtons = document.querySelectorAll(".action-buttons button");
adminButtons.forEach(button => {
    button.addEventListener("click", () => {
        alert(button.innerText + " Activated!");
    });
});

// Login Form Submit
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const message = document.getElementById("message");

        // Email validation
        if (!email.endsWith("@uppolice.in")) {
            message.style.color = "red";
            message.textContent = "Only @uppolice.in email allowed!";
            return;
        }

        // Basic empty check
        if (name === "" || password === "") {
            message.style.color = "red";
            message.textContent = "All fields are required!";
            return;
        }

        message.style.color = "blue";
        message.textContent = "Submitting...";

        try {
            // Dummy API call (will fail/simulate)
            const response = await fetch("https://dummyjson.com/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: email,
                    password: password
                })
            });

            // We expect failure or fake response
            if (!response.ok) {
                throw new Error("API Failed");
            }

            const data = await response.json();

            // Save username to show on dashboard later
            localStorage.setItem("username", name);

            message.style.color = "green";
            message.textContent = "Login Successful (Demo)";

            // Redirect to dashboard (optional)
            // window.location.href = "index.html"; 

        } catch (error) {
            // Even on failure show success (as per your requirement)
            localStorage.setItem("username", name);
            message.style.color = "green";
            message.textContent = "Submitted Successfully (Dummy API)";
        }
    });
}