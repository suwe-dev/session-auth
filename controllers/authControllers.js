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
            return cb(null, profile);
        } catch (err) {
            return cb(err, profile);
    }
}

const verifyGoogleStrategy = () => {
    
}

module.exports = { verifyLocalStrategy, verifyGithubStrategy, verifyGoogleStrategy}