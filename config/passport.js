require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
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
                return done(null, false);
            }
        })
    })
}

const strategy = new LocalStrategy(verifyUser);

passport.use(strategy);

passport.use(new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_PASS,
        callbackURL: "https://suwe-auth.onrender.com/auth/github/callback"
        }, async (accessToken, refreshToken, profile, cb) => {
            try {
                const user = await User.findOne({github_id: profile.id});
                if (!user) {
                    console.log("Adding a new github user")
                    const user  = await User({
                        username: profile.id,
                        name: profile.username,
                        github_id: profile.id
                    });
                    await user.save();
                }
                    return cb(null, profile);
                } catch (err) {
                    return cb(err, profile);
            }
        }

    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (user, done) => {
    done(null, user);
});
