var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ToDoSchema = new Schema({
    id  : ObjectId
  , name: String
  , status: String
});

module.exports = mongoose.model('ToDo', ToDoSchema);