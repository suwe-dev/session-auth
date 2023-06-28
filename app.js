require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const ejs = require("ejs");

const connection = require("./config/database");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set("view engine", "ejs");

const sessionStore = MongoStore.create({ 
    mongoUrl: process.env.MONGODB_URI,
    collections: "sessions"
});

app.use(session({
    secret: process.env.SECRET_PASS,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));

require("./config/passport");

app.use(passport.initialize());
app.use(passport.session());


app.use(routes);

mongoose.set("strictQuery", false);

connection().catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
    console.log(`Server started at ${process.env.PORT}`);
})