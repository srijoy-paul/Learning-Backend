const delete_btn = document.getElementById("delete");
const email = document.getElementById("email");
const password = document.getElementById("pswd");

delete_btn.addEventListener("click", async () => {
    const user = {
        email: email.value,
        password: password.value
    };
    const request = await fetch("http://localhost:3000/api/v1/delete", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        crossDomain: true,
        body: JSON.stringify(user),
    })
    const message = await request.text();
    alert(message);
})
