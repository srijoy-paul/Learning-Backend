const { sequelize } = require("sequelize");
require('dotenv').config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const createDB = new sequelize("users-info-DB", username, password, {
    dialect: "sqlite",
    host: "./db.sqlite",
});
modules.exports = createDB;