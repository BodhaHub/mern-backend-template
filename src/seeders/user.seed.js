const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("./models/User"); // Assuming models are in './models/User'

const saltRounds = 10;
const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

/**
 * @file User Seed Data.
 * @description Seeds the User collection with initial data.
 */

const encrypt = (text) => {
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
};

const seedUsers = async () => {
  const users = [
    {
      userID: uuidv4(),
      name: "John Doe",
      email: encrypt("johndoe@example.com").encryptedData,
      password: bcrypt.hashSync("password123", saltRounds),
      isActive: true,
    },
    {
      userID: uuidv4(),
      name: "Jane Smith",
      email: encrypt("janesmith@example.com").encryptedData,
      password: bcrypt.hashSync("password456", saltRounds),
      isActive: true,
    },
  ];

  for (const user of users) {
    const existingUser = await User.findOne({ name: user.name });
    if (!existingUser) {
      await User.create(user);
      console.log(`User ${user.name} added.`);
    } else {
      console.log(`User ${user.name} already exists, skipping.`);
    }
  }
};

module.exports = seedUsers;
