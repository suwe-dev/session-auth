const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
})

const User = new mongoose.model("user", userSchema);

module.exports = User;