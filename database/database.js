const { Sequelize, DataTypes } = require("sequelize");
const { Client } = require("pg");

// Function to check if the desired database exists
async function checkAndCreateDatabaseIfNotExists() {
  const client = new Client({
    user: "postgres", // Change this to your PostgreSQL username
    host: "localhost",
    port: 5432,
    database: "postgres", // Default database name for the PostgreSQL server
    password: process.env.DB_PASSWORD, // Change this to your PostgreSQL password
  });

  try {
    await client.connect();
    const databaseExistsQuery = `SELECT 1 FROM pg_database WHERE datname = 'asset1';`;
    const result = await client.query(databaseExistsQuery);
    if (result.rowCount === 0) {
      // Database does not exist, create it
      await client.query('CREATE DATABASE "asset1"');
      console.log("Database 'asset1' created successfully!");
    } else {
      console.log("Database 'asset1' already exists!");
    }
  } catch (error) {
    console.error("Error checking or creating the database:", error);
  } finally {
    await client.end();
  }
}

// Call the function to check or create the database
checkAndCreateDatabaseIfNotExists();

// Create the Sequelize connection
const sequelize = new Sequelize("asset1", "postgres", process.env.DB_PASSWORD, {
  host: "localhost",
  dialect: "postgres",
  define: {
    timestamps: true, // Set this to false if you don't need createdAt and updatedAt columns
  },
  // Additional options
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
