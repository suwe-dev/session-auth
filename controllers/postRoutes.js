const User = require("../models/Users");
const bcrypt = require("bcrypt");

const saltRounds = 10;

async function Register(req,res) {
    const { username, name, password } = req.body;
    
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            try {
                const user = await User.create({
                    username: username,
                    name: name,
                    email: username,
                    password: hash
                });
                res.redirect("/login");
            } catch (err) {
                res.status(400).json({ErrorMessage: err})
            }        
        });
    });
};

function Login(req, res) {
    
}

module.exports = { Register, Login }