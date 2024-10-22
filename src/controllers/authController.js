const passport = require('passport');

exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email']});
exports.googleAuthCallback = passport.authenticate('google', {failureRedirect: '/'});


exports.facebookAuth = passport.authenticate('facebook', { scope: ['email']});
exports.facebookAuthCallback = passport.authenticate('facebook', {failureRedirect: '/'});

exports.redirectHome =  (req, res) => {
    res.redirect(process.env.URL_REDIRECT);
};