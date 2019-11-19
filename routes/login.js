const express = require('express');
const router = express.Router();

router.get('/', function(req,res){
    return res.end('Login Page Works!');
})

module.exports = router;