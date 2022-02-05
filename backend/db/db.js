const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect((error) => {
    
  if (error) {
    console.error("error connecting: " + error.stack);
    return;
  }
  console.log("DB is connected, connection id is: " + connection.threadId);
});

module.exports = connection;
