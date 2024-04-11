const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    // Helper method to check if password matches the hashed password stored in the database
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// Define the User model
User.init(
    {
        // Define columns of the User table
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true // Ensure usernames are unique
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Ensure emails are unique
            validate: {
                isEmail: true // Validate email format
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8] // Minimum password length of 8 characters
            }
        }
    },
    {
        // Configure sequelize options
        hooks: {
            // Before a user is created, hash the password
            async beforeCreate(newUser) {
                newUser.password = await bcrypt.hash(newUser.password, 10);
                return newUser;
            },
            // Before a user is updated, hash the password if it's changed
            async beforeUpdate(updatedUser) {
                if (updatedUser.password) {
                    updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
                }
                return updatedUser;
            }
        },
        sequelize, // Connect model to sequelize instance
        timestamps: false, // Disable timestamps (createdAt and updatedAt columns)
        freezeTableName: true, // Prevent sequelize from pluralizing table names
        underscored: true, // Use snake_case for column names
        modelName: 'user' // Set model name to 'user'
    }
);

module.exports = User;
