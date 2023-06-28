require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const { verifyLocalStrategy, 
        verifyGithubStrategy, 
        verifyGoogleStrategy } = require("../controllers/authControllers");


const localStrategy = new LocalStrategy(verifyLocalStrategy);
const githubStrategy = new GithubStrategy({
                                        clientID: process.env.GITHUB_CLIENT_ID,
                                        clientSecret: process.env.GITHUB_CLIENT_PASS,
                                        callbackURL: process.env.GITHUB_CALLBACK_URL
                                    }, verifyGithubStrategy);
const googleStrategy = new GoogleStrategy({
                                        clientID: process.env.GOOGLE_CLIENT_ID,
                                        clientSecret: process.env.GOOGLE_CLIENT_PASS,
                                        callbackURL: process.env.GOOGLE_CALLBACK_URL
                                    }, verifyGoogleStrategy);

passport.use(localStrategy);
passport.use(githubStrategy);
passport.use(googleStrategy);


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (user, done) => {
    done(null, user);
});
