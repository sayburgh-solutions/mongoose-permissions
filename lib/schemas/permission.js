/* eslint-disable func-names */

const mongoose = require('mongoose');

module.exports = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    roles: [
      {
        name: { type: String },
      },
    ],
  },
  { timestamps: true },
);
