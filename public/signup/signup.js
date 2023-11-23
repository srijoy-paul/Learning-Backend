console.log("Signup");
const signupButton = document.getElementById("signup-btn");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("pswd");

signupButton.addEventListener("click", async () => {
    let user = {
        name: username.value,
        email: email.value,
        password: password.value
    };
    console.log(user);
    let request = await fetch('http://localhost:3000/api/v1/signup', {
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

