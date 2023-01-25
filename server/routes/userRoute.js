const userController = require('../controllers/userController')
const router = require('express').Router()

router.post('/signup', userController.userSignup)
router.post('/login', userController.userLogin)
router.post('/verify', userController.userVerify)

module.exports = router
