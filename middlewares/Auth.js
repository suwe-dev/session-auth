function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/login")
    }
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect("/home")
    } else {
        next();
    }
}

module.exports = { isAuth, isLoggedIn };