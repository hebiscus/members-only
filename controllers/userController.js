const User = require('../models/user');
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.signup = [
    body("firstName").isString().trim().exists({values: [null, "falsy"]}).withMessage("hey, first name is undefined!").isLength({min: 2, max: 20}).withMessage("between 2-20 letters"),
    body("lastName").isString().trim(),
    body("username").isEmail().withMessage("you sure that's an email?").custom(async value => {
        try {
            const existingUser = await User.find({username: value});
            if (existingUser) {
                throw new Error("Wait...you're already signed up!");
            }
        } catch(err) {
            console.log(err)
        }
    }).withMessage("you're already signed up"),
    body("password").isLength({min: 5, max: 20}).withMessage("password has to be between 5 and 20 symbols"),
    body("passwordConf").custom((value, { req }) => {
        return value === req.body.password;
      }).withMessage("passwords don't match!"),
    
    (async (req, res, next) => {
        console.log(body)
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.render("sign-up", { title: "Sign-Up", errors: errors.array() });
        }
        const salt =  bcrypt.genSaltSync(10);
        const hashed = bcrypt.hashSync(req.body.password, salt);
        console.log(hashed)
        try {
            const newUser = new User({firstName: req.body.firstName, lastName: req.body.lastName, username: req.body.username, password: hashed})
            await newUser.save();
            res.redirect("/");
        } catch(err) {
            return next(err);
        }
    })
];


exports.add_membership = (async (req, res, next) => {
    console.log("Current user:", req.user)
    const secretPassword = "Rambo666";
    const passedData = req.body.passcode;
    if (passedData !== secretPassword) return res.render("join-club", {title: "You're unworthy", error: "that's not it..."});

    const updatedUser = new User({membershipStatus: "member", _id: req.user._id})

    try {
        const user = await User.findByIdAndUpdate(req.user._id, updatedUser);
        res.redirect("/");
    } catch(err) {
        return next(err);
    }
})