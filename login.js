document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const policeId = document.getElementById("policeId").value.trim();
            const password = document.getElementById("password").value.trim();

            if (policeId === "RAHUL" && password === "7607784267") {

                alert("Login Successful 🚔");

                localStorage.setItem("policeUser", "RAHUL");

                window.location.href = "dashboard.html";

            } else {

                alert("Invalid Police ID or Password ❌");

            }

        });

    }

});