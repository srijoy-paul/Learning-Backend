console.log("signin");
const signinButton = document.getElementById("signin-btn");
const email = document.getElementById("email");
const password = document.getElementById("pswd");

signinButton.addEventListener("click", async () => {
    let user = {
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
})