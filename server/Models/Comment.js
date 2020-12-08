const mongoose = require('mongoose');

 const commentSchema = new mongoose.Schema({
    comment : {
        type : String,
        required: true
    },
    replyTo : {
        type : String,
        required: true
    },
    date : {
        type : Date,
        default : Date.now
    }
 });

 module.exports = mongoose.model('Comment' , commentSchema);