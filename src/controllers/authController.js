const passport = require('passport');

exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });
exports.googleAuthCallback = passport.authenticate('google', { failureRedirect: '/' });


exports.facebookAuth = passport.authenticate('facebook', { scope: ['email'] });
exports.facebookAuthCallback = passport.authenticate('facebook', { failureRedirect: '/' });

exports.redirectHome = (req, res) => {
    res.redirect(process.env.URL_REDIRECT);
};

exports.getProfile = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'No estas Autenticado' });
    }
    res.json(req.user);
}


exports.logout = (req, res) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
        res.redirect(process.env.URL_REDIRECT);
    });
}