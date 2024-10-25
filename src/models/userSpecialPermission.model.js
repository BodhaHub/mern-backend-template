const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

/**
 * @file UserSpecialPermission model definition.
 * @description This model assigns additional permissions to users beyond their role.
 * Uses a UUID for userSpecialPermissionID for cross-platform consistency.
 * Relationships with users and permissions are referenced via UUIDs.
 * Indexes are applied to `userSpecialPermissionID` and ensure no duplicate user-permission associations.
 */

const UserSpecialPermissionSchema = new mongoose.Schema(
  {
    userSpecialPermissionID: { type: String, default: uuidv4, unique: true },
    user: { type: String, ref: "User", required: true },
    permission: { type: String, ref: "Permission", required: true },
    createdBy: { type: String, ref: "User" },
    updatedBy: { type: String, ref: "User" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

UserSpecialPermissionSchema.index({ userSpecialPermissionID: 1 }); // Index for fast lookup on userSpecialPermissionID
UserSpecialPermissionSchema.index({ user: 1, permission: 1 }, { unique: true }); // Prevent duplicate user-permission associations

const UserSpecialPermission = mongoose.model(
  "UserSpecialPermission",
  UserSpecialPermissionSchema
);

module.exports = UserSpecialPermission;
