/**
 * @file Seed Data Runner.
 * @description This file runs all the seed data scripts to populate the database with initial data.
 */

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config(); // Load .env file

const seedUsers = require("./userSeed");
const seedRoles = require("./roleSeed");
const seedPermissions = require("./permissionSeed");
const seedUserRoles = require("./userRoleSeed");
const seedRolePermissions = require("./rolePermissionSeed");
const seedUserSpecialPermissions = require("./userSpecialPermissionSeed");

// Load the correct config based on the environment
const environment = process.env.environment || "development";
const config = require(`./config/${environment}`); // Load config/development.js or config/production.js

// Database connection with the latest MongoDB options
mongoose
  .connect(config.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Updated option: Time limit to connect
    useCreateIndex: true, // Necessary for certain MongoDB versions to use indexes
    useFindAndModify: false, // Avoid deprecated findAndModify MongoDB commands
  })
  .then(() => {
    console.log(`Connected to MongoDB in ${environment} mode`);
    runSeeds();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if connection fails
  });

const runSeeds = async () => {
  try {
    await seedUsers();
    await seedRoles();
    await seedPermissions();
    await seedUserRoles();
    await seedRolePermissions();
    await seedUserSpecialPermissions();
    console.log("All seeds executed successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error running seeds:", error);
    mongoose.connection.close();
  }
};
