const mysql = require('mysql')
const dbConfig = require('../config/db.config')

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

// open the MySQL connection
connection.connect(error => {
    if (error) {
        console.log("Error occured while connecting to database ", error);
        throw error;
    }
    console.log("Successfully connected to the database.");
});

module.exports = connection;