const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get("/", (req, res) => {
    res.render("join-club", {title: "Join us..."})
});

router.post("/upgrade-member", userController.add_membership);

router.post("/upgrade-admin", userController.upgrade_to_admin);

module.exports = router;