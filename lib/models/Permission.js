/* eslint-disable func-names */

const mongoose = require('mongoose');

const slugify = require('mongoose-simple-slugify');

const permissionSchema = new mongoose.Schema(
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
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
      },
    ],
  },
  { timestamps: true },
);

permissionSchema.methods.getRoles = function (cb) {
  return mongoose.model('Role', require('./Role').roleSchema).find({ _id: this.id }, cb);
};

permissionSchema.plugin(slugify);

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = { permissionSchema, Permission };
