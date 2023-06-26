const { Router } = require("express");
const { Home, RegisterForm, LoginForm, Logout, Profile} = require("../controllers/getRoutes");
const { Register, Login } = require("../controllers/postRoutes");
const passport = require("passport");
const {isAuth, isLoggedIn} = require("../middlewares/isAuth");

const router = Router();

/*  GET Routes */

router.get("/", isLoggedIn,Home);
router.get("/register", isLoggedIn, RegisterForm);
router.get("/login", isLoggedIn, LoginForm);
router.get("/home", isAuth, Profile);
router.get("/logout", Logout);

/*   POST Routes */

router.post("/register", Register);
router.post("/login", passport.authenticate('local', {
    failureRedirect: "/login",
    successRedirect: "/home"
}));

module.exports = router;