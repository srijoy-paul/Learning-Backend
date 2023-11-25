const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class User extends Model { };
//User is basically a table(Relation) model in the DB.

User.init(
    {
        //First parameter is an object which contains the column names and their data types.
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING
        },
    }, {
    //The second parameter is also an object, which contains the DB and the model name(which is the table name).
    sequelize,
    modelName: "User",
}
)

module.exports = User;