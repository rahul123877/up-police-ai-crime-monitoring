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