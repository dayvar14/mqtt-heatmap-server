const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    dateCreated: {
        type: Date,
        default: Date.now
    }
});

UserSchema.index({ username:1 }, { "unique": true });
module.exports = mongoose.model("Users", UserSchema);