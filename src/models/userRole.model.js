const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

/**
 * @file UserRole model definition.
 * @description This model associates users with roles.
 * Uses a UUID for userRoleID for cross-platform consistency.
 * Relationships with users and roles are referenced via UUIDs.
 * Indexes are applied to `userRoleID` and ensure no duplicate user-role associations.
 */

const UserRoleSchema = new mongoose.Schema(
  {
    userRoleID: { type: String, default: uuidv4, unique: true },
    user: { type: String, ref: "User", required: true },
    role: { type: String, ref: "Role", required: true },
    createdBy: { type: String, ref: "User" },
    updatedBy: { type: String, ref: "User" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

UserRoleSchema.index({ userRoleID: 1 }); // Index for fast lookup on userRoleID
UserRoleSchema.index({ user: 1, role: 1 }, { unique: true }); // Prevent duplicate user-role associations

const UserRole = mongoose.model("UserRole", UserRoleSchema);

module.exports = UserRole;
