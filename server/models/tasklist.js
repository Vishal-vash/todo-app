//Get Dependencies
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var tasklistSchema = new schema({
    name : {
        type : String,
        required : true
    },
    completed : Boolean
})

//Use Schema
var tasklist = mongoose.model('tasklist', tasklistSchema);

//Export to use for other files
module.exports = tasklist;
