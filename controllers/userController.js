const User = require('../models/user');
const { body, validationResult } = require("express-validator");

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
    
    (req, res) => {
        console.log(body)
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.render("sign-up", { title: "Sign-Up", errors: errors.array() });
        }
        res.redirect("/")
    }
];
