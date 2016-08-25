'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MedicineSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Medicine', MedicineSchema);