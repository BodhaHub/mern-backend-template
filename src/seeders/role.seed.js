const { v4: uuidv4 } = require("uuid");
const Role = require("./models/Role");

/**
 * @file Role Seed Data.
 * @description Seeds the Role collection with initial data.
 */

const seedRoles = async () => {
  const roles = [
    { roleID: uuidv4(), name: "Manager", hierarchy: 1 },
    { roleID: uuidv4(), name: "Lead", hierarchy: 2 },
    { roleID: uuidv4(), name: "Resource", hierarchy: 3 },
    { roleID: uuidv4(), name: "Interviewee", hierarchy: 4 },
  ];

  for (const role of roles) {
    const existingRole = await Role.findOne({ name: role.name });
    if (!existingRole) {
      await Role.create(role);
      console.log(`Role ${role.name} added.`);
    } else {
      console.log(`Role ${role.name} already exists, skipping.`);
    }
  }
};

module.exports = seedRoles;
