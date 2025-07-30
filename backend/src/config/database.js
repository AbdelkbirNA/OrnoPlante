const mysql = require('mysql2/promise');
require("dotenv").config();

let connection;

const tempConnection = await mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  port: process.env.MYSQLPORT || 3306,
});

await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQLDATABASE}\``);

await tempConnection.end();

connection = await mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT || 3306,
});

module.exports = {
  connectDatabase,
  getConnection,
};
