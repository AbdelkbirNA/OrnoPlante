const mysql = require('mysql2/promise');
require("dotenv").config();

let connection;

async function connectDatabase() {
  try {
    // Création de la base si elle n'existe pas
    const tempConnection = await mysql.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      port: process.env.DATABASE_PORT || 3306,
    });

    await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DATABASE_NAME}\``);

    await tempConnection.end();

    // Connexion principale à la base créée
    connection = await mysql.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT || 3306,
    });

    console.log('✅ Connected to MySQL database');
  } catch (error) {
    console.error('❌ MySQL connection error:', error.message);
    process.exit(1);
  }
}

function getConnection() {
  if (!connection) {
    throw new Error('Database connection not established yet!');
  }
  return connection;
}

module.exports = {
  connectDatabase,
  getConnection,
};
