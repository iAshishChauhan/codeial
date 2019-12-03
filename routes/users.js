const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);
router.get('/sign-in', usersController.UserSignIn);
router.get('/sign-up', usersController.UserSignUp);

router.post('/create', usersController.create);
router.post('/create-session', usersController.createSession);
router.get('/sign-out', usersController.signOut);

module.exports = router;