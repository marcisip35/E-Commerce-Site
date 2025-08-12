/* Log In & Sign Up */
const signupSection = document.getElementById("signup-section");
const signupMain = document.getElementById("signup-main");
const loginSection = document.getElementById("login-section");
const loginMain = document.getElementById("login-main");

loginSection.addEventListener("click", () => {
    signupMain.style.display = "none";
    loginMain.style.display = "flex";
});

signupSection.addEventListener("click", () => {
    loginMain.style.display = "none";
    signupMain.style.display = "flex";
});

