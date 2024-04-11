const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    // Helper method to check if password matches the hashed password stored in the database
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}



module.exports = User;
