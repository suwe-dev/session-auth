const bcrypt = require("bcrypt");
const User = require("../models/Users");

const verifyLocalStrategy = (username, password, done) => {
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


const verifyGithubStrategy = async (accessToken, refreshToken, profile, cb) => {
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
            return cb(null, user);
        } catch (err) {
            return cb(null, false);
    }
}

const verifyGoogleStrategy = async (accessToken, refreshToken, profile, cb) => {
    try {
        const user = await User.findOne({google_id: profile.id});
        if (!user) {
            console.log("Adding a new google user")
            const user  = await User({
                username: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                google_id: profile.id
            });
            await user.save();
        }
            return cb(null, user);
        } catch (err) {
            return cb(null, false);
    }
}

module.exports = { verifyLocalStrategy, verifyGithubStrategy, verifyGoogleStrategy}