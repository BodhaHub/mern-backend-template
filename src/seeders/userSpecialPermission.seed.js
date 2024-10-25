const { v4: uuidv4 } = require("uuid");
const UserSpecialPermission = require("./models/UserSpecialPermission");
const User = require("./models/User");
const Permission = require("./models/Permission");

/**
 * @file UserSpecialPermission Seed Data.
 * @description Seeds the UserSpecialPermission collection with initial data, linking specific users to additional permissions.
 */

const seedUserSpecialPermissions = async () => {
  const users = await User.find();
  const permissions = await Permission.find();

  if (users.length && permissions.length) {
    const userSpecialPermissions = [
      {
        userSpecialPermissionID: uuidv4(),
        user: users[0].userID,
        permission: permissions[2].permissionID,
      },
    ];

    for (const userSpecialPermission of userSpecialPermissions) {
      const existingUserSpecialPermission = await UserSpecialPermission.findOne(
        {
          user: userSpecialPermission.user,
          permission: userSpecialPermission.permission,
        }
      );
      if (!existingUserSpecialPermission) {
        await UserSpecialPermission.create(userSpecialPermission);
        console.log(
          `UserSpecialPermission linking user ${userSpecialPermission.user} to permission ${userSpecialPermission.permission} added.`
        );
      } else {
        console.log(
          `UserSpecialPermission linking user ${userSpecialPermission.user} to permission ${userSpecialPermission.permission} already exists, skipping.`
        );
      }
    }
  }
};

module.exports = seedUserSpecialPermissions;
