const mongoose = require('mongoose');

//creating our user schema
const userSchema = mongoose.Schema({
    name : String,
    email : String,
    phone : Number
});


module.exports = mongoose.model('User', userSchema);