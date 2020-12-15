/* eslint-disable func-names */
/* eslint-disable no-param-reassign */

module.exports = function (schema) {
  schema.add({
    role: {
      name: String,
      permissions: [{ name: String }],
    },
  });

  schema.methods.can = function (name) {
    return this.role.permissions.some((permission) => permission.name === name);
  };
};
