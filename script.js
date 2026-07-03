document.addEventListener("DOMContentLoaded", function () {

    const input = document.querySelector(".chat-input input");
    const button = document.querySelector(".chat-input button");
    const chatBox = document.querySelector(".chat-box");

    if (!input || !button || !chatBox) return;

    function getBotReply(message) {
        message = message.toLowerCase();

        if (message.includes("police")) {
            return "Nearest Police Station: Hazratganj Police Station.";
        }

        if (message.includes("emergency")) {
            return "Dial 112 immediately. Emergency alert sent to control room.";
        }

        if (message.includes("crime")) {
            return "High crime zone detected in Lucknow Central Area.";
        }

        if (message.includes("fir")) {
            return "You can file FIR from the Report Section.";
        }

        if (message.includes("suspect")) {
            return "Suspect database scanning in progress...";
        }

        if (message.includes("help")) {
            return "Police emergency support activated.";
        }

        return "AI Assistant is analyzing your request...";
    }

    function sendMessage() {
        const userText = input.value.trim();

        if (userText === "") return;

        // User Message
        const userDiv = document.createElement("div");
        userDiv.classList.add("user-message");
        userDiv.innerHTML = `<p>${userText}</p>`;
        chatBox.appendChild(userDiv);

        input.value = "";

        // Bot Typing
        const botDiv = document.createElement("div");
        botDiv.classList.add("bot-message");
        botDiv.innerHTML = `<p>Typing...</p>`;
        chatBox.appendChild(botDiv);

        chatBox.scrollTop = chatBox.scrollHeight;

        setTimeout(() => {
            botDiv.innerHTML = `<p>${getBotReply(userText)}</p>`;
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 1000);
    }

    button.addEventListener("click", sendMessage);

    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });

});
window.onload = function () {

    setTimeout(() => {
        document.getElementById("aiPopup").classList.add("show");
    }, 1500);

};

function closePopup() {
    document.getElementById("aiPopup").classList.remove("show");
}