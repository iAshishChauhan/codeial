const express = require('express');
const homeController = require('../controllers/home_controller')
const router = express.Router();

router.get('/', homeController.home);
router.use('/users', require('../routes/users'));
router.use('/posts', require('../routes/posts'));

module.exports = router;