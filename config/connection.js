// Importing Sequelize library
const Sequelize = require('sequelize');

// Loading environment variables from .env file
require('dotenv').config();

let sequelize;
console.log(process.env.DB_USER, process.env.DB_PASSWORD);
// Check if the environment variable JAWSDB_URL is set (Heroku deployment)
if (process.env.JAWSDB_URL) {
    // Create Sequelize instance using the JAWSDB_URL environment variable
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
// If JAWSDB_URL is not set, create Sequelize instance using local database credentials
sequelize = new Sequelize(
    process.env.DB_NAME,     // Database name
    process.env.DB_USER,     // Database user
    process.env.DB_PASSWORD, // Database password
    {
        host: 'localhost',   // Database host
        dialect: 'mysql',    // Database dialect (MySQL in this case)
        port: 3306           // Database port
    }
);
}

// Export the sequelize instance to be used in other parts of the application
module.exports = sequelize;
