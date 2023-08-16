const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res) => {
  res.render('index', { title: 'Members Only', user: req.user, failLogin: req.session.message });
});

router.post('/', passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/", failureMessage: true
}));

module.exports = router;
