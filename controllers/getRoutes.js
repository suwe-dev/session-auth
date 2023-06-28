const User = require("../models/Users");

function Home(req,res) {
    res.render("pages/index");
}

function RegisterForm(req,res) {
    res.render("pages/register");
}

function LoginForm(req,res) {
    res.render("pages/login");
}

function Logout(req, res) {
    req.logout((err) => {
        if(err) { console.log(err) }
        res.redirect("/login");
    });
}

async function Profile(req, res) {
    const user = req.user;
    res.render("pages/home", {user: user});
}

module.exports = { Home, RegisterForm, LoginForm, Logout, Profile }