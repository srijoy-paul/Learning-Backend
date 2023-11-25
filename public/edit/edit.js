// const { router, isSignedIn, signedInUserEmail } = require("../../Routes/AppRoutes");
const make_changesButton = document.getElementById("make_changes-btn");
const username = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("pswd");
let userData = {};
window.addEventListener("DOMContentLoaded", async () => {
    const request = await fetch("http://localhost:3000/api/v1/fill_info", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        crossDomain: true,
    });
    userData = await request.json();
    username.value = userData.name;
    email.value = userData.email;
    password.value = userData.password;
})
// console.log(localStorage.getItem("signedInUserEmail"));
// email.value = signedInUserEmail;
make_changesButton.addEventListener("click", async () => {
    let user = {
        name: username.value,
        email: email.value,
        password: password.value,
    }
    const request = await fetch("http://localhost:3000/api/v1/make_changes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        crossDomain: true,
        body: JSON.stringify(user),
    });
    let message = await request.text();
    alert(message);
});

