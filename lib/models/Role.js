/* eslint-disable func-names */

const mongoose = require('mongoose');

const slugify = require('mongoose-simple-slugify');

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    slug: {
      source: 'name',
      type: String,
      unique: true,
      require: true,
    },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission',
      },
    ],
  },
  { timestamps: true },
);

roleSchema.methods.getPermissions = function (cb) {
  return mongoose
    .model('Permission', require('./Permission').permissionSchema)
    .find({ roles: this.id }, cb);
};

roleSchema.plugin(slugify);

const Role = mongoose.model('Role', roleSchema);

module.exports = { roleSchema, Role };
