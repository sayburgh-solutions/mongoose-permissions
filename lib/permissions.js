/* eslint-disable func-names */
/* eslint-disable no-param-reassign */

const mongoose = require('mongoose');

module.exports = function (schema) {
  schema.add({
    role: {
      ref: 'Role',
      type: mongoose.Schema.Types.ObjectId,
    },
  });

  schema.methods.getRole = async function (cb) {
    return mongoose
      .model('Role', require('./models/Role').roleSchema)
      .findOne({ _id: this.role }, cb);
  };

  schema.methods.can = async function (slug) {
    const role = await this.getRole();
    const permission = await role.getPermissions().findOne({ slug });

    return permission ? permission.slug === slug : false;
  };
};
