var express = require('express');
var router = express.Router();
const { register, signin } = require('../controllers/UserController')


router.post('/register',register)
router.post('/signin',signin)

module.exports = router;
