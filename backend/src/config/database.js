const mysql = require('mysql2/promise');
require('dotenv').config();

let connection;

async function connectDatabase() {
  if (!connection) {
    // Connexion temporaire pour créer la base si besoin
    const tempConnection = await mysql.createConnection({
      host: process.env.MYSQLHOST,
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      port: process.env.MYSQLPORT || 3306,
    });

    await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQLDATABASE}\``);
    await tempConnection.end();

    // Connexion finale à la base créée
    connection = await mysql.createConnection({
      host: process.env.MYSQLHOST,
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      database: process.env.MYSQLDATABASE,
      port: process.env.MYSQLPORT || 3306,
    });
  }
  return connection;
}

function getConnection() {
  if (!connection) {
    throw new Error('Database not connected yet');
  }
  return connection;
}

module.exports = {
  connectDatabase,
  getConnection,
};
