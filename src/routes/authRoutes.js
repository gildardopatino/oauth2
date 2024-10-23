const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/auth/google', authController.googleAuth); //mostrar la pantalla de Autorizar y Denegar de Google
router.get('/auth/google/callback', authController.googleAuthCallback, authController.redirectHome);

router.get('/auth/facebook', authController.facebookAuth); //mostrar la pantalla de Autorizar y Denegar de Facebook
router.get('/auth/facebook/callback', authController.facebookAuthCallback, authController.redirectHome);

router.get('/profile', authController.getProfile);
router.get('/logout', authController.logout);

module.exports = router;