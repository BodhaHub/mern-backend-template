const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

/**
 * @file Role model definition.
 * @description This model represents roles in the system.
 * Uses a UUID for roleID for cross-platform consistency.
 * Contains a hierarchy field to define role access levels.
 * Indexes are applied to `roleID` for performance.
 */

const RoleSchema = new mongoose.Schema(
  {
    roleID: { type: String, default: uuidv4, unique: true },
    name: { type: String, required: true, unique: true },
    hierarchy: { type: Number, required: true },
    createdBy: { type: String, ref: "User" },
    updatedBy: { type: String, ref: "User" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

RoleSchema.index({ roleID: 1 }); // Index for fast lookup on roleID

const Role = mongoose.model("Role", RoleSchema);

module.exports = Role;
