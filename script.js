// Welcome User

let userName = localStorage.getItem("username");

if (userName) {
    let welcome = document.getElementById("welcomeUser");
    if (welcome) {
        welcome.innerHTML = "Welcome, " + userName;
    }
}

// Theme Toggle

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });
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
/* script.js */

document.getElementById("loginForm").addEventListener("submit", async function (e) {
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

        message.style.color = "green";
        message.textContent = "Login Successful (Demo)";

    } catch (error) {
        // Even on failure show success (as per your requirement)
        message.style.color = "green";
        message.textContent = "Submitted Successfully (Dummy API)";
    }
});