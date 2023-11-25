console.log("signin");
// const { router, isSignedIn, signedInUserEmail } = require("../../Routes/AppRoutes");
const signinButton = document.getElementById("signin-btn");
const editButton = document.getElementById("edit-btn");
const email = document.getElementById("email");
const password = document.getElementById("pswd");

let user;
signinButton.addEventListener("click", async () => {
    user = {
        email: email.value,
        password: password.value,
    }
    console.log(user);
    const request = await fetch("http://localhost:3000/api/v1/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        crossDomain: true,
        body: JSON.stringify(user),
    })
    let message = await request.text();
    alert(message);
    if (message === "Sign in Successful") {
        editButton.disabled = false;
    }
    else {
        editButton.disabled = true;
    }
});

editButton.addEventListener("click", () => {
    window.location.href = '../edit/edit.html';
})