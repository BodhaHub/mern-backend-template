const { v4: uuidv4 } = require("uuid");
const RolePermission = require("./models/RolePermission");
const Role = require("./models/Role");
const Permission = require("./models/Permission");

/**
 * @file RolePermission Seed Data.
 * @description Seeds the RolePermission collection with initial data, linking roles to permissions.
 */

const seedRolePermissions = async () => {
  const roles = await Role.find();
  const permissions = await Permission.find();

  if (roles.length && permissions.length) {
    const rolePermissions = [
      {
        rolePermissionID: uuidv4(),
        role: roles[0].roleID,
        permission: permissions[0].permissionID,
      },
      {
        rolePermissionID: uuidv4(),
        role: roles[0].roleID,
        permission: permissions[1].permissionID,
      },
    ];

    for (const rolePermission of rolePermissions) {
      const existingRolePermission = await RolePermission.findOne({
        role: rolePermission.role,
        permission: rolePermission.permission,
      });
      if (!existingRolePermission) {
        await RolePermission.create(rolePermission);
        console.log(
          `RolePermission linking role ${rolePermission.role} to permission ${rolePermission.permission} added.`
        );
      } else {
        console.log(
          `RolePermission linking role ${rolePermission.role} to permission ${rolePermission.permission} already exists, skipping.`
        );
      }
    }
  }
};

module.exports = seedRolePermissions;
