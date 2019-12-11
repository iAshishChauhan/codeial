const express = require('express');
const homeController = require('../controllers/home_controller')
const router = express.Router();

router.get('/', homeController.home);

// For any other routes, access from here
// router.use('/router-name', require('./routerfile'));

router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));

module.exports = router;