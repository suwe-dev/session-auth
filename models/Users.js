const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minLength: 6
    },
    google_id: String,
    github_id: String
})

const User = new mongoose.model("user", userSchema);

module.exports = User;