const { Router } = require("express");
const { Home, RegisterForm, LoginForm, Logout, Profile} = require("../controllers/getRoutes");
const { Register } = require("../controllers/postRoutes");
const passport = require("passport");
const {isAuth, isLoggedIn} = require("../middlewares/isAuth");

const router = Router();

/*  GET Routes */

router.get("/", isLoggedIn, Home);
router.get("/register", isLoggedIn, RegisterForm);
router.get("/login", isLoggedIn, LoginForm);
router.get("/home", isAuth, Profile);
router.get("/logout", Logout);

// GOOGLE OAUTH 

router.get("/auth/google", passport.authenticate('google', {scope: ['email', 'profile']}));
router.get("/auth/google/callback", passport.authenticate('google', {
    failureRedirect: "/register",
    successRedirect: "/home"
}));

// GITHUB OAUTH

router.get("/auth/github", passport.authenticate('github', {scope: ['user:email'] }));
router.get("/auth/github/callback", passport.authenticate('github', { failureRedirect: "/register" }), (req, res) =>{
    res.redirect("/home");
}
);

/*   POST Routes */

router.post("/register", Register);
router.post("/login", passport.authenticate('local', {
    failureRedirect: "/login",
    successRedirect: "/home"
}));

module.exports = router;