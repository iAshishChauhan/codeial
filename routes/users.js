const express = require('express');
const router = express.Router();
const profileController = require('../controllers/users_controller');
const postsController = require('../controllers/posts_controller');

router.get('/profile', profileController.profile);
router.get('/posts', postsController.posts);

module.exports = router;