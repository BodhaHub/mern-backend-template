const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

/**
 * @file User model definition.
 * @description This model represents users in the system.
 * Uses a UUID for the userID for cross-platform consistency.
 * Includes email uniqueness for ensuring no duplicate users.
 * Relationships with roles and special permissions are referenced.
 * Indexes are applied to `userID` for performance and `email` to ensure uniqueness.
 */

const UserSchema = new mongoose.Schema(
  {
    userID: { type: String, default: uuidv4, unique: true },
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: { type: String, required: true },
    roles: [{ type: mongoose.Schema.Types.String, ref: "UserRole" }],
    special_permissions: [
      { type: mongoose.Schema.Types.String, ref: "UserSpecialPermission" },
    ],
    isActive: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 }, { unique: true }); // Email uniqueness and performance
UserSchema.index({ userID: 1 }); // Index for fast lookup on userID

const User = mongoose.model("User", UserSchema);

module.exports = User;
