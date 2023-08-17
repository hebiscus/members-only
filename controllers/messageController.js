const User = require('../models/user');
const Message = require('../models/message');
const { body, validationResult } = require("express-validator");

exports.create = [
    body("title").trim().isString().withMessage("has to be a string!").isLength({min: 1, max: 20}).withMessage("title has to be at least 1 character long"),

    (async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("message-create", {title: "Create a message!", errors: errors.array()});
        }
        try {
            const message = new Message({author: req.user, title: req.body.title, content: req.body.content});
            await message.save();
            res.redirect("/messages");
        } catch(err) {
            return next(err)
        }
})]