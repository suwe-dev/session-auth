const passport = require("passport");
const LocalStrategy = require("passport-local");
const connection = require("./database");
const bcrypt = require("bcrypt");
const User = require("../models/Users");


const verifyUser = (username, password, done) => {
    User.findOne({ username: username })
    .then((user) => {
        if(!user) { return done(null, false) }

        bcrypt.compare(password, user.password, function(err, result) {
            if(result) {
                return done(null, user);
            } else {
                return done(null, false)
            }
        })

    })
}

const strategy = new LocalStrategy(verifyUser);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user)
        })
        .catch(err => done)
});
