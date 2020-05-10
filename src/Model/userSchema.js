//Import the mongoose module
const mongoose = require('mongoose');

//Creating a schema instance
const Schema = mongoose.Schema;

// Defining Schema
let userSchema = new Schema({
        user_name : {type : String , required : true},
        email : {type : String , required : true},
        password : {type : String , required : true},
        school_name : {type : String , required : true},
        prev_quiz : {type : Array , required : false},
        // 1 = true 0 = false
        admin : { type : Boolean, required : false}
});

/* Creating a model - compile model form Schema
#userSchema = schema going to use for creating model
*/ 
module.exports = mongoose.model('users',userSchema);