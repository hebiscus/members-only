const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get("/", messageController.list);

router.get("/create", (req, res) => {
    res.render("message-create", {title: "Create your message!"})
})

router.post("/create", messageController.create);

module.exports = router;