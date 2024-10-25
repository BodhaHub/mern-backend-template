const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

/**
 * @file RolePermission model definition.
 * @description This model associates roles with permissions.
 * Uses a UUID for rolePermissionID for cross-platform consistency.
 * Relationships with roles and permissions are referenced via UUIDs.
 * Indexes are applied to `rolePermissionID` and ensure no duplicate role-permission associations.
 */

const RolePermissionSchema = new mongoose.Schema(
  {
    rolePermissionID: { type: String, default: uuidv4, unique: true },
    role: { type: String, ref: "Role", required: true },
    permission: { type: String, ref: "Permission", required: true },
    createdBy: { type: String, ref: "User" },
    updatedBy: { type: String, ref: "User" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

RolePermissionSchema.index({ rolePermissionID: 1 }); // Index for fast lookup on rolePermissionID
RolePermissionSchema.index({ role: 1, permission: 1 }, { unique: true }); // Prevent duplicate role-permission associations

const RolePermission = mongoose.model("RolePermission", RolePermissionSchema);

module.exports = RolePermission;
