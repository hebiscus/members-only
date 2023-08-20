const Message = require('../models/message');
const { body, validationResult } = require("express-validator");

exports.list = async (req, res, next) => {
    try {
        const messages = await Message.find().populate("author").sort({timestamp: 1});
        res.render("messages", {user: req.user, messages: messages});
    } catch(err) {
        return next(err)
    }
}

exports.create = [
    body("title").trim().isString().withMessage("has to be a string!").isLength({min: 1, max: 30}).withMessage("title has to be between 1-30 character long"),

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

exports.delete = async (req, res, next) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.redirect("/messages");
    } catch(err) {
        return next(err)
    }
};