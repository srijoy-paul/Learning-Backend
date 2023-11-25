const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
//router is an object in express. And the Router() creates a new router object.

const createDB = require("../config/db");
createDB.sync().then(() => {
    console.log("DB is running!");
});
const User = require("../db_models/userModels");

// let LocalStorage = require("node-localstorage").LocalStorage;
// let localStorage = new LocalStorage("./scratch");

let isSignedIn = false;
let signedInUser = {};
// const users = {};
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //     users = { ...users, email:{ username: name, password: pswd }
        // }
        // let alreadyUser = users.hasOwnProperty(email);
        let alreadyUser = await User.findOne({
            where: {
                email
            }
        });
        if (!alreadyUser) {
            let encyrptedPassword = await bcrypt.hash(password, 10);

            // users[email] = { username: name, password: encyrptedPassword };

            const userData = { name: name, email: email, password: encyrptedPassword };
            const createdUser = await User.create(userData);
            //creating a row/tuple/record and the order and datatype should be same as of the model. 

            console.log("signup", name, email, password, encyrptedPassword);

            res.send("Signup successful");
        }
        else { res.send("Your email has been already linked to an account. Please Login"); }
    } catch (error) {
        console.log(error);
    }
});
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("signin", email, password);
        // let isAlreadyUser = users.hasOwnProperty(email);
        let isAlreadyUser = await User.findOne({
            where: {
                email
            }
        });
        if (isAlreadyUser) {
            // let encyrptedPassword = users[email].password;

            const test = await User.findOne({
                where: {
                    email: email
                }
            });
            console.log(test);
            const encryptedPassword = test.dataValues.password;
            console.log(encryptedPassword);

            let isCorrectPassword = await bcrypt.compare(password, encryptedPassword);
            if (isCorrectPassword) {
                isSignedIn = true;
                signedInUser = { name: test.dataValues.name, email: email, password: password };
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

});
router.post("/delete", async (req, res) => {
    const { email, password } = req.body;
    // await User.truncate();
    const isAccountExist = await User.findOne({
        where: {
            email
        }
    });
    if (isAccountExist) {
        const userData = await User.findOne({
            where: {
                email: email,
            }
        });
        // console.log(userData);
        const encryptedPassword = userData.dataValues.password;

        const isCorrectPassword = await bcrypt.compare(password, encryptedPassword);
        if (isCorrectPassword) {
            await User.destroy({
                where: {
                    email: email,
                }
            });
            isSignedIn = false;
            res.send("Account Deleted.😔")
        }
        else {
            res.send("Incorrect password. Please try again!");
        }
    }
    else {
        res.send("You do not have an account. Please sign up!")
    }
});
router.post("/fill_info", async (req, res) => {
    if (isSignedIn && signedInUser != null) {
        res.json(signedInUser);
    }
});
router.post("/make_changes", async (req, res) => {
    const { name, email, password } = req.body;
    const userData = await User.findOne({
        where: {
            email: email,
        }
    });

    let isSameName = (name === userData.dataValues.name);
    let isSamePassword = await bcrypt.compare(password, userData.dataValues.password);

    if (!isSameName || !isSamePassword) {
        userData.setDataValue('name', name);
        signedInUser.name = name;
        userData.setDataValue('password', await bcrypt.hash(password, 10));
        signedInUser.password = await bcrypt.hash(password, 10);

        await userData.save();

        res.send("Changes made successfully!");
    }
    else {
        res.send("No Changes made");
    }
});
module.exports = { router, isSignedIn, signedInUser };
// module.exports = isSignedIn;
// module.exports = signedInUserEmail;