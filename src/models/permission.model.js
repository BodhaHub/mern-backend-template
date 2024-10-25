const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

/**
 * @file Permission model definition.
 * @description This model represents individual permissions in the system.
 * Uses a UUID for permissionID for cross-platform consistency.
 * Describes the purpose of the permission in the `description` field.
 * Indexes are applied to `permissionID` for performance.
 */

const PermissionSchema = new mongoose.Schema(
  {
    permissionID: { type: String, default: uuidv4, unique: true },
    name: { type: String, required: true, unique: true },
    description: { type: String },
    createdBy: { type: String, ref: "User" },
    updatedBy: { type: String, ref: "User" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

PermissionSchema.index({ permissionID: 1 }); // Index for fast lookup on permissionID

const Permission = mongoose.model("Permission", PermissionSchema);

module.exports = Permission;
