import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";



// ================= SHOW PASSWORD =================

window.togglePassword = function () {

    const pass = document.getElementById("password");

    const eye = document.querySelector(".eye-icon");

    if (pass.type === "password") {

        pass.type = "text";

        eye.classList.remove("fa-eye");

        eye.classList.add("fa-eye-slash");

    } else {

        pass.type = "password";

        eye.classList.remove("fa-eye-slash");

        eye.classList.add("fa-eye");

    }

};



// ================= LOGIN =================

window.login = async function () {

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const btn =
        document.getElementById("loginBtn");

    const msg =
        document.getElementById("loginMessage");

    if (!email || !password) {

        msg.style.color = "#ff5252";

        msg.innerHTML = "Please enter email and password.";

        return;

    }

    btn.disabled = true;

    btn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Logging In...';

    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        msg.style.color = "#00ff99";

        msg.innerHTML = "Login Successful...";

        setTimeout(() => {

            window.location.href = "admin.html";

        }, 800);

    }

    catch (error) {

        let text = "Login Failed";

        switch (error.code) {

            case "auth/user-not-found":
                text = "User not found.";
                break;

            case "auth/wrong-password":
                text = "Wrong password.";
                break;

            case "auth/invalid-email":
                text = "Invalid email.";
                break;

            case "auth/invalid-credential":
                text = "Invalid email or password.";
                break;

            case "auth/too-many-requests":
                text = "Too many attempts. Try later.";
                break;

        }

        msg.style.color = "#ff5252";

        msg.innerHTML = text;

    }

    btn.disabled = false;

    btn.innerHTML =
        '<i class="fa-solid fa-right-to-bracket"></i> Login';

};



// ================= FORGOT PASSWORD =================

document
    .getElementById("forgotPassword")
    .addEventListener("click", async function (e) {

        e.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        if (!email) {

            alert("Enter your email first.");

            return;

        }

        try {

            await sendPasswordResetEmail(auth, email);

            alert("Password reset email sent.");

        }

        catch (err) {

            alert(err.message);

        }

    });



// ================= ENTER KEY =================

document.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

        login();

    }

});



// ================= AUTO LOGIN =================

onAuthStateChanged(auth, (user) => {

    if (user) {

        window.location.href = "admin.html";

    }

});