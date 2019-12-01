const express = require('express');
const router = express.Router();
const profileController = require('../controllers/users_controller');

router.get('/profile', profileController.profile);
router.get('/sign-in', profileController.UserSignIn);
router.get('/sign-up', profileController.UserSignUp);

module.exports = router;