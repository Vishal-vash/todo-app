//Load Dependencies
const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

//Create a Schema
var todoSchema = new Schema({
    taskName : {
        type : String,
        required : true
    },
    isCompleted : Boolean
})

//Use Schema
var todo = mongoose.model('todo', todoSchema);
module.exports = todo;
