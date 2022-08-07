/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */

const { Schema } = require('mongoose');

module.exports = function (schema) {
  schema.add({
    role: {
      name: String,
      permissions: [{ _id: { type: Schema.Types.ObjectId, default: undefined }, name: String }],
    },
    permissions: [{ _id: { type: Schema.Types.ObjectId, default: undefined }, name: String }],
  });

  schema.methods.can = function (name) {
    if (!name) throw new Error(`Permission name is required`);

    return (
      this.role.permissions.some((permission) => permission.name === name) ||
      this.permissions.some((permission) => permission.name === name)
    );
  };

  /*
   * Assign role to user
   * @param {String} name - role name | { name: String, permissions: [{ name: String}] }
   */
  schema.methods.assignRole = async function (role) {
    if ((typeof role === 'string' && !role) || (typeof role === 'object' && !role.name))
      throw new Error(`Role name is required`);

    if (role && role.name) {
      this.role = role;
    } else if (typeof role === 'string') {
      this.role.name = role;
    }

    this.role = role;

    return this.save();
  };

  /*
   * Revoke role from user
   * @param {String} name - role name
   */
  schema.methods.revokeRole = async function (name) {
    if (typeof name !== 'string' || !name) throw new Error(`Role name is required`);

    if (this.role.name === name) {
      this.role = {};
      return this.save();
    }

    return this;
  };

  /*
   * Check has an user has a role assigned to him/her
   * @param {String} name - role name
   */

  schema.methods.hasRole = function (name) {
    if (typeof name !== 'string' || !name) throw new Error(`Role name is required`);

    return this.role.name === name;
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
