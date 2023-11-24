const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
//router is an object in express. And the Router() creates a new router object.
const createDB = require("../config/db");

createDB.sync().then(() => {
    console.log("DB is running!");
});

const users = {};
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //     users = { ...users, email:{ username: name, password: pswd }
        // }
        let alreadyUser = users.hasOwnProperty(email);
        if (!alreadyUser) {
            let encyrptedPassword = await bcrypt.hash(password, 10);
            users[email] = { username: name, password: encyrptedPassword };
            console.log("signup", name, email, password, encyrptedPassword);
            res.send("Signup successful");
        }
        else { res.send("Your email has been already linked to an account. Please Login"); }
    } catch (error) {
        console.log(error);
    }
})
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("signin", email, password);
        let isAlreadyUser = users.hasOwnProperty(email);
        if (isAlreadyUser) {
            let encyrptedPassword = users[email].password;
            let isCorrectPassword = await bcrypt.compare(password, encyrptedPassword);
            if (isCorrectPassword) {
                res.send("Sign in Successful");
            }
            else {
                res.send("Incorrect Password. Please try again!");
            }
        }
        else {
            res.send("You do not have an account. Please sign up");
        }

    } catch (error) {
        console.log(error);
    }

})
module.exports = router;