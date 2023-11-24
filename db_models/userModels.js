const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class User extends Model { };
//User is basically a table(Relation) in the DB.
User.init(
    {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
    }, {
    sequelize,
    modelName: "Users",
}
)

module.exports = User;