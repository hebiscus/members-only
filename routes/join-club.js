const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get("/", (req, res) => {
    res.render("join-club", {title: "Join us..."})
});

// router.post("/", userController.add_membership);

module.exports = router;