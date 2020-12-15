/* eslint-disable func-names */

const mongoose = require('mongoose');

module.exports = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    permissions: [
      {
        name: { type: String },
      },
    ],
  },
  { timestamps: true },
);
