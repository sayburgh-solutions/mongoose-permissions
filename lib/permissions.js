/* eslint-disable func-names */
/* eslint-disable no-param-reassign */

module.exports = function (schema) {
  schema.add({
    role: {
      name: String,
      permissions: [{ name: String }],
    },
    permissions: [{ name: String }],
  });

  schema.methods.can = function (name) {
    return (
      this.role.permissions.some((permission) => permission.name === name) ||
      this.permissions.some((permission) => permission.name === name)
    );
  };

  schema.methods.assignRole = function (role) { 
    this.role = role;
    this.save();

    return this;
  };

  schema.methods.revokeRole = function (name) {
    if (this.role.name === name) {
      this.role = {};
      this.save();
    }

    return this;
  };

  schema.methods.givePermissionTo = function (payload) {
    if (!this.permissions.some((permission) => permission.name === payload)) {
      this.permissions.push({ payload });
      this.save();
    }

    return this;
  };

  schema.methods.revokePermissionTo = function (name) {
    this.permissions = this.permissions.filter((permission) => permission.name !== name);

    return this;
  };
};
