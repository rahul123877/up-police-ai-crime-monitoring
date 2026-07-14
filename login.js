import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Sirf ye email admin ke liye allow hogi
const ADMIN_EMAIL = "admin@uppolice.com";

const loginBtn = document.getElementById("loginBtn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const error = document.getElementById("error");

loginBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    error.textContent = "";

    if (!email || !password) {
        error.textContent = "Please enter Email and Password";
        return;
    }

    try {

        const result = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        if (result.user.email !== ADMIN_EMAIL) {

            error.textContent = "Access Denied";

            return;
        }

        window.location.href = "admin-dashboard.html";

    } catch (err) {

        error.textContent = "Invalid Email or Password";
        console.log(err);

    }

});
