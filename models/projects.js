
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Schema = new Schema({
    title:  {type: String, required: true},
    author: {type: mongoose.ObjectId, required: true},
    data: {type: Object, required: true },
    publishedDate: { type: Date, default: Date.now},
    style: {type: Object, required: true},
    downloads: {type: Number, default: 0}
});

module.exports = mongoose.model('Projects', Schema)