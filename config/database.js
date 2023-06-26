require("dotenv").config();

const mongoose = require("mongoose");

async function connection() {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Database connected")
}

module.exports = connection;