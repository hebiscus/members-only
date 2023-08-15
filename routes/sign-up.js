const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', (req, res,) => {
    res.render('sign-up', {title: 'Sign-Up'})
});

router.post('/', userController.signup);

module.exports = router;