window.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    document.getElementById("signin").addEventListener("click", () => {
        loginForm.style.display = "flex";
    });

    document.getElementById("create").addEventListener("click", () => {
        signupForm.style.display = "flex";
    });

    window.closeForm = function(id) {
        document.getElementById(id).style.display = "none";
    };

    // Close when clicking outside the container
    window.addEventListener("click", (e) => {
        if (e.target === loginForm) closeForm("loginForm");
        if (e.target === signupForm) closeForm("signupForm");
    });

    const signupBtn = signupForm.querySelector("button.submit");
    signupBtn.addEventListener("click", () => {
        const username = signupForm.querySelector("input[type='text']").value.trim();
        const password = signupForm.querySelector("input[type='password']").value;

        if (!username || !password) {
            alert("Please fill in both fields.");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || {};
        if (users[username]) {
            alert("Username already exists!");
            return;
        }

        users[username] = password;
        localStorage.setItem("users", JSON.stringify(users));
        alert("Account created successfully!");
        closeForm("signupForm");
    });

    const loginBtn = loginForm.querySelector("button.submit");
    loginBtn.addEventListener("click", () => {
        const username = loginForm.querySelector("input[type='text']").value.trim();
        const password = loginForm.querySelector("input[type='password']").value;

        let users = JSON.parse(localStorage.getItem("users")) || {};
        if (users[username] && users[username] === password) {
            localStorage.setItem("currentUser", username);
            alert("Login successful! Welcome, " + username);
            closeForm("loginForm");
            window.location.replace("index1.html");
        } else {
            alert("Invalid username or password.");
        }
    });

    const albumButtons = document.querySelectorAll(".album-btn");
    albumButtons.forEach(button => {
        button.addEventListener("click", () => {
            loginForm.style.display = "flex";
        });
    });
});