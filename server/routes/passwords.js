const express = require('express');
const router = express.Router();
const { index, find, update, create, destroy } = require('../controllers/PasswordController')
const {auth} = require('../middlewares/auth')

router.get('/:id', auth, find);
router.get('/', auth, index);
router.post('/', auth, create)
router.put('/:id', auth, update)
router.delete('/:id', auth, destroy)

module.exports = router;
