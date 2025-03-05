import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyCGYOSk7MyC5baRN7ggWb8cmjIaiorEjmU",
    authDomain: "inventory-management-94965.firebaseapp.com",
    projectId: "inventory-management-94965",
    storageBucket: "inventory-management-94965.firebasestorage.app",
    messagingSenderId: "575556038366",
    appId: "1:575556038366:web:44c8b8bd5c932fd5731c4f",
    measurementId: "G-L5HQC1XC37"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// **Ensure the script runs only after the page loads**
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM Loaded, initializing auth...");

    // Handle login event
    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    console.log("Login successful");
                    window.location.href = "index.html";  
                })
                .catch((error) => {
                    console.error("Login Error:", error);
                    document.getElementById("errorMessage").textContent = "Login failed: " + error.message;
                });
        });
    } else {
        console.error("Login button not found! Make sure the script loads after the page.");
    }

    // Ensure `logout()` is globally accessible
    window.logout = function () {
        signOut(auth)
            .then(() => {
                console.log("Logout successful");
                window.location.href = "login.html";  
            })
            .catch((error) => {
                console.error("Logout Error:", error);
                alert("Error logging out: " + error.message);
            });
    };

    // Redirect users who are not logged in
    onAuthStateChanged(auth, (user) => {
        if (!user && window.location.pathname.includes("index.html")) {
            window.location.href = "login.html"; 
        }
    });
});