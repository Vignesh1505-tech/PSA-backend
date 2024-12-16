// const dotenv = require("dotenv").config()
// const { Pool } = require('pg');

// const pool = new Pool({
//     user: process.env.USER,
//     host: process.env.HOST,
//     database: process.env.DATABASE,
//     password: process.env.DATABASE_PASSWORD,
//     port: process.env.DATABASE_PORT,
// });
// pool.connect().
//     then(() =>
//         console.log("DB Connected")).
//     catch(error => console.log(error, "Error occuring in DB connection"))
    
// module.exports = pool;


const dotenv = require("dotenv").config();
const mysql = require("mysql2");


// Create a MySQL pool using environment variables
const pool = mysql.createPool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10, // Adjust the connection limit if needed
    queueLimit: 0 // Adjust the queue limit if needed
});

// Test the connection (optional, to verify the DB connection)
pool.getConnection((err, connection) => {
    if (err) {
        console.error("Error connecting to DB:", err);
    } else {
        console.log("DB Connected successfully!");
        connection.release(); // Always release the connection back to the pool
    }
});

module.exports = pool;
