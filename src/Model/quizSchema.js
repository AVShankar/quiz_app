//Import the mongoose module
const mongoose = require('mongoose');

//Creating a schema instance
const Schema = mongoose.Schema;

// Defining Schema
let quizSchema = new Schema({
    quizData : {type: Array, required: true},
    category : {type: String, required: true},
    difficulty : {type: String, required: true}
});

/* Creating a model - compile model form Schema
#userSchema = schema going to use for creating model
*/ 
module.exports = mongoose.model('quizSchema',quizSchema);