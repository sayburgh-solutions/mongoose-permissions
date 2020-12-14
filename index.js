const { Role, Permission } = require('./lib/models');

module.exports = {
  Role,
  Permission,
  permissions: require('./lib/permissions'),
  roleSchema: require('./lib/models/Role').roleSchema,
  permissionSchema: require('./lib/models/Permission').permissionSchema,
};
