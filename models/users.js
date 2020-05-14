
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Schema = new Schema({
  name:  {type: String, required: true},
  email:   {type: String, required: true},
  password: {type: String, required: true},
  registerDate: { type: Date, default: Date.now },
  isActive: {type: Boolean, required: true},
  sessionCode: {type: String},
  activationCode: {type: String},
  homepage: {type: String}

});

module.exports = mongoose.model('Users', Schema)